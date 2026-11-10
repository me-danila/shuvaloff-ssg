"use client";

import ExportedImage from "next-image-export-optimizer";
import { type ComponentProps, useState } from "react";

type AvifImageProps = ComponentProps<typeof ExportedImage> & {
    avifSrc: string;
};

export default function AvifImage({
    avifSrc,
    onError,
    ...props
}: AvifImageProps) {
    const [useAvif, setUseAvif] = useState(true);

    return (
        <picture>
            {useAvif && <source type="image/avif" srcSet={avifSrc} />}
            <ExportedImage
                {...props}
                // Reset the optimizer's internal error state when switching formats.
                key={useAvif ? "avif" : "webp"}
                onError={(event) => {
                    // Some browsers recognize AVIF but cannot decode every AVIF profile.
                    if (useAvif) setUseAvif(false);
                    else onError?.(event);
                }}
            />
        </picture>
    );
}
