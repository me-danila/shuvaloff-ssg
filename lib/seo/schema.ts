import type { Room } from "@/data/RoomsData";
import type { Service } from "@/data/ServicesData";
import type { Locale } from "@/lib/i18n/routing";
import {
    BOOKING_URL,
    DEFAULT_OG_IMAGE,
    getAbsoluteUrl,
    getSiteName,
    HISTORY_DATE_PUBLISHED,
    HISTORY_HERO_IMAGE,
    HOTEL_ADDRESS,
    HOTEL_CONTACTS,
    HOTEL_GEO,
    HOTEL_IMAGES,
    HOTEL_LEGAL,
    HOTEL_MAP_URL,
    SITE_BUILD_DATE,
    SITE_NAME,
    SITE_NAME_EN,
    SITE_URL,
    SOCIAL_LINKS,
} from "@/lib/seo/site";

type BreadcrumbItem = {
    name: string;
    path: string;
};

const getAddress = (locale: Locale) => ({
    "@type": "PostalAddress",
    streetAddress:
        locale === "en"
            ? HOTEL_ADDRESS.streetAddressEn
            : HOTEL_ADDRESS.streetAddress,
    addressLocality:
        locale === "en"
            ? HOTEL_ADDRESS.addressLocalityEn
            : HOTEL_ADDRESS.addressLocality,
    postalCode: HOTEL_ADDRESS.postalCode,
    addressCountry: HOTEL_ADDRESS.addressCountry,
});

const getHotelId = () => `${SITE_URL}#hotel`;
const getWebsiteId = () => `${SITE_URL}#website`;
const getOrganizationId = () => `${SITE_URL}#organization`;

