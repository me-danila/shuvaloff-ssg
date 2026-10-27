#!/usr/bin/env bash
# Единственный поддерживаемый способ деплоя. Голый rsync не использовать:
# он снесёт с прода PHP-модуль цен (см. README, «Deploy»).
set -euo pipefail

cd "$(dirname "$0")/.."

REMOTE=${REMOTE:-al.bgt}
SITE_DIR=${SITE_DIR:-'~/academia-shuvaloff.ru/public_html/'}
# Мастер-копия модуля цен: лежит ВНЕ public_html, поэтому --delete её не трогает.
MODULE_DIR=${MODULE_DIR:-'~/module-price-load-src/'}

bun run build

# Статика сайта. module-price-load исключён: он не собирается из out/.
# Чанки прошлых сборок (_next/static) не удаляем: браузер (Safari) может
# показать закешированный HTML со старыми именами чанков — при 404 JS не
# стартует, и форма TravelLine остаётся заглушкой. Чистим их ниже по возрасту.
rsync -az --delete --filter 'P _next/static/**' --exclude 'module-price-load/' \
    out/ "$REMOTE:$SITE_DIR"

# Чанки, которых нет в свежих сборках дольше 14 дней. rsync -a выставляет
# файлам текущей сборки mtime из out/, поэтому живые чанки сюда не попадают.
ssh "$REMOTE" "find ${SITE_DIR}_next/static -type f -mtime +14 -delete; \
find ${SITE_DIR}_next/static -mindepth 1 -type d -empty -delete"

# Код модуля цен. Без --delete: на сервере остаются api.json с ключом
# (его нет в git) и накопленный лог.
rsync -az --exclude 'cache/price.json' --exclude 'core/logs/log.txt' \
    server/module-price-load/ "$REMOTE:$MODULE_DIR"

# Разливаем модуль в public_html и сразу обновляем цены, не дожидаясь крона.
ssh "$REMOTE" "chmod +x ${MODULE_DIR}cron.sh && /bin/sh ${MODULE_DIR}cron.sh"

echo
echo "Готово. Проверка цен: bun run check:prices"
echo "IndexNow (по желанию, после публикации статей): bun run indexnow"
