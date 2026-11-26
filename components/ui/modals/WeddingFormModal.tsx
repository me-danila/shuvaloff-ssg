"use client";

import { CaretDown } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

import { russianDisplayText } from "@/lib/typography";

const fieldClass =
    "ym-disable-keys w-full rounded-xl bg-neutral-100 px-5 py-4 text-sm placeholder:text-black outline-none focus:ring focus:ring-neutral-300 transition";

interface FormState {
    name: string;
    phone: string;
    date: string;
    guests: string;
    consent: boolean;
    replyBy: string;
    telegram: string;
    email: string;
}

const INITIAL: FormState = {
    name: "",
    phone: "",
    date: "",
    guests: "",
    consent: false,
    replyBy: "",
    telegram: "",
    email: "",
};

// RU-friendly phone check: 10 local digits, or 11 digits starting with 7/8.
const isPhoneValid = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    return (
        digits.length === 10 || (digits.length === 11 && /^[78]/.test(digits))
    );
};

const MAX = {
    name: 100,
    phone: 24,
} as const;

type ButtonVariant = "light" | "light-outline" | "dark" | "dark-outline";

interface Props {
    triggerLabel?: string;
    variant?: ButtonVariant;
    triggerClassName?: string;
    /**
     * Кастомный триггер вместо дефолтной кнопки. Получает `open` — вызовите его
     * по клику. Позволяет открывать форму из любого элемента (например, из
     * брендовой `Button`), не дублируя логику модалки. Когда задан, `variant` и
     * `triggerClassName` игнорируются.
     */
    renderTrigger?: (open: () => void) => React.ReactNode;
}

const fillVariants: Record<ButtonVariant, string> = {
    light: "border-white bg-white text-black hover:bg-black hover:border-black hover:text-white",
    "light-outline":
        "border-white hover:bg-black hover:border-black hover:text-white",
    dark: "border-black bg-black text-white hover:bg-white hover:border-black hover:text-black",
    "dark-outline": "border-black hover:bg-black hover:text-white",
};

