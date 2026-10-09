import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import {
    EnvelopeIcon,
    MapPinIcon,
    WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { LANDING_WHATSAPP } from "@/components/landing/constants";
import LandingYandexMap from "@/components/landing/LandingYandexMap";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Motion";
import type { LandingDictionary } from "@/data/landing";
import { type LandingLocale, landingHref } from "@/lib/i18n/routing";
import { HOTEL_CONTACTS } from "@/lib/seo/site";

type ContactLink = {
    href: string;
    label: string;
    Icon: Icon;
    itemProp?: string;
    external?: boolean;
};

/** Отель в Яндекс Картах — как адрес в контактах основного сайта. */
const YANDEX_MAPS_URL =
    "https://yandex.com/maps/org/academia_mansion_shuvaloff/71619247470/";

/**
 * Контакты — разметка ContactsSection основного сайта (заголовок,
 * подзаголовок, строки с иконкой в круге, кнопка), но карта слева, контент
 * справа. Порядок строк: адрес, e-mail, WhatsApp. Карта — Яндекс, как на
 * основном сайте (LandingYandexMap).
 */
export default function LandingContacts({
    dict,
    locale,
}: {
    dict: LandingDictionary["contacts"];
    locale: LandingLocale;
}) {
    const contacts: ContactLink[] = [
        {
            href: YANDEX_MAPS_URL,
            label: dict.address,
            Icon: MapPinIcon,
            itemProp: "hasMap",
            external: true,
        },
        {
            href: `mailto:${HOTEL_CONTACTS.email}`,
            label: HOTEL_CONTACTS.email,
            Icon: EnvelopeIcon,
            itemProp: "email",
        },
        {
            href: LANDING_WHATSAPP.href,
            // Номер не выводим: колтрекинг подменяет номера в тексте, и
            // подпись разошлась бы со ссылкой wa.me.
            label: dict.whatsapp,
            Icon: WhatsappLogoIcon,
            external: true,
        },
    ];

    return (
        <section
            id="contacts"
            className="scroll-mt-16 py-10 xl:py-16"
            itemScope
            itemType="https://schema.org/Hotel"
        >
            <meta itemProp="name" content="ACADEMIA Mansion Shuvaloff" />
            <meta itemProp="telephone" content={HOTEL_CONTACTS.telephone} />
            <div className="flex flex-col gap-4 xl:mx-auto xl:max-w-7xl xl:flex-row xl:items-center xl:gap-16">
                {/* Карта — слева на десктопе, под контактами на мобиле. */}
                <LandingYandexMap
                    alt={dict.mapTitle}
                    address={dict.address}
                    className="relative order-last h-64 w-full overflow-hidden xl:order-first xl:h-95 xl:w-185 xl:shrink-0"
                />

                <div className="mx-6 my-4 flex flex-col gap-2 xl:mx-0 xl:my-8 xl:min-w-84">
                    <FadeUp>
                        <h2>{dict.title}</h2>
                    </FadeUp>
                    <p className="my-2">{dict.subtitle}</p>
                    {contacts.map(
                        ({
                            href,
                            label,
                            Icon: ContactIcon,
                            itemProp,
                            external,
                        }) => (
                            <a
                                key={href}
                                href={href}
                                target={external ? "_blank" : undefined}
                                rel={
                                    external ? "noopener noreferrer" : undefined
                                }
                                itemProp={itemProp}
                                className="group my-1 flex items-center gap-4"
                            >
                                <span className="rounded-full border border-zinc-300 p-3 transition-colors group-hover:border-zinc-600">
                                    <ContactIcon
                                        size={14}
                                        className="text-zinc-500 transition-colors group-hover:text-zinc-900"
                                    />
                                </span>
                                <p>{label}</p>
                            </a>
                        ),
                    )}
                    <Button
                        href={landingHref("/booking/", locale)}
                        variant="primary"
                        className="mt-2 xl:mt-4"
                    >
                        {dict.book}
                    </Button>
                </div>
            </div>
        </section>
    );
}
