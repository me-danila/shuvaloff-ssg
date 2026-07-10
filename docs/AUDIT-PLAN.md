# Аудит academia-shuvaloff.ru — план v2 (повторный, 2026-07-10)

> Стек: Next.js 16.1.6 (`output: "export"`, SSG, `trailingSlash:true`), React 19.2.3,
> Tailwind v4 (`@theme` в CSS), framer-motion 12, lenis, next-image-export-optimizer,
> MDX-блог, Bun, Biome. i18n: ru (корень) + en (`/en/*`). Дизайн v2 — в проде.
>
> Это **повторный** аудит поверх ветки `feat/audit-autonomous` (первая волна фаз 0–9
> реализована). Находки перепроверены против исходников **и собранного `out/`**
> тремя параллельными агентами (perf / SEO-GEO-AEO / DX) + ручной верификацией.

## ✅ Статус реализации (ветка `feat/audit-autonomous`, 2026-07-11)

Выполнено и верифицировано пофазно (`bun run fix` + `tsc --noEmit` + `bun test` 96/0 + `bun run build` 117 стр. + browser-preview `out/` через ssg-preview). Итоговый build зелёный; сквозная проверка сайта чистая (0 error-маркеров, 0 битых href, все h1 на месте, JSON-LD валиден на всех проверенных страницах, консоль без hydration-ошибок).

| Пункт | Статус | Проверка |
|---|---|---|
| **P0** SEO-1 (7 битых canonical) | ✅ | canonical `/subscriptions/`,`/rewards/referral/`,`/services/boat-tours/` верны; EN a-breakfast → `en` |
| **P-1** LCP-герой `opacity:0`→видим + `fetchpriority=high` | ✅ | `<img>` без opacity-гейта в `out/`; hero виден на скрине |
| **P-2** Header CSR-bailout (`useSearchParams`) | ✅ | `<header>` в статическом HTML, `BAILOUT`=0 |
| **P-3/P-4** дедуп Century Gothic (single `next/font`) | ✅ | 0 ручных `/fonts/CenturyGothic` в CSS |
| **P-5** Яндекс.Карты `package.full`→`package.map` | ✅ | код |
| **P-6** lenis `next/dynamic` (не грузить на mobile/RM) | ✅ | отдельный чанк |
| **P-7** phosphor barrel→`/dist/ssr` (Header +3) | ✅ | код |
| **P-9** `fetchpriority=high` на LCP | ✅ | в составе P-1 |
| **SEO-2** per-page OG (49 стр. → `buildPageMetadata`) | ✅ | EN OG теперь EN + `og:url`; `fix-en-lang og:locale`=0; canonical-паритет (пустой diff) |
| **SEO-3** WebPage+BreadcrumbList JSON-LD (14 стр.) | ✅ | census `@type` верный, глубина крошек верна |
| **SEO-4** Organization/Hotel обогащение (legalName/taxID/contactPoint/ReserveAction) | ✅ | JSON-LD валиден |
| **SEO-5** sitemap `images` (441 запись) | ✅ | `out/sitemap.xml` |
| **SEO-6** llms.txt EN-блок + llms-full | ✅ | `out/llms.txt` |
| **DX-2** дедуп `rooms/page` (max-w дрейф, `dynamic`, мёртвый `<div/>`) | ✅ | EN intro теперь `max-w-3xl` |
| **DX-1** дедуп историч. люксов (4 файла → 1 `HistoricalSuitePage` + `HistoricalSuites.tsx`) | ✅ | DOM-паритет, 0 `&nbsp;`/`[object]` утечек |
| **DX-3** дедуп history + полный EN-перевод 38 секций (`HistoryPage` + `HistoryContent.tsx`) | ✅ | RU видимая проза byte-identical (мультимножество 1742 токена); EN 8→38 секций |
| **DX-6** мёртвый экспорт `getEventOccurrences` | ✅ | 0 ссылок |
| **DX-7** tsconfig `ES2022` + `typecheck`-скрипт | ✅ | (`allowJs` Next авто-возвращает) |
| чистка `HistoricalRoomsPage` `biome-ignore` (noArrayIndexKey) | ✅ | 0 biome-ignore в first-party коде |

