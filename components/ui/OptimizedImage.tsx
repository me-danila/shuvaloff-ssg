import ExportedImage from "next-image-export-optimizer";
import type { ComponentProps } from "react";
import AvifImage from "@/components/ui/AvifImage";
import { developmentMediaSrc } from "@/lib/developmentMedia";

type OptimizedImageProps = ComponentProps<typeof ExportedImage>;

const AVIF_EXTENSION_PATTERN = /\.avif(?=$|\?)/i;
const isDevelopment = process.env.NODE_ENV === "development";

function isAvifSource(src: OptimizedImageProps["src"]) {
    if (typeof src === "string") {
        return AVIF_EXTENSION_PATTERN.test(src);
    }

    if (
        src &&
        typeof src === "object" &&
        "src" in src &&
        typeof src.src === "string"
    ) {
        return AVIF_EXTENSION_PATTERN.test(src.src);
    }

    return false;
}

export default function OptimizedImage(props: OptimizedImageProps) {
    const avifSource = isAvifSource(props.src);
    const sizes =
        props.sizes ??
        (props.fill
            ? "100vw"
            : typeof props.width === "number"
              ? `${props.width}px`
              : undefined);

    const sharedProps = {
        ...props,
        src:
            typeof props.src === "string"
                ? developmentMediaSrc(props.src)
                : props.src,
        placeholder: props.placeholder ?? "empty",
        sizes,
        unoptimized: avifSource ? false : (props.unoptimized ?? isDevelopment),
    };

    if (avifSource) {
        const src = typeof props.src === "string" ? props.src : props.src.src;
        const sourceSrc = developmentMediaSrc(src);
        const basePath = props.basePath ?? "";
        // Remote WEBP counterparts are prepared with the media server's Imagick.
        const fallbackSrc =
            typeof props.src === "string" && /^https?:\/\//.test(src)
                ? src.replace(AVIF_EXTENSION_PATTERN, ".webp")
                : props.src;

        return (
            <AvifImage
                {...sharedProps}
                key={sourceSrc}
                avifSrc={
                    sourceSrc.startsWith("/")
                        ? `${basePath}${sourceSrc}`
                        : sourceSrc
                }
                src={fallbackSrc}
                // Preloading the WEBP <img> would also download it in AVIF browsers.
                priority={false}
                preload={false}
                loading={
                    props.loading ??
                    (props.priority || props.preload ? "eager" : undefined)
                }
                fetchPriority={
                    props.fetchPriority ??
                    (props.priority || props.preload ? "high" : undefined)
                }
            />
        );
    }

    return <ExportedImage {...sharedProps} />;
}
