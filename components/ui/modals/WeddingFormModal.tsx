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
    } as const;

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(INITIAL);
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const set =
        (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({
                ...prev,
                [field]:
                    e.target.type === "checkbox"
                        ? e.target.checked
                        : e.target.value,
            }));

    const handleClose = () => {
        setOpen(false);
        setStatus("idle");
        setForm(INITIAL);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        await new Promise((r) => setTimeout(r, 800));
        setStatus("success");
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className={`border p-4 rounded-md font-baskerville uppercase duration-200 cursor-pointer ${triggerClassName} ${fillVariants[variant]}`}
            >
                {title}
            </button>

            <Modal open={open} onClose={handleClose} maxWidth="2xl">
                <div className="px-8 py-12">
                    {status === "success" ? (
                        <div className="flex flex-col items-center gap-4 py-12 text-center">
                            <h3 className="font-baskerville uppercase text-xl xl:text-2xl">
                                {copy.successTitle}
                            </h3>
                            <p>{copy.successText}</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-center">{title}</h2>
                            <p className="text-sm text-neutral-400 text-center mt-1 mb-6 xl:mb-10">
                                {copy.subtitle}
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                            >
                                <input
                                    type="text"
                                    placeholder={copy.namePlaceholder}
                                    required
                                    value={form.name}
                                    onChange={set("name")}
                                    className="w-full rounded-xl bg-neutral-100 px-5 py-4 text-sm placeholder:text-neutral-400 outline-none focus:ring focus:ring-neutral-300 transition"
                                />
                                <input
                                    type="tel"
                                    placeholder="+7 (000) 000-00-00"
                                    required
                                    value={form.phone}
                                    onChange={set("phone")}
                                    className="w-full rounded-xl bg-neutral-100 px-5 py-4 text-sm placeholder:text-neutral-400 outline-none focus:ring focus:ring-neutral-300 transition"
                                />
                                <input
                                    type="email"
                                    placeholder={copy.emailPlaceholder}
                                    value={form.email}
                                    onChange={set("email")}
                                    className="w-full rounded-xl bg-neutral-100 px-5 py-4 text-sm placeholder:text-neutral-400 outline-none focus:ring focus:ring-neutral-300 transition"
                                />
                                <input
                                    type="text"
                                    placeholder={copy.tgPlaceholder}
                                    value={form.telegram}
                                    onChange={set("telegram")}
                                    className="w-full rounded-xl bg-neutral-100 px-5 py-4 text-sm placeholder:text-neutral-400 outline-none focus:ring focus:ring-neutral-300 transition"
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
                                    className="mt-2 w-full bg-neutral-900 px-8 py-4 font-baskerville uppercase text-white hover:bg-neutral-800 disabled:opacity-50 transition-colors duration-200 rounded-md cursor-pointer"
                                >
                                    {status === "loading"
                                        ? copy.loadingLabel
                                        : title}
                                </button>

                                {status === "error" && (
                                    <p className="text-center text-xs text-red-500">
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
