import ExportedImage from "next-image-export-optimizer";
import type { ComponentProps } from "react";
import { developmentMediaSrc } from "@/lib/developmentMedia";

type OptimizedImageProps = ComponentProps<typeof ExportedImage>;

const AVIF_EXTENSION_PATTERN = /\.avif(?:$|\?)/i;
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
        unoptimized:
            props.unoptimized ?? (isDevelopment || isAvifSource(props.src)),
    };

    return <ExportedImage {...sharedProps} />;
}
