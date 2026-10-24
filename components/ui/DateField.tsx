"use client";

// Поле выбора даты с собственным календарем.
//
// Нативный <input type="date"> здесь не подходит: он показывает дату в формате
// браузерной локали (в т.ч. гггг-мм-дд), а трюк «text → date по фокусу» ломался
// на React — при первом же изменении значения React возвращал type обратно в
// "text", нативный пикер закрывался, верстка прыгала. Поэтому календарь свой:
// значение хранится в ISO (YYYY-MM-DD), пользователю показывается дд.мм.гггг.
//
// Режимы: одна дата (по умолчанию) и диапазон (mode="range", например даты
// проживания): первый клик ставит начало, второй — конец, после чего календарь
// закрывается; если конец раньше начала, даты меняются местами.

import {
    CalendarBlankIcon,
    CaretLeftIcon,
    CaretRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/routing";

const MONTHS: Record<Locale, string[]> = {
    ru: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ],
    en: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
};

// Неделя начинается с понедельника.
const WEEKDAYS: Record<Locale, string[]> = {
    ru: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
    en: ["mo", "tu", "we", "th", "fr", "sa", "su"],
};

const UI_COPY: Record<Locale, { prev: string; next: string; clear: string }> = {
    ru: {
        prev: "Предыдущий месяц",
        next: "Следующий месяц",
        clear: "Очистить",
    },
    en: {
        prev: "Previous month",
        next: "Next month",
        clear: "Clear",
    },
};

const pad = (n: number) => String(n).padStart(2, "0");

/** "2026-08-15" → "15.08.2026". Некорректное значение отдаем как есть. */
export const formatDateDMY = (iso: string): string => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
};

const toISO = (year: number, month: number, day: number) =>
    `${year}-${pad(month + 1)}-${pad(day)}`;

type Cell = { day: number; inMonth: boolean; iso: string };

/** Сетка 6×7 для месяца, неделя с понедельника. */
function buildGrid(year: number, month: number): Cell[] {
    // getDay(): 0=вс..6=сб → приводим к пн=0..вс=6
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Cell[] = [];
    for (let i = 0; i < 42; i++) {
        const offset = i - firstWeekday;
        const date = new Date(year, month, offset + 1);
        cells.push({
            day: date.getDate(),
            inMonth: offset >= 0 && offset < daysInMonth,
            iso: toISO(date.getFullYear(), date.getMonth(), date.getDate()),
        });
    }
    return cells;
}

/** Диапазон дат в ISO; пустая строка — граница не выбрана. */
export type DateRange = { from: string; to: string };

export const EMPTY_DATE_RANGE: DateRange = { from: "", to: "" };

/** "15.08.2026 — 18.08.2026"; пустой диапазон — "". */
export const formatDateRangeDMY = ({ from, to }: DateRange): string =>
    from ? `${formatDateDMY(from)} — ${to ? formatDateDMY(to) : "…"}` : "";

type CommonProps = {
    locale: Locale;
    placeholder: string;
    /** Классы поля — приходят из формы, чтобы совпасть с остальными полями. */
    className?: string;
    /** id подсказки/ошибки под полем (aria-describedby у кнопки поля). */
    describedBy?: string;
    /** Поле с ошибкой валидации (aria-invalid у кнопки поля). */
    invalid?: boolean;
};

type Props = CommonProps &
    (
        | {
              mode?: "single";
              /** Значение в ISO: "YYYY-MM-DD" либо "" — дата не выбрана. */
              value: string;
              onChange: (iso: string) => void;
          }
        | {
              mode: "range";
              value: DateRange;
              onChange: (range: DateRange) => void;
          }
    );

