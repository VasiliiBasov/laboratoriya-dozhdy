#!/usr/bin/env bash
# =============================================================
# deploy.sh — автодеплой build/ на Beget через git pull
# =============================================================
# Кладёте в корень сайта рядом с index.html (например,
# /home/l/lizaptsw/rain-lab.ru/public_html/deploy.sh) и
# запускаете по SSH: `bash deploy.sh`.
#
# Что делает:
#   1) git pull — подтягивает свежий build/ (без видео,
#      оно исключено в .gitignore).
#   2) Чистит старые хешированные файлы в build/static/js,
#      build/static/css, build/static/media, которые не
#      пришли с новым коммитом — это и есть «удалить мусор,
#      а не накапливать». После каждой пересборки CRA
#      генерит новые имена (main.<хеш>.js), старые больше
#      никогда не понадобятся.
#   3) Подсказывает, что видео bgVideo.*.mp4 надо положить
#      руками (если хеш сменился или файла ещё нет).
#
# Безопасно: удаляет только файлы с паттернами main.*.js /
# main.*.css / bgVideo.*.mp4 — то, что само CRA генерит и
# переименовывает. index.html, шрифты, картинки моделей
# не трогает.

set -e

cd "$(dirname "$0")"

echo "==> git pull"
git pull --ff-only

echo "==> prune old hashed assets (main.*.js / main.*.css / bgVideo.*.mp4)"
# Удаляем файлы, которые CRA мог оставить от прошлых билдов.
# Текущие «живые» файлы останутся, потому что они либо
# пришли из git, либо положили руками.
find build/static/js    -maxdepth 1 -type f \( -name 'main.*.js'    -o -name 'main.*.js.map' \) -print -delete || true
find build/static/css   -maxdepth 1 -type f \( -name 'main.*.css'   -o -name 'main.*.css.map' \) -print -delete || true
find build/static/media -maxdepth 1 -type f    -name 'bgVideo.*.mp4'                            -print -delete || true

echo "==> current bgVideo.mp4 (should be the one you uploaded manually):"
ls -lh build/static/media/bgVideo.*.mp4 2>/dev/null || echo "  (none — upload your video manually to build/static/media/bgVideo.<hash>.mp4)"

echo "==> deploy OK"
