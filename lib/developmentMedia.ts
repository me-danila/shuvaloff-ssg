/** Только dev: браузер получает внешние медиа через тот же адрес, что и страницу. */
export const DEVELOPMENT_MEDIA_ORIGINS = {
    academia: "https://academia.spb.ru",
    static: "https://static.academia.spb.ru",
    tilda: "https://static.tildacdn.com",
} as const;

export function developmentMediaSrc(src: string): string {
    if (process.env.NODE_ENV !== "development") return src;

    for (const [key, origin] of Object.entries(DEVELOPMENT_MEDIA_ORIGINS)) {
        if (src.startsWith(`${origin}/`)) {
            return `/__preview-media/${key}${src.slice(origin.length)}`;
        }
    }

    return src;
}
