import { describe, expect, test } from "bun:test";
import {
    buildBlogPostingSchema,
    buildBreadcrumbSchema,
} from "@/lib/seo/schema";
import { SITE_URL } from "@/lib/seo/site";

// The BlogPosting node is the first entry of the @graph union; narrow it for
// property access in the assertions below (structure asserted at runtime).
type BlogPostingNode = {
    "@type": string;
    "@id": string;
    url: string;
    inLanguage: string;
    datePublished: string;
    dateModified: string;
    image: { "@type": string; url: string };
};

describe("buildBreadcrumbSchema", () => {
    const items = [
        { name: "Главная", path: "/" },
        { name: "Номера", path: "/rooms/" },
    ];

    test("has the stable BreadcrumbList envelope", () => {
        const schema = buildBreadcrumbSchema("ru", items);
        expect(schema["@context"]).toBe("https://schema.org");
        expect(schema["@type"]).toBe("BreadcrumbList");
        expect(Array.isArray(schema.itemListElement)).toBe(true);
        expect(schema.itemListElement).toHaveLength(2);
    });

    test("emits 1-indexed ListItems with absolute russian URLs", () => {
        const schema = buildBreadcrumbSchema("ru", items);
        expect(schema.itemListElement[0]).toEqual({
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: `${SITE_URL}/`,
        });
        expect(schema.itemListElement[1]).toEqual({
            "@type": "ListItem",
            position: 2,
            name: "Номера",
            item: `${SITE_URL}/rooms/`,
        });
    });

    test("localizes item URLs for the en locale", () => {
        const schema = buildBreadcrumbSchema("en", [
            { name: "Home", path: "/" },
            { name: "Rooms", path: "/rooms/" },
        ]);
        expect(schema.itemListElement[0].item).toBe(`${SITE_URL}/en/`);
        expect(schema.itemListElement[1].item).toBe(`${SITE_URL}/en/rooms/`);
    });

    test("empty breadcrumb list yields an empty itemListElement", () => {
        const schema = buildBreadcrumbSchema("ru", []);
        expect(schema.itemListElement).toEqual([]);
    });
});

describe("buildBlogPostingSchema", () => {
    const post = buildBlogPostingSchema({
        slug: "spb-guide",
        title: "Гид по Петербургу",
        description: "Описание поста",
        image: "/blog/cover.jpg",
        datePublished: "2026-01-15",
    });

    test("has the two-node @graph envelope (BlogPosting + breadcrumb)", () => {
        expect(post["@context"]).toBe("https://schema.org");
        expect(Array.isArray(post["@graph"])).toBe(true);
        expect(post["@graph"]).toHaveLength(2);
    });

    test("first node is a BlogPosting keyed off the canonical post URL", () => {
        const posting = post["@graph"][0] as unknown as BlogPostingNode;
        const url = `${SITE_URL}/blog/spb-guide/`;
        expect(posting["@type"]).toBe("BlogPosting");
        expect(posting.url).toBe(url);
        expect(posting["@id"]).toBe(`${url}#article`);
        expect(posting.inLanguage).toBe("ru");
    });

    test("dateModified defaults to datePublished when omitted", () => {
        const posting = post["@graph"][0] as unknown as BlogPostingNode;
        expect(posting.datePublished).toBe("2026-01-15");
        expect(posting.dateModified).toBe("2026-01-15");
    });

    test("image is an absolute ImageObject", () => {
        const posting = post["@graph"][0] as unknown as BlogPostingNode;
        expect(posting.image["@type"]).toBe("ImageObject");
        expect(posting.image.url).toBe(`${SITE_URL}/blog/cover.jpg`);
    });

    test("second node is the matching BreadcrumbList", () => {
        const breadcrumb = post["@graph"][1];
        expect(breadcrumb["@type"]).toBe("BreadcrumbList");
        expect(breadcrumb["@id"]).toBe(
            `${SITE_URL}/blog/spb-guide/#breadcrumb`,
        );
    });

    test("explicit dateModified is respected", () => {
        const withMod = buildBlogPostingSchema({
            slug: "x",
            title: "T",
            description: "D",
            image: "/x.jpg",
            datePublished: "2026-01-01",
            dateModified: "2026-02-02",
        });
        expect(
            (withMod["@graph"][0] as unknown as BlogPostingNode).dateModified,
        ).toBe("2026-02-02");
    });
});
