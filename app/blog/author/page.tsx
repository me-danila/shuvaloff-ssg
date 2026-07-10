import type { Metadata } from "next";
import Link from "next/link";
import ContactsSection from "@/components/sections/ContactsSection";
import StructuredData from "@/components/seo/StructuredData";
import Divider from "@/components/ui/Divider";
import { getLocaleAlternates } from "@/lib/i18n/metadata";
import { buildBlogEditorialSchema } from "@/lib/seo/schema";

const TITLE = "О редакции блога — ACADEMIA Особняк Шувалова";
const DESCRIPTION =
    "Кто пишет блог бутик-отеля ACADEMIA Особняк Шувалова: команда отеля — консьержи, историки и рестораторы, которые знают аристократический Петербург изнутри.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: getLocaleAlternates("/blog/author/", "ru"),
};

export default function EditorialPage() {
    return (
        <main className="v2-fonts">
            <StructuredData data={buildBlogEditorialSchema()} />
            <div className="mx-6 mt-6 mb-12 md:mx-auto md:w-full md:max-w-3xl xl:mt-10">
                <nav
                    aria-label="Хлебные крошки"
                    className="flex flex-wrap items-center gap-x-2 gap-y-1 text-brand-brown/60 text-xs uppercase tracking-wide"
                >
                    <Link href="/" className="hover:text-brand-red">
                        Главная
                    </Link>
                    <span aria-hidden="true">/</span>
                    <Link href="/blog/" className="hover:text-brand-red">
                        Блог
                    </Link>
                    <span aria-hidden="true">/</span>
                    <span>Редакция</span>
                </nav>
                <h1 className="mt-4 normal-case">О редакции</h1>
                <div className="mt-6 flex flex-col gap-4">
                    <p>
                        Блог ведёт команда бутик-отеля ACADEMIA Особняк
                        Шувалова: консьержи, которые ежедневно составляют
                        маршруты для гостей, знатоки истории особняка
                        и&nbsp;рестораторы Графской кухни.
                    </p>
                    <p>
                        Мы пишем о&nbsp;том, что знаем из&nbsp;первых рук:
                        аристократический Петербург, история рода Шуваловых
                        и&nbsp;особняка на&nbsp;Моховой, 10, маршруты
                        по&nbsp;городу, сезонные события и&nbsp;традиции
                        гостеприимства.
                    </p>
                    <p>
                        Вопросы и&nbsp;предложения по&nbsp;материалам блога:{" "}
                        <a
                            href="mailto:reservation@academia.spb.ru"
                            className="text-brand-red underline underline-offset-4"
                        >
                            reservation@academia.spb.ru
                        </a>
                    </p>
                    <p>
                        <Link
                            href="/blog/"
                            className="text-brand-red underline underline-offset-4"
                        >
                            Все статьи блога
                        </Link>
                    </p>
                </div>
            </div>
            <Divider />
            <ContactsSection />
        </main>
    );
}
