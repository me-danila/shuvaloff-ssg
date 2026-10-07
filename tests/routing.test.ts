import { describe, expect, test } from "bun:test";
import {
    detectHtmlLang,
    detectLandingOnlyLocale,
    detectLocaleFromPath,
    hasEnglishVersion,
    isExternalHref,
    landingHref,
    localizeHref,
    normalizePath,
    RU_ONLY_SEGMENTS,
    stripLocalePrefix,
} from "@/lib/i18n/routing";

describe("normalizePath", () => {
    test("strips a single trailing slash", () => {
        expect(normalizePath("/rooms/")).toBe("/rooms");
    });

    test("strips repeated trailing slashes", () => {
        expect(normalizePath("/rooms///")).toBe("/rooms");
    });

    test("leaves a slash-free path untouched", () => {
        expect(normalizePath("/rooms")).toBe("/rooms");
    });

    test("root collapses to '/'", () => {
        expect(normalizePath("/")).toBe("/");
    });

    test("empty string collapses to '/'", () => {
        expect(normalizePath("")).toBe("/");
    });
});

describe("detectLocaleFromPath", () => {
    test("bare /en is english", () => {
        expect(detectLocaleFromPath("/en")).toBe("en");
    });

    test("/en/ is english", () => {
        expect(detectLocaleFromPath("/en/")).toBe("en");
    });

    test("/en/rooms is english", () => {
        expect(detectLocaleFromPath("/en/rooms")).toBe("en");
    });

    test("plain path is russian", () => {
        expect(detectLocaleFromPath("/rooms")).toBe("ru");
    });

    test("root is russian", () => {
        expect(detectLocaleFromPath("/")).toBe("ru");
    });

    test("/enterprise is NOT english (prefix boundary)", () => {
        expect(detectLocaleFromPath("/enterprise")).toBe("ru");
    });
});

describe("stripLocalePrefix", () => {
    test("bare /en -> /", () => {
        expect(stripLocalePrefix("/en")).toBe("/");
    });

    test("/en/ -> /", () => {
        expect(stripLocalePrefix("/en/")).toBe("/");
    });

    test("/en/rooms -> /rooms", () => {
        expect(stripLocalePrefix("/en/rooms")).toBe("/rooms");
    });

    test("preserves a trailing slash on the stripped path", () => {
        expect(stripLocalePrefix("/en/rooms/")).toBe("/rooms/");
    });

    test("plain russian path is unchanged", () => {
        expect(stripLocalePrefix("/rooms")).toBe("/rooms");
    });

    test("/enterprise is not stripped (prefix boundary)", () => {
        expect(stripLocalePrefix("/enterprise")).toBe("/enterprise");
    });

    test("root is unchanged", () => {
        expect(stripLocalePrefix("/")).toBe("/");
    });
});

describe("isExternalHref", () => {
    test.each([
        ["https://example.com/x", true],
        ["http://example.com", true],
        ["mailto:a@b.com", true],
        ["tel:+78125659650", true],
        ["//cdn.example.com/a.png", true],
        ["/rooms", false],
        ["#anchor", false],
        ["rooms", false],
    ])("isExternalHref(%p) === %p", (href, expected) => {
        expect(isExternalHref(href as string)).toBe(expected);
    });
});

describe("localizeHref", () => {
    test("ru locale returns the same internal path", () => {
        expect(localizeHref("/rooms", "ru")).toBe("/rooms");
    });

    test("en locale prefixes with /en", () => {
        expect(localizeHref("/rooms", "en")).toBe("/en/rooms");
    });

    test("root en -> /en/", () => {
        expect(localizeHref("/", "en")).toBe("/en/");
    });

    test("root ru -> /", () => {
        expect(localizeHref("/", "ru")).toBe("/");
    });

    test("re-localizing an /en path to en is idempotent", () => {
        expect(localizeHref("/en/rooms", "en")).toBe("/en/rooms");
    });

    test("de-localizing an /en path to ru drops the prefix", () => {
        expect(localizeHref("/en/rooms", "ru")).toBe("/rooms");
    });

    test("preserves a trailing slash", () => {
        expect(localizeHref("/history/", "en")).toBe("/en/history/");
        expect(localizeHref("/history/", "ru")).toBe("/history/");
    });

    test("preserves the hash fragment", () => {
        expect(localizeHref("/rooms#deluxe", "en")).toBe("/en/rooms#deluxe");
        expect(localizeHref("/rooms#deluxe", "ru")).toBe("/rooms#deluxe");
    });

    test("preserves the query string", () => {
        expect(localizeHref("/rooms?sort=area", "en")).toBe(
            "/en/rooms?sort=area",
        );
    });

    test("preserves query + hash together", () => {
        expect(localizeHref("/rooms?sort=area#top", "en")).toBe(
            "/en/rooms?sort=area#top",
        );
    });

    test.each([
        "https://booking.example.com/reserve",
        "http://example.com",
        "mailto:reservation@academia.spb.ru",
        "tel:+78125659650",
        "//cdn.example.com/a.png",
    ])("leaves external href %p untouched (en)", (href) => {
        expect(localizeHref(href, "en")).toBe(href);
    });

    test("leaves external href untouched (ru)", () => {
        const href = "https://booking.example.com/reserve";
        expect(localizeHref(href, "ru")).toBe(href);
    });
});

