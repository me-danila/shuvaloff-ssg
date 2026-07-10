import { AllRooms, type Room } from "@/data/RoomsData";
import { AllServices, type Service } from "@/data/ServicesData";
import { getAllPosts } from "@/lib/blog";
import type { Locale } from "@/lib/i18n/routing";
import {
    getAbsoluteUrl,
    HOTEL_ADDRESS,
    HOTEL_CONTACTS,
    SITE_URL,
} from "@/lib/seo/site";

export const dynamic = "force-static";

const roomUrl = (room: Room, locale: Locale) =>
    getAbsoluteUrl(
        room.isHistorical
            ? `/rooms/historical/${room.slug}/`
            : `/rooms/${room.slug}/`,
        locale,
    );

const serviceUrl = (service: Service, locale: Locale) =>
    service.slug
        ? getAbsoluteUrl(`/services/${service.slug}/`, locale)
        : service.externalLink;

const roomLine = (room: Room, locale: Locale) =>
    `- [${room.title}](${roomUrl(room, locale)}) — ${room.area}, ${room.guests}: ${room.description}`;

const serviceLine = (service: Service, locale: Locale) =>
    `- [${service.title}](${serviceUrl(service, locale)}): ${service.subtitle}`;

export async function GET() {
    const posts = await getAllPosts();

    const roomsRu = AllRooms.ru.map((room) => roomLine(room, "ru")).join("\n");
    const roomsEn = AllRooms.en.map((room) => roomLine(room, "en")).join("\n");

    const servicesRu = AllServices.ru
        .map((service) => serviceLine(service, "ru"))
        .join("\n");
    const servicesEn = AllServices.en
        .map((service) => serviceLine(service, "en"))
        .join("\n");

    const articles = posts
        .map(
            (post) =>
                `- [${post.title}](${SITE_URL}/blog/${post.slug}/): ${post.description}`,
        )
        .join("\n");

    const body = `# ACADEMIA Особняк Шувалова — полное описание

> Бутик-отель в бережно отреставрированном особняке XIX века в центре Санкт-Петербурга (${HOTEL_ADDRESS.streetAddress}, ${HOTEL_ADDRESS.addressLocality}). Исторические люксы — объекты культурного наследия — и современные номера в неоклассическом стиле, бутик-ресторан в бывшем кабинете графа Шувалова, СПА и круглосуточный консьерж-сервис. Заезд с 14:00, выезд до 12:00. Телефон: ${HOTEL_CONTACTS.telephoneDisplay}, почта: ${HOTEL_CONTACTS.email}.

## Об отеле

ACADEMIA Особняк Шувалова расположен на Моховой улице в историческом центре Санкт-Петербурга, в особняке графа Андрея Павловича Шувалова. Здание бережно отреставрировано, а его исторические интерьеры и предметы обстановки сохранены под охраной КГИОП. Гостей ждут номера от классических «Стандартов» до исторических люксов с подлинными антикварными деталями, бутик-ресторан, СПА, водные прогулки, представительский трансфер и персональный менеджер службы заботы.

Адрес: ${HOTEL_ADDRESS.streetAddress}, ${HOTEL_ADDRESS.addressLocality}, ${HOTEL_ADDRESS.postalCode}. Телефон: ${HOTEL_CONTACTS.telephoneDisplay}. Почта: ${HOTEL_CONTACTS.email}.

## Номера

Актуальные цены и наличие — на странице бронирования: ${SITE_URL}/booking/.

${roomsRu}

## Услуги

${servicesRu}

## История особняка (кратко)

Особняк, в котором сейчас расположен отель, стоит на Моховой улице — одной из старейших улиц города, появившейся во времена основания Санкт-Петербурга. История самого дома начинается с 1735 года, когда на его месте был «двор с деревянным строением и садом». В 1854 году участок приобрёл граф Андрей Павлович Шувалов: по его заказу архитектор Герман Паукер построил трёхэтажный жилой дом, а в 1858 году Луиджи Феррацини обновил фасад, придав зданию более светлый и торжественный вид.

В 1912 году особняк перешёл по наследству к дочери графа — Елизавете Андреевне Воронцовой-Дашковой. По её заказу архитектор Иван Фомин создал интерьеры в изысканном неоклассическом стиле; после пожара 1913 года он же заново отделал залы, а в доме появились электричество, телефон и лифт. Воронцовы-Дашковы покинули Россию в 1919 году. В годы блокады Ленинграда здание сильно пострадало от обстрелов, а 14 ноября 1941 года в него попала фугасная бомба.

Сегодня в бережно восстановленном здании с отреставрированными элементами культурного наследия находится отель ACADEMIA Особняк Шувалова. Парадные залы, включая исторические люксы графа Шувалова и графини Дашковой, признаны объектами культурного наследия под охраной КГИОП. Подробнее — в разделе «История особняка»: ${SITE_URL}/history/.

## Ключевые страницы

- [Категории номеров](${SITE_URL}/rooms/): все категории номеров с описаниями
- [Исторические люксы](${SITE_URL}/rooms/historical/): люксы-объекты культурного наследия с подлинными интерьерами
- [Бронирование](${SITE_URL}/booking/): онлайн-бронирование номеров
- [Специальные предложения](${SITE_URL}/sales/): актуальные акции и спецпредложения
- [Услуги](${SITE_URL}/services/all/): трансфер, водные прогулки, завтраки, СПА и другие услуги
- [История особняка](${SITE_URL}/history/): история особняка Шувалова и рода Шуваловых
- [Свадьба в особняке](${SITE_URL}/wedding/): проведение свадеб в исторических интерьерах
- [Отзывы](${SITE_URL}/reviews/): отзывы гостей отеля
- [Блог](${SITE_URL}/blog/): статьи об аристократическом Петербурге, истории особняка и гиды по городу

## Статьи

${articles}

---

# ACADEMIA Mansion Shuvaloff — full overview (English)

> An elegant boutique hotel in a carefully restored 19th-century mansion in central Saint Petersburg (${HOTEL_ADDRESS.streetAddressEn}, ${HOTEL_ADDRESS.addressLocalityEn}). Historical suites — protected cultural-heritage interiors — and modern neoclassical rooms, a boutique restaurant in Count Shuvalov's former study, a spa, and 24/7 concierge service. Check-in from 2:00 PM, check-out until 12:00 PM. Phone: ${HOTEL_CONTACTS.telephoneDisplay}, email: ${HOTEL_CONTACTS.email}.

## About the hotel

ACADEMIA Shuvaloff Mansion stands on Mokhovaya Street in the historic centre of Saint Petersburg, in the mansion of Count Andrey Pavlovich Shuvalov. The building has been carefully restored, and its historic interiors and furnishings are preserved under heritage protection. Guests can choose from classic Standard rooms to historical suites with genuine antique details, and enjoy a boutique restaurant, a spa, boat tours, executive transfers, and a personal guest-care manager.

Address: ${HOTEL_ADDRESS.streetAddressEn}, ${HOTEL_ADDRESS.addressLocalityEn}, ${HOTEL_ADDRESS.postalCode}. Phone: ${HOTEL_CONTACTS.telephoneDisplay}. Email: ${HOTEL_CONTACTS.email}.

## Rooms

Current rates and availability are on the booking page: ${SITE_URL}/en/booking/.

${roomsEn}

## Services

${servicesEn}

## History (summary)

The mansion that now houses the hotel stands on Mokhovaya Street, one of the oldest streets in the city, dating back to the founding of Saint Petersburg. The history of the house begins in 1735, when a wooden estate with a garden stood on this site. In 1854 the plot was acquired by Count Andrey Pavlovich Shuvalov; by his order architect Hermann Paucker built a three-story mansion, and in 1858 Luigi Ferracini redesigned the facade, giving the building a brighter and more ceremonial look.

In 1912 the mansion was inherited by the count's daughter, Elizaveta Vorontsova-Dashkova, who commissioned architect Ivan Fomin to create new interiors in an elegant neoclassical style. After a fire in 1913, Fomin carried out major restoration works, and the house received electricity, telephone lines, and an elevator. The Vorontsov-Dashkov family left Russia in 1919. During the Siege of Leningrad the building suffered severe shelling damage, and on November 14, 1941, an aerial bomb struck the house.

Today, the carefully restored building with preserved heritage elements has entered a new chapter as ACADEMIA Shuvaloff Mansion. The ceremonial halls, including the historical suites of Count Shuvalov and Countess Dashkova, are recognised as protected cultural-heritage sites. Read more on the history page: ${SITE_URL}/en/history/.

## Key pages

- [Room categories](${SITE_URL}/en/rooms/): all room categories with descriptions
- [Historical suites](${SITE_URL}/en/rooms/historical/): cultural-heritage suites with authentic interiors
- [Booking](${SITE_URL}/en/booking/): online room booking
- [Special offers](${SITE_URL}/en/sales/): current promotions and special offers
- [Services](${SITE_URL}/en/services/all/): transfers, boat tours, breakfasts, spa, and more
- [History](${SITE_URL}/en/history/): the history of Shuvalov Mansion and the Shuvalov family
- [Weddings](${SITE_URL}/en/wedding/): weddings in the historic interiors
- [Reviews](${SITE_URL}/en/reviews/): guest reviews

## Служебное

- [Sitemap](${SITE_URL}/sitemap.xml)
- [llms.txt](${SITE_URL}/llms.txt)
`;

    return new Response(body, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}
