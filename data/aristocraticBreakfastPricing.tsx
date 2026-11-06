import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/routing";

/** Общий блок стоимости для основной и подробной страниц Графского завтрака. */
export const aristocraticBreakfastPricing: Record<Locale, ReactNode> = {
    ru: (
        <>
            <em>Стоимость:</em>
            <span data-price-periods className="grid gap-6">
                <span>
                    <em>Понедельник – пятница</em>
                    <br />
                    от 5 500 ₽ — на одну персону
                    <br />
                    от 8 500 ₽ — на две персоны
                </span>
                <span>
                    <em>Суббота – воскресенье</em>
                    <br />
                    от 6 500 ₽ — на одну персону
                    <br />
                    от 9 500 ₽ — на две персоны
                </span>
                <span>
                    <em>
                        В период новогодних праздников с 31 декабря по 10
                        января:
                    </em>
                    <br />
                    от 6 500 ₽ — на одну персону
                    <br />
                    от 10 000 ₽ — на две персоны
                </span>
            </span>
            <span className="mt-6 block" data-price-note>
                Итоговая стоимость зависит от даты посещения и подтверждается
                при бронировании.
            </span>
        </>
    ),
    en: (
        <>
            <em>Price:</em>
            <span data-price-periods className="grid gap-6">
                <span>
                    <em>Monday – Friday</em>
                    <br />
                    from 5 500 ₽ — for one person
                    <br />
                    from 8 500 ₽ — for two people
                </span>
                <span>
                    <em>Saturday – Sunday</em>
                    <br />
                    from 6 500 ₽ — for one person
                    <br />
                    from 9 500 ₽ — for two people
                </span>
                <span>
                    <em>
                        During the New Year holidays from December 31 to January
                        10:
                    </em>
                    <br />
                    from 6 500 ₽ — for one person
                    <br />
                    from 10 000 ₽ — for two people
                </span>
            </span>
            <span className="mt-6 block" data-price-note>
                The final price depends on the date of your visit and is
                confirmed when booking.
            </span>
        </>
    ),
};
