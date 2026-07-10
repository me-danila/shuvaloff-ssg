# Аудит academia-shuvaloff.ru — план улучшений (автономный)

> Дата: 2026-07-10. Стек: Next.js 16.1.6 (`output: "export"`, SSG), React 19.2.3, Tailwind v4, framer-motion 12, lenis, next-image-export-optimizer, MDX-блог, Bun, Biome. i18n: ru (root) + en (`/en/*`). Дизайн v2 — в проде.

## ✅ Статус реализации (ветка `feat/audit-autonomous`, 2026-07-10)

Все автономные фазы реализованы и верифицированы (per-фаза: `bun lint` + `bun run build` 125/125 + `tsc --noEmit` + DOM/HTML-паритет; `bun test` 96/0). Итог vs `main`: **104 файла, +4559 / −1324**.

| Фаза | Статус | Пропущено (обоснованно) |
|---|---|---|
| **0** Быстрые победы | ✅ | Яндекс `package.map` — карта без `controls:[]` → package.map убрал бы видимые контролы (дизайн-регресс); нужен явный `controls`-список (дизайн-решение). |
| **1** Чистка v2 | ✅ | forceReload снят с `/subscriptions/`; **оставлен** на 4 `?cert-open` (виджет TravelLine читает param только при полной перезагрузке → машинерия остаётся). |
| **2** Производительность | ✅ | Дедуп шрифта Century Gothic (питает разные элементы, безопасно не убрать); Footer/Header→server (общий layout не знает локаль — нужна реструктуризация роутинга). Выгружены из клиента: AllServices ~60КБ, AllRooms ~54КБ, AllSales ~10КБ, smiData ~5КБ + fullDescription/amenities. |
| **3** a11y | ✅ | — (все пункты; `<html lang=en>` через post-build `scripts/fix-en-lang.mjs`). |
| **4** SEO | ✅ | og:title/description для статических EN-страниц (home) наследуются от layout — нужен per-page metadata (detail-маршруты + history + историч. люксы уже исправлены). Кастомные сервис-лендинги/list — дефолтный OG (не регресс). |
| **5** i18n RU-only | ✅ | — (RU_ONLY hreflang + x-default + переключатель; slug-паритет полный). |
| **9** GEO/AEO | ✅ | Всё из существующего контента; НЕ добавлены priceRange/starRating/aggregateRating/numberOfRooms/sameAs-URL (данные отеля → «Требуется от отеля»). |
| **6** Формы/безопасность | ✅ | — (валидация + Metrika-маскировка; утёкший скрипт удалён в Фазе 0). |
| **8** Юзабилити | ✅ | Button `<a>→Link` исключает external/#/TravelLine (cert-open/tl-booking-open — full-nav). |
| **7** DX | ✅ (частично) | Дедуп: 4 механические пары объединены (services/rooms/events `[slug]` + reviews, byte-identical). **Не тронуты** (не 1:1): `rooms/page` (dynamic-import + max-w drift), `history` (RU 38 vs EN 8 секций — контент), историч. люксы dashkova/shuvalov (инлайн не-1:1 копия + JSX-shape diff). |

Пре-существующие info-хинты `noUselessFragments` в `components/pages/HistoricalRoomsPage.tsx` (6 шт) оставлены: info-уровень (lint exit 0), фикс = схлопывание multi-line JSX→строка → риск исказить контент.