export default function DateField(props: Props) {
    const { locale, placeholder, className = "", describedBy, invalid } = props;
    const range: DateRange =
        props.mode === "range"
            ? props.value
            : { from: props.value, to: props.value };
    const hasValue = Boolean(range.from);
    const displayValue =
        props.mode === "range"
            ? formatDateRangeDMY(props.value)
            : formatDateDMY(props.value);
    const copy = UI_COPY[locale];
    const popoverId = useId();
    const wrapRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const [open, setOpen] = useState(false);
    // Месяц в просмотре; пересчитывается при каждом открытии календаря.
    const [view, setView] = useState(() => {
        const now = new Date();
        return { year: now.getFullYear(), month: now.getMonth() };
    });

    // Прошедшие даты выбрать нельзя: заявка всегда на будущее.
    // Считаем «сегодня» только на клиенте, после открытия календаря.
    const [todayISO, setTodayISO] = useState("");

    const close = useCallback((returnFocus = true) => {
        setOpen(false);
        if (returnFocus) triggerRef.current?.focus();
    }, []);

    const openPicker = () => {
        const now = new Date();
        setTodayISO(toISO(now.getFullYear(), now.getMonth(), now.getDate()));
        // Открываем на месяце выбранной даты, иначе на текущем.
        const picked = /^(\d{4})-(\d{2})-/.exec(range.from);
        setView(
            picked
                ? { year: Number(picked[1]), month: Number(picked[2]) - 1 }
                : { year: now.getFullYear(), month: now.getMonth() },
        );
        setOpen(true);
    };

    // Закрытие по Esc и по клику вне поля.
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.stopPropagation();
                close();
            }
        };
        const onPointerDown = (e: PointerEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) close(false);
        };

        document.addEventListener("keydown", onKeyDown, true);
        document.addEventListener("pointerdown", onPointerDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown, true);
            document.removeEventListener("pointerdown", onPointerDown);
        };
    }, [open, close]);

    const shiftMonth = (dir: -1 | 1) => {
        setView((v) => {
            const total = v.year * 12 + v.month + dir;
            return { year: Math.floor(total / 12), month: total % 12 };
        });
    };

    const pick = (iso: string) => {
        if (props.mode !== "range") {
            props.onChange(iso);
            close();
            return;
        }
        const { from, to } = props.value;
        // Начало еще не выбрано или диапазон уже полный — начинаем заново.
        if (!from || to) {
            props.onChange({ from: iso, to: "" });
            return;
        }
        props.onChange(
            iso < from ? { from: iso, to: from } : { from, to: iso },
        );
        close();
    };

    const clear = () => {
        if (props.mode === "range") props.onChange(EMPTY_DATE_RANGE);
        else props.onChange("");
        close();
    };

    const cells = buildGrid(view.year, view.month);
    // Не даем уйти в месяцы, где все даты в прошлом.
    const atMinMonth =
        todayISO.slice(0, 7) === `${view.year}-${pad(view.month + 1)}`;

    return (
        <div className="relative" ref={wrapRef}>
            <button
                type="button"
                ref={triggerRef}
                onClick={() => (open ? close() : openPicker())}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={open ? popoverId : undefined}
                aria-label={
                    hasValue ? `${placeholder}: ${displayValue}` : placeholder
                }
                aria-describedby={describedBy}
                aria-invalid={invalid || undefined}
                className={`${className} flex items-center justify-between gap-3 text-left`}
            >
                <span className={hasValue ? "" : "text-neutral-400"}>
                    {hasValue ? displayValue : placeholder}
                </span>
                <CalendarBlankIcon
                    size={18}
                    className="shrink-0 text-neutral-400"
                />
            </button>

            {open && (
                <div
                    id={popoverId}
                    className="absolute left-0 right-0 top-full z-30 mt-2 rounded-md bg-white p-4 shadow-xl ring-1 ring-black/5"
                >
                    <div className="mb-3 flex items-center justify-between">
                        <button
                            type="button"
                            aria-label={copy.prev}
                            disabled={atMinMonth}
                            onClick={() => shiftMonth(-1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 disabled:pointer-events-none disabled:opacity-30"
                        >
                            <CaretLeftIcon size={16} weight="bold" />
                        </button>
                        <span className="text-sm text-neutral-700">
                            {MONTHS[locale][view.month]} {view.year}
                        </span>
                        <button
                            type="button"
                            aria-label={copy.next}
                            onClick={() => shiftMonth(1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800"
                        >
                            <CaretRightIcon size={16} weight="bold" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-y-1 text-center">
                        {WEEKDAYS[locale].map((wd) => (
                            <div
                                key={wd}
                                className="pb-1 text-[11px] uppercase text-neutral-400"
                            >
                                {wd}
                            </div>
                        ))}

                        {cells.map((cell) => {
                            const isPast = cell.iso < todayISO;
                            const isSelected =
                                cell.iso === range.from ||
                                cell.iso === range.to;
                            const inRange =
                                Boolean(range.to) &&
                                cell.iso > range.from &&
                                cell.iso < range.to;
                            return (
                                <div
                                    key={cell.iso}
                                    className="flex items-center justify-center"
                                >
                                    <button
                                        type="button"
                                        disabled={isPast}
                                        onClick={() => pick(cell.iso)}
                                        aria-pressed={
                                            isSelected || inRange
                                                ? true
                                                : undefined
                                        }
                                        aria-current={
                                            cell.iso === todayISO
                                                ? "date"
                                                : undefined
                                        }
                                        aria-label={formatDateDMY(cell.iso)}
                                        className={[
                                            "flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors",
                                            isSelected
                                                ? "bg-brand-red font-medium text-white"
                                                : inRange
                                                  ? "bg-neutral-100 text-neutral-800"
                                                  : cell.inMonth
                                                    ? "text-neutral-700 hover:bg-neutral-100"
                                                    : "text-neutral-300 hover:bg-neutral-100",
                                            isPast
                                                ? "pointer-events-none opacity-30"
                                                : "cursor-pointer",
                                        ].join(" ")}
                                    >
                                        {cell.day}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {hasValue && (
                        <div className="mt-3 text-center">
                            <button
                                type="button"
                                onClick={clear}
                                className="cursor-pointer text-xs text-neutral-500 underline underline-offset-2 hover:text-neutral-800"
                            >
                                {copy.clear}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
