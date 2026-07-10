import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import NotFoundPage from "@/components/pages/NotFoundPage";

export const metadata: Metadata = {
    title: "Page not found / Страница не найдена — ACADEMIA Mansion Shuvaloff",
    description:
        "The requested page could not be found / Запрашиваемая страница не найдена",
};

// Global 404 (out/404.html) renders in the root layout, which no longer holds
// the chrome — wrap it in the RU shell explicitly. The /en 404 is handled by
// app/en/not-found.tsx inside app/en/layout.tsx (EN shell) automatically.
export default function NotFound() {
    return (
        <SiteShell locale="ru">
            <NotFoundPage locale="ru" />
        </SiteShell>
    );
}
