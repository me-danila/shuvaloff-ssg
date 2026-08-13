#!/bin/sh
# module-price-load: обновление цен TravelLine + самовосстановление модуля.
#
# Живёт на проде в ~/module-price-load-src/cron.sh (мастер-копия модуля вне
# public_html, поэтому rsync --delete до неё не дотягивается). В репозитории —
# ради версионирования; на сервер заливается вручную, см. README «Deploy».
#
# Запуск из планировщика BeGet:
#   /bin/sh /home/d/dorofegk/module-price-load-src/cron.sh              # раз в 4 часа
#   /bin/sh /home/d/dorofegk/module-price-load-src/cron.sh --heal-only  # раз в час
#
# Вывод всегда пустой и код выхода всегда 0 — чтобы планировщик не слал письма;
# всё пишется в cron.log рядом со скриптом. Проверка снаружи: bun run check:prices.

set -u

SRC=$(cd "$(dirname "$0")" && pwd)
SITE="$HOME/academia-shuvaloff.ru/public_html/module-price-load"
PHP=/usr/local/bin/php8.3
LOG="$SRC/cron.log"

log() { echo "$(date '+%Y-%m-%d %H:%M:%S') $*" >>"$LOG"; }

# Лог не должен расти бесконечно: держим последние 500 строк.
rotate_log() {
    [ -f "$LOG" ] || return 0
    [ "$(wc -c <"$LOG")" -lt 524288 ] && return 0
    tail -n 500 "$LOG" >"$LOG.tmp" && mv "$LOG.tmp" "$LOG"
}

# Восстановление рабочей копии из мастера. Без --delete: чужие файлы в
# public_html не трогаем. price.json исключён — на проде он свежее мастера.
heal() {
    mkdir -p "$SITE"
    chmod 755 "$SITE"
    if rsync -a --exclude 'cache/price.json' --exclude 'cron.sh' \
        --exclude 'cron.log' --exclude '*.md' --exclude 'changes.txt' \
        "$SRC/" "$SITE/"; then
        [ -f "$SITE/cache/price.json" ] || cp "$SRC/cache/price.json" \
            "$SITE/cache/price.json" 2>/dev/null
        return 0
    fi
    log "heal: rsync FAILED"
    return 1
}

# Свежий price.json кладём в мастер: если rsync --delete снесёт рабочую копию,
# восстановление отдаст последний известный снимок, а не снимок годовой давности.
backup_prices() {
    prices="$SITE/cache/price.json"
    [ -s "$prices" ] || return 0
    head -c 1 "$prices" | grep -q '{' || {
        log "backup: price.json не похож на JSON, пропуск"
        return 0
    }
    cp "$prices" "$SRC/cache/price.json"
}

rotate_log

# Перед лечением фиксируем, что именно было сломано, — иначе тихое
# восстановление после кривого деплоя не оставит следов в логе.
[ -f "$SITE/core/execute.php" ] || log "heal: core/execute.php отсутствовал"
[ -f "$SITE/assets/public/price-autoload.js" ] ||
    log "heal: assets/public/price-autoload.js отсутствовал"

heal

if [ "${1:-}" = "--heal-only" ]; then
    exit 0
fi

if [ ! -f "$SITE/core/execute.php" ]; then
    log "update: core/execute.php нет ни в рабочей копии, ни в мастере — пропуск"
    exit 0
fi

prices="$SITE/cache/price.json"
before=$([ -f "$prices" ] && stat -c %Y "$prices" 2>/dev/null || echo 0)

out=$("$PHP" "$SITE/core/execute.php" 2>&1)
code=$?
if [ $code -ne 0 ]; then
    log "update: execute.php exit=$code ${out:-(без вывода)}"
    exit 0
fi

after=$([ -f "$prices" ] && stat -c %Y "$prices" 2>/dev/null || echo 0)
if [ "$after" = "$before" ]; then
    # Модуль не ходит в API, пока price.json моложе 50 минут
    # (MIN_CACHE_TIME_MINUTES) — при часовом запуске это норма, не сбой.
    log "update: пропуск, цены моложе 50 мин"
    exit 0
fi

backup_prices
log "update: ok, price.json $(wc -c <"$prices" | tr -d ' ') байт"
exit 0
