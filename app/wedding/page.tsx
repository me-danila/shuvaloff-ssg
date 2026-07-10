import type { Metadata } from "next";
import WeddingPage from "@/components/pages/WeddingPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/wedding/",
    title: "Свадебный банкет в отеле в Санкт-Петербурге",
    description:
        "Планируете свадебный банкет в особенной атмосфере? Наш отель в Санкт-Петербурге предлагает идеальную площадку для камерной, стильной и уютной свадьбы. У нас вы можете заказать свадебный банкет с рестораном, авторским меню и обслуживанием премиум-класса.",
});

export default function Wedding() {
    return <WeddingPage locale="ru" />;
}
