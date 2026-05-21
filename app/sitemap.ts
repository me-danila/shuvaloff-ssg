import type { MetadataRoute } from "next";
import { AllRooms } from "@/data/RoomsData";
import { AllServices } from "@/data/ServicesData";
import { getAbsoluteUrl } from "@/lib/seo/site";

export const dynamic = "force-static";

const staticRuRoutes = [
    "/",
    "/aristocratic-spb/",
    "/booking/",
    "/history/",
    "/legal/",
    "/policy/",
    "/rewards/",
    "/rooms/",
    "/rooms/historical/",
    "/run/",
    "/sales/",
    "/services/",
    "/services/all/",
    "/subscriptions/",
    "/spasibo_wedding/",
    "/wedding/",
];

const staticEnRoutes = [
    "/",
    "/aristocratic-spb/",
    "/booking/",
    "/history/",
    "/rewards/",
    "/rooms/",
    "/rooms/historical/",
    "/run/",
    "/sales/",
    "/services/",
    "/services/all/",
    "/subscriptions/",
    "/spasibo_wedding/",
    "/wedding/",
];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const routes = [
        ...staticRuRoutes.map((path) => ({
            url: getAbsoluteUrl(path, "ru"),
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: path === "/" ? 1 : 0.8,
        })),
        ...staticEnRoutes.map((path) => ({
            url: getAbsoluteUrl(path, "en"),
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: path === "/" ? 0.9 : 0.7,
        })),
        ...AllRooms.ru.map((room) => ({
            url: getAbsoluteUrl(
                room.isHistorical
                    ? `/rooms/historical/${room.slug}/`
                    : `/rooms/${room.slug}/`,
                "ru",
            ),
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        })),
        ...AllRooms.en.map((room) => ({
            url: getAbsoluteUrl(
                room.isHistorical
                    ? `/rooms/historical/${room.slug}/`
                    : `/rooms/${room.slug}/`,
                "en",
            ),
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.7,
        })),
        ...AllServices.ru
            .filter((service) => "slug" in service && service.slug)
            .map((service) => ({
                url: getAbsoluteUrl(`/services/${service.slug}/`, "ru"),
                lastModified: now,
                changeFrequency: "weekly" as const,
                priority: 0.7,
            })),
        ...AllServices.en
            .filter((service) => "slug" in service && service.slug)
            .map((service) => ({
                url: getAbsoluteUrl(`/services/${service.slug}/`, "en"),
                lastModified: now,
                changeFrequency: "weekly" as const,
                priority: 0.6,
            })),
    ];

    return routes;
}
