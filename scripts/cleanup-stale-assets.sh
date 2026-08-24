#!/usr/bin/env bash
# Удаляет на сервере устаревшие хешированные ассеты и мусор от прошлых
# раскладок сайта:
#   • static/js/main.*.js       (но НЕ текущий актуальный из build/)
#   • static/js/main.*.js.map
#   • static/css/main.*.css
#   • static/css/main.*.css.map
#   • static/media/bgVideo.*.mp4 (но НЕ актуальный)
#   • index.html / asset-manifest.json / favicon.ico /
#     robots.txt / manifest.json / logo*.png в КОРНЕ public_html/
#     (эти файлы пересоздаются rsync-ом, но если когда-то была старая
#     раскладка с «голым» index.html — rsync её не тронет без --delete.
#     Поэтому удаляем вручную по whitelist, чтобы точно не остался мусор.)
#   • static/ и build/ в КОРНЕ public_html/, если они там есть — мы
#     заливаем ассеты прямо в public_html/, а не в public_html/build/.
#
# Подключается из .github/workflows/deploy.yml ПОСЛЕ rsync и ДО пост-проверки.
#
# Окружение:
#   BEGET_SSH_KEY   — приватный ключ (содержимое, не путь)
#   BEGET_SSH_HOST  — host
#   BEGET_SSH_USER  — user
#   BEGET_REMOTE_DIR — абсолютный путь к public_html на сервере

set -euo pipefail

: "${BEGET_SSH_KEY:?BEGET_SSH_KEY secret is required}"
: "${BEGET_SSH_HOST:?BEGET_SSH_HOST secret is required}"
: "${BEGET_SSH_USER:?BEGET_SSH_USER secret is required}"
: "${BEGET_REMOTE_DIR:?BEGET_REMOTE_DIR env is required (e.g. /home/l/lizaptsw/rain-lab.ru/public_html)}"

KEY_FILE="$(mktemp)"
trap 'rm -f "$KEY_FILE"' EXIT
printf '%s\n' "$BEGET_SSH_KEY" > "$KEY_FILE"
chmod 600 "$KEY_FILE"

SSH_TARGET="$BEGET_SSH_USER@$BEGET_SSH_HOST"
SSH_BASE_OPTS=(
  -i "$KEY_FILE"
  -o StrictHostKeyChecking=yes
  -o ConnectTimeout=15
  -p 22
)

# ---------- 1. Список актуальных имён из локального build/ ----------
# (rsync их НЕ удаляет, потому что мы без --delete, — но и удалять
# нельзя, они нужны сайту.)
ACTUAL_FILES="$(
  {
    ls build/static/js/main.*.js       2>/dev/null | sed 's|^build/||' || true
    ls build/static/css/main.*.css     2>/dev/null | sed 's|^build/||' || true
    ls build/static/media/bgVideo.*.mp4 2>/dev/null | sed 's|^build/||' || true
  } | sort -u
)"

WHITELIST_FILE="$(mktemp)"
trap 'rm -f "$KEY_FILE" "$WHITELIST_FILE"' EXIT
{
  echo "ACTUAL=("
  if [ -n "$ACTUAL_FILES" ]; then
    printf '  %q\n' $ACTUAL_FILES
  fi
  echo ")"
} > "$WHITELIST_FILE"

echo ">>> Files to preserve on server:"
cat "$WHITELIST_FILE"

# ---------- 2. Копируем whitelist на сервер ----------
ssh "${SSH_BASE_OPTS[@]}" \
    "$SSH_TARGET" "mkdir -p ~/.cache-deploy && cat > ~/.cache-deploy/cleanup-actual.env" \
    < "$WHITELIST_FILE"

# ---------- 3. Запускаем очистку на сервере ----------
ssh "${SSH_BASE_OPTS[@]}" \
    "$SSH_TARGET" bash -s -- "$BEGET_REMOTE_DIR" <<'REMOTE_EOF'
set -euo pipefail
REMOTE_DIR="$1"
cd "$REMOTE_DIR"

source ~/.cache-deploy/cleanup-actual.env

# Паттерны удаляемых файлов (только хешированные CRA-ассеты и bgVideo,
# плюс корень public_html/, куда CRA кладёт index.html и манифесты).
PATTERNS=(
  "main.*.js"
  "main.*.js.map"
  "main.*.css"
  "main.*.css.map"
  "bgVideo.*.mp4"
  "index.html"
  "asset-manifest.json"
  "favicon.ico"
  "robots.txt"
  "manifest.json"
  "logo192.png"
  "logo512.png"
)

is_actual() {
  local relpath="$1"
  local a
  for a in "${ACTUAL[@]}"; do
    [ "$a" = "$relpath" ] && return 0
  done
  return 1
}

removed_count=0
for pat in "${PATTERNS[@]}"; do
  while IFS= read -r -d '' f; do
    rel="${f#./}"
    if is_actual "$rel"; then
      printf '  keep: %s\n' "$rel"
      continue
    fi
    printf '  rm:   %s\n' "$rel"
    rm -f -- "$f"
    removed_count=$((removed_count + 1))
  done < <(find . -maxdepth 4 -type f -name "$pat" -print0 2>/dev/null || true)
done

echo "Removed files: $removed_count"
REMOTE_EOF

echo ">>> Cleanup finished"