export const buildSiteSchema = (locale: Locale) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": getOrganizationId(),
            name: SITE_NAME,
            alternateName: SITE_NAME_EN,
            legalName: HOTEL_LEGAL.legalName,
            taxID: HOTEL_LEGAL.taxID,
            vatID: HOTEL_LEGAL.vatID,
            url: SITE_URL,
            logo: `${SITE_URL}/logo.svg`,
            sameAs: SOCIAL_LINKS,
            email: HOTEL_CONTACTS.email,
            telephone: HOTEL_CONTACTS.telephone,
            address: getAddress(locale),
            contactPoint: {
                "@type": "ContactPoint",
                contactType: "reservations",
                telephone: HOTEL_CONTACTS.telephone,
                email: HOTEL_CONTACTS.email,
                availableLanguage: ["Russian", "English"],
            },
        },
        {
            "@type": "WebSite",
            "@id": getWebsiteId(),
            url: SITE_URL,
            name: getSiteName(locale),
            publisher: {
                "@id": getOrganizationId(),
            },
            inLanguage: locale,
        },
        {
            "@type": "Hotel",
            "@id": getHotelId(),
            name: SITE_NAME,
            alternateName: SITE_NAME_EN,
            url: SITE_URL,
            image: HOTEL_IMAGES,
            description:
                locale === "en"
                    ? "Boutique hotel in a carefully restored 19th-century mansion of Count Shuvalov on Mokhovaya Street in the historic centre of Saint Petersburg. Several halls, including the historical Count's and Countess's suites, are recognised cultural-heritage interiors protected by KGIOP."
                    : "Бутик-отель в бережно отреставрированном особняке графа Шувалова XIX века на Моховой улице в историческом центре Санкт-Петербурга. Часть залов, включая исторические люксы графа и графини, — интерьеры-объекты культурного наследия под охраной КГИОП.",
            address: getAddress(locale),
            geo: {
                "@type": "GeoCoordinates",
                latitude: HOTEL_GEO.latitude,
                longitude: HOTEL_GEO.longitude,
            },
            hasMap: HOTEL_MAP_URL,
            currenciesAccepted: "RUB",
            telephone: HOTEL_CONTACTS.telephone,
            email: HOTEL_CONTACTS.email,
            sameAs: SOCIAL_LINKS,
            checkinTime: "14:00",
            checkoutTime: "12:00",
            petsAllowed: true,
            amenityFeature: [
                {
                    "@type": "LocationFeatureSpecification",
                    name: locale === "en" ? "SPA" : "СПА",
                    value: true,
                },
                {
                    "@type": "LocationFeatureSpecification",
                    name:
                        locale === "en"
                            ? "Boutique restaurant"
                            : "Бутик-ресторан",
                    value: true,
                },
                {
                    "@type": "LocationFeatureSpecification",
                    name:
                        locale === "en"
                            ? "Concierge service"
                            : "Консьерж-сервис",
                    value: true,
                },
            ],
            contactPoint: {
                "@type": "ContactPoint",
                contactType: "reservations",
                telephone: HOTEL_CONTACTS.telephone,
                email: HOTEL_CONTACTS.email,
                availableLanguage: ["Russian", "English"],
            },
            potentialAction: {
                "@type": "ReserveAction",
                target: BOOKING_URL,
            },
        },
        {
            "@type": ["LandmarksOrHistoricalBuildings", "TouristAttraction"],
            "@id": `${SITE_URL}#landmark`,
            name:
                locale === "en"
                    ? "Count Shuvalov Mansion"
                    : "Особняк графа Шувалова",
            description:
                locale === "en"
                    ? "A 19th-century mansion on Mokhovaya Street, commissioned in 1854 by Count Andrei Shuvalov and later fitted with neoclassical interiors by the architect Ivan Fomin. Several halls, including the historical Count's and Countess's suites, are protected cultural heritage (KGIOP)."
                    : "Особняк XIX века на Моховой улице, построенный по заказу графа Андрея Павловича Шувалова в 1854 году; неоклассические интерьеры созданы архитектором Иваном Фоминым. Ряд залов, включая исторические люксы графа и графини, — объекты культурного наследия под охраной КГИОП.",
            url: getAbsoluteUrl("/history/", locale),
            address: getAddress(locale),
            geo: {
                "@type": "GeoCoordinates",
                latitude: HOTEL_GEO.latitude,
                longitude: HOTEL_GEO.longitude,
            },
            hasMap: HOTEL_MAP_URL,
            image: HOTEL_IMAGES,
            containsPlace: {
                "@id": getHotelId(),
            },
        },
    ],
});

export const buildBreadcrumbSchema = (
    locale: Locale,
    items: BreadcrumbItem[],
) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: getAbsoluteUrl(item.path, locale),
    })),
});

/**
 * Generic WebPage + BreadcrumbList graph for content pages that aren't a
 * collection/detail type with a dedicated builder. Links into the site graph
 * via isPartOf(WebSite) / about(Hotel), mirroring buildCollectionPageSchema
 * minus the ItemList. Breadcrumb labels come from existing page titles/nav.
 */
export const buildWebPageSchema = ({
    locale,
    path,
    name,
    description,
    breadcrumbs,
    image,
    speakable,
}: {
    locale: Locale;
    path: string;
    name: string;
    description: string;
    breadcrumbs: BreadcrumbItem[];
    image?: string;
    speakable?: string[];
}) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${getAbsoluteUrl(path, locale)}#webpage`,
            url: getAbsoluteUrl(path, locale),
            name,
            description,
            inLanguage: locale,
            isPartOf: {
                "@id": getWebsiteId(),
            },
            about: {
                "@id": getHotelId(),
            },
            breadcrumb: {
                "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
            },
            primaryImageOfPage: image ?? DEFAULT_OG_IMAGE,
            dateModified: SITE_BUILD_DATE,
            ...(speakable?.length
                ? {
                      speakable: {
                          "@type": "SpeakableSpecification",
                          cssSelector: speakable,
                      },
                  }
                : {}),
        },
        {
            ...buildBreadcrumbSchema(locale, breadcrumbs),
            "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
        },
    ],
});

