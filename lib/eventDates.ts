/** Ближайшие даты текущего месяца по времени Санкт-Петербурга, включая сегодня. */
export function getCurrentMonthEventDates(
    dates: string[],
    now: Date,
): string[] {
    const parts = new Intl.DateTimeFormat("en", {
        timeZone: "Europe/Moscow",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(now);
    const value = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((part) => part.type === type)?.value;
    const month = `${value("year")}-${value("month")}`;
    const today = `${month}-${value("day")}`;

    return dates.filter(
        (start) => start.startsWith(`${month}-`) && start.slice(0, 10) >= today,
    );
}
