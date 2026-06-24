import type { Metadata } from "next";
import localFont from "next/font/local";
import HomePageV2 from "@/components/pages/HomePageV2";

const historyPro = localFont({
    src: [
        {
            path: "../../public/fonts/History-Pro.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/History-Pro-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-history",
    display: "swap",
});

const centuryGothic = localFont({
    src: [
        {
            path: "../../public/fonts/CenturyGothic.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/CenturyGothic-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/CenturyGothic-Italic.woff2",
            weight: "400",
            style: "italic",
        },
    ],
    variable: "--font-century",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Отель ACADEMIA Особняк Шувалова — Санкт-Петербург (тест)",
    description:
        "Тестовая версия дизайна главной страницы — отель в историческом особняке XIX века в центре Санкт-Петербурга",
    robots: { index: false, follow: false },
};

export default function Page() {
    return (
        <div
            className={`${historyPro.variable} ${centuryGothic.variable} v2-fonts`}
        >
            <HomePageV2 locale="ru" />
        </div>
    );
}
