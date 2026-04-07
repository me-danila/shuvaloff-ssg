import type { Metadata } from "next";
import ContactsSection from "@/components/sections/ContactsSection";
import Divider from "@/components/ui/Divider";
import SalesGrid from "@/components/ui/grids/SalesGrid";
import { FadeUp } from "@/components/ui/Motion";
import TransportSlider from "@/components/ui/TransportSlider";

export const metadata: Metadata = {
    title: "Специальные предложения — ACADEMIA Особняк Шувалова",
    description:
        "Специальные предложения и скидки для гостей отеля ACDEMIA Особняк Шувалова",
};

export default function SalesPage() {
    return (
        <main className="flex flex-col gap-4 xl:gap-10">
            <section className="flex flex-col gap-4 m-6 mb-4 xl:max-w-6xl xl:mx-auto xl:w-full">
                <FadeUp className="md:text-center">
                    <h1>Специальные предложения</h1>
                </FadeUp>
                <SalesGrid />
            </section>
            <section className="mx-6 my-4 xl:max-w-6xl xl:mx-auto xl:w-full flex flex-col gap-6 xl:my-2">
                <FadeUp className="xl:max-w-4xl">
                    <h2 className="xl:text-2xl">
                        Путь в&nbsp;Петербург из&nbsp;Москвы&nbsp;—
                        без&nbsp;лишних забот
                    </h2>
                    <p className="mt-2 hidden md:block">
                        Мы&nbsp;сделали всё, чтобы поездка началась легко:
                        выберите билеты на&nbsp;самолёт или «Сапсан» прямо
                        на&nbsp;сайте&nbsp;— и&nbsp;сосредоточьтесь
                        на&nbsp;главном&nbsp;— предвкушении встречи
                        с&nbsp;городом и&nbsp;с&nbsp;ACADEMIA.
                    </p>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <TransportSlider />
                </FadeUp>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