describe("hasEnglishVersion", () => {
    test.each(["/", "/rooms", "/services", "/history/", "/en/rooms"])(
        "bilingual path %p has an english version",
        (path) => {
            expect(hasEnglishVersion(path)).toBe(true);
        },
    );

    test.each([
        "/blog",
        "/blog/",
        "/blog/spb-guide",
        "/policy",
        "/policy/cookies",
        "/legal",
        "/legal/terms",
        "/en/blog",
        "/en/policy",
    ])("RU-only path %p has NO english version", (path) => {
        expect(hasEnglishVersion(path)).toBe(false);
    });

    test("/policy exactly matches the RU-only boundary", () => {
        expect(hasEnglishVersion("/policy")).toBe(false);
    });

    test("/policyx does NOT match the boundary (sibling segment)", () => {
        expect(hasEnglishVersion("/policyx")).toBe(true);
    });

    test("/policy/x is inside the RU-only subtree", () => {
        expect(hasEnglishVersion("/policy/x")).toBe(false);
    });

    test("RU_ONLY_SEGMENTS is the expected set", () => {
        expect([...RU_ONLY_SEGMENTS]).toEqual([
            "/blog",
            "/policy",
            "/legal",
            "/consent",
        ]);
    });
});

// INVARIANT: RU-slug <-> EN-slug round-trips for bilingual paths, and RU-only
// paths never claim an english twin.
describe("locale round-trip invariant", () => {
    const bilingual = [
        "/",
        "/rooms",
        "/services",
        "/history/",
        "/contacts",
        "/restaurant",
    ];

    test.each(bilingual)(
        "stripLocalePrefix(localizeHref(%p, 'en')) === %p",
        (path) => {
            expect(stripLocalePrefix(localizeHref(path, "en"))).toBe(path);
        },
    );

    test.each(bilingual)("bilingual path %p has an english version", (path) => {
        expect(hasEnglishVersion(path)).toBe(true);
    });

    test.each([
        "/blog",
        "/policy",
        "/legal",
        "/blog/a-post",
        "/policy/cookies",
    ])("RU-only path %p has no english version", (path) => {
        expect(hasEnglishVersion(path)).toBe(false);
    });
});

describe("landing locales", () => {
    test("landing roots are detected by segment", () => {
        expect(detectLandingOnlyLocale("/it/")).toBe("it");
        expect(detectLandingOnlyLocale("/de")).toBe("de");
        expect(detectLandingOnlyLocale("/italy/")).toBeNull();
        expect(detectLandingOnlyLocale("/en/visit/")).toBeNull();
    });

    test("landing-only paths fall back to en content locale", () => {
        expect(detectLocaleFromPath("/fr/")).toBe("en");
        expect(detectLocaleFromPath("/es")).toBe("en");
    });

    test("html lang is exact for landings, ru/en for the full site", () => {
        expect(detectHtmlLang("/it/")).toBe("it");
        expect(detectHtmlLang("/en/visit/")).toBe("en");
        expect(detectHtmlLang("/rooms/")).toBe("ru");
    });
});

describe("landingHref", () => {
    test("EN landing links to the full EN site", () => {
        expect(landingHref("/booking/?be-offer=1", "en")).toBe(
            "/en/booking/?be-offer=1",
        );
    });

    test("landing-only locales link under their own prefix", () => {
        expect(landingHref("/booking?be-offer=588665", "it")).toBe(
            "/it/booking?be-offer=588665",
        );
        expect(landingHref("/booking/?&be-room=7#x", "de")).toBe(
            "/de/booking/?&be-room=7#x",
        );
    });

    test("drops an existing /en prefix before re-prefixing", () => {
        expect(landingHref("/en/booking/", "fr")).toBe("/fr/booking/");
    });

    test("leaves external links untouched", () => {
        expect(landingHref("https://wa.me/1", "es")).toBe("https://wa.me/1");
    });
});
