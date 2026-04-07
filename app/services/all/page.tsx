import type { Metadata } from "next";
import ContactsSection from "@/components/sections/ContactsSection";
import Divider from "@/components/ui/Divider";
import ServicesGrid from "@/components/ui/grids/ServicesGrid";
import { FadeUp } from "@/components/ui/Motion";

export const metadata: Metadata = {
    title: "Все услуги — ACADEMIA Особняк Шувалова",
    description:
        "Полный каталог дополнительных услуг и возможностей для гостей ACADEMIA Особняк Шувалова",
};

export default function AllServices() {
    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-4 m-6 xl:max-w-6xl xl:mx-auto">
                <FadeUp className="xl:text-center">
                    <h1>Мир ACADEMIA</h1>
                </FadeUp>
                <FadeUp
                    delay={0.1}
                    className="-mt-2 font-alistair text-2xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:text-center xl:-mt-4"
                >
                    Дополнительные услуги
                </FadeUp>
                <FadeUp
                    delay={0.2}
                    className="mb-2 xl:mb-8 xl:mt-2 xl:text-center"
                >
                    <p>
                        В&nbsp;&laquo;Цифровой книге гостя&raquo; вы&nbsp;можете
                        подробно ознакомиться со&nbsp;всеми услугами, удобствами
                        и&nbsp;возможностями, которые сделают ваше пребывание
                        в&nbsp;ACADEMIA еще комфортнее и&nbsp;приятнее.
                        Мы&nbsp;собрали здесь все, чтобы сделать ваше
                        путешествие именно таким, как нужно&nbsp;вам.
                    </p>
                </FadeUp>
                <ServicesGrid />
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
