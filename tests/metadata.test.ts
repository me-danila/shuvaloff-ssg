import { describe, expect, test } from "bun:test";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

describe("getLocaleAlternates — bilingual pages", () => {
    test("ru locale: canonical is the russian path", () => {
        const alt = getLocaleAlternates("/rooms", "ru");
        expect(alt.canonical).toBe("/rooms/");
        expect(alt.languages).toEqual({
            ru: "/rooms/",
            en: "/en/rooms/",
            "x-default": "/rooms/",
        });
    });

    test("en locale: canonical is the english path", () => {
        const alt = getLocaleAlternates("/rooms", "en");
        expect(alt.canonical).toBe("/en/rooms/");
        // x-default always points at the russian page.
        expect(alt.languages).toEqual({
            ru: "/rooms/",
            en: "/en/rooms/",
            "x-default": "/rooms/",
        });
    });

    test("accepts an already-prefixed /en path (canonical still per locale)", () => {
        const alt = getLocaleAlternates("/en/rooms", "en");
        expect(alt.canonical).toBe("/en/rooms/");
        expect(alt.languages.ru).toBe("/rooms/");
        expect(alt.languages.en).toBe("/en/rooms/");
    });

    test("adds a trailing slash to a slash-free input", () => {
        const alt = getLocaleAlternates("/services", "ru");
        expect(alt.canonical).toBe("/services/");
        expect(alt.languages.en).toBe("/en/services/");
    });

    test("root ru", () => {
        const alt = getLocaleAlternates("/", "ru");
        expect(alt.canonical).toBe("/");
        expect(alt.languages).toEqual({
            ru: "/",
            en: "/en/",
            "x-default": "/",
        });
    });

    test("root en", () => {
        const alt = getLocaleAlternates("/", "en");
        expect(alt.canonical).toBe("/en/");
        expect(alt.languages.ru).toBe("/");
        expect(alt.languages.en).toBe("/en/");
        expect(alt.languages["x-default"]).toBe("/");
    });
});

describe("getLocaleAlternates — RU-only pages", () => {
    test("emits ru + x-default only, no en hreflang", () => {
        const alt = getLocaleAlternates("/policy", "ru");
        expect(alt.canonical).toBe("/policy/");
        expect(alt.languages).toEqual({
            ru: "/policy/",
            "x-default": "/policy/",
        });
        expect(alt.languages).not.toHaveProperty("en");
    });

    test("stays RU-only even when asked for the en locale", () => {
        const alt = getLocaleAlternates("/blog", "en");
        // No /en/ twin exists: canonical falls back to the russian page.
        expect(alt.canonical).toBe("/blog/");
        expect(alt.languages).not.toHaveProperty("en");
        expect(alt.languages["x-default"]).toBe("/blog/");
    });

    test("nested RU-only path", () => {
        const alt = getLocaleAlternates("/blog/spb-guide", "ru");
        expect(alt.canonical).toBe("/blog/spb-guide/");
        expect(alt.languages).not.toHaveProperty("en");
    });
});
