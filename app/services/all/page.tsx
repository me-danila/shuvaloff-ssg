import type { Metadata } from "next";
import ContactsSection from "@/components/sections/ContactsSection";
import Divider from "@/components/ui/Divider";
import ServicesGrid from "@/components/ui/grids/ServicesGrid";

export const metadata: Metadata = {
    title: "Все услуги — ACADEMIA Особняк Шувалова",
    description:
        "Полный каталог дополнительных услуг и возможностей для гостей ACADEMIA Особняк Шувалова",
};

export default function AllServices() {
    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-4 m-6 xl:max-w-6xl xl:mx-auto">
                <h1 className="xl:text-center">Мир ACADEMIA</h1>
                <p className="-mt-2 font-alistair text-2xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:text-center xl:-mt-4">
                    Дополнительные услуги
                </p>
                <p className="mb-2 xl:mb-8 xl:mt-2 xl:text-center">
                    В&nbsp;&laquo;Цифровой книге гостя&raquo; вы&nbsp;можете
                    подробно ознакомиться со&nbsp;всеми услугами, удобствами
                    и&nbsp;возможностями, которые сделают ваше пребывание
                    в&nbsp;ACADEMIA еще комфортнее и&nbsp;приятнее.
                    Мы&nbsp;собрали здесь все, чтобы сделать ваше путешествие
                    именно таким, как нужно&nbsp;вам.
                </p>
                <ServicesGrid />
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
