export { getEventToday, selectEventOccurrence } from "./eventDateDisplay";

/** Если в один день два сеанса, ссылка должна различать их по времени. */
export function getEventDateParam(start: string, dates: string[]) {
    const day = start.slice(0, 10);
    return dates.some((date) => date !== start && date.startsWith(day))
        ? start
        : day;
}
