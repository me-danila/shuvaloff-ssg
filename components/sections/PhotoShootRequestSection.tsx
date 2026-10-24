"use client";

// Секция «Заявка на фотосессию» для страницы /photo-shoot/.
// Данные уходят напрямую в Web3Forms (email без своего бэкенда): POST на их
// endpoint с публичным access_key → письмо на почту менеджера. Правая колонка —
// фото. Клиентская валидация → fetch → экран «Спасибо» / ошибка.

import { type ReactNode, useState } from "react";
import Button from "@/components/ui/Button";
import DateField, { formatDateDMY } from "@/components/ui/DateField";
import { requestFieldClass as fieldClass } from "@/components/ui/formStyles";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import SelectField from "@/components/ui/SelectField";
import type { Locale } from "@/lib/i18n/routing";
import { submitWeb3Form, WEB3FORMS_SITE_ACCESS_KEY } from "@/lib/web3forms";

const PHOTO_SRC =
    "https://academia.spb.ru/wp-content/uploads/2026/07/IMG_7033-2.jpg";

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
        errorLabel: "Что-то пошло не так. Попробуйте еще раз.",
        photoAlt: "Фотосессия в интерьерах особняка Шувалова",
        successTitle: "Спасибо!",
        successText: (
            <>
                Мы свяжемся с вами,
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
                We will contact you to confirm
                <br />
                the date and time within 10 minutes!
            </>
        ),
    },
};

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

    const setValue =
        (field: keyof FormState) =>
        (value: string): void => {
            setValidationError(null);
            setForm((prev) => ({ ...prev, [field]: value }));
        };
    const set =
        (field: keyof FormState) =>
        (e: React.ChangeEvent<HTMLInputElement>): void =>
            setValue(field)(e.target.value);

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

        const ok = await submitWeb3Form(WEB3FORMS_SITE_ACCESS_KEY, {
            subject: "Новая заявка на фотосессию",
            from_name: "Сайт ACADEMIA — Фотосессия",
            botcheck,
            Имя: name,
            Телефон: phone,
            Дата: form.date ? formatDateDMY(form.date) : "—",
            Резиденция: form.residence || "—",
            "Способ связи": form.contact || "—",
        });
        setStatus(ok ? "success" : "error");
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

                                <DateField
                                    value={form.date}
                                    onChange={(iso) => {
                                        setValidationError(null);
                                        setForm((prev) => ({
                                            ...prev,
                                            date: iso,
                                        }));
                                    }}
                                    locale={locale}
                                    placeholder={copy.datePlaceholder}
                                    className={`${fieldClass} cursor-pointer`}
                                />

                                <SelectField
                                    value={form.residence}
                                    onChange={setValue("residence")}
                                    placeholder={copy.residencePlaceholder}
                                    options={copy.residenceOptions}
                                    className={fieldClass}
                                />

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

                                <SelectField
                                    value={form.contact}
                                    onChange={setValue("contact")}
                                    placeholder={copy.contactPlaceholder}
                                    options={copy.contactOptions}
                                    className={fieldClass}
                                />

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
                                <h3 className="font-history text-2xl">
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