export const buildCollectionPageSchema = ({
    locale,
    path,
    name,
    description,
    breadcrumbs,
    items,
    speakable,
}: {
    locale: Locale;
    path: string;
    name: string;
    description: string;
    breadcrumbs: BreadcrumbItem[];
    items: Array<{
        name: string;
        path: string;
        image?: string;
        description?: string;
    }>;
    // CSS selectors for the page's main heading / lead content, exposed to
    // voice assistants via schema.org SpeakableSpecification. Optional so the
    // shared builder stays unchanged for pages that don't opt in.
    speakable?: string[];
}) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${getAbsoluteUrl(path, locale)}#webpage`,
            url: getAbsoluteUrl(path, locale),
            name,
            description,
            inLanguage: locale,
            isPartOf: {
                "@id": getWebsiteId(),
            },
            about: {
                "@id": getHotelId(),
            },
            breadcrumb: {
                "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
            },
            primaryImageOfPage: DEFAULT_OG_IMAGE,
            dateModified: SITE_BUILD_DATE,
            ...(speakable?.length
                ? {
                      speakable: {
                          "@type": "SpeakableSpecification",
                          cssSelector: speakable,
                      },
                  }
                : {}),
        },
        {
            "@type": "ItemList",
            "@id": `${getAbsoluteUrl(path, locale)}#itemlist`,
            itemListElement: items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: getAbsoluteUrl(item.path, locale),
                name: item.name,
                image: item.image,
                description: item.description,
            })),
        },
        {
            ...buildBreadcrumbSchema(locale, breadcrumbs),
            "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
        },
    ],
});

export const buildRoomSchema = ({
    locale,
    path,
    room,
    breadcrumbs,
}: {
    locale: Locale;
    path: string;
    room: Room;
    breadcrumbs: BreadcrumbItem[];
}) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${getAbsoluteUrl(path, locale)}#webpage`,
            url: getAbsoluteUrl(path, locale),
            name: room.title,
            description: room.description,
            inLanguage: locale,
            isPartOf: {
                "@id": getWebsiteId(),
            },
            about: {
                "@id": `${getAbsoluteUrl(path, locale)}#room`,
            },
            breadcrumb: {
                "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
            },
        },
        {
            "@type": "HotelRoom",
            "@id": `${getAbsoluteUrl(path, locale)}#room`,
            name: room.title,
            description: room.description,
            url: getAbsoluteUrl(path, locale),
            image: room.gallery.map((image) => image.src),
            bed: room.bed,
            occupancy: {
                "@type": "QuantitativeValue",
                value: room.guests,
            },
            floorSize: {
                "@type": "QuantitativeValue",
                value: room.area,
            },
            amenityFeature: room.amenities.map((amenity) => ({
                "@type": "LocationFeatureSpecification",
                name: amenity,
                value: true,
            })),
            containedInPlace: {
                "@id": getHotelId(),
            },
            potentialAction: {
                "@type": "ReserveAction",
                target: BOOKING_URL,
            },
        },
        {
            ...buildBreadcrumbSchema(locale, breadcrumbs),
            "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
        },
    ],
});

