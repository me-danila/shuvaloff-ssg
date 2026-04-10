"use client";

import Link from "next/link";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

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
    triggerLabel = "Записаться на экскурсию",
    variant = "light",
    triggerClassName,
}: Props) {
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
        // @TODO: подключить отправку
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
                {triggerLabel}
            </button>

            <Modal open={open} onClose={handleClose} maxWidth="2xl">
                <div className="px-8 py-12">
                    {status === "success" ? (
                        <div className="flex flex-col items-center gap-4 py-12 text-center">
                            <h3 className="font-baskerville uppercase text-xl xl:text-2xl">Заявка отправлена</h3>
                            <p>Мы свяжемся с вами в ближайшее время</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-center">{triggerLabel}</h2>
                            <p className="text-sm text-neutral-400 text-center mt-1 mb-6 xl:mb-10">
                                Заполните контактные данные для связи
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                            >
                                <input
                                    type="text"
                                    placeholder="Ваше имя"
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
                                    placeholder="Ваш e-mail"
                                    value={form.email}
                                    onChange={set("email")}
                                    className="w-full rounded-xl bg-neutral-100 px-5 py-4 text-sm placeholder:text-neutral-400 outline-none focus:ring focus:ring-neutral-300 transition"
                                />
                                <input
                                    type="text"
                                    placeholder="Ваш ник в Telegram"
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
                                        Выражаю согласие на обработку
                                        персональных данных в соответствии с{" "}
                                        <Link
                                            href="/policy/"
                                            target="_blank"
                                            className="text-neutral-900 underline underline-offset-2"
                                        >
                                            Политикой по обработке персональных
                                            данных
                                        </Link>
                                    </span>
                                </label>
                                <input type="hidden" value={triggerLabel} />

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="mt-2 w-full bg-neutral-900 px-8 py-4 font-baskerville uppercase text-white hover:bg-neutral-800 disabled:opacity-50 transition-colors duration-200 rounded-md cursor-pointer"
                                >
                                    {status === "loading"
                                        ? "Отправка..."
                                        : `${triggerLabel}`}
                                </button>

                                {status === "error" && (
                                    <p className="text-center text-xs text-red-500">
                                        Что-то пошло не так. Попробуйте ещё раз.
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
