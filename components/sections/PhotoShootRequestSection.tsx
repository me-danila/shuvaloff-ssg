"use client";

// Секция «Заявка на фотосъемку» для страницы /photo-shoot/.
// Пока форма — плейсхолдер: данные никуда не отправляются (submit только
// preventDefault). Фото справа — заполнитель. Когда появятся бэкенд-обработчик
// и реальное фото, заменить handleSubmit и блок с заполнителем.

import {
    CalendarBlankIcon,
    CaretDownIcon,
} from "@phosphor-icons/react/dist/ssr";
import { type ReactNode, useState } from "react";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/routing";

const PHOTO_SRC =
    "https://academia.spb.ru/wp-content/uploads/2026/07/IMG_7033-2.jpg";

type RequestCopy = {
    title: ReactNode;
    formIntro: string;
    datePlaceholder: string;
    residencePlaceholder: string;
    residenceOptions: string[];
    namePlaceholder: string;
    phonePlaceholder: string;
    contactPlaceholder: string;
    contactOptions: string[];
    requiredNote: string;
    submit: string;
    photoAlt: string;
    successTitle: string;
    successText: ReactNode;
};

const copyByLocale: Record<Locale, RequestCopy> = {
    ru: {
        // Заголовок оттипографирован: неразрывный пробел после предлога «на».
        title: "Заявка на фотосъемку",
        formIntro: "Заполните форму, чтобы оставить заявку",
        datePlaceholder: "Укажите желаемую дату",
        residencePlaceholder: "Выбрать резиденцию",
        residenceOptions: ["Резиденция Дашковой", "Резиденция графа Шувалова"],
        namePlaceholder: "Ваше имя*",
        phonePlaceholder: "Ваш телефон*",
        contactPlaceholder: "Предпочитаемый способ связи",
        contactOptions: ["Telegram", "WhatsApp", "MAX", "Звонок"],
        requiredNote: "*поле обязательное для заполнения",
        submit: "Оставить заявку",
        photoAlt: "Фотосъемка в интерьерах особняка Шувалова",
        successTitle: "Спасибо!",
        successText: (
            <>
                Мы позвоним вам,
                <br />
                чтобы подтвердить дату и время
                <br />в течение 10 минут!
            </>
        ),
    },
    en: {
        title: "Photoshoot request",
        formIntro: "Fill in the form to leave a request",
        datePlaceholder: "Choose a preferred date",
        residencePlaceholder: "Choose a residence",
        residenceOptions: ["Dashkova Residence", "Count Shuvalov Residence"],
        namePlaceholder: "Your name*",
        phonePlaceholder: "Your phone*",
        contactPlaceholder: "Preferred contact method",
        contactOptions: ["Telegram", "WhatsApp", "MAX", "Phone call"],
        requiredNote: "*required field",
        submit: "Leave a request",
        photoAlt: "Photoshoot in the interiors of the Shuvaloff Mansion",
        successTitle: "Thank you!",
        successText: (
            <>
                We will call you to confirm
                <br />
                the date and time within 10 minutes!
            </>
        ),
    },
};

const fieldClass =
    "w-full rounded-md bg-white px-5 py-4 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none focus:ring focus:ring-neutral-300 transition";

export default function PhotoShootRequestSection({
    locale,
}: {
    locale: Locale;
}) {
    const copy = copyByLocale[locale];
    const [submitted, setSubmitted] = useState(false);

    // Плейсхолдер: данные никуда не шлём, просто показываем экран «Спасибо».
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section className="px-6 xl:px-0 xl:py-4">
            <div className="mx-auto max-w-7xl">
                <FadeUp>
                    <h2 className="text-center uppercase text-[#372a24]">
                        {copy.title}
                    </h2>
                </FadeUp>

                <FadeUp className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-stretch xl:mt-10 xl:gap-10">
                    {/* Левая колонка — форма (плейсхолдер) / экран «Спасибо».
                        Форма всегда в потоке и держит высоту карточки; после
                        сабмита прячется (invisible), а поверх абсолютом ложится
                        экран «Спасибо» — размеры секции и фото не прыгают. */}
                    <div className="relative rounded-lg bg-[#ededeb] p-6 xl:p-10">
                        <div
                            className={submitted ? "invisible" : ""}
                            aria-hidden={submitted}
                        >
                            <p className="text-center text-[#372a24]">
                                {copy.formIntro}
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                noValidate
                                className="mt-6 flex flex-col gap-3"
                            >
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={copy.datePlaceholder}
                                        aria-label={copy.datePlaceholder}
                                        onFocus={(e) => {
                                            e.currentTarget.type = "date";
                                        }}
                                        className={`${fieldClass} pr-12`}
                                    />
                                    <CalendarBlankIcon
                                        size={18}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                                    />
                                </div>

                                <div className="relative">
                                    <select
                                        aria-label={copy.residencePlaceholder}
                                        defaultValue=""
                                        className={`${fieldClass} cursor-pointer appearance-none pr-12`}
                                    >
                                        <option value="" disabled>
                                            {copy.residencePlaceholder}
                                        </option>
                                        {copy.residenceOptions.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                    <CaretDownIcon
                                        size={16}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder={copy.namePlaceholder}
                                    aria-label={copy.namePlaceholder}
                                    className={fieldClass}
                                />

                                <input
                                    type="tel"
                                    placeholder={copy.phonePlaceholder}
                                    aria-label={copy.phonePlaceholder}
                                    className={fieldClass}
                                />

                                <div className="relative">
                                    <select
                                        aria-label={copy.contactPlaceholder}
                                        defaultValue=""
                                        className={`${fieldClass} cursor-pointer appearance-none pr-12`}
                                    >
                                        <option value="" disabled>
                                            {copy.contactPlaceholder}
                                        </option>
                                        {copy.contactOptions.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                    <CaretDownIcon
                                        size={16}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                                    />
                                </div>

                                <p className="text-center text-xs text-neutral-500">
                                    {copy.requiredNote}
                                </p>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="mx-auto mt-1 w-full max-w-xs"
                                >
                                    {copy.submit}
                                </Button>
                            </form>
                        </div>

                        {submitted && (
                            // biome-ignore lint/a11y/useSemanticElements: live region wraps an <h3>, which <output> (phrasing content only) cannot legally contain
                            <div
                                role="status"
                                aria-live="polite"
                                className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6 text-center text-[#372a24]"
                            >
                                <h3 className="text-2xl">
                                    {copy.successTitle}
                                </h3>
                                <p className="leading-relaxed">
                                    {copy.successText}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Правая колонка — фото */}
                    <div className="relative min-h-64 w-full overflow-hidden rounded-lg">
                        <Image
                            src={PHOTO_SRC}
                            alt={copy.photoAlt}
                            fill
                            sizes="(max-width: 1200px) 100vw, 55vw"
                            loading="lazy"
                            className="object-cover"
                            style={{ objectPosition: "bottom" }}
                        />
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}
