import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import Image from "@/components/ui/OptimizedImage";
import remoteImages from "../remoteOptimizedImages.cjs";

function render(src: string, priority = false) {
    return renderToStaticMarkup(
        <Image
            src={src}
            alt="Фото"
            width={600}
            height={400}
            priority={priority}
        />,
    );
}

describe("AVIF with WEBP fallback", () => {
    test("remote AVIF stays the preferred source, fallback uses optimizer WEBP URLs", () => {
        const src =
            "https://academia.spb.ru/wp-content/uploads/2026/07/IMG_8457-1.avif";
        const html = render(src);

        expect(html).toContain(`<source type="image/avif" srcSet="${src}"`);
        expect(html).toMatch(/<img[^>]+srcSet="[^"]+-opt-\d+\.WEBP/);
        expect(html).not.toMatch(/-opt-\d+\.AVIF/);
        expect(html).toContain('alt="Фото"');
        expect(remoteImages).toContain(src.replace(/\.avif$/, ".webp"));
        expect(remoteImages).not.toContain(src);
    });

    test("local and imported AVIF use the same fallback files as the build optimizer", () => {
        expect(render("/images/wau/wau-atama.avif")).toContain(
            "/images/wau/nextImageExportOptimizer/wau-atama-opt-",
        );
        const html = renderToStaticMarkup(
            <Image
                src={{
                    src: "/_next/static/media/photo.123.avif",
                    width: 600,
                    height: 400,
                }}
                alt="Фото"
            />,
        );
        expect(html).toContain('srcSet="/_next/static/media/photo.123.avif"');
        expect(html).toContain("/nextImageExportOptimizer/photo.123-opt-");
        expect(html).toContain(".WEBP");
    });

    test("remote query strings do not break WEBP fallback naming", () => {
        expect(render("https://academia.spb.ru/photo.avif?v=2")).toMatch(
            /<img[^>]+src="\/nextImageExportOptimizer\/\d+-opt-\d+\.WEBP"/,
        );
    });

    test("priority images load eagerly without preloading the unused WEBP", () => {
        const html = render("/images/wau/wau-atama.avif", true);
        expect(html).toContain('loading="eager"');
        expect(html).toContain('fetchPriority="high"');
        expect(html).not.toContain('rel="preload"');
    });

    test("other formats retain their existing markup", () => {
        for (const src of ["/photo.jpg", "/photo.webp", "/logo.svg"]) {
            expect(render(src)).not.toContain("<picture>");
        }
    });
});