Разделы [«Требуется от отеля»](#требуется-от-отеля--вне-автономного-плана) и [«Вне scope — инфраструктура»](#вне-scope--инфраструктура-сервер) — НЕ трогались (по ограничениям).

## Принципы

1. **Только улучшать** — без компромиссов, деградации UI/UX, потери качества фото, риска сломать сторонние виджеты.
2. **Только уровень кода** — внутри репозитория приложения. Инфраструктура/сервер → раздел [«Вне scope»](#вне-scope--инфраструктура-сервер).
3. **Не менять дизайн** — никаких новых видимых блоков. GEO/AEO берём невидимым слоем + обогащением существующего контента.
4. **Не терять качество фото.**
5. **Только автономное** — в действия входит лишь то, что выполняется **без внешних данных, подключений и решений**. Всё, что «делается руками» (данные от отеля, эндпоинты, подтверждения) → [«Требуется от отеля»](#требуется-от-отеля--вне-автономного-плана).

### Треки риска

- 🟢 **A** — чистое улучшение, ноль риска для UI/UX.
- 🔵 **B** — рефакторинг: UI идентичен, нужна визуальная само-верификация затронутых экранов.

---

## Ключевой инсайт: локаль не определяется на сервере

`useLocale()` через `usePathname()` — клиентский хук ([lib/i18n/useLocale.ts](../lib/i18n/useLocale.ts)), в **28 файлах**. Следствия: 28 компонентов клиентские (в т.ч. `Footer`), данные `AllServices`(60 КБ)/`AllRooms`(56 КБ) в клиентском бандле; `<html lang="ru">` для всех; `og:locale=ru_RU` на en. Развязка — `locale` пропом от `page.tsx`. UI идентичен, меньше JS → 🔵 B.

---

## Фаза 0 — Быстрые победы (🟢)

| # | Задача | Файл | Эффект |
|---|---|---|---|
| 1 | `icon.svg` (755 КБ PNG-в-base64) → favicon 32×32 + apple-icon 180×180. **PNG 1662×1662 уже внутри `icon.svg` — извлеку и пересоберу, новый ассет не нужен** | [app/icon.svg](../app/icon.svg) | −750 КБ; фавикон визуально тот же |
| 2 | Яндекс.Карты `load=package.full` → `package.map` (проверено: только `Map`+`Placemark`) | [ContactsSection.tsx:160](../components/sections/ContactsSection.tsx) | −~1 МБ JS |
| 3 | `motion` → `m` в Header/Parallax (проверено: нет `layout`/`drag`) | [Header.tsx:9](../components/layout/Header.tsx), [Parallax.tsx:3](../components/ui/Parallax.tsx) | активирует `LazyMotion`, анимации идентичны |
| 4 | Аудит `sizes` у `ExportedImage` — нужное разрешение из srcset, не 1920px в мелкий контейнер | компоненты с hero/карточками | режет байты **без снижения quality** |
| 5 | Проверить `priority` на всех hero главной/лендингов (даёт preload+`fetchpriority`), где нет — добавить | hero-компоненты | быстрее LCP |
| 6 | `/smi/` в sitemap (ru+en) | [app/sitemap.ts:10-52](../app/sitemap.ts) | индексация выпавших страниц |
| 7 | `rel="noopener noreferrer"` внешним `target="_blank"` | ~15 файлов | tabnabbing + утечка Referer |
| 8 | Удалить `public/scripts/cfWorkersWeddingFormHandler.js` (раскрывает бэкенд формы) | public/scripts/ | −разведданные |

---

## Фаза 1 — Чистка после миграции на v2

1. 🟢 **Удалить 2 мёртвых файла** (0 ссылок, `SliderMobile` не осиротеет): [HistoricalMapSection.tsx](../components/sections/HistoricalMapSection.tsx), [DescriptionWithPictures.tsx](../components/sections/DescriptionWithPictures.tsx).
2. 🔵 **Убрать `forceReload`-механику**: 12 вхождений в [Header.tsx](../components/layout/Header.tsx) — мост v1/v2, теперь мёртв. Снять проп из типов (31,37,45,51,69), ветку (553), флаги (145,150,203,208,268,324). Затем `<a>`→`next/link` для этих внутренних ссылок → prefetch + client-навигация. **Само-верификация всех пунктов меню.**
3. 🟢 **Удалить закомментированный `handleSubmit`** [WeddingFormModal.tsx:105-108](../components/ui/modals/WeddingFormModal.tsx).
4. 🔵 **Консолидировать `imgObjectPosition` → `mediaObjectPosition`** (живой deprecated alias): 4 записи [data/SalesData.tsx:59,96,148,185](../data/SalesData.tsx), типы [SalesData.tsx:12](../data/SalesData.tsx)/[EventsData.tsx:19](../data/EventsData.tsx), потребители ([CardEvent.tsx:29](../components/ui/CardEvent.tsx), [SalesGrid.tsx:77](../components/ui/grids/SalesGrid.tsx), [SpecialOffersSection.tsx:174](../components/sections/SpecialOffersSection.tsx), [events/[slug]/page.tsx:74](../app/events/[slug]/page.tsx)), затем удалить алиас [ui/grids/SpecialOffersSection.tsx:16-20](../components/ui/grids/SpecialOffersSection.tsx).
5. 🟢 **Развести коллизию имён `SpecialOffersSection`**: [sections/](../components/sections/SpecialOffersSection.tsx) (HomePage) vs [ui/grids/](../components/ui/grids/SpecialOffersSection.tsx) (BoatTours) — переименовать один (напр. `OffersGrid`).

---

## Фаза 2 — Производительность

1. 🔵 **Локаль пропом вместо `useLocale()`** (keystone): серверными станут `Footer`, `ServicesGrid`/`SalesGrid`/`SmiGrid`; данные уйдут из клиента. Инкрементально, с само-верификацией. [lib/i18n/useLocale.ts](../lib/i18n/useLocale.ts) + 28 потребителей.
2. 🔵 **`fullDescription: ReactNode`** вынести из data-`.tsx` в модуль, подгружаемый только на детальных страницах → JSX всех номеров/услуг не в клиент списков. [RoomsData.tsx](../data/RoomsData.tsx), [ServicesData.tsx](../data/ServicesData.tsx).
3. 🔵 **Дубль-загрузка шрифтов — только не-визуальная часть**: убрать дублирующую сетевую загрузку **того шрифта, что реально рендерится** (`next/font/local` vs ручной `@font-face` Century Gothic), `preload:false` декоративному Alistair (52 КБ). **Видимое начертание не менять** — переменные `@theme`, влияющие на рендер, не трогать (тот кейс требует подтверждения → вынесен). [app/layout.tsx:40-60](../app/layout.tsx), [app/globals.css:82-102](../app/globals.css).
4. 🔵 **`next/dynamic`** для того, что и так не в первом HTML: модалки (`ssr:false`), `EventsCalendar`, слайдеры-по-клику. Контентные секции `ssr:false` **не** оборачивать.
5. 🔵 `useMediaQuery`: убрать `matches` из deps → уходит переподписка и двойной рендер/CLS. [hooks/useMediaQuery.ts:5-19](../hooks/useMediaQuery.ts).
6. 🔵 **`content-visibility: auto`** длинным секциям ниже сгиба (сильнее всего [history/page.tsx](../app/history/page.tsx) — 38 секций), с корректным `contain-intrinsic-size` (само-тест на прыжок скролла).

---

## Фаза 3 — Доступность (a11y) — все 🟢

1. **Модалки**: Esc, фокус-трап, возврат фокуса, `aria-labelledby`, `aria-label` кнопке «✕». [Modal.tsx](../components/ui/Modal.tsx).
2. **Клавиатурная навигация десктоп-меню**: `group-focus-within` / `aria-expanded`+`aria-controls`. [Header.tsx:904-921,651-665](../components/layout/Header.tsx).
3. **`<html lang>` для en**: пост-билд скрипт `scripts/fix-en-lang.mjs` в `build`, правит `lang`+`og:locale` в `out/en/**/*.html`. (Или через en-metadata слой, Фаза 4 #1.)
4. `<label>`/`aria-label` полям форм; `role="alert"`/`aria-live` статусам; `focus-visible:ring` (сейчас `outline-none` в Footer); **`prefers-reduced-motion`** для framer+Lenis+marquee. [WeddingFormModal.tsx](../components/ui/modals/WeddingFormModal.tsx), [Footer.tsx:92,110,192](../components/layout/Footer.tsx), [SmoothScroll.tsx](../components/ui/SmoothScroll.tsx), [Motion.tsx](../components/ui/Motion.tsx).
5. skip-link к main; локализовать `aria-label` календаря; `alt` логотипам СМИ.

---

## Фаза 4 — SEO — все 🟢

1. **`og:locale` + `WebSite.inLanguage` для en** (заодно `<html lang>`). [app/layout.tsx:89-92,135](../app/layout.tsx).
2. **Per-page OG-образы** из **существующих** `room.gallery`/`service.imgUrl`/`event.imgUrl` в `openGraph.images`.
3. **`policy`/`legal` canonical/hreflang** — через Фазу 5.
4. **`x-default` в hreflang** + проверить паритет slug-ов ru/en. [lib/i18n/metadata.ts](../lib/i18n/metadata.ts).
5. **`lastModified` в sitemap** из git/MDX-frontmatter.

---

## Фаза 5 — i18n для RU-only страниц (🟢)

`/blog/*`, `/policy/`, `/legal/` — только русский. Фикс битого hreflang + переключатель на `/en/` (home) вместо 404:

```ts
// lib/i18n/routing.tsx
export const RU_ONLY_SEGMENTS = ["/blog", "/policy", "/legal"] as const;
export const hasEnglishVersion = (path: string): boolean => {
    const p = stripLocalePrefix(normalizePath(path));
    return !RU_ONLY_SEGMENTS.some((seg) => p === seg || p.startsWith(`${seg}/`));
};
```

```ts
// lib/i18n/metadata.ts — getLocaleAlternates
const ruPath = withTrailingSlash(stripLocalePrefix(normalizePath(path)));
if (!hasEnglishVersion(ruPath)) {
    return { canonical: ruPath, languages: { ru: ruPath, "x-default": ruPath } };
}
const enPath = ruPath === "/" ? "/en/" : `/en${ruPath}`;
return { canonical: locale === "en" ? enPath : ruPath,
         languages: { ru: ruPath, en: enPath, "x-default": ruPath } };
```

```tsx
// Header — переключатель языка
const enHref = hasEnglishVersion(pathname) ? localizeHref(pathname, "en") : "/en/";
```

---

## Фаза 6 — Формы и безопасность на уровне кода (🟢)

1. **Клиентская валидация формы** [WeddingFormModal.tsx](../components/ui/modals/WeddingFormModal.tsx): формат email/телефона, trim, лимит длины, состояния успех/ошибка через `role="alert"` (a11y #4). Улучшает UX + режет мусорные заявки.
2. **Маскировать поля с ПДн для вебвизора Метрики** — классы/атрибуты исключения на инпуты имени/телефона/email/telegram. Только разметка.
3. Удаление утёкшего скрипта — Фаза 0 #8.

---

## Фаза 7 — DX

1. 🔵 **Дедупликация 8 пар ru/en-страниц** к паттерну «тонкий `page.tsx` → `components/pages/XPage.tsx(locale)` + `copyByLocale`». **Структурно, ноль потери контента** — существующие тексты сохраняем как есть (дописывание недостающего EN-перевода истории = контент → вынесено). `[slug]`-страницы объединяются механически. [app/history](../app/history/page.tsx), `app/rooms/historical/*`, `app/{rooms,reviews}/page.tsx`, `app/{services,rooms,events}/[slug]/page.tsx`.
2. 🟢 **README + CLAUDE.md** под реальный стек (Bun/Biome/i18n/SSG/Docker).
3. 🟢 **Тесты** (чистые функции): `lib/i18n/routing` (`localizeHref`/`stripLocalePrefix`/`hasEnglishVersion`), `lib/i18n/metadata`, [lib/seo/schema.ts](../lib/seo/schema.ts), инвариант «RU-slug ↔ EN-slug».
4. 🟢 pre-commit хук (lefthook/husky + `biome check`). 🔵 вынести захардкоженные телефон (беру канонический формат) и ссылку заказа `max.ru/u/f9LHodD0` (в 6 файлах) в [lib/seo/site.ts](../lib/seo/site.ts).

---

## Фаза 8 — Юзабилити (🟢)

1. `/reviews` → `/reviews/` (несогласованный trailing slash → редирект/404). [Header.tsx:282,341](../components/layout/Header.tsx).
2. **booking-виджет TravelLine — скелетон/ошибка загрузки** (только добавляет состояние). [BookingForm.tsx](../components/BookingForm.tsx).
3. **`<a>`→`next/link`** для внутренних ссылок ([Button.tsx:66-76](../components/ui/Button.tsx)) — после снятия `forceReload` (Фаза 1) чистый выигрыш: prefetch + client-навигация.

---

## Фаза 9 — SEO / GEO / AEO (🟢, невидимый слой, автономное)

Всё — JSON-LD/meta/robots/llms, вне видимого DOM, из **существующего** контента.

**Schema.org (из имеющихся данных):**
1. **`Hotel`** ([schema.ts:66](../lib/seo/schema.ts)): `currenciesAccepted: "RUB"`, `image` массивом (из существующих галерей), `hasMap` (Яндекс-URL, собранный из `HOTEL_GEO`).
2. **`LandmarksOrHistoricalBuildings`/`TouristAttraction`** для особняка/исторических люксов из существующих `name`/`address`/`geo`/history-текста → heritage-сигнал для GEO.
3. **`Article` на history** ([schema.ts:536](../lib/seo/schema.ts)): `datePublished`/`dateModified` (из git), `image` (существующий).
4. **`dateModified`/`lastReviewed`** на ключевых `WebPage` (из git).

**AEO/мета:**
5. **`SpeakableSpecification`** на главной/history — указывает на существующие заголовок/лид.
6. **`metadata.robots`**: `max-image-preview: "large"`, `max-snippet: -1`, `max-video-preview: -1`.
7. **Обогащение `description`/`about`** в schema и meta из существующего текста страниц.

**GEO/краулеры:**
8. **`robots.ts`**: явные `allow` для AI-ботов (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Perplexity-User`, `Google-Extended`, `Applebot-Extended`, `CCBot`, `Amazonbot`, `Bytespider`, `meta-externalagent`, `YandexBot`). [app/robots.ts](../app/robots.ts).
9. **`llms-full.txt`** (новый route) из существующих описаний номеров/услуг/истории + английская версия. Без цен (нет данных).
10. **NAP-консистентность**: телефон в едином формате (Фаза 7 #4) в schema/текст/llms.

> Исключено: `FAQPage` (нужен видимый FAQ-блок → дизайн), «ответ-первый абзац», related-posts.

---

## Рекомендованный порядок

1. **Фаза 0** — быстрые победы.
2. **Фаза 1** — чистка v2 (разблокирует `next/link`).
3. **Фаза 2 #1** — локаль-проп рефактор.
4. **Фаза 3** — a11y.
5. **Фаза 4 + 5 + 9** — SEO/GEO/AEO (аддитивно, невидимо).
6. **Фаза 6 + 8** — формы/юзабилити.
7. **Фаза 7** — дедуп, README, тесты.

---

## Требуется от отеля — вне автономного плана

Ценно для 10/10, но **не выполняется автономно** — нужны данные/решения. Как только будут — код готов принять (дизайн не тронет).

**Данные:**
- [ ] Цены номеров (хотя бы «от N ₽») → `HotelRoom` `Offer` + `Hotel` `priceRange`.
- [ ] Рейтинг + кол-во отзывов → `aggregateRating`/`Review` (звёзды в выдаче).
- [ ] Звёздность + кол-во номеров → `Hotel` `starRating`/`numberOfRooms`.
- [ ] URL профилей: Wikidata/Wikipedia особняка, Яндекс.Карты, 2ГИС, Booking/Ostrovok → `sameAs` (сильнейший GEO-сигнал; угадывать нельзя).
- [ ] Данные ресторана: кухня, часы, меню-URL → `Restaurant` schema.
- [ ] Автор блога: имя, bio, фото, соцпрофиль → E-E-A-T `Person`.
- [ ] Ресепшн 24/7? Способы оплаты? → `openingHoursSpecification`, `paymentAccepted`.
- [ ] EN-перевод недостающих секций `history` (RU 38 секций vs EN 8) → контент-паритет.

**Подключение:**
- [ ] Эндпоинт форм рассылки (сервис/воркер) → оживить 3 формы-заглушки в Footer.

**Подтверждение «да/нет» (дизайн-намерение):**
- [ ] CTA «Забронировать» скрыт до скролла — так задумано?
- [ ] `beauty-bar` (slug закомментирован) — публиковать в каталог/sitemap?
- [ ] Шрифт History Pro: если сейчас фолбэк на serif — чинить до правильного начертания? (покажу до/после)

---

## Вне scope — инфраструктура / сервер

`output: "export"` **игнорирует** `next.config` `headers()`/`redirects()` — задаётся только в слое доставки. Приложение свою половину выполняет (контент-хешированные имена файлов).

- **Security-заголовки + CSP** (nginx/Caddy/CDN; `busybox httpd` не умеет). CSP — через Report-Only→enforce.
- **Кэш-заголовки** (`immutable` для `/_next/static`,`/nextImageExportOptimizer`,`/fonts`; `must-revalidate` для HTML; ETag).
- **Компрессия** brotli/gzip (сейчас нет).
- **CDN** (Cloudflare) — кэш+brotli+HTTP/3+заголовки одним шагом. Сначала проверить, что уже в проде (`*.workers.dev` намекает на CF).
- **Защита формы на воркере**: rate-limit, экранирование Telegram-полей, убрать клиентский `X-Form-Secret`.
- **Docker** `USER nobody`; смена `busybox` на `nginx-alpine`.
- **Яндекс.Карты**: доменная привязка ключа в консоли.
- **nginx** `error_page 404 /404.html`.