export default function WeddingFormModal({
    triggerLabel,
    variant = "light",
    triggerClassName,
    renderTrigger,
}: Props) {
    const locale = useLocale();
    const text = (value: string) =>
        locale === "ru" ? russianDisplayText(value) : value;
    const defaultTrigger =
        locale === "ru" ? "Записаться на экскурсию" : "Book a tour";
    const title = triggerLabel ?? defaultTrigger;

    const copy = {
        successTitle:
            locale === "ru" ? "Заявка отправлена" : "Request submitted",
        successText:
            locale === "ru"
                ? "Мы свяжемся с вами в ближайшее время"
                : "We will contact you shortly",
        subtitle:
            locale === "ru"
                ? "Заполните контактные данные для связи"
                : "Fill in your contact details",
        namePlaceholder: locale === "ru" ? "Ваше имя" : "Your name",
        phoneLabel: locale === "ru" ? "Ваш телефон" : "Your phone",
        dateLabel: locale === "ru" ? "Дата свадьбы" : "Wedding date",
        guestsLabel: locale === "ru" ? "Количество гостей" : "Number of guests",
        replyLabel:
            locale === "ru"
                ? "Как с вами связаться?"
                : "How should we contact you?",
        telegramLabel:
            locale === "ru" ? "Ваш ник в Telegram" : "Your Telegram username",
        emailLabel: locale === "ru" ? "Ваш e-mail" : "Your email",
        consentText:
            locale === "ru"
                ? "Выражаю согласие на обработку персональных данных в соответствии с"
                : "I consent to the processing of personal data in accordance with",
        consentLink:
            locale === "ru"
                ? "Политикой по обработке персональных данных"
                : "Personal data policy",
        loadingLabel: locale === "ru" ? "Отправка..." : "Sending...",
        errorLabel:
            locale === "ru"
                ? "Что-то пошло не так. Попробуйте еще раз."
                : "Something went wrong. Please try again.",
        errName:
            locale === "ru"
                ? "Пожалуйста, укажите имя"
                : "Please enter your name",
        errPhone:
            locale === "ru"
                ? "Укажите корректный номер телефона"
                : "Please enter a valid phone number",
        errGuests:
            locale === "ru"
                ? "Укажите целое число гостей больше нуля"
                : "Enter a positive whole number of guests",
        errConsent:
            locale === "ru"
                ? "Подтвердите согласие на обработку персональных данных"
                : "Please accept the personal data policy",
    } as const;

    const methods = {
        phone: locale === "ru" ? "Звонок" : "Phone call",
        telegram: "Telegram",
        whatsapp: "WhatsApp",
        email: locale === "ru" ? "Электронная почта" : "Email",
    };
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(INITIAL);
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [validationError, setValidationError] = useState<string | null>(null);

    const set =
        (field: keyof FormState) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setValidationError(null);
            setForm((prev) => ({
                ...prev,
                [field]:
                    e.target instanceof HTMLInputElement &&
                    e.target.type === "checkbox"
                        ? e.target.checked
                        : e.target.value,
            }));
        };

    const handleClose = () => {
        setOpen(false);
        setStatus("idle");
        setForm(INITIAL);
        setValidationError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const name = form.name.trim();
        const phone = form.phone.trim();

        const telegram =
            form.replyBy === "telegram" ? form.telegram.trim() : "";
        const email = form.replyBy === "email" ? form.email.trim() : "";

        let error: string | null = null;
        if (!name) error = copy.errName;
        else if (!isPhoneValid(phone)) error = copy.errPhone;
        else if (form.guests && !/^[1-9]\d*$/.test(form.guests))
            error = copy.errGuests;
        else if (
            form.replyBy === "telegram" &&
            !/^@?[A-Za-z0-9_]+$/.test(telegram)
        )
            error =
                locale === "ru"
                    ? "Укажите ник в Telegram, например @username"
                    : "Enter your Telegram username, for example @username";
        else if (
            form.replyBy === "email" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        )
            error =
                locale === "ru"
                    ? "Введите корректный e-mail"
                    : "Enter a valid email address";
        else if (!form.consent) error = copy.errConsent;

        if (error) {
            setStatus("idle");
            setValidationError(error);
            return;
        }

        setValidationError(null);
        setStatus("loading");

        try {
            const res = await fetch(
                "https://sh-wedding-form-handler.plain-cake-fcd7.workers.dev",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Form-Secret": "cc4d848a1a202d50d74966102e3657db",
                    },
                    body: JSON.stringify({
                        service: [
                            title,
                            form.replyBy &&
                                methods[form.replyBy as keyof typeof methods],
                            form.date && `${copy.dateLabel}: ${form.date}`,
                            form.guests &&
                                `${copy.guestsLabel}: ${form.guests}`,
                        ]
                            .filter(Boolean)
                            .join(" · "),
                        name,
                        phone,
                        email,
                        telegram,
                    }),
                },
            );

            const json = await res.json();
            if (json.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <>
            {renderTrigger ? (
                renderTrigger(() => setOpen(true))
            ) : (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className={`border p-4 rounded-md font-history uppercase duration-200 cursor-pointer ${triggerClassName} ${fillVariants[variant]}`}
                >
                    {text(title)}
                </button>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                maxWidth="max-w-2xl"
                ariaLabelledby="wedding-form-modal-title"
            >
                <div className="px-8 py-12">
                    {status === "success" ? (
                        // biome-ignore lint/a11y/useSemanticElements: this live region wraps an <h3> heading, which <output> (phrasing content only) cannot legally contain — role="status" on a div is the correct choice
                        <div
                            role="status"
                            aria-live="polite"
                            className="flex flex-col items-center gap-4 py-12 text-center"
                        >
                            <h3
                                id="wedding-form-modal-title"
                                className="font-history uppercase text-xl xl:text-2xl"
                            >
                                {text(copy.successTitle)}
                            </h3>
                            <p>{text(copy.successText)}</p>
                        </div>
                    ) : (
                        <>
                            <h2
                                id="wedding-form-modal-title"
                                className="text-center"
                            >
                                {text(title)}
                            </h2>
                            <p className="text-sm text-black text-center mt-1 mb-6 xl:mb-10">
                                {text(copy.subtitle)}
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                noValidate
                                className="flex flex-col gap-4"
                            >
                                <input
                                    type="text"
                                    placeholder={copy.namePlaceholder}
                                    aria-label={copy.namePlaceholder}
                                    required
                                    maxLength={MAX.name}
                                    value={form.name}
                                    onChange={set("name")}
                                    className={fieldClass}
                                />
                                <input
                                    type="tel"
                                    placeholder="+7 (000) 000-00-00"
                                    aria-label={copy.phoneLabel}
                                    required
                                    maxLength={MAX.phone}
                                    value={form.phone}
                                    onChange={set("phone")}
                                    className={fieldClass}
                                />
                                <div className="grid gap-4 lg:grid-cols-2">
                                    <label className="flex min-w-0 w-full items-center justify-between gap-2 rounded-xl bg-neutral-100 px-5 py-4 text-left text-sm focus-within:ring focus-within:ring-neutral-300 transition">
                                        <span>{copy.dateLabel}</span>
                                        <input
                                            type="date"
                                            value={form.date}
                                            onChange={set("date")}
                                            className="ym-disable-keys min-w-0 max-w-[60%] bg-transparent text-sm outline-none"
                                        />
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        step="1"
                                        placeholder={copy.guestsLabel}
                                        aria-label={copy.guestsLabel}
                                        value={form.guests}
                                        onChange={set("guests")}
                                        className={fieldClass}
                                    />
                                </div>
                                <div className="relative">
                                    <select
                                        aria-label={copy.replyLabel}
                                        value={form.replyBy}
                                        onChange={set("replyBy")}
                                        className={`${fieldClass} block h-[3.25rem] appearance-none cursor-pointer pr-12 text-black`}
                                    >
                                        <option value="">
                                            {copy.replyLabel}
                                        </option>
                                        {Object.entries(methods).map(
                                            ([value, label]) => (
                                                <option
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                    <CaretDown
                                        aria-hidden="true"
                                        size={18}
                                        className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"
                                    />
                                </div>
                                {form.replyBy === "telegram" && (
                                    <input
                                        type="text"
                                        required
                                        maxLength={64}
                                        placeholder={copy.telegramLabel}
                                        aria-label={copy.telegramLabel}
                                        value={form.telegram}
                                        onChange={set("telegram")}
                                        className={fieldClass}
                                    />
                                )}
                                {form.replyBy === "email" && (
                                    <input
                                        type="email"
                                        required
                                        maxLength={254}
                                        placeholder={copy.emailLabel}
                                        aria-label={copy.emailLabel}
                                        value={form.email}
                                        onChange={set("email")}
                                        className={fieldClass}
                                    />
                                )}

                                <label className="flex items-start gap-3 cursor-pointer mt-1">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={form.consent}
                                        onChange={set("consent")}
                                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-neutral-900"
                                    />
                                    <span className="text-xs text-black leading-relaxed text-left">
                                        {text(copy.consentText)}
                                        {locale === "ru" ? "\u00a0" : " "}
                                        <Link
                                            href={localizeHref(
                                                "/policy/",
                                                locale,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-black underline underline-offset-2"
                                        >
                                            {text(copy.consentLink)}
                                        </Link>
                                    </span>
                                </label>
                                <input type="hidden" value={title} />

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="mt-2 w-full bg-neutral-900 px-8 py-4 font-history uppercase text-white hover:bg-neutral-800 disabled:opacity-50 transition-colors duration-200 rounded-md cursor-pointer"
                                >
                                    {status === "loading"
                                        ? copy.loadingLabel
                                        : text(title)}
                                </button>

                                {validationError && (
                                    <p
                                        role="alert"
                                        className="text-center text-xs text-red-500"
                                    >
                                        {validationError}
                                    </p>
                                )}

                                {status === "error" && (
                                    <p
                                        role="alert"
                                        className="text-center text-xs text-red-500"
                                    >
                                        {text(copy.errorLabel)}
                                    </p>
                                )}
                            </form>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
}