export const buildServiceSchema = ({
    locale,
    path,
    service,
    breadcrumbs,
}: {
    locale: Locale;
    path: string;
    service: Service;
    breadcrumbs: BreadcrumbItem[];
}) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${getAbsoluteUrl(path, locale)}#webpage`,
            url: getAbsoluteUrl(path, locale),
            name: service.title,
            description: service.subtitle,
            inLanguage: locale,
            isPartOf: {
                "@id": getWebsiteId(),
            },
            about: {
                "@id": `${getAbsoluteUrl(path, locale)}#service`,
            },
            breadcrumb: {
                "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
            },
        },
        {
            "@type": "Service",
            "@id": `${getAbsoluteUrl(path, locale)}#service`,
            name: service.title,
            description: service.subtitle,
            url: getAbsoluteUrl(path, locale),
            image: service.imgUrl,
            provider: {
                "@id": getHotelId(),
            },
            areaServed:
                locale === "en"
                    ? HOTEL_ADDRESS.addressLocalityEn
                    : HOTEL_ADDRESS.addressLocality,
            offers: service.price
                ? {
                      "@type": "Offer",
                      priceCurrency: "RUB",
                      priceSpecification: service.price,
                      availability: "https://schema.org/InStock",
                      url: getAbsoluteUrl(path, locale),
                  }
                : undefined,
        },
        {
            ...buildBreadcrumbSchema(locale, breadcrumbs),
            "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
        },
    ],
});

export const buildEventSchema = ({
    locale,
    path,
    event,
    breadcrumbs,
}: {
    locale: Locale;
    path: string;
    event: {
        title: string;
        subtitle: string;
        imgUrl: string;
        bookingUrl: string;
        price?: string;
        dates: string[];
    };
    breadcrumbs: BreadcrumbItem[];
}) => {
    const url = getAbsoluteUrl(path, locale);
    const offerUrl = event.bookingUrl.startsWith("http")
        ? event.bookingUrl
        : getAbsoluteUrl(event.bookingUrl, locale);

    const place = {
        "@type": "Place",
        name: getSiteName(locale),
        address: getAddress(locale),
        geo: {
            "@type": "GeoCoordinates",
            latitude: HOTEL_GEO.latitude,
            longitude: HOTEL_GEO.longitude,
        },
    };

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${url}#webpage`,
                url,
                name: event.title,
                description: event.subtitle,
                inLanguage: locale,
                isPartOf: {
                    "@id": getWebsiteId(),
                },
                breadcrumb: {
                    "@id": `${url}#breadcrumb`,
                },
                primaryImageOfPage: event.imgUrl,
            },
            ...event.dates.map((start, index) => ({
                "@type": "Event",
                "@id": `${url}#event-${index}`,
                name: event.title,
                description: event.subtitle,
                image: event.imgUrl,
                // SPb (МСК, UTC+3); время в данных — локальное.
                startDate: `${start}:00+03:00`,
                eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                inLanguage: locale,
                url,
                location: place,
                organizer: {
                    "@id": getHotelId(),
                },
                offers: {
                    "@type": "Offer",
                    url: offerUrl,
                    availability: "https://schema.org/InStock",
                    priceCurrency: "RUB",
                    ...(event.price ? { price: event.price } : {}),
                    validFrom: `${start}:00+03:00`,
                },
            })),
            {
                ...buildBreadcrumbSchema(locale, breadcrumbs),
                "@id": `${url}#breadcrumb`,
            },
        ],
    };
};

export const buildWeddingPageSchema = ({
    locale,
    path,
    name,
    description,
    breadcrumbs,
}: {
    locale: Locale;
    path: string;
    name: string;
    description: string;
    breadcrumbs: BreadcrumbItem[];
}) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${getAbsoluteUrl(path, locale)}#webpage`,
            url: getAbsoluteUrl(path, locale),
            name,
            description,
            inLanguage: locale,
            isPartOf: {
                "@id": getWebsiteId(),
            },
            about: {
                "@id": `${getAbsoluteUrl(path, locale)}#weddingservice`,
            },
            breadcrumb: {
                "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
            },
        },
        {
            "@type": "Service",
            "@id": `${getAbsoluteUrl(path, locale)}#weddingservice`,
            name,
            description,
            serviceType: "Wedding Service",
            provider: {
                "@id": getHotelId(),
            },
            areaServed:
                locale === "en"
                    ? HOTEL_ADDRESS.addressLocalityEn
                    : HOTEL_ADDRESS.addressLocality,
        },
        {
            ...buildBreadcrumbSchema(locale, breadcrumbs),
            "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
        },
    ],
});

