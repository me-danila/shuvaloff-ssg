// Проверка, что живые цены TravelLine на проде не протухли.
// Запуск: bun run check:prices [https://другой-хост]
// Ненулевой код выхода = цены не обновляются (крон или деплой сломаны).

const ORIGIN = process.argv[2] ?? "https://academia-shuvaloff.ru";
const URL_PRICES = `${ORIGIN}/module-price-load/cache/price.json?t=${Date.now()}`;
const HOTEL_ID = "41018";
// Крон ходит в API раз в 4 часа; двойной запас, чтобы не ловить ложные тревоги.
const MAX_AGE_HOURS = 9;

const fail = (msg) => {
    console.error(`ПРОБЛЕМА: ${msg}`);
    process.exit(1);
};

const res = await fetch(URL_PRICES, { cache: "no-store" });
if (!res.ok) fail(`${URL_PRICES} отдаёт ${res.status}`);

const lastModified = res.headers.get("last-modified");
const ageHours = lastModified
    ? (Date.now() - Date.parse(lastModified)) / 3_600_000
    : null;

const data = await res.json();
const rooms = data[HOTEL_ID]?.rooms ?? {};
const prices = Object.entries(rooms)
    .map(([id, room]) => [id, room?.minPrice?.price?.RUB])
    .filter(([, rub]) => typeof rub === "number" && rub > 0);

if (prices.length === 0) fail(`в price.json нет цен для отеля ${HOTEL_ID}`);

console.log(`Отель ${HOTEL_ID}: ${prices.length} категорий с ценой`);
for (const [id, rub] of prices) console.log(`  ${id}: от ${rub} ₽`);
console.log(
    `Файл обновлён: ${lastModified ?? "неизвестно"}` +
        (ageHours === null ? "" : ` (${ageHours.toFixed(1)} ч назад)`),
);

if (ageHours !== null && ageHours > MAX_AGE_HOURS) {
    fail(
        `price.json не обновлялся ${ageHours.toFixed(1)} ч (норма — раз в 4 ч). ` +
            `Смотреть лог: ssh al.bgt 'tail ~/module-price-load-src/cron.log'`,
    );
}

console.log("OK: цены свежие.");