**Отложено (по решению владельца — выгода уже взята SEO-2):**
- **DX-5 / Вопрос 2** — реструктуризация layout (route-group `app/(ru)/` + `app/en/layout`). Главная цель (нативный EN OpenGraph) достигнута через SEO-2 (`fix-en-lang og:locale`=0). Остаток (удалить `HtmlLangSync`, ужать `fix-en-lang.mjs` до html-lang/inLanguage, серверизовать `SkipLink`) — высокий риск переноса ~40 файлов ради умеренной пользы. Способ задокументирован в [Вопрос 2](#q-layout), готов к выполнению.
- **DX-4** — locale-проп вместо `useLocale`. Завязан на DX-5: без реструктуризации целевые компоненты всё равно остаются клиентскими (динамическая локаль 404 / клиентские родители с framer). Отложен вместе с DX-5.

**Пропущено осознанно (обоснованно):**
- **P-8** webvisor Метрики — продуктовое решение отеля (запись сессий), не автономный перф.
- **P-10** `useMediaQuery` lazy-init — текущий паттерн (init `false`→effect) SSR-корректен; «фикс» дал бы hydration-mismatch.
- **P-11** `BookingFormResponsive` CSS-swap — JS mount-swap намеренный: гарантирует единственный `#tl-search-form` в DOM; CSS `hidden` держал бы два контейнера → TravelLine ломается.

**Найдено попутно (пред-существующее, НЕ регресс — на решение отеля):**
- EN-главная показывает русский hero-`<h1>` «Отдых с графским размахом» (захардкожен в `HomePage.tsx`, не локализован).
- RU-опечатки в исходном контенте сохранены дословно (правило «не чинить русские строки»): `11108 году` (HistoricalSuites), `Путешствие` (history metadata.description), стрелочный `t`, `Особнняка`, разорванные переносами слова, дублирующийся абзац в `mansionSpirit` (history).

---

## Легенда

- **Приоритет:** 🔴 P0 (баг / активный вред) · 🟠 P1 (высокая отдача) · 🟡 P2 (заметно) · 🟢 P3 (полировка).
- **Риск для UI:** 🅐 чистое улучшение, ноль риска · 🅑 рефактор — UI идентичен, нужна визуальная само-верификация.
- **Данные:** ⚙️ автономно (из существующего) · 🏨 нужны данные/решение отеля.

## Принципы (без изменений)

1. Только улучшать. Без деградации UI/UX, потери качества фото, риска сломать сторонние виджеты (TravelLine, Яндекс.Карты, Метрика, HotBot).
2. Только уровень кода в репозитории. Инфраструктура/сервер → раздел «Вне scope».
3. Не менять дизайн. GEO/AEO — невидимым слоем + обогащением существующего контента.

---

## 0. Корректировки прошлого плана (важно для доверия)

Повторная проверка нашла расхождения между «✅ done» в прошлом плане и фактическим кодом:

| Что | Прошлый статус | Факт сейчас | Действие |
|---|---|---|---|
| Яндекс.Карты `package.full → package.map` | ✅ (Фаза 0 #2) | **НЕ применено:** `ContactsSection.tsx:160` всё ещё `load=package.full` | Переоткрыть → [P-5](#perf) |
| Коллизия имён `SpecialOffersSection` | Запланировано (Фаза 1 #5) | **Коллизии нет** — единственный экспорт с этим именем; есть 3 *разных* рендерера офферов (`SpecialOffersSection`/`OffersGrid`/`SalesGrid`), каждый со своим UX | Снять пункт; консолидация — только опционально |
| Canonical/hreflang паритет slug ru/en | ✅ (Фаза 5) | **7 битых canonical** (см. [SEO-1](#seo)) — старые slug'и в `getLocaleAlternates` не обновлены после переименования роутов | Переоткрыть, P0 |
| «Дедуп историч. люксов невозможен (не 1:1)» | Пропущено (Фаза 7) | **Унифицируемо:** `diff` показывает byte-identical структуру, расходятся только строки + 2 косметических `<br>` | Сделать → [DX-1](#dx) |

**Вывод:** первая волна закрыла ~90%, но осталась группа пред-существующих багов (canonical, LCP, CSR-bailout хедера), которых старый план не заметил, плюс три спорных пункта, теперь разобранных до конца.

---

<a id="perf"></a>
## 1. Производительность / Core Web Vitals

Замер собранного `out/`: first-load JS главной ≈ **781 КБ raw / 243 КБ gzip (14 чанков)**; `/policy/`
тянет **13 из 14** тех же чанков — тяжёлый клиентский рантайм грузится на каждом маршруте.

| # | Приоритет · риск | Находка | Где | Эффект |
|---|---|---|---|---|
| **P-1** | 🔴 🅑 | **LCP-герой рендерится с `opacity:0`.** `<Image priority>` и `<h1>` обёрнуты в `<FadeIn>` (`initial:{opacity:0}`); в `out/index.html` LCP-`<img>` стоит с `style="opacity:0"` и проявляется только после гидратации framer (fade 0.9с). Preload + `priority` обесценены — LCP ждёт JS. 49 `opacity:0` в HTML главной. | `HomePage.tsx:411,457`; корень `Motion.tsx:29,57` | LCP (крупно), FCP — на **всех** hero |
| **P-2** | 🟠 🅑 | **Header выпадает из статического HTML (CSR-bailout).** `useSearchParams()` (нужен только для склейки `?cert-open`) уводит весь хедер в client-only: в `out/index.html` **ноль `<header>`** и 1 `BAILOUT_TO_CLIENT_SIDE_RENDERING`. Навигация/лого/телефон появляются после гидратации. | `Header.tsx:458` (потребитель `?cert-open` :146,203,267,323); тот же паттерн `GeniusLink.tsx` | TBT, поздняя отрисовка nav |
| **P-3** | 🟠 🅐 | **Century Gothic качается дважды** (см. [подробный разбор ниже](#q-fonts)) — `next/font` + ручной `@font-face` на те же 3 woff2; основной `body`-текст берёт не-preload-копию. | `layout.tsx:42-62` + `globals.css:97-117,18` | ~180 КБ лишних байт + FOUT/CLS не-v2 текста |
| **P-4** | 🟡 🅐 | **Preload 5 шрифтов на каждом маршруте**, при этом Italic Century и History-Bold почти никогда не над сгибом, а hero-`<h1>` использует **Alistair с `preload:false`** → поздний swap заголовка над сгибом. | `layout.tsx:18-62`; hero `HomePage.tsx:458` | LCP (борьба за канал) + CLS заголовка |
| **P-5** | 🟡 🅐 | **Яндекс.Карты `package.full`** — используются только `Map`+`Placemark`, покрываются `package.map`. Lazy по IO, но тяжёлый INP/CPU-спайк при подъезде к контактам. | `ContactsSection.tsx:160` | INP/TBT + ~1 МБ JS |
| **P-6** | 🟡 🅑 | **framer + lenis (106 КБ/32 gz) на каждом маршруте; lenis импортируется статически** хотя работает только на desktop + без reduced-motion. Простые legal/MDX-страницы платят за весь рантайм. | `SmoothScroll.tsx:3,48`; `layout.tsx:4,150` | TBT / first-load JS |
| **P-7** | 🟢 🅐 | **Phosphor barrel-импорт в always-mounted Header** (`@phosphor-icons/react` вместо `/dist/ssr`) → рантайм иконок в общем бандле. 12 файлов уже на `/dist/ssr`, 4 — нет. | `Header.tsx:3-8`, `ReviewsWidgetToggle.tsx:3`, `TransportSlider.tsx:3`, `ConciergePage.tsx:3` | TBT / общий бандл |
| **P-8** | 🟢 🅐 | `metrika.js` c `webvisor:true`+`clickmap:true` (запись сессий, тяжёлый INP); `calltracking.js` — `afterInteractive` **и** `<link rel=preload as=script>` в head → грузится рано, конкурирует с гидратацией. | `layout.tsx:144-148`; `public/scripts/*` | INP + ранняя конкуренция |
| **P-9** | 🟢 🅐 | `priority`-hero **не эмитит `fetchpriority="high"`** — кастомный лоадер не пробрасывает. Единственный `fetchPriority` в HTML — `low` на скрипте. | `OptimizedImage.tsx`; hero `HomePage.tsx:415` | LCP (мелко, перекрыт P-1) |
| **P-10** | 🟢 🅑 | `useMediaQuery` инициализируется `false` → двойной рендер в always-mounted `SmoothScroll`/`Parallax`/`Header`/`BookingFormResponsive`; отложенные desktop-эффекты. | `hooks/useMediaQuery.ts:6-17` | мелкий INP/гидратация |
| **P-11** | 🟢 🅑 | `BookingFormResponsive` меняет desktop/mobile через JS-mount-swap → на мобиле форма «переезжает» из hero вниз после гидратации (риск CLS, смягчён `min-h`). Лучше CSS `hidden/xl:block`. | `BookingFormResponsive.tsx:7-37`; `HomePage.tsx:463` | возможный CLS на мобиле |

**Порядок:** P-1 и P-3 первыми (максимальный CWV-выигрыш, риск низкий, подтверждено в `out/`), затем P-2, P-4, P-5, P-6.

---

<a id="seo"></a>
## 2. SEO / GEO / AEO

Всё проверено против собранного `out/` (не только исходники).

| # | Приоритет · данные | Находка | Где |
|---|---|---|---|
| **SEO-1** | 🔴 ⚙️ | **7 битых canonical/hreflang — активный риск деиндексации.** (a) EN aristocratic-breakfast само-канонизируется на **RU**-URL (`getLocaleAlternates(..., "ru")` на EN-странице). (b) 3 пары (subscriptions, rewards/referral, services/boat-tours) передают **старые slug'и** (`/abonements/`, `/referral/`, `/boat-tours/`) — таких директорий в `out/` **нет**: страница канонизируется на 404, все ru/en/x-default hreflang → 404, а `sitemap.ts` указывает правильные URL → противоречивые сигналы. | EN a-breakfast `page.tsx:9`; `subscriptions/page.tsx:9` (+en); `rewards/referral/page.tsx:9` (+en); `services/boat-tours/page.tsx:9` (+en) |
| **SEO-2** | 🟠 ⚙️ | **~50 статических страниц наследуют RU-boilerplate OG/Twitter.** Только detail-маршруты + blog-index зовут `buildPageMetadata`. Остальные (все статические RU **и EN**) задают лишь title/description → наследуют `openGraph` из layout: у EN-страниц `og:title`/`description`/`site_name`/`twitter:*` — **по-русски**, а `og:url` **отсутствует везде**. `fix-en-lang.mjs` правит только `og:locale`. | статические `page.tsx`; дефолты `layout.tsx:94-117`; помощник `metadata.ts:61` |
| **SEO-3** | 🟠 ⚙️ | **BreadcrumbList + WebPage JSON-LD отсутствует на ~15 маршрутах ×2 локали:** `/booking/`, `/reviews/`, `/smi/`, `/aristocratic-spb/`, `/rewards/`, `/rewards/referral/`, `/run/`, `/sales/aeroflot/`, `/events/` (индекс), services `/boat-tours/`,`/concierge/`,`/transfer/`,`/beauty-bar/`,`/aristocratic-breakfast/`. При этом `/services/pets/` схему эмитит → непоследовательно. `/events/` индекс может переиспользовать `buildCollectionPageSchema` (как `/rooms/`). | компоненты страниц; `schema.ts` |
| **SEO-4** | 🟡 ⚙️ | **Schema-обогащение из имеющихся данных:** `HOTEL_LEGAL` (`site.ts:62-66`: `legalName`/`taxID`/`vatID`) **объявлен, но нигде не используется**; Organization-нода без `legalName`/`address`/`contactPoint`. Hotel-нода без `contactPoint`, без hotel-уровня `potentialAction`. `image`-массивы Hotel/landmark — голые строки, а не `ImageObject` (у `BlogPosting` уже `ImageObject` → непоследовательно). | `schema.ts:50-118`; `site.ts:62-66` |
| **SEO-5** | 🟡 ⚙️ | **Sitemap без image-записей.** Next 16 `MetadataRoute.Sitemap` поддерживает `images: string[]` на запись; `room.gallery` и `HOTEL_IMAGES` уже есть → бесплатное покрытие image-поиска и мультимодальных AI. | `app/sitemap.ts` |
| **SEO-6** | 🟢 ⚙️ | **AEO-полировка:** `llms.txt` — только RU, без ссылки на EN и на `llms-full.txt`, без `/events/`, `/subscriptions/`; добавить EN-мини-блок + `See also`. Нет `authors`/`creator`/`publisher`/`keywords` в metadata. | `llms.txt/route.ts`; `layout.tsx:64` |
| **SEO-D** | — 🏨 | Требуют данных отеля (см. [раздел ниже](#hotel)): `aggregateRating`/`reviewCount`, `starRating`, `priceRange`, X/Twitter-handle для `twitter:site`. | — |

**Порядок:** SEO-1 немедленно (P0, тривиально — 7 строк), затем SEO-2 + SEO-3 (механически через `buildPageMetadata`/схема-билдеры), потом SEO-4/5/6.

---

<a id="dx"></a>
## 3. DX / архитектура (KISS · YAGNI · DRY)

| # | Приоритет · риск | Находка | Где |
|---|---|---|---|
| **DX-1** | 🟠 🅑 | **Историч. люксы: 4 файла → 1 компонент.** `diff` подтверждает: RU/EN-пары byte-identical по структуре, расходятся только (a) флаг локали, (b) `AllRooms.ru/.en`, (c) строки, (d) 2 косметических `<br>`. dashkova vs shuvalov — только контент-массивы. Свернуть в `components/pages/HistoricalSuitePage.tsx({locale,slug})`, контент (`antiquesItems`/`descriptionImages`/hero/intro) — в `data/RoomsData.tsx` по локали. ~860 строк → 4 тонких делегата + данные. | `rooms/historical/{dashkova,shuvalov}/page.tsx` +en; тип `RoomsData.tsx:9-22` |
| **DX-2** | 🟠 🅑 | **`rooms/page.tsx` — near-1:1, 3 дефекта:** (1) YAGNI — RU оборачивает секции в `next/dynamic({ssr:true})` без `loading`, EN нет; под `output:export` это лишь дробит чанки без пользы; (2) copy-drift `xl:max-w-3xl` (RU) vs `xl:max-w-7xl` (EN) — похоже баг; (3) мёртвый `<div/>` в обоих. Свернуть в `components/pages/RoomsPage.tsx({locale})`. | `rooms/page.tsx:2,11,55,78`; `en/rooms/page.tsx:47,67` |
| **DX-3** | 🟡 🅑 | **`app/history/page.tsx` — 1208 строк inline JSX в роут-файле** (худшее нарушение thin-page паттерна в репо; `components/pages/HistoryPage.tsx` не существует). EN-версия (234 стр.) — **не перевод, а самостоятельно сокращённая статья** (38 секций RU vs 8 EN) → контент **не** унифицируется, но *рендер* — да: вынести `HistoryPage.tsx`, рендерящий `HistorySection[]`; RU/EN дают свои массивы. Также `policy` (324) и `legal` (182) — inline. | `history/page.tsx`, `policy/`, `legal/` |
| **DX-4** | 🟡 🅑 | **7 из 22 `useLocale`-компонентов — напрасно клиентские** (locale нужен лишь для текста/`localizeHref`, интерактивности нет): `SkipLink`, `CardEvent`, `CardServiceBig`, `SocialLinks`, `ui/divider/History` (рендерится ~15× на history только ради `alt`!), `DesktopRoomsGrid`, `NotFoundPage` (уже гибрид с `locale?`-проп). Их владелец-`page.tsx` **уже знает локаль** — передать пропом (как делают `BoatToursPage`/`ConciergePage`), снять `"use client"`. Остальные 15 — реально интерактивные (модалки/слайдеры/формы/observers), остаются client. | см. [разбор вопроса 2](#q-layout) |
| **DX-5** | 🟡 🅑 | **Два механизма патчат одни и те же locale-сигналы** (DRY/хрупкость): `HtmlLangSync` (client `useEffect` мутирует `<html lang>`) **и** `fix-en-lang.mjs` (пост-билд, 3 регэкспа: `lang`, `og:locale`, JSON-LD `inLanguage`). Оба существуют из-за захардкоженного RU в общем layout. Развязка через per-locale layout (см. [ниже](#q-layout)) убирает 2 из 3 регэкспов + сам `HtmlLangSync` частично. | `HtmlLangSync.tsx`; `scripts/fix-en-lang.mjs` |
| **DX-6** | 🟢 🅐 | **Мёртвый экспорт** `getEventOccurrences` (`EventsData.tsx:360`) — ноль ссылок в репо. YAGNI, удалить. | `data/EventsData.tsx:360` |
| **DX-7** | 🟢 🅐 | **Config-тюнинг:** `tsconfig` `target:"ES2017"` устарел для Next16/React19 → `ES2022`; `allowJs:true` не нужен (нет `.js`-исходников); нет `"typecheck":"tsc --noEmit"` в scripts (полезно для CI/DX). Опц. `noUncheckedIndexedAccess`. | `tsconfig.json:3,5`; `package.json` |

**Не баги (проверено, чтобы случайно не удалить):** `blog/{Columns,FAQ,Space}.tsx` и `ui/icons/index.tsx` — живые через `mdx-components.tsx` / barrel-импорт; `any`/`as any` — нет ни одного; типовая дисциплина хорошая.

---

## Ответы на три вопроса

<a id="q-fonts"></a>
### Вопрос 1 — шрифты: preload + дубль Century Gothic

**Диагноз (подтверждён в `out/`).** Century Gothic грузится **двумя путями**:
- `next/font/local` → `--font-century`, self-hosted (`/media/CenturyGothic-s.p.<hash>.woff2`), **с preload**. Использует только `.v2-fonts` (`globals.css:81`).
- ручной `@font-face` (`globals.css:97-117`) → семейство `"Century Gothic"` из `/fonts/…woff2`, **без preload**, без fingerprint. Использует `body` (`:18`) и `.font-century-v2` (`:118`).

Собранный CSS содержит **6 `url()`** на Century Gothic (3 fingerprint + 3 `/fonts/`). Итог: основной текст сайта (`body`) рисуется **не-preload** копией → FOUT/CLS, а второй ~180 КБ качается впустую.

**Правильное решение (DRY + современный тренд):** оставить **один** источник — `next/font/local` (идиоматично: self-host, авто-preload, size-adjust fallback → меньше CLS):
1. Удалить 3 ручных `@font-face` (`globals.css:97-117`).
2. `body { font-family: var(--font-century), "Century Gothic", sans-serif }`, `.font-century-v2 { font-family: var(--font-century), sans-serif }`, hotbot-`--font-family` → `var(--font-century)`.
3. Проверить `--font-sans` в `@theme` — привязать к тому же.
4. **preload-стратегия:** оставить `preload:true` для реально-надсгибных (Century Regular/Bold, History Regular). Снять preload с Italic Century и History-Bold (редко над сгибом — P-4). Для hero-`<h1>` на Alistair — либо `preload:true` только если это LCP-кандидат, либо принять swap.

Рендер идентичен (те же woff2). Риск 🅐/низкий. Верификация: `bun run build` + счётчики шрифтов в HTML + визуал hero.

<a id="q-layout"></a>
### Вопрос 2 — разделить root layout по локалям → серверные компоненты

**Почему наивное «`app/layout` + `app/en/layout` как замена» не работает:**
- В App Router вложенные layout'ы **вкладываются**, не заменяют root. `app/en/layout.tsx` (nested) **не может** рендерить `<html>`/`<body>` — это прерогатива единственного root.
- Два *root*-layout'а (route-groups `(ru)`/`(en)` со своим `<html>`) технически дают нативный `lang=en`, **но** ломают глобальный `not-found` (Next не решает, какой root оборачивает `out/404.html`) — ровно та поломка 404, что была раньше. Плюс полная перезагрузка при переходах между корнями.
- `app/[lang]/layout.tsx` (динамический сегмент) — канонический i18n-паттерн, **но** увёл бы RU с корня `/` на `/ru/` → смена всех индексированных URL = SEO-регресс. **Неприемлемо.**

**Правильное решение — один root + два вложенных серверных layout'а:**
```
app/layout.tsx          ← root: <html><body>, сторонние скрипты, провайдеры
                          (LazyMotion/SmoothScroll), {children}. БЕЗ Header/Footer.
app/(ru)/layout.tsx     ← route-group (URL не меняется): SkipLink + site-JSON-LD("ru")
  app/(ru)/page.tsx  = /   + <Header locale="ru"/> {children} <Footer locale="ru"/>
  app/(ru)/rooms/…       + metadata с ПОЛНЫМ openGraph(ru_RU)
app/en/layout.tsx       ← то же с locale="en", ПОЛНЫЙ openGraph(en_US), site-JSON-LD("en")
```
- **404 цел** — root единственный, `app/not-found.tsx` работает как прежде.
- **Почему это чинит og:image** (та самая прошлая «поломка»): раньше установка одного `openGraph.locale` на потомке **заменяла** родительский блок, теряя `og:image`/`og:type` (гоча из CLAUDE.md). Правильно = per-locale layout эмитит **весь** OG-блок (locale + images + type + siteName), как `buildPageMetadata`. Тогда EN-страницы без своего OG наследуют корректный EN-блок.
- **Что серверизуется:** `SkipLink` → server; `Header`/`Footer` перестают зависеть от `useLocale` (но остаются client — интерактив/framer). Site-JSON-LD и `og:locale`/`og:title` для EN — нативно → удаляются 2 из 3 регэкспов `fix-en-lang.mjs` + вся его OG-часть.
- **Остаётся один сигнал** — `<html lang>` (только root). Держим тонкий `HtmlLangSync` (или ужимаем пост-скрипт до 1 регэкспа). Честный компромисс — nested layout `<html>` не владеет.

**Честная оценка выгоды (поправка к прошлому обещанию «30-40 компонентов в серверные»):**
- Реально серверизуется ~**7** презентационных компонентов (DX-4) — и **6 из них не требуют** реструктуризации layout вовсе: их `page.tsx` уже знает локаль, достаточно передать пропом (низкий риск, делается сейчас).
- 5 из 22 `useLocale`-компонентов используют framer-motion (`Footer`, `RoomCategoriesSection`, `DesktopRoomsGrid`, `EventsGrid`, `TransportSlider`) → **клиентские в любом случае**, проп локали их не серверизует.
- **Главная выгода реструктуризации — не число серверных компонентов, а:** (1) удаление `fix-en-lang.mjs`/`HtmlLangSync`-хаков (DX-5), (2) нативные EN OG-сигналы (SEO-2), (3) выгрузка данных (`AllRooms`/`AllServices`) из клиентских бандлов гридов.

**Риск/стоимость:** 🅑, средне-высокий — перенос ~40 RU-`page.tsx` в `app/(ru)/` (route-group URL не меняет, но много файлов). Отдельная, хорошо-тестируемая фаза. **Рекомендация:** сначала сделать дешёвую часть DX-4 (проп локали page→компонент, без layout), потом — реструктуризацию как осознанный шаг ради удаления хаков и нативных EN-сигналов.

<a id="q-dedup"></a>
### Вопрос 3 — что именно не 1:1 в пропущенном дедупе

| Пара | Что расходится | Вердикт |
|---|---|---|
| `rooms/page` ru/en | (1) RU в `next/dynamic({ssr:true})`, EN — статик (YAGNI, бесполезно под export); (2) `max-w-3xl` vs `max-w-7xl` (вероятно баг вёрстки); (3) мёртвый `<div/>` в обоих | **Унифицируемо** → `RoomsPage.tsx({locale})`, контент интро в locale-map. Заодно решить drift max-w. **DX-2** |
| `historical/dashkova` ru/en | Структура byte-identical; расходятся строки + `<br className="max-xl:hidden"/>` вставлен в EN-заголовке, в RU нет | **Унифицируемо** → `HistoricalSuitePage`. **DX-1** |
| `historical/shuvalov` ru/en | То же (косметический `<br/>`-shape diff + контент) | **Унифицируемо** (тот же компонент, свои данные) |
| `history` ru/en | EN — **не перевод**, а сокращённая статья: 38 секций RU vs 8 EN, разный набор фото, разная глубина | Контент **не** унифицируется (нужен EN-перевод → [🏨](#hotel)). Но *рендер* выносится в `HistoryPage.tsx` + `HistorySection[]`. **DX-3** |

Итог: **всё, что «пропустили», кроме контентной части history, — унифицируемо** через data-driven компонент. Прошлый план счёл их «не 1:1» из-за поверхностного (byte-identical) критерия; структурно они сводятся.

---

## Рекомендованный порядок

1. **P0-баги** (быстро, высокий вред): SEO-1 (7 canonical), P-1 (LCP opacity), P-5 (`package.full`).
2. **DX-дешёвое:** DX-6 (мёртвый экспорт), DX-7 (config), DX-2 (rooms dedup), DX-4-часть (проп локали без layout).
3. **P-3 + шрифты** (вопрос 1) — DRY + CWV.
4. **SEO-2 + SEO-3** — per-page OG + BreadcrumbList (механически).
5. **DX-1** (историч. люксы) + **DX-3** (HistoryPage вынос).
6. **P-2, P-4, P-6, P-7** — остальной perf.
7. **SEO-4/5/6** — schema/sitemap/llms обогащение.
8. **DX-5 + вопрос 2** — реструктуризация layout (per-locale), удаление хаков. Финальная, отдельно тестируемая.

---

<a id="hotel"></a>
## Требуется от отеля (вне автономного плана)

Готовы принять кодом, дизайн не тронет:
- Цены («от N ₽») → `Offer` + `priceRange`.
- Рейтинг + число отзывов → `aggregateRating`/`Review` (звёзды в выдаче) — данные уже перечислены на `/reviews/`, но без чисел.
- Звёздность + число номеров → `starRating`/`numberOfRooms`.
- `sameAs`-URL: Wikidata/Wikipedia особняка, Яндекс.Карты, 2ГИС, Booking/Ostrovok (сильнейший GEO-сигнал).
- X/Twitter-handle → `twitter:site`.
- Данные ресторана → `Restaurant` schema; автор блога → E-E-A-T `Person`.
- EN-перевод недостающих секций `history` (38 vs 8) → контент-паритет + завершение DX-3.
- Эндпоинт форм рассылки (3 заглушки в Footer).

**Подтверждение «да/нет»:** CTA «Забронировать» скрыт до скролла — намеренно? `beauty-bar` — публиковать в каталог/sitemap? Кнопка «Афиша»/`/events/` — открывать?

---

## Вне scope — инфраструктура / сервер

`output:export` игнорирует `headers()`/`redirects()` — только слой доставки:
- Security-заголовки + CSP, кэш-заголовки (`immutable` для `/_next/static`, `/fonts`), brotli/gzip компрессия.
- CDN (Cloudflare) — кэш+brotli+HTTP/3+заголовки одним шагом.
- Защита формы на воркере (rate-limit, экранирование Telegram-полей).
- `nginx error_page 404 /404.html`; доменная привязка ключа Яндекс.Карт.
