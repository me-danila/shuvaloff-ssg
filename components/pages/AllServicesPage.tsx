import ContactsSection from "@/components/sections/ContactsSection";
import StructuredData from "@/components/seo/StructuredData";
import Divider from "@/components/ui/Divider";
import ServicesGrid from "@/components/ui/grids/ServicesGrid";
import { FadeUp } from "@/components/ui/Motion";
import { AllServices } from "@/data/ServicesData";
import type { Locale } from "@/lib/i18n/routing";
import { buildCollectionPageSchema } from "@/lib/seo/schema";

type AllServicesCopy = {
    title: string;
    subtitle: string;
    description: React.ReactNode;
};

const copyByLocale: Record<Locale, AllServicesCopy> = {
    ru: {
        title: "Мир ACADEMIA",
        subtitle: "Дополнительные услуги",
        description: (
            <>
                В&nbsp;&laquo;Цифровой книге гостя&raquo; вы&nbsp;можете
                подробно ознакомиться со&nbsp;всеми услугами, удобствами
                и&nbsp;возможностями, которые сделают ваше пребывание
                в&nbsp;ACADEMIA еще комфортнее и&nbsp;приятнее. Мы&nbsp;собрали
                здесь все, чтобы сделать ваше путешествие именно таким, как
                нужно&nbsp;вам.
            </>
        ),
    },
    en: {
        title: "The ACADEMIA World",
        subtitle: "Additional Services",
        description: (
            <>
                In the "Digital Guest Book" you can find detailed information
                about all the services, amenities, and opportunities that will
                make your stay at ACADEMIA even more comfortable and pleasant.
                We have gathered everything here to make your journey exactly as
                you need it.
            </>
        ),
    },
};

export default function AllServicesPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const services = AllServices[locale].filter((service) => service.slug);

    return (
        <main
            className="flex flex-col gap-8"
            itemScope
            itemType="https://schema.org/CollectionPage"
        >
            <StructuredData
                data={buildCollectionPageSchema({
                    locale,
                    path: "/services/all/",
                    name:
                        locale === "ru"
                            ? "Все услуги отеля"
                            : "All hotel services",
                    description:
                        locale === "ru"
                            ? "Полный каталог дополнительных услуг отеля ACADEMIA Особняк Шувалова."
                            : "Full catalogue of additional services at ACADEMIA Mansion Shuvaloff.",
                    breadcrumbs: [
                        {
                            name: locale === "ru" ? "Главная" : "Home",
                            path: "/",
                        },
                        {
                            name: locale === "ru" ? "Услуги" : "Services",
                            path: "/services/",
                        },
                        {
                            name:
                                locale === "ru" ? "Все услуги" : "All services",
                            path: "/services/all/",
                        },
                    ],
                    items: services.map((service) => ({
                        name: service.title,
                        path: `/services/${service.slug}/`,
                        image: service.imgUrl,
                        description: service.subtitle,
                    })),
                })}
            />
            <section className="flex flex-col gap-4 m-6 xl:max-w-4xl xl:mx-auto">
                <FadeUp className="xl:text-center">
                    <h1>{copy.title}</h1>
                </FadeUp>
                <FadeUp
                    delay={0.1}
                    className="-mt-2 font-alistair text-2xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:text-center xl:-mt-4"
                >
                    {copy.subtitle}
                </FadeUp>
                <FadeUp
                    delay={0.2}
                    className="mb-2 xl:mb-8 xl:mt-2 xl:text-center"
                >
                    <p>{copy.description}</p>
                </FadeUp>
            </section>
            <section className="bg-brand-light py-8 xl:py-12">
                <div className="mx-6 xl:max-w-7xl xl:mx-auto xl:w-full">
                    <ServicesGrid locale={locale} />
                </div>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
