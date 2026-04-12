import type { Metadata } from "next";
import WeddingPage from "@/components/pages/WeddingPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Свадебный банкет в отеле в Санкт-Петербурге",
    description:
        "Планируете свадебный банкет в особенной атмосфере? Наш отель в Санкт-Петербурге предлагает идеальную площадку для камерной, стильной и уютной свадьбы. У нас вы можете заказать свадебный банкет с рестораном, авторским меню и обслуживанием премиум-класса.",
    alternates: getLocaleAlternates("/wedding/", "ru"),
};

export default function Wedding() {
    return <WeddingPage locale="ru" />;
}
