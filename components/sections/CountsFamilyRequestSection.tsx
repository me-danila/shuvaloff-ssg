"use client";

// Финальный CTA с формой заявки на странице /counts-family-greetings/.
// Отправка — как у заявки на фотосессию: Web3Forms (тот же ключ), после
// успеха форма прячется и на ее месте показывается «Спасибо» без перезагрузки.
// Ошибки валидации — у каждого поля.

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import DateField, {
    type DateRange,
    EMPTY_DATE_RANGE,
    formatDateRangeDMY,
} from "@/components/ui/DateField";
import { requestFieldClass } from "@/components/ui/formStyles";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import SelectField from "@/components/ui/SelectField";
import {
    countsFamilyCopy,
    countsFamilyImages,
    greetingServices,
} from "@/data/countsFamilyGreetingsData";
import {
    isRuPhoneComplete,
    nextRuPhoneValue,
    RU_PHONE_MAX_LENGTH,
    RU_PHONE_PREFIX,
} from "@/lib/phoneMask";
import { submitWeb3Form, WEB3FORMS_SITE_ACCESS_KEY } from "@/lib/web3forms";

const copy = countsFamilyCopy.form;
const occasionOptions = greetingServices.map((s) => s.title);

type SubmitStatus = "idle" | "loading" | "success" | "error";

type FormState = {
    name: string;
    phone: string;
    contact: string;
    dates: DateRange;
    occasion: string;
    consent: boolean;
};

type ErrorField = "name" | "phone" | "dates" | "consent";
type Errors = Partial<Record<ErrorField, string>>;

const INITIAL: FormState = {
    name: "",
    phone: "",
    contact: "",
    dates: EMPTY_DATE_RANGE,
    occasion: "",
    consent: false,
};

const MAX_NAME = 100;

const invalidRing = "ring-1 ring-brand-red";

function FieldError({ id, message }: { id: string; message?: string }) {
    if (!message) return null;
    return (
        <p id={id} className="mt-1 text-xs text-brand-red">
            {message}
        </p>
    );
}

