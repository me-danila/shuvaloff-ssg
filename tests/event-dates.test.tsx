import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import EventDates from "@/components/ui/EventDates";
import { getCurrentMonthEventDates } from "@/lib/eventDates";

const dates = [
    "2026-11-18T19:00",
    "2026-11-25T19:00",
    "2026-12-02T19:00",
    "2026-12-09T19:00",
    "2026-12-16T19:00",
    "2026-12-23T19:00",
    "2026-12-30T19:00",
];

describe("ближайшие даты мероприятия", () => {
    test("в ноябре показываем только ноябрьские даты", () => {
        expect(
            getCurrentMonthEventDates(
                dates,
                new Date("2026-11-13T12:00:00+03:00"),
            ),
        ).toEqual(dates.slice(0, 2));
    });

    test("25 ноября скрываем 18 ноября, сегодняшнюю дату сохраняем", () => {
        expect(
            getCurrentMonthEventDates(
                dates,
                new Date("2026-11-25T20:00:00+03:00"),
            ),
        ).toEqual([dates[1]]);
    });

    test("после последней даты месяца декабрьские заранее не показываем", () => {
        expect(
            getCurrentMonthEventDates(
                dates,
                new Date("2026-11-26T12:00:00+03:00"),
            ),
        ).toEqual([]);
    });

    test("2 декабря показываем все декабрьские даты", () => {
        expect(
            getCurrentMonthEventDates(
                dates,
                new Date("2026-12-02T12:00:00+03:00"),
            ),
        ).toEqual(dates.slice(2));
    });

    test("9 декабря скрываем 2 декабря", () => {
        expect(
            getCurrentMonthEventDates(
                dates,
                new Date("2026-12-09T12:00:00+03:00"),
            ),
        ).toEqual(dates.slice(3));
    });

    test("смена месяца наступает в полночь по Петербургу", () => {
        expect(
            getCurrentMonthEventDates(dates, new Date("2026-11-30T20:59:59Z")),
        ).toEqual([]);
        expect(
            getCurrentMonthEventDates(dates, new Date("2026-11-30T21:00:00Z")),
        ).toEqual(dates.slice(2));
    });

    test("год учитывается, даты прошлого года не возвращаются", () => {
        expect(
            getCurrentMonthEventDates(
                dates,
                new Date("2027-11-13T12:00:00+03:00"),
            ),
        ).toEqual([]);
    });

    test("статический HTML не содержит дат, устаревающих после сборки", () => {
        expect(
            renderToStaticMarkup(
                <EventDates
                    dates={dates}
                    locale="ru"
                    title="Ближайшие даты:"
                />,
            ),
        ).toBe("");
    });
});