export const buildSubscriptionPageSchema = ({
    locale,
    path,
    name,
    description,
    breadcrumbs,
}: {
    locale: Locale;
    path: string;
    name: string;
    description: string;
    breadcrumbs: BreadcrumbItem[];
}) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${getAbsoluteUrl(path, locale)}#webpage`,
            url: getAbsoluteUrl(path, locale),
            name,
            description,
            inLanguage: locale,
            isPartOf: {
                "@id": getWebsiteId(),
            },
            about: {
                "@id": `${getAbsoluteUrl(path, locale)}#subscription`,
            },
            breadcrumb: {
                "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
            },
        },
        {
            "@type": "Service",
            "@id": `${getAbsoluteUrl(path, locale)}#subscription`,
            name,
            description,
            serviceType: "Business Subscription",
            provider: {
                "@id": getHotelId(),
            },
        },
        {
            ...buildBreadcrumbSchema(locale, breadcrumbs),
            "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
        },
    ],
});

export const buildHistoryPageSchema = ({
    locale,
    path,
    name,
    description,
    breadcrumbs,
}: {
    locale: Locale;
    path: string;
    name: string;
    description: string;
    breadcrumbs: BreadcrumbItem[];
}) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${getAbsoluteUrl(path, locale)}#webpage`,
            url: getAbsoluteUrl(path, locale),
            name,
            description,
            inLanguage: locale,
            isPartOf: {
                "@id": getWebsiteId(),
            },
            about: {
                "@id": getHotelId(),
            },
            breadcrumb: {
                "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
            },
            datePublished: HISTORY_DATE_PUBLISHED,
            dateModified: SITE_BUILD_DATE,
            lastReviewed: SITE_BUILD_DATE,
            primaryImageOfPage: HISTORY_HERO_IMAGE,
            // Points voice assistants at the page's main heading. Only the
            // single <h1> is a stable, locale-portable selector: the RU/EN
            // history pages share this builder and their lead paragraphs have
            // no shared id/class hook (RU uses .cv-history, EN has none).
            speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["h1"],
            },
        },
        {
            "@type": "Article",
            "@id": `${getAbsoluteUrl(path, locale)}#article`,
            headline: name,
            description,
            inLanguage: locale,
            image: HISTORY_HERO_IMAGE,
            datePublished: HISTORY_DATE_PUBLISHED,
            dateModified: SITE_BUILD_DATE,
            mainEntityOfPage: {
                "@id": `${getAbsoluteUrl(path, locale)}#webpage`,
            },
            author: {
                "@id": getOrganizationId(),
            },
            publisher: {
                "@id": getOrganizationId(),
            },
            about: {
                "@id": getHotelId(),
            },
        },
        {
            ...buildBreadcrumbSchema(locale, breadcrumbs),
            "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
        },
    ],
});

export const buildSalesPageSchema = ({
    locale,
    path,
    name,
    description,
    breadcrumbs,
    sales,
}: {
    locale: Locale;
    path: string;
    name: string;
    description: string;
    breadcrumbs: BreadcrumbItem[];
    sales: Array<{
        title: string;
        subtitle: string;
        imgUrl: string;
        bookingUrl: string;
    }>;
}) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${getAbsoluteUrl(path, locale)}#webpage`,
            url: getAbsoluteUrl(path, locale),
            name,
            description,
            inLanguage: locale,
            isPartOf: {
                "@id": getWebsiteId(),
            },
            about: {
                "@id": getHotelId(),
            },
            breadcrumb: {
                "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
            },
        },
        {
            "@type": "ItemList",
            "@id": `${getAbsoluteUrl(path, locale)}#itemlist`,
            itemListElement: sales.map((sale, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: sale.title,
                description: sale.subtitle,
                image: sale.imgUrl,
                url: getAbsoluteUrl(sale.bookingUrl, locale),
            })),
        },
        {
            ...buildBreadcrumbSchema(locale, breadcrumbs),
            "@id": `${getAbsoluteUrl(path, locale)}#breadcrumb`,
        },
    ],
});

