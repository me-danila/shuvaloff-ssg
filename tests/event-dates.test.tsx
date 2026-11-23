import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import EventDates from "@/components/ui/EventDates";
import { getEventOccurrences } from "@/data/EventsData";
import { getEventToday, selectEventOccurrence } from "@/lib/eventDates";

const dates = [
    "2026-11-25T19:00",
    "2026-12-02T19:00",
    "2026-12-09T19:00",
    "2027-01-02T19:00",
];
const all = getEventOccurrences(dates.toReversed(), "ru");

describe("выбор даты мероприятия", () => {
    test("ссылка на следующий месяц выбирает сеанс из афиши", () => {
        expect(all.map((o) => o.start)).toEqual(dates);
        expect(all[1].dateParam).toBe("2026-12-02");
        expect(selectEventOccurrence(all, all[1].dateParam)).toBe(all[1]);
    });
    test("истекшая или неизвестная дата заменяется ближайшей по Петербургу", () => {
        expect(getEventToday(new Date("2026-11-25T20:59:59Z"))).toBe(
            "2026-11-25",
        );
        const today = getEventToday(new Date("2026-11-25T21:00:00Z"));
        expect(today).toBe("2026-11-26");
        const upcoming = all.filter((o) => o.start >= today);
        for (const param of [null, "invalid", "2026-11-25"]) {
            expect(selectEventOccurrence(upcoming, param)).toBe(all[1]);
        }
        expect(selectEventOccurrence([], null)).toBeUndefined();
    });
    test("каждый сеанс одного дня имеет отдельную ссылку", () => {
        const both = getEventOccurrences(
            ["2027-01-02T14:00", "2027-01-02T19:00"],
            "ru",
        );
        expect(both.map((o) => o.dateParam)).toEqual(both.map((o) => o.start));
        expect(selectEventOccurrence(both, both[1].dateParam)).toBe(both[1]);
    });
    test("статический HTML содержит расписание и кнопку для первого экрана", () => {
        const html = renderToStaticMarkup(
            <EventDates eventTitle="Лото" locale="ru" occurrences={all} />,
        );
        expect(html).toContain('dateTime="2026-12-02T19:00"');
        expect(html).toContain("Забронировать");
        expect(html).toContain("data-schedule-archive");
    });
});
