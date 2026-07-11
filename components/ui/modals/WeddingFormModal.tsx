"use client";

import Link from "next/link";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

interface FormState {
    name: string;
    phone: string;
    email: string;
    telegram: string;
    consent: boolean;
    formName: string;
}

const INITIAL: FormState = {
    name: "",
    phone: "",
    email: "",
    telegram: "",
    consent: false,
    formName: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    email: 254,
    telegram: 64,
} as const;

type ButtonVariant = "light" | "light-outline" | "dark" | "dark-outline";

interface Props {
    triggerLabel?: string;
    variant?: ButtonVariant;
    triggerClassName?: string;
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
}: Props) {
    const locale = useLocale();
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
        emailPlaceholder: locale === "ru" ? "Ваш e-mail" : "Your e-mail",
        tgPlaceholder:
            locale === "ru" ? "Ваш ник в Telegram" : "Your Telegram username",
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
                ? "Что-то пошло не так. Попробуйте ещё раз."
                : "Something went wrong. Please try again.",
        errName:
            locale === "ru"
                ? "Пожалуйста, укажите имя"
                : "Please enter your name",
        errPhone:
            locale === "ru"
                ? "Укажите корректный номер телефона"
                : "Please enter a valid phone number",
        errEmail:
            locale === "ru"
                ? "Укажите корректный e-mail"
                : "Please enter a valid e-mail",
        errConsent:
            locale === "ru"
                ? "Подтвердите согласие на обработку персональных данных"
                : "Please accept the personal data policy",
    } as const;

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(INITIAL);
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [validationError, setValidationError] = useState<string | null>(null);

    const set =
        (field: keyof FormState) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValidationError(null);
            setForm((prev) => ({
                ...prev,
                [field]:
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
        const email = form.email.trim();
        const telegram = form.telegram.trim();

        let error: string | null = null;
        if (!name) error = copy.errName;
        else if (!isPhoneValid(phone)) error = copy.errPhone;
        else if (email && !EMAIL_RE.test(email)) error = copy.errEmail;
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
                        service: title,
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
            <button
                type="button"
                onClick={() => setOpen(true)}
                className={`border p-4 rounded-md font-history uppercase duration-200 cursor-pointer ${triggerClassName} ${fillVariants[variant]}`}
            >
                {title}
            </button>

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
                                {copy.successTitle}
                            </h3>
                            <p>{copy.successText}</p>
                        </div>
                    ) : (
                        <>
                            <h2
                                id="wedding-form-modal-title"
                                className="text-center"
                            >
                                {title}
                            </h2>
                            <p className="text-sm text-neutral-400 text-center mt-1 mb-6 xl:mb-10">
                                {copy.subtitle}
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
                                    className="ym-disable-keys w-full rounded-xl bg-neutral-100 px-5 py-4 text-sm placeholder:text-neutral-400 outline-none focus:ring focus:ring-neutral-300 transition"
                                />
                                <input
                                    type="tel"
                                    placeholder="+7 (000) 000-00-00"
                                    aria-label={copy.phoneLabel}
                                    required
                                    maxLength={MAX.phone}
                                    value={form.phone}
                                    onChange={set("phone")}
                                    className="ym-disable-keys w-full rounded-xl bg-neutral-100 px-5 py-4 text-sm placeholder:text-neutral-400 outline-none focus:ring focus:ring-neutral-300 transition"
                                />
                                <input
                                    type="email"
                                    placeholder={copy.emailPlaceholder}
                                    aria-label={copy.emailPlaceholder}
                                    maxLength={MAX.email}
                                    value={form.email}
                                    onChange={set("email")}
                                    className="ym-disable-keys w-full rounded-xl bg-neutral-100 px-5 py-4 text-sm placeholder:text-neutral-400 outline-none focus:ring focus:ring-neutral-300 transition"
                                />
                                <input
                                    type="text"
                                    placeholder={copy.tgPlaceholder}
                                    aria-label={copy.tgPlaceholder}
                                    maxLength={MAX.telegram}
                                    value={form.telegram}
                                    onChange={set("telegram")}
                                    className="ym-disable-keys w-full rounded-xl bg-neutral-100 px-5 py-4 text-sm placeholder:text-neutral-400 outline-none focus:ring focus:ring-neutral-300 transition"
                                />

                                <label className="flex items-start gap-3 cursor-pointer mt-1">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={form.consent}
                                        onChange={set("consent")}
                                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-neutral-900"
                                    />
                                    <span className="text-xs text-neutral-500 leading-relaxed text-left">
                                        {copy.consentText}{" "}
                                        <Link
                                            href={localizeHref(
                                                "/policy/",
                                                locale,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-neutral-900 underline underline-offset-2"
                                        >
                                            {copy.consentLink}
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
                                        : title}
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
                                        {copy.errorLabel}
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
