import { landingLlmsLines } from "@/data/landing";
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
- [Новый год 2027 в особняке](${SITE_URL}/new-year-2027/): «Графский Новый год» 31 декабря 2026, начало в 20:00 — театрализованная программа в духе светского салона XIX века, графская семья, праздничный ужин с живой музыкой
- [Свадьба в особняке](${SITE_URL}/wedding/): проведение свадеб в исторических интерьерах
- [Графские выходные: розыгрыш с рестораном «Посейдон»](${SITE_URL}/poseidon/): розыгрыш проживания в полулюксе на двоих с графским завтраком для гостей ресторана «Посейдон»; каждому участнику — промокод на скидку 15% на проживание
- [Чаепитие у графини](${SITE_URL}/services/tea-party/details/): чаепитие на двоих в историческом интерьере графского особняка — этажерка с десертами, варенье, особый чайный купаж; ежедневно в 16:00 и 17:00 по предварительному бронированию; 4 000 ₽, с шампанским 7 500 ₽
- [Поздравления от графской семьи](${SITE_URL}/services/counts-family-greetings/details/): театрализованные поздравления от графа и графини Шуваловых для гостей особняка по предварительному заказу, с пятницы по воскресенье — день рождения (5 500 ₽, 9 500 ₽, 7 500 ₽), свадьба или годовщина (10 000 ₽), предложение в особняке (от 10 000 ₽), Графский завтрак с экскурсией (от 13 000 ₽)
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
- [Tea with the Countess (EN)](${SITE_URL}/en/services/tea-party/details/): afternoon tea for two in the historic interiors of the count's mansion — tiered dessert stand, jam, special tea blend; daily at 4:00 PM and 5:00 PM by advance reservation; 4,000 RUB, with champagne 7,500 RUB
- [Greetings from the Count's Family (EN)](${SITE_URL}/en/services/counts-family-greetings/details/): theatrical greetings from Count and Countess Shuvalov for mansion guests — birthday, wedding or anniversary, proposal, the Count's breakfast with a tour; Friday to Sunday by prior arrangement; from 5,500 RUB
- [History (EN)](${SITE_URL}/en/history/): history of the Shuvalov mansion
- [New Year 2027 at the mansion (EN)](${SITE_URL}/en/new-year-2027/): Count's New Year on 31 December 2026 from 8:00 PM — a theatrical 19th-century salon programme, the Count's family, a festive dinner with live music

## Other languages

Short one-page guides for international guests (rooms, offers, booking in the visitor's language):

${landingLlmsLines(SITE_URL)}

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
