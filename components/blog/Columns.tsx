import type { ReactNode } from "react";

/**
 * Колонки внутри статьи. Каждый прямой ребёнок — колонка.
 * На мобильных складываются в одну колонку.
 */
export default function Columns({ children }: { children: ReactNode }) {
    return (
        <div className="my-6 grid gap-6 md:grid-cols-2 md:gap-10">
            {children}
        </div>
    );
}
