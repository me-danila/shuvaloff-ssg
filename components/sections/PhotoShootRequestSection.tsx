"use client";

// Секция «Заявка на фотосессию» для страницы /photo-shoot/.
// Данные уходят напрямую в Web3Forms (email без своего бэкенда): POST на их
// endpoint с публичным access_key → письмо на почту менеджера. Правая колонка —
// фото. Клиентская валидация → fetch → экран «Спасибо» / ошибка.

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

// Web3Forms: приём заявки без своего бэкенда. access_key — публичный ключ из
// личного кабинета web3forms.com (привязан к почте-получателю). В бандле он не
// секрет: спам отсекает honeypot-поле `botcheck` + лимиты на стороне сервиса.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "441c373c-1f8a-4fa5-8b06-92740270235d";

type SubmitStatus = "idle" | "loading" | "success" | "error";

type FormState = {
    date: string;
    residence: string;
    name: string;
    phone: string;
    contact: string;
};

const INITIAL: FormState = {
    date: "",
    residence: "",
    name: "",
    phone: "",
    contact: "",
};

// RU-friendly phone check: 10 local digits, or 11 digits starting with 7/8.
const isPhoneValid = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    return (
        digits.length === 10 || (digits.length === 11 && /^[78]/.test(digits))
    );
};

const MAX = { name: 100, phone: 24 } as const;

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
    loadingLabel: string;
    errName: string;
    errPhone: string;
    errorLabel: string;
    photoAlt: string;
    successTitle: string;
    successText: ReactNode;
};

const copyByLocale: Record<Locale, RequestCopy> = {
    ru: {
        // Заголовок оттипографирован: неразрывный пробел после предлога «на».
        title: "Заявка на фотосессию",
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
        loadingLabel: "Отправка...",
        errName: "Пожалуйста, укажите имя",
        errPhone: "Укажите корректный номер телефона",
        errorLabel: "Что-то пошло не так. Попробуйте ещё раз.",
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
        loadingLabel: "Sending...",
        errName: "Please enter your name",
        errPhone: "Please enter a valid phone number",
        errorLabel: "Something went wrong. Please try again.",
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
    const [form, setForm] = useState<FormState>(INITIAL);
    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [validationError, setValidationError] = useState<string | null>(null);
    // Honeypot: скрытое поле, невидимое людям. Если заполнено — это бот,
    // Web3Forms молча отклонит заявку как спам.
    const [botcheck, setBotcheck] = useState(false);

    const set =
        (field: keyof FormState) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
            setValidationError(null);
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const name = form.name.trim();
        const phone = form.phone.trim();

        let error: string | null = null;
        if (!name) error = copy.errName;
        else if (!isPhoneValid(phone)) error = copy.errPhone;

        if (error) {
            setStatus("idle");
            setValidationError(error);
            return;
        }

        setValidationError(null);
        setStatus("loading");

        try {
            const res = await fetch(WEB3FORMS_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: "Новая заявка на фотосессию",
                    from_name: "Сайт ACADEMIA — Фотосессия",
                    botcheck,
                    Имя: name,
                    Телефон: phone,
                    Дата: form.date || "—",
                    Резиденция: form.residence || "—",
                    "Способ связи": form.contact || "—",
                }),
            });

            const json = await res.json();
            setStatus(json.success ? "success" : "error");
        } catch {
            setStatus("error");
        }
    };

    const submitted = status === "success";
    const loading = status === "loading";

    return (
        <section className="px-6 xl:px-0 xl:py-4">
            <div className="mx-auto max-w-7xl">
                <FadeUp>
                    <h2 className="text-center uppercase text-[#372a24]">
                        {copy.title}
                    </h2>
                </FadeUp>

                <FadeUp className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-stretch xl:mt-10 xl:gap-10">
                    {/* Левая колонка — форма / экран «Спасибо». Форма всегда в
                        потоке и держит высоту карточки; после успеха прячется
                        (invisible), а поверх абсолютом ложится экран «Спасибо» —
                        размеры секции и фото не прыгают. */}
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
                                {/* Honeypot — скрыт от людей, ловит ботов. */}
                                <input
                                    type="checkbox"
                                    name="botcheck"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    aria-hidden="true"
                                    checked={botcheck}
                                    onChange={(e) =>
                                        setBotcheck(e.target.checked)
                                    }
                                    className="hidden"
                                />

                                <div className="relative">
                                    <input
                                        type="text"
                                        value={form.date}
                                        onChange={set("date")}
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
                                        value={form.residence}
                                        onChange={set("residence")}
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
                                    value={form.name}
                                    onChange={set("name")}
                                    maxLength={MAX.name}
                                    placeholder={copy.namePlaceholder}
                                    aria-label={copy.namePlaceholder}
                                    className={fieldClass}
                                />

                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={set("phone")}
                                    maxLength={MAX.phone}
                                    placeholder={copy.phonePlaceholder}
                                    aria-label={copy.phonePlaceholder}
                                    className={fieldClass}
                                />

                                <div className="relative">
                                    <select
                                        aria-label={copy.contactPlaceholder}
                                        value={form.contact}
                                        onChange={set("contact")}
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

                                {validationError || status === "error" ? (
                                    <p
                                        role="alert"
                                        className="text-center text-xs text-brand-red"
                                    >
                                        {validationError ?? copy.errorLabel}
                                    </p>
                                ) : (
                                    <p className="text-center text-xs text-neutral-500">
                                        {copy.requiredNote}
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    disabled={loading}
                                    className="mx-auto mt-1 w-full max-w-xs"
                                >
                                    {loading ? copy.loadingLabel : copy.submit}
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