const getBlogId = () => `${SITE_URL}/blog/#blog`;

const buildPostAuthor = (author?: string) =>
    author
        ? {
              "@type": "Person",
              name: author,
              url: `${SITE_URL}/blog/author/`,
              worksFor: { "@id": getOrganizationId() },
          }
        : { "@id": getOrganizationId() };

export const buildBlogEditorialSchema = () => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "ProfilePage",
            "@id": `${SITE_URL}/blog/author/#webpage`,
            url: `${SITE_URL}/blog/author/`,
            name: `О редакции блога — ${SITE_NAME}`,
            inLanguage: "ru",
            isPartOf: { "@id": getWebsiteId() },
            mainEntity: { "@id": getOrganizationId() },
        },
        {
            ...buildBreadcrumbSchema("ru", [
                { name: "Главная", path: "/" },
                { name: "Блог", path: "/blog/" },
                { name: "Редакция", path: "/blog/author/" },
            ]),
            "@id": `${SITE_URL}/blog/author/#breadcrumb`,
        },
    ],
});

export const buildBlogIndexSchema = ({
    posts,
}: {
    posts: Array<{
        slug: string;
        title: string;
        description: string;
        image: string;
        datePublished: string;
        author?: string;
    }>;
}) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Blog",
            "@id": getBlogId(),
            url: getAbsoluteUrl("/blog/"),
            name: `Блог — ${SITE_NAME}`,
            description:
                "Блог бутик-отеля ACADEMIA Особняк Шувалова: аристократический Петербург, история особняка, гиды по городу.",
            inLanguage: "ru",
            isPartOf: { "@id": getWebsiteId() },
            publisher: { "@id": getOrganizationId() },
            blogPost: posts.map((post) => ({
                "@type": "BlogPosting",
                "@id": `${getAbsoluteUrl(`/blog/${post.slug}/`)}#article`,
                headline: post.title,
                description: post.description,
                image: getAbsoluteUrl(post.image),
                datePublished: post.datePublished,
                url: getAbsoluteUrl(`/blog/${post.slug}/`),
                author: buildPostAuthor(post.author),
            })),
        },
        {
            ...buildBreadcrumbSchema("ru", [
                { name: "Главная", path: "/" },
                { name: "Блог", path: "/blog/" },
            ]),
            "@id": `${getAbsoluteUrl("/blog/")}#breadcrumb`,
        },
    ],
});

export const buildBlogPostingSchema = ({
    slug,
    title,
    description,
    image,
    imageAlt,
    datePublished,
    dateModified,
    author,
    tags,
}: {
    slug: string;
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
    tags?: string[];
}) => {
    const url = getAbsoluteUrl(`/blog/${slug}/`);

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting",
                "@id": `${url}#article`,
                mainEntityOfPage: url,
                url,
                headline: title,
                description,
                image: {
                    "@type": "ImageObject",
                    url: getAbsoluteUrl(image),
                    ...(imageAlt ? { caption: imageAlt } : {}),
                },
                datePublished,
                dateModified: dateModified ?? datePublished,
                inLanguage: "ru",
                author: buildPostAuthor(author),
                publisher: { "@id": getOrganizationId() },
                isPartOf: { "@id": getBlogId() },
                about: { "@id": getHotelId() },
                ...(tags?.length ? { keywords: tags.join(", ") } : {}),
            },
            {
                ...buildBreadcrumbSchema("ru", [
                    { name: "Главная", path: "/" },
                    { name: "Блог", path: "/blog/" },
                    { name: title, path: `/blog/${slug}/` },
                ]),
                "@id": `${url}#breadcrumb`,
            },
        ],
    };
};
