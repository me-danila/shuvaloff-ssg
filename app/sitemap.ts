import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { getPublishedEvents } from "@/data/EventsData";
import { AllRooms } from "@/data/RoomsData";
import { AllServices } from "@/data/ServicesData";
import { getAllPosts } from "@/lib/blog";
import { getAbsoluteUrl } from "@/lib/seo/site";

export const dynamic = "force-static";

/**
 * Fallback `lastModified` used when git history is unavailable at build time.
 *
 * The production image is built via Docker and `.dockerignore` excludes `.git`,
 * so `git log` cannot run there — this constant is what actually ships in that
 * build path. Treat it as the primary value and bump it on a major content
 * refresh. Builds that keep `.git` (local / CI) transparently get real
 * per-file commit dates instead.
 */
const FALLBACK_DATE = new Date("2026-07-10T00:00:00Z");

const ROOMS_SOURCE = "data/RoomsData.tsx";
const SERVICES_SOURCE = "data/ServicesData.tsx";
const EVENTS_SOURCE = "data/EventsData.tsx";

/** Memoize git lookups so each source file is shelled out to at most once. */
const gitDateCache = new Map<string, Date>();

/**
 * Last commit date that touched `relPath`, as a Date. Falls back to
 * FALLBACK_DATE when git or `.git` is absent, or the file has no history — so
 * the build never fails (e.g. Docker without `.git`). `relPath` values here are
 * hardcoded literals, never user input.
 */
function gitLastModified(relPath: string): Date {
    const cached = gitDateCache.get(relPath);
    if (cached) return cached;

    let date = FALLBACK_DATE;
    try {
        const iso = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
            cwd: process.cwd(),
            encoding: "utf8",
            stdio: ["ignore", "pipe", "ignore"],
        }).trim();
        if (iso) date = new Date(iso);
    } catch {
        // git / .git unavailable — keep the deterministic fallback.
    }

    gitDateCache.set(relPath, date);
    return date;
}

/** Map a sitemap route path to the page.tsx source file that renders it. */
function routeSourceFile(path: string, locale: "ru" | "en"): string {
    // RU routes live in the app/(ru) route group (URLs unaffected).
    const base = locale === "en" ? "app/en" : "app/(ru)";
    return path === "/" ? `${base}/page.tsx` : `${base}${path}page.tsx`;
}

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
    "/smi/",
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
    "/smi/",
    "/subscriptions/",
    "/spasibo_wedding/",
    "/wedding/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts();

    // The blog index is as fresh as its newest post; an empty blog falls back
    // to the git/constant date of the index template itself.
    const latestPostDate = posts.reduce<Date>((acc, post) => {
        const d = new Date(post.dateModified ?? post.datePublished);
        return d > acc ? d : acc;
    }, new Date(0));
    const blogIndexDate =
        posts.length > 0
            ? latestPostDate
            : gitLastModified("app/(ru)/blog/page.tsx");

    const routes = [
        {
            url: getAbsoluteUrl("/blog/", "ru"),
            lastModified: blogIndexDate,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
        {
            url: getAbsoluteUrl("/blog/author/", "ru"),
            lastModified: gitLastModified("app/(ru)/blog/author/page.tsx"),
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
            lastModified: gitLastModified(routeSourceFile(path, "ru")),
            changeFrequency: "weekly" as const,
            priority: path === "/" ? 1 : 0.8,
        })),
        ...staticEnRoutes.map((path) => ({
            url: getAbsoluteUrl(path, "en"),
            lastModified: gitLastModified(routeSourceFile(path, "en")),
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
            lastModified: gitLastModified(ROOMS_SOURCE),
            changeFrequency: "weekly" as const,
            priority: 0.8,
            images: [room.image.src, ...room.gallery.map((img) => img.src)],
        })),
        ...AllRooms.en.map((room) => ({
            url: getAbsoluteUrl(
                room.isHistorical
                    ? `/rooms/historical/${room.slug}/`
                    : `/rooms/${room.slug}/`,
                "en",
            ),
            lastModified: gitLastModified(ROOMS_SOURCE),
            changeFrequency: "weekly" as const,
            priority: 0.7,
            images: [room.image.src, ...room.gallery.map((img) => img.src)],
        })),
        ...AllServices.ru
            .filter((service) => "slug" in service && service.slug)
            .map((service) => ({
                url: getAbsoluteUrl(`/services/${service.slug}/`, "ru"),
                lastModified: gitLastModified(SERVICES_SOURCE),
                changeFrequency: "weekly" as const,
                priority: 0.7,
                images: [service.imgUrl],
            })),
        ...AllServices.en
            .filter((service) => "slug" in service && service.slug)
            .map((service) => ({
                url: getAbsoluteUrl(`/services/${service.slug}/`, "en"),
                lastModified: gitLastModified(SERVICES_SOURCE),
                changeFrequency: "weekly" as const,
                priority: 0.6,
                images: [service.imgUrl],
            })),
        ...getPublishedEvents("ru").map((event) => ({
            url: getAbsoluteUrl(`/events/${event.slug}/`, "ru"),
            lastModified: gitLastModified(EVENTS_SOURCE),
            changeFrequency: "weekly" as const,
            priority: 0.7,
            images: [event.imgUrl],
        })),
        ...getPublishedEvents("en").map((event) => ({
            url: getAbsoluteUrl(`/events/${event.slug}/`, "en"),
            lastModified: gitLastModified(EVENTS_SOURCE),
            changeFrequency: "weekly" as const,
            priority: 0.6,
            images: [event.imgUrl],
        })),
    ];

    return routes;
}
