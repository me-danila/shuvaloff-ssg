import { getAllPosts } from "@/lib/blog";
import { HOTEL_ADDRESS, HOTEL_CONTACTS, SITE_URL } from "@/lib/seo/site";

export const dynamic = "force-static";

export async function GET() {
    const posts = await getAllPosts();

    const articles = posts
        .map(
            (post) =>
                `- [${post.title}](${SITE_URL}/blog/${post.slug}/): ${post.description}`,
        )
        .join("\n");

    const body = `# ACADEMIA Особняк Шувалова

> Бутик-отель в бережно отреставрированном особняке XIX века в центре Санкт-Петербурга (${HOTEL_ADDRESS.streetAddress}, ${HOTEL_ADDRESS.addressLocality}). Исторические люксы и современные номера, бутик-ресторан, СПА, консьерж-сервис. Заезд 14:00, выезд 12:00. Телефон: ${HOTEL_CONTACTS.telephoneDisplay}, почта: ${HOTEL_CONTACTS.email}.

## Основные страницы

- [Категории номеров](${SITE_URL}/rooms/): все категории номеров отеля с описаниями и ценами
- [Исторические люксы](${SITE_URL}/rooms/historical/): люксы-объекты культурного наследия с подлинными интерьерами
- [Бронирование](${SITE_URL}/booking/): онлайн-бронирование номеров
- [Специальные предложения](${SITE_URL}/sales/): актуальные акции и спецпредложения
- [Услуги](${SITE_URL}/services/all/): трансфер, водные прогулки, завтраки, СПА и другие услуги
- [История особняка](${SITE_URL}/history/): история особняка Шувалова и рода Шуваловых
- [Свадьба в особняке](${SITE_URL}/wedding/): проведение свадеб в исторических интерьерах
- [Отзывы](${SITE_URL}/reviews/): отзывы гостей отеля

## Блог

- [Блог](${SITE_URL}/blog/): статьи об аристократическом Петербурге, истории особняка и гиды по городу
- [RSS-лента блога](${SITE_URL}/blog/feed.xml)

## Статьи

${articles}

## English

- [Hotel overview (EN)](${SITE_URL}/en/): ACADEMIA Mansion Shuvaloff — boutique hotel in a restored 19th-century mansion in central Saint Petersburg
- [Rooms (EN)](${SITE_URL}/en/rooms/): all room categories with descriptions
- [Historical suites (EN)](${SITE_URL}/en/rooms/historical/): cultural-heritage suites with authentic interiors
- [Services (EN)](${SITE_URL}/en/services/all/): transfer, boat tours, breakfasts, SPA and more
- [History (EN)](${SITE_URL}/en/history/): history of the Shuvalov mansion

## Служебное

- [Sitemap](${SITE_URL}/sitemap.xml)
- [Полная текстовая версия / full-text index](${SITE_URL}/llms-full.txt): все страницы (ru + en) одним файлом
`;

    return new Response(body, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}
