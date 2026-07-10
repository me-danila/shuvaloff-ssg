import type { MetadataRoute } from "next";
import { AllEvents } from "@/data/EventsData";
import { AllRooms } from "@/data/RoomsData";
import { AllServices } from "@/data/ServicesData";
import { getAllPosts } from "@/lib/blog";
import { getAbsoluteUrl } from "@/lib/seo/site";

export const dynamic = "force-static";

const staticRuRoutes = [
    "/",
    "/aristocratic-spb/",
    "/booking/",
    "/events/",
    "/history/",
    "/legal/",
    "/policy/",
    "/rewards/",
    "/rewards/referral/",
    "/rooms/",
    "/rooms/historical/",
    "/run/",
    "/reviews/",
    "/sales/",
    "/sales/aeroflot/",
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
    "/events/",
    "/history/",
    "/rewards/",
    "/rewards/referral/",
    "/reviews/",
    "/rooms/",
    "/rooms/historical/",
    "/run/",
    "/sales/",
    "/sales/aeroflot/",
    "/services/",
    "/services/all/",
    "/subscriptions/",
    "/spasibo_wedding/",
    "/wedding/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();
    const posts = await getAllPosts();

    const routes = [
        {
            url: getAbsoluteUrl("/blog/", "ru"),
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
        {
            url: getAbsoluteUrl("/blog/author/", "ru"),
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.3,
        },
        ...posts.map((post) => ({
            url: getAbsoluteUrl(`/blog/${post.slug}/`, "ru"),
            lastModified: new Date(post.dateModified ?? post.datePublished),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
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
        ...AllEvents.ru.map((event) => ({
            url: getAbsoluteUrl(`/events/${event.slug}/`, "ru"),
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.7,
        })),
        ...AllEvents.en.map((event) => ({
            url: getAbsoluteUrl(`/events/${event.slug}/`, "en"),
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.6,
        })),
    ];

    return routes;
}
