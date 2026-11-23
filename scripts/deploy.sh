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
STAGING=$(ssh "$REMOTE" "mktemp -d '$SITE_ROOT/incoming-$(date -u +%Y%m%dT%H%M%SZ)-XXXXXX'")
[[ "$STAGING" =~ ^"$SITE_ROOT"/incoming-[0-9]{8}T[0-9]{6}Z-[a-zA-Z0-9]{6}$ ]]
cleanup_upload() { ssh "$REMOTE" "rm -rf --one-file-system -- '$STAGING'"; }
trap cleanup_upload EXIT
RELEASE="$SITE_ROOT/releases/release-${STAGING##*/incoming-}"

rsync -az --exclude 'module-price-load/' out/ "$REMOTE:$STAGING/"
ssh "$REMOTE" bash -s -- "$SITE_ROOT" "$PREVIOUS" "$STAGING" "$RELEASE" <<'REMOTE_SCRIPT'
set -euo pipefail
root=$1
previous=$2
staging=$3
release=$4
exec 9>"$root/deploy.lock"
flock -x 9
if [[ "$(readlink -f "$root/current")" != "$previous" ]]; then
    echo 'За время загрузки опубликован другой релиз. Повторите деплой.' >&2
    exit 1
fi
test -s "$staging/index.html"
test -s "$staging/404.html"
test ! -e "$release"
test ! -L "$release"
history="$root/published-releases"
published=()
if [[ -f "$history" ]]; then
    mapfile -t published < "$history"
fi
for name in "${published[@]}" "$(basename "$previous")" "$(basename "$release")"; do
    [[ "$name" =~ ^[[:alnum:]][[:alnum:]_-]*$ ]]
done
[[ "$previous" == "$root/releases/$(basename "$previous")" ]]

# Сохраняем чанки прошлых сборок: браузер (Safari) может показать
# закешированный HTML со старыми именами файлов. Свежие чанки не заменяем.
if [[ -d "$previous/_next/static" ]]; then
    mkdir -p "$staging/_next/static"
    rsync -a --ignore-existing "$previous/_next/static/" "$staging/_next/static/"
fi
chmod 755 "$staging"
mv -T "$staging" "$release"
ln -s "$release" "$release/current-link"
mv -Tf "$release/current-link" "$root/current"

# Проверяем, что именно новая сборка доступна через HTTPS на этом сервере.
if ! curl --fail --silent --show-error --max-time 15 --retry 1 \
    --resolve academia-shuvaloff.ru:443:127.0.0.1 https://academia-shuvaloff.ru/ \
    | cmp -s - "$release/index.html"; then
    ln -s "$previous" "$release/current-link"
    mv -Tf "$release/current-link" "$root/current"
    mv -T "$release" "$staging"
    echo 'Проверка главной не прошла. Восстановлен предыдущий релиз.' >&2
    exit 1
fi

# В истории только опубликованные каталоги. Порядок сохраняется и после отката.
keep=( "${release##*/}" "${previous##*/}" )
for name in "${published[@]}"; do
    [[ " ${keep[*]} " == *" $name "* ]] && continue
    [[ -d "$root/releases/$name" ]] || continue
    if (( ${#keep[@]} < 3 )); then
        keep+=( "$name" )
    else
        rm -rf --one-file-system -- "$root/releases/$name"
    fi
done
printf '%s\n' "${keep[@]}" > "$history.next"
mv -Tf "$history.next" "$history"
REMOTE_SCRIPT

echo "Готово: $REMOTE:$RELEASE"
echo "Проверка цен: bun run check:prices"
echo "IndexNow (по желанию, после публикации статей): bun run indexnow"
