#!/usr/bin/env bash
# Единственный поддерживаемый способ деплоя. Голый rsync в current не использовать:
# production переключается атомарно, а модуль цен обслуживается отдельно.
set -euo pipefail

cd "$(dirname "$0")/.."

REMOTE=al.spb
SITE_ROOT=/usr/local/lsws/academia-shuvaloff.ru

bun run build
test -s out/index.html
test -s out/404.html

# Запоминаем текущий релиз до передачи файлов. Параллельная публикация
# не должна незаметно перезаписать чужой результат.
PREVIOUS=$(ssh "$REMOTE" "readlink -f '$SITE_ROOT/current'")
RELEASE=$(ssh "$REMOTE" "mktemp -d '$SITE_ROOT/releases/release-$(date -u +%Y%m%dT%H%M%SZ)-XXXXXX'")
[[ "$PREVIOUS" == "$SITE_ROOT/releases/"* ]]
[[ "$RELEASE" == "$SITE_ROOT/releases/"* ]]

# Передаём сборку в отдельный каталог: ошибка передачи не затронет current.
# PHP-модуль цен не входит в сборку; его код, ключи и shared-кэш не трогаем.
rsync -az --exclude 'module-price-load/' out/ "$REMOTE:$RELEASE/"

ssh "$REMOTE" bash -s -- "$SITE_ROOT" "$PREVIOUS" "$RELEASE" <<'REMOTE_SCRIPT'
set -euo pipefail
root=$1
previous=$2
release=$3
exec 9>"$root/deploy.lock"
flock -x 9
if [[ "$(readlink -f "$root/current")" != "$previous" ]]; then
    echo 'За время загрузки опубликован другой релиз. Повторите деплой.' >&2
    exit 1
fi
test -s "$release/index.html"
test -s "$release/404.html"

# Сохраняем чанки прошлых сборок: браузер (Safari) может показать
# закешированный HTML со старыми именами файлов. Свежие чанки не заменяем.
if [[ -d "$previous/_next/static" ]]; then
    mkdir -p "$release/_next/static"
    rsync -a --ignore-existing "$previous/_next/static/" "$release/_next/static/"
fi
chmod 755 "$release"
ln -s "$release" "$release/current-link"
mv -Tf "$release/current-link" "$root/current"
REMOTE_SCRIPT

echo "Готово: $REMOTE:$RELEASE"
echo "Проверка цен: bun run check:prices"
echo "IndexNow (по желанию, после публикации статей): bun run indexnow"
