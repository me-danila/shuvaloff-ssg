import type { Room } from "@/data/RoomsData";
import type { Service } from "@/data/ServicesData";
import type { Locale } from "@/lib/i18n/routing";
import {
    BOOKING_URL,
    DEFAULT_OG_IMAGE,
    getAbsoluteUrl,
    getSiteName,
    HOTEL_ADDRESS,
    HOTEL_CONTACTS,
    HOTEL_GEO,
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
            url: SITE_URL,
            logo: `${SITE_URL}/logo.svg`,
            sameAs: SOCIAL_LINKS,
            email: HOTEL_CONTACTS.email,
            telephone: HOTEL_CONTACTS.telephone,
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
            image: DEFAULT_OG_IMAGE,
            description:
                locale === "en"
                    ? "Boutique hotel in a restored 19th-century mansion in central Saint Petersburg."
                    : "Бутик-отель в бережно отреставрированном особняке XIX века в центре Санкт-Петербурга.",
            address: getAddress(locale),
            geo: {
                "@type": "GeoCoordinates",
                latitude: HOTEL_GEO.latitude,
                longitude: HOTEL_GEO.longitude,
            },
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

export const buildCollectionPageSchema = ({
    locale,
    path,
    name,
    description,
    breadcrumbs,
    items,
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
        },
        {
            "@type": "Article",
            "@id": `${getAbsoluteUrl(path, locale)}#article`,
            headline: name,
            description,
            inLanguage: locale,
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
