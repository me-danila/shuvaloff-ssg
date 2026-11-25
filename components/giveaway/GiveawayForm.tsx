"use client";

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useGiveawayRulesUrl } from "@/components/giveaway/GiveawayRules";
import Button from "@/components/ui/Button";
import type { Giveaway } from "@/data/giveaway";
import {
    isRuPhoneComplete,
    nextRuPhoneValue,
    RU_PHONE_MAX_LENGTH,
    RU_PHONE_PREFIX,
} from "@/lib/phoneMask";
import { GIVEAWAY_ACCESS_KEY, submitWeb3Form } from "@/lib/web3forms";

type SubmitStatus = "idle" | "loading" | "error";

type FormState = {
    name: string;
    phone: string;
    email: string;
    consentData: boolean;
    consentAds: boolean;
};

const INITIAL: FormState = {
    name: "",
    phone: "",
    email: "",
    consentData: false,
    consentAds: false,
};

const MAX = { name: 100, email: 120 } as const;

const isEmailValid = (raw: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);

type AcceptedEntry = Omit<FormState, "consentData"> & {
    id: string;
};

async function saveEntry(slug: string, entry: AcceptedEntry) {
    try {
        const response = await fetch("/api/poseidon.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...entry,
                action: slug === "poseidon" ? "submit" : `submit:${slug}`,
                consentData: true,
                botcheck: false,
            }),
            keepalive: true,
            signal: AbortSignal.timeout(10000),
        });
        return response.ok && (await response.json()).ok === true;
    } catch {
        return false;
    }
}

const fieldClass =
    "w-full rounded-lg border border-[#e8e1d6] bg-transparent px-5 py-3.5 text-base text-neutral-900 placeholder:text-[#797874] outline-none transition focus:border-[#bca589]";

const checkboxClass =
    "mt-0.5 size-4 shrink-0 cursor-pointer appearance-none rounded-[3px] border border-[#ddd5c8] bg-transparent transition checked:border-brand-red checked:bg-brand-red checked:bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='M4 8.5l2.5 2.5L12 5.5'/%3E%3C/svg%3E\")] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bca589]";

const consentTextClass =
    "text-xs leading-snug text-[#605f5c] xl:text-[11px] xl:leading-[1.35]";

