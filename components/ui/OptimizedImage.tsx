import ExportedImage from "next-image-export-optimizer";
import type { ComponentProps } from "react";

type OptimizedImageProps = ComponentProps<typeof ExportedImage>;

const AVIF_EXTENSION_PATTERN = /\.avif(?:$|\?)/i;

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
    return (
        <ExportedImage
            {...props}
            unoptimized={props.unoptimized ?? isAvifSource(props.src)}
        />
    );
}