export default function CountsFamilyRequestSection() {
    const uid = useId();
    const ids = {
        name: `${uid}-name-error`,
        phone: `${uid}-phone-error`,
        dates: `${uid}-dates-error`,
        consent: `${uid}-consent-error`,
        datesHint: `${uid}-dates-hint`,
    };
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const consentRef = useRef<HTMLInputElement>(null);
    // DateField не пробрасывает ref кнопки — фокусируем ее через обертку.
    const datesWrapRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLHeadingElement>(null);

    const [form, setForm] = useState<FormState>(INITIAL);
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<SubmitStatus>("idle");
    // Honeypot: скрытое поле, невидимое людям. Если заполнено — это бот,
    // Web3Forms молча отклонит заявку как спам.
    const [botcheck, setBotcheck] = useState(false);

    const update = <K extends keyof FormState>(
        field: K,
        value: FormState[K],
    ) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (status === "error") setStatus("idle");
        if (field in errors) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[field as ErrorField];
                return next;
            });
        }
    };

    // Маска телефона: при фокусе подставляем «+7 (», пустую маску при уходе
    // с поля стираем, чтобы снова был виден плейсхолдер.
    const handlePhoneFocus = () => {
        if (!form.phone) update("phone", RU_PHONE_PREFIX);
    };
    const handlePhoneBlur = () => {
        if (form.phone === RU_PHONE_PREFIX) update("phone", "");
    };

    const validate = (): Errors => {
        const next: Errors = {};
        if (!form.name.trim()) next.name = copy.errName;
        if (!isRuPhoneComplete(form.phone)) next.phone = copy.errPhone;
        // Начало диапазона без конца: календарь закрыли, не выбрав выезд.
        if (form.dates.from && !form.dates.to) next.dates = copy.errDates;
        if (!form.consent) next.consent = copy.errConsent;
        return next;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nextErrors = validate();
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
            setStatus("idle");
            if (nextErrors.name) nameRef.current?.focus();
            else if (nextErrors.phone) phoneRef.current?.focus();
            else if (nextErrors.dates)
                datesWrapRef.current?.querySelector("button")?.focus();
            else consentRef.current?.focus();
            return;
        }

        setStatus("loading");
        const ok = await submitWeb3Form(WEB3FORMS_SITE_ACCESS_KEY, {
            subject: copy.mailSubject,
            from_name: copy.mailFrom,
            botcheck,
            Имя: form.name.trim(),
            Телефон: form.phone,
            "Способ связи": form.contact || "—",
            "Даты проживания": formatDateRangeDMY(form.dates) || "—",
            Повод: form.occasion || "—",
            "Согласие на обработку ПД": "Да",
        });
        setStatus(ok ? "success" : "error");
    };

    const submitted = status === "success";
    const loading = status === "loading";

    // После успеха форма становится invisible и фокус с кнопки уходит на
    // body — переводим его на «Спасибо», чтобы продолжить с этого места.
    useEffect(() => {
        if (submitted) successRef.current?.focus();
    }, [submitted]);

    return (
        <section
            id={copy.id}
            className="scroll-mt-28 px-6 xl:scroll-mt-36 xl:px-0 xl:py-4"
        >
            <div className="mx-auto max-w-7xl">
                <FadeUp className="text-center text-brand-brown">
                    <h2 className="mx-auto max-w-3xl">{copy.title}</h2>
                    <p className="mx-auto mt-3 max-w-2xl xl:mt-4">
                        {copy.subtitle}
                    </p>
                </FadeUp>

                {/* Как в заявке на фотосессию: форма слева, фото справа. */}
                <FadeUp className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-stretch xl:mt-10 xl:gap-10">
                    {/* Форма всегда в потоке и держит высоту карточки; после
                        успеха прячется (invisible), а поверх ложится «Спасибо». */}
                    <div className="relative rounded-lg bg-[#ededeb] p-6 text-[#372a24] xl:p-10">
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            aria-hidden={submitted}
                            className={`flex flex-col gap-3 ${submitted ? "invisible" : ""}`}
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

                            <div>
                                <input
                                    ref={nameRef}
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    value={form.name}
                                    onChange={(e) =>
                                        update("name", e.target.value)
                                    }
                                    maxLength={MAX_NAME}
                                    placeholder={copy.name}
                                    aria-label={copy.name}
                                    aria-required="true"
                                    aria-invalid={Boolean(errors.name)}
                                    aria-describedby={
                                        errors.name ? ids.name : undefined
                                    }
                                    className={`${requestFieldClass} ${errors.name ? invalidRing : ""}`}
                                />
                                <FieldError
                                    id={ids.name}
                                    message={errors.name}
                                />
                            </div>

                            <div>
                                <input
                                    ref={phoneRef}
                                    type="tel"
                                    name="phone"
                                    autoComplete="tel"
                                    inputMode="tel"
                                    value={form.phone}
                                    onChange={(e) =>
                                        update(
                                            "phone",
                                            nextRuPhoneValue(
                                                form.phone,
                                                e.target.value,
                                            ),
                                        )
                                    }
                                    onFocus={handlePhoneFocus}
                                    onBlur={handlePhoneBlur}
                                    maxLength={RU_PHONE_MAX_LENGTH}
                                    placeholder={copy.phone}
                                    aria-label={copy.phone}
                                    aria-required="true"
                                    aria-invalid={Boolean(errors.phone)}
                                    aria-describedby={
                                        errors.phone ? ids.phone : undefined
                                    }
                                    className={`${requestFieldClass} ${errors.phone ? invalidRing : ""}`}
                                />
                                <FieldError
                                    id={ids.phone}
                                    message={errors.phone}
                                />
                            </div>

                            <SelectField
                                name="contact"
                                value={form.contact}
                                onChange={(v) => update("contact", v)}
                                placeholder={copy.contact}
                                options={copy.contactOptions}
                                className={requestFieldClass}
                            />

                            <div ref={datesWrapRef}>
                                <DateField
                                    mode="range"
                                    value={form.dates}
                                    onChange={(range) => update("dates", range)}
                                    locale="ru"
                                    placeholder={copy.dates}
                                    describedBy={
                                        errors.dates
                                            ? `${ids.dates} ${ids.datesHint}`
                                            : ids.datesHint
                                    }
                                    invalid={Boolean(errors.dates)}
                                    className={`${requestFieldClass} cursor-pointer ${errors.dates ? invalidRing : ""}`}
                                />
                                <FieldError
                                    id={ids.dates}
                                    message={errors.dates}
                                />
                                <p
                                    id={ids.datesHint}
                                    className="mt-1 text-xs text-neutral-500"
                                >
                                    {copy.datesHint}
                                </p>
                            </div>

                            <SelectField
                                name="occasion"
                                value={form.occasion}
                                onChange={(v) => update("occasion", v)}
                                placeholder={copy.occasion}
                                options={occasionOptions}
                                className={requestFieldClass}
                            />

                            <div className="mt-1">
                                <label className="flex cursor-pointer items-start gap-3">
                                    <input
                                        ref={consentRef}
                                        type="checkbox"
                                        name="consent"
                                        checked={form.consent}
                                        onChange={(e) =>
                                            update("consent", e.target.checked)
                                        }
                                        aria-required="true"
                                        aria-invalid={Boolean(errors.consent)}
                                        aria-describedby={
                                            errors.consent
                                                ? ids.consent
                                                : undefined
                                        }
                                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-brand-red"
                                    />
                                    <span className="text-left text-xs leading-relaxed text-neutral-500">
                                        {copy.consentText}
                                        {"\u00a0"}
                                        <Link
                                            href="/policy/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#372a24] underline underline-offset-2 transition-colors hover:text-brand-red"
                                        >
                                            {copy.consentLink}
                                        </Link>
                                        *
                                    </span>
                                </label>
                                <FieldError
                                    id={ids.consent}
                                    message={errors.consent}
                                />
                            </div>

                            {status === "error" ? (
                                <p
                                    role="alert"
                                    className="text-center text-xs text-brand-red"
                                >
                                    {copy.errSubmit}
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
                                className="mt-1 w-full"
                            >
                                {loading ? copy.loading : copy.submit}
                            </Button>
                        </form>

                        {/* Live-регион в DOM всегда, содержимое появляется после
                            отправки — скринридер объявит «Спасибо». */}
                        <div
                            aria-live="polite"
                            className={
                                submitted
                                    ? "absolute inset-0 flex flex-col items-center justify-center gap-6 p-6 text-center"
                                    : "sr-only"
                            }
                        >
                            {submitted && (
                                <>
                                    <h3
                                        ref={successRef}
                                        tabIndex={-1}
                                        className="font-history text-2xl outline-none"
                                    >
                                        {copy.successTitle}
                                    </h3>
                                    <p className="max-w-sm leading-relaxed">
                                        {copy.successText}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="relative min-h-64 w-full overflow-hidden rounded-lg">
                        <Image
                            src={countsFamilyImages.cta}
                            alt={copy.photoAlt}
                            fill
                            sizes="(max-width: 1200px) 100vw, 55vw"
                            loading="lazy"
                            className="object-cover object-[70%_center]"
                        />
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}