type FormProps = Pick<Giveaway, "partner" | "slug" | "thankYouPath"> & {
    copy: Giveaway["copy"]["form"];
};
export default function GiveawayForm({
    copy,
    partner,
    slug,
    thankYouPath,
}: FormProps) {
    const rulesUrl = useGiveawayRulesUrl();
    const registrationOpen = Boolean(rulesUrl);
    const router = useRouter();
    const [form, setForm] = useState<FormState>(INITIAL);
    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [validationError, setValidationError] = useState<string | null>(null);
    // Honeypot: скрытое поле, Web3Forms молча отклоняет заявку, если оно заполнено.
    const [botcheck, setBotcheck] = useState(false);
    const [accepted, setAccepted] = useState<AcceptedEntry | null>(null);
    const sending = useRef(false);

    const setText =
        (field: "name" | "email") =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValidationError(null);
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
        };

    // Маска «+7 (999) 999-99-99»: +7 появляется при фокусе, дальше
    // пользователь вводит только номер. Пустая маска при уходе с поля
    // стирается, чтобы снова был виден плейсхолдер.
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        setValidationError(null);
        setForm((prev) => ({
            ...prev,
            phone: nextRuPhoneValue(prev.phone, raw),
        }));
    };

    const handlePhoneFocus = () => {
        setForm((prev) =>
            prev.phone ? prev : { ...prev, phone: RU_PHONE_PREFIX },
        );
    };

    const handlePhoneBlur = () => {
        setForm((prev) =>
            prev.phone === RU_PHONE_PREFIX ? { ...prev, phone: "" } : prev,
        );
    };

    const setCheck =
        (field: "consentData" | "consentAds") =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValidationError(null);
            setForm((prev) => ({ ...prev, [field]: e.target.checked }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (sending.current || !rulesUrl) return;

        const name = form.name.trim();
        const phone = form.phone.trim();
        const email = form.email.trim();

        let error: string | null = null;
        if (!name) error = copy.errName;
        else if (!isRuPhoneComplete(phone)) error = copy.errPhone;
        else if (!isEmailValid(email)) error = copy.errEmail;
        else if (!form.consentData) error = copy.errConsent;

        if (error) {
            setStatus("idle");
            setValidationError(error);
            return;
        }

        setValidationError(null);
        setStatus("loading");

        sending.current = true;
        try {
            const entry = accepted ?? {
                id: `${Date.now()}-${crypto.randomUUID()}`,
                name,
                phone,
                email,
                consentAds: form.consentAds,
            };
            if (!accepted) {
                const ok = await submitWeb3Form(GIVEAWAY_ACCESS_KEY, {
                    subject: `Розыгрыш «Графские выходные» — ${partner}, заявка ${entry.id}`,
                    from_name: `Сайт ACADEMIA — ACADEMIA × ${partner}`,
                    botcheck,
                    Имя: name,
                    Телефон: phone,
                    Email: email,
                    "Согласие на рассылку": form.consentAds ? "Да" : "Нет",
                    "ID заявки": entry.id,
                });
                if (!ok) {
                    setStatus("error");
                    return;
                }
                if (botcheck) {
                    router.push(thankYouPath);
                    return;
                }
                setAccepted(entry);
            }

            if (await saveEntry(slug, entry)) {
                router.push(thankYouPath);
            } else {
                setStatus("error");
            }
        } finally {
            sending.current = false;
        }
    };

    const loading = status === "loading";
    const message =
        validationError ?? (status === "error" ? copy.errSubmit : null);

    if (accepted) {
        return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <output aria-live="polite">
                    {loading
                        ? "Сохраняем заявку…"
                        : "Письмо с заявкой отправлено. Повторите сохранение, чтобы завершить регистрацию."}
                </output>
                {!loading && (
                    <Button type="submit" size="sm">
                        Повторить сохранение
                    </Button>
                )}
            </form>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-2.5 xl:gap-4"
        >
            {/* Honeypot — скрыт от людей, ловит ботов. */}
            <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                checked={botcheck}
                onChange={(e) => setBotcheck(e.target.checked)}
                className="hidden"
            />

            <input
                type="text"
                name="name"
                disabled={loading || !registrationOpen}
                autoComplete="name"
                value={form.name}
                onChange={setText("name")}
                maxLength={MAX.name}
                placeholder={copy.name}
                aria-label={copy.name}
                className={fieldClass}
            />

            <div className="flex flex-col gap-2.5 xl:flex-row">
                <input
                    type="tel"
                    name="phone"
                    disabled={loading || !registrationOpen}
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={handlePhoneChange}
                    onFocus={handlePhoneFocus}
                    onBlur={handlePhoneBlur}
                    maxLength={RU_PHONE_MAX_LENGTH}
                    placeholder={copy.phone}
                    aria-label={copy.phone}
                    className={fieldClass}
                />
                <input
                    type="email"
                    name="email"
                    disabled={loading || !registrationOpen}
                    autoComplete="email"
                    value={form.email}
                    onChange={setText("email")}
                    maxLength={MAX.email}
                    placeholder={copy.email}
                    aria-label={copy.email}
                    className={fieldClass}
                />
            </div>

            <div className="mt-4 flex flex-col gap-6 xl:mt-1 xl:gap-3">
                <label className="flex cursor-pointer gap-3">
                    <input
                        type="checkbox"
                        checked={form.consentData}
                        disabled={loading || !registrationOpen}
                        onChange={setCheck("consentData")}
                        className={checkboxClass}
                    />
                    <span className={consentTextClass}>
                        Ознакомлен с{" "}
                        {rulesUrl ? (
                            <a
                                href={rulesUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 transition-colors hover:text-brand-red"
                            >
                                Правилами проведения акции
                            </a>
                        ) : (
                            "Правилами проведения акции"
                        )}{" "}
                        и выражаю согласие на обработку персональных данных в
                        соответствии с{" "}
                        <a
                            href="/policy/"
                            target="_blank"
                            className="underline underline-offset-2 transition-colors hover:text-brand-red"
                            rel="noopener"
                        >
                            Политикой по обработке персональных данных
                        </a>
                    </span>
                </label>
                <label className="flex cursor-pointer gap-3">
                    <input
                        type="checkbox"
                        checked={form.consentAds}
                        disabled={loading || !registrationOpen}
                        onChange={setCheck("consentAds")}
                        className={checkboxClass}
                    />
                    <span className={consentTextClass}>
                        Выражаю согласие на получение рекламных и информационных
                        материалов в соответствии с{" "}
                        <a
                            href="/consent/"
                            target="_blank"
                            className="underline underline-offset-2 transition-colors hover:text-brand-red"
                            rel="noopener"
                        >
                            Согласием
                        </a>
                    </span>
                </label>
            </div>

            {!registrationOpen && (
                <p className={consentTextClass}>Регистрация пока закрыта.</p>
            )}

            {message && (
                <p role="alert" className="text-xs text-brand-red xl:-mb-1">
                    {message}
                </p>
            )}

            <Button
                type="submit"
                size="sm"
                disabled={loading || !registrationOpen}
                className="mt-4 w-full whitespace-nowrap xl:mt-1 xl:text-[15px]"
            >
                <span className="flex items-center gap-3">
                    {loading ? copy.loading : copy.submit}
                    <ArrowRightIcon
                        size={22}
                        weight="light"
                        aria-hidden="true"
                    />
                </span>
            </Button>
        </form>
    );
}
