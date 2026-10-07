/**
 * Переводы списков: структура (ссылки, фото, slug номеров, кадрирование)
 * берется из EN-словаря, перевод задает только тексты — по индексу.
 */
export function withTexts<T extends object>(
    base: readonly T[],
    texts: readonly Partial<T>[],
): T[] {
    if (base.length !== texts.length) {
        throw new Error(
            `Landing dictionary: ${texts.length} translations for ${base.length} items`,
        );
    }
    return base.map((item, index) => ({ ...item, ...texts[index] }));
}
