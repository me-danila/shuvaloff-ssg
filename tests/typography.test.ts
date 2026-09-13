import { describe, expect, test } from "bun:test";
import { nbsp } from "@/lib/typography";

const NBSP = "\u00A0";

describe("nbsp", () => {
    test("короткие слова не остаются в конце строки", () => {
        expect(nbsp("меры по обеспечению")).toBe(`меры по${NBSP}обеспечению`);
    });

    test("два коротких слова подряд обрабатываются оба", () => {
        expect(nbsp("и в случае")).toBe(`и${NBSP}в${NBSP}случае`);
    });

    test("сокращения держатся вместе со следующим словом", () => {
        expect(nbsp("ул. Моховая")).toBe(`ул.${NBSP}Моховая`);
    });

    test("число не отрывается от единицы измерения", () => {
        expect(nbsp("30 дней")).toBe(`30${NBSP}дней`);
    });

    test("тире не начинает строку", () => {
        expect(nbsp("Отель — особняк")).toBe(`Отель${NBSP}— особняк`);
    });

    test("длинные слова и адреса не трогаются", () => {
        expect(nbsp("обработка персональных данных")).toBe(
            "обработка персональных данных",
        );
        expect(nbsp("it@academia-group.ru")).toBe("it@academia-group.ru");
    });
});
