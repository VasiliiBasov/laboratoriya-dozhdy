#!/usr/bin/env bash
# Удаляет на сервере устаревшие хешированные ассеты и мусор от прошлых
# раскладок сайта:
#   • static/js/main.*.js       (но НЕ текущий актуальный из build/)
#   • static/js/main.*.js.map
#   • static/css/main.*.css
#   • static/css/main.*.css.map
#   • static/media/bgVideo.*.mp4 (но НЕ актуальный)  ← старые CRA-хеши
#   • static/media/bgVideoProlet.*.mp4 (но НЕ актуальный)  ← если webpack
#     когда-то начнёт собирать это видео и класть хешированные копии —
#     оставим только актуальную, остальные снесём.
#   • index.html / asset-manifest.json / favicon.ico /
#     robots.txt / manifest.json / logo*.png в КОРНЕ public_html/
#     (эти файлы пересоздаются rsync-ом, но если когда-то была старая
#     раскладка с «голым» index.html — rsync её не тронет без --delete.
#     Поэтому удаляем вручную по whitelist, чтобы точно не остался мусор.)
#   • static/ и build/ в КОРНЕ public_html/, если они там есть — мы
#     заливаем ассеты прямо в public_html/, а не в public_html/build/.
#
# ВАЖНО: ручной bgVideoProlet.mp4 (без хеша) НЕ трогаем никогда — он
# заливается через WinSCP и не имеет отношения к CRA-хешам.
#
# Подключается из .github/workflows/deploy.yml ПОСЛЕ rsync и ДО пост-проверки.
#
# Окружение:
#   BEGET_SSH_KEY   — приватный ключ (содержимое, не путь)
#   BEGET_HOST      — host (имя secret'а в GitHub: BEGET_HOST)
#   BEGET_USER      — user (имя secret'а в GitHub: BEGET_USER)
#   BEGET_REMOTE_DIR — абсолютный путь к public_html на сервере

set -euo pipefail

: "${BEGET_SSH_KEY:?BEGET_SSH_KEY secret is required}"
: "${BEGET_HOST:?BEGET_HOST secret is required}"
: "${BEGET_USER:?BEGET_USER secret is required}"
: "${BEGET_REMOTE_DIR:?BEGET_REMOTE_DIR env is required (e.g. /home/l/lizaptsw/rain-lab.ru/public_html)}"

KEY_FILE="$(mktemp)"
trap 'rm -f "$KEY_FILE"' EXIT
printf '%s\n' "$BEGET_SSH_KEY" > "$KEY_FILE"
chmod 600 "$KEY_FILE"

SSH_TARGET="$BEGET_USER@$BEGET_HOST"
SSH_BASE_OPTS=(
  -i "$KEY_FILE"
  -o StrictHostKeyChecking=yes
  -o ConnectTimeout=15
  -p 22
)

# ---------- 1. Список актуальных имён из локального build/ ----------
# (rsync их НЕ удаляет, потому что мы без --delete, — но и удалять
# нельзя, они нужны сайту.)
#
# ВАЖНО: начиная с актуальной раскладки CRA rsync кладёт ВСЁ содержимое
# build/ прямо в public_html/ — включая index.html, asset-manifest.json,
# favicon.ico, robots.txt, manifest.json, logo*.png. Они лежат в КОРНЕ
# public_html/, поэтому cleanup не должен их трогать. Старый мусор (типа
# public_html/build/index.html от предыдущей раскладки) сохранит префикс
# "build/" и потому под ACTUAL не попадёт — будет удалён, как и раньше.
ACTUAL_FILES="$(
  {
    find build -maxdepth 1 -type f -printf '%P\n' 2>/dev/null || true
    ls build/static/js/main.*.js             2>/dev/null | sed 's|^build/||' || true
    ls build/static/css/main.*.css           2>/dev/null | sed 's|^build/||' || true
    ls build/static/media/bgVideo.*.mp4      2>/dev/null | sed 's|^build/||' || true
    ls build/static/media/bgVideoProlet.*.mp4 2>/dev/null | sed 's|^build/||' || true
  } | sort -u
)"

# ---------- 1a. Список файлов, которые НИКОГДА нельзя удалять ----------
# Ручные ассеты, залитые через WinSCP напрямую, не из CI:
#   • /static/media/bgVideoProlet.mp4 — герой-видео «Пролёт 4 Сосны»
NEVER_DELETE_PATTERNS=(
  "bgVideoProlet.mp4"
)

WHITELIST_FILE="$(mktemp)"
trap 'rm -f "$KEY_FILE" "$WHITELIST_FILE"' EXIT
{
  echo "ACTUAL=("
  if [ -n "$ACTUAL_FILES" ]; then
    printf '  %q\n' $ACTUAL_FILES
  fi
  echo ")"
  echo "NEVER_DELETE_PATTERNS=("
  for p in "${NEVER_DELETE_PATTERNS[@]}"; do
    printf '  %q\n' "$p"
  done
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

# Паттерны удаляемых файлов (только хешированные CRA-ассеты и bgVideo*,
# плюс корень public_html/, куда CRA кладёт index.html и манифесты).
# ВАЖНО: точные имена без хеша (например, "bgVideoProlet.mp4")
# идут через NEVER_DELETE_PATTERNS — их cleanup вообще не трогает.
PATTERNS=(
  "main.*.js"
  "main.*.js.map"
  "main.*.css"
  "main.*.css.map"
  "bgVideo.*.mp4"
  "bgVideoProlet.*.mp4"
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

# Никогда не удалять файлы, залитые вручную (без хеша).
# Проверяем по basename: если имя точно совпадает с одним из NEVER_DELETE_PATTERNS,
# это «ручной» ассет — пропускаем, даже если он попал под паттерн выше.
# Под set -u обращение к пустому массиву "${arr[@]}" валит скрипт —
# проверяем длину и подставляем пустой fallback через "${arr[@]+"${arr[@]}"}".
is_never_delete() {
  local filepath="$1"
  local base
  base="$(basename "$filepath")"
  # Если массив пуст — никто не «никогда не удаляется».
  if [ "${#NEVER_DELETE_PATTERNS[@]}" -eq 0 ]; then
    return 1
  fi
  local p
  for p in "${NEVER_DELETE_PATTERNS[@]}"; do
    [ "$base" = "$p" ] && return 0
  done
  return 1
}

removed_count=0
for pat in "${PATTERNS[@]}"; do
  while IFS= read -r -d '' f; do
    rel="${f#./}"
    if is_actual "$rel"; then
      printf '  keep (actual): %s\n' "$rel"
      continue
    fi
    if is_never_delete "$f"; then
      printf '  keep (manual): %s\n' "$rel"
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
