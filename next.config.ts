import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    transpilePackages: ["next-image-export-optimizer"],
    env: {
        nextImageExportOptimizer_exportFolderPath: "out",
        nextImageExportOptimizer_imageFolderPath: "public",
        nextImageExportOptimizer_remoteImagesFilename:
            "remoteOptimizedImages.cjs",
        nextImageExportOptimizer_remoteImageCacheTTL: "2592000",
        nextImageExportOptimizer_generateAndUseBlurImages: "false",
        nextImageExportOptimizer_quality: "85",
        nextImageExportOptimizer_storePicturesInWEBP: "true",
    },
    images: {
        loader: "custom",
        imageSizes: [64, 128, 256],
        deviceSizes: [640, 1200, 1920],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "academia.spb.ru",
            },
            {
                protocol: "https",
                hostname: "static.academia.spb.ru",
            },
        ],
    },
};

export default nextConfig;
