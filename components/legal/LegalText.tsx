import type { ReactNode } from "react";
import { nbsp } from "@/lib/typography";

const LINK_CLASS =
    "text-brand-red underline underline-offset-4 hover:text-brand-red-dark";

/** Почта и адреса сайтов внутри юридического текста становятся ссылками. */
const LINK_PATTERN = /(https?:\/\/[^\s,;)]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;

/**
 * Абзац юридического документа: неразрывные пробелы по правилам русской
 * типографики плюс кликабельные почта и адреса сайтов. Текст приходит из
 * data/* обычными строками и не содержит разметки.
 */
export function legalText(text: string): ReactNode[] {
    return text.split(LINK_PATTERN).map((part, index) => {
        const key = `${index}-${part.slice(0, 24)}`;

        if (part.includes("@") && !part.startsWith("http")) {
            return (
                <a key={key} href={`mailto:${part}`} className={LINK_CLASS}>
                    {part}
                </a>
            );
        }

        if (part.startsWith("http")) {
            const href = part.replace(/[.,;]$/, "");
            return (
                <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                >
                    {href}
                </a>
            );
        }

        return <span key={key}>{nbsp(part)}</span>;
    });
}
