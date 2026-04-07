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
    const sizes =
        props.sizes ??
        (props.fill
            ? "100vw"
            : typeof props.width === "number"
              ? `${props.width}px`
              : undefined);

    return (
        <ExportedImage
            {...props}
            placeholder={props.placeholder ?? "empty"}
            sizes={sizes}
            unoptimized={props.unoptimized ?? isAvifSource(props.src)}
        />
    );
}
