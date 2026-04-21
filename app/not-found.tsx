import type { Metadata } from "next";
import NotFoundPage from "@/components/pages/NotFoundPage";

export const metadata: Metadata = {
    title: "Page not found / Страница не найдена — ACADEMIA Mansion Shuvaloff",
    description:
        "The requested page could not be found / Запрашиваемая страница не найдена",
};

export default function NotFound() {
    return <NotFoundPage />;
}
