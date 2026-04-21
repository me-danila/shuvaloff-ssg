import type { Metadata } from "next";
import RunPage from "@/components/pages/RunPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Ваш утренний маршрут с философией ACADEMIA — ACADEMIA Особняк Шувалова",
    description:
        "Город ещё спит, а вы уже в движении. Тихие улицы, шелест листвы, отражения рассвета в витринах. Маршрут проходит там, где Петербург особенно красив в это время",
    alternates: getLocaleAlternates("/run/", "ru"),
};

export default function Run() {
    return <RunPage locale="ru" />;
}
