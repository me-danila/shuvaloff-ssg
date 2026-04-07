import type { Metadata } from "next";
import ContactsSection from "@/components/sections/ContactsSection";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";

export const metadata: Metadata = {
    title: "Правовая информация — ACADEMIA Особняк Шувалова",
    description: "Реквизиты и правовая информация ACADEMIA Особняк Шувалова",
};

const links = [
    {
        label: "Правила посещения СПА",
        href: "https://static.academia.spb.ru/files/spa-rules.pdf",
    },
    {
        label: "Визовая поддержка",
        href: "https://www.bpltech.pro/guest_form/add/175a67939d61a46c4228b74d23823863/1/start/english/no#bplformtopiframewindow",
    },
];

const docLinks = [
    {
        label: "Договор оферты СПА",
        href: "https://static.academia.spb.ru/files/spa-oferta.pdf",
    },
    {
        label: "Политика в отношении обработки персональных данных",
        href: "/policy/",
    },
    {
        label: "Пользовательское соглашение",
        href: "https://static.academia.spb.ru/files/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0_%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_%D1%81%D0%B0%D0%B9%D1%82%D0%BE%D0%BC_academia_shuvaloff_ru.pdf",
    },
];

export default function LegalPage() {
    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-6 m-6 xl:w-full xl:max-w-6xl xl:mx-auto">
                <FadeUp className="md:text-center my-4">
                    <h1>Правовая информация</h1>
                </FadeUp>

                <div className="flex flex-col xl:flex-row-reverse xl:items-start gap-6 xl:gap-8">
                    {/* Сертификат */}
                    <FadeUp className="w-full xl:flex-1">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/03/cert.png"
                            alt="Свидетельство о присвоении категории звёзд"
                            width={800}
                            height={1100}
                            priority
                            sizes="(max-width: 1280px) 100vw, 50vw"
                            className="w-full h-auto rounded-md"
                        />
                    </FadeUp>

                    {/* Реквизиты и ссылки */}
                    <FadeUp
                        delay={0.1}
                        className="flex flex-col gap-6 xl:flex-1 xl:self-stretch"
                    >
                        <div className="flex flex-col gap-1">
                            <p>ООО «ОТЕЛЬ АКАДЕМИЯ ОСОБНЯК ШУВАЛОВА»</p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>ИНН: 7840109542</p>
                            <p>ОГРН: 1237800123967</p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>Юридический адрес:</p>
                            <p>
                                г Санкт-Петербург, ул. Моховая д.10 стр. 1 пом.
                                15-н, 16-н
                            </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>
                                Реквизиты в ФИЛИАЛ «САНКТ-ПЕТЕРБУРГСКИЙ» АО
                                «АЛЬФА-БАНК»
                            </p>
                            <p>Номер счета: 40702810732060016606</p>
                            <p>БИК: 044030786</p>
                            <p>К/с: 30101810600000000786</p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>
                                Генеральный директор: Волвенкова Ирина Ивановна
                            </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>
                                Номер записи в Едином реестре объектов
                                классификации:{" "}
                                <a
                                    href="https://tourism.fsa.gov.ru/ru/resorts/hotels/dff23e3a-c607-11ef-92da-8bd9107bdd5a/about-resort"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    С782024020085
                                </a>{" "}
                                действует до: 20.08.2028
                            </p>
                        </div>

                        <Button
                            href="https://static.academia.spb.ru/files/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B6%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20ACADEMIA%20%D0%9E%D1%81%D0%BE%D0%B1%D0%BD%D1%8F%D0%BA%20SHUVALOFF.pdf"
                            target="_blank"
                            variant="primary"
                            className="self-start xl:mt-auto"
                        >
                            Правила проживания
                        </Button>

                        <div className="flex flex-col gap-3 mt-auto">
                            {links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 uppercase text-sm"
                                >
                                    {link.label}
                                    <span className="text-xl">&rsaquo;</span>
                                </a>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2 pt-2 border-t border-stone-200">
                            {docLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm underline"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </FadeUp>
                </div>
            </section>

            <Divider />
            <ContactsSection />
        </main>
    );
}
