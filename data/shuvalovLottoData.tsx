import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/routing";

export const shuvalovLotto: Record<
    Locale,
    {
        title: string;
        subtitle: string;
        imgUrl: string;
        fullDescription: ReactNode;
    }
> = {
    ru: {
        title: "Шуваловское лото",
        subtitle:
            "Проведите ужин за игрой в лото с графом Шуваловым в лучших традициях дворянских домов XIX века",
        imgUrl: "/images/shuvalov-lotto/IMG_2160.jpg",
        fullDescription: (
            <>
                В ресторане ACADEMIA Шувалова вы можете принять участие в
                традиционном развлечении русских аристократов — игре в лото.
                Граф Шувалов будет лично вести игру, дополняя ее рассказами о
                нравах и традициях светского общества XIX века.
                <br />
                <br />
                Для получения игрового билета необходимо внести депозит на 1 500
                ₽, который вы сможете использовать на любые блюда и напитки из
                меню. Вы можете также приобрести несколько билетов и повысить
                свои шансы на победу. Победитель получает сертификат на 3 000 ₽
                на следующий визит в ресторан.
            </>
        ),
    },
    en: {
        title: "Shuvalov Lotto",
        subtitle:
            "Enjoy dinner and a game of lotto with Count Shuvalov in the finest traditions of 19th-century noble households",
        imgUrl: "/images/shuvalov-lotto/IMG_2160.jpg",
        fullDescription: (
            <>
                At ACADEMIA Shuvaloff restaurant, you can take part in a
                traditional pastime of the Russian aristocracy — a game of
                lotto. Count Shuvalov will personally host the game, sharing
                stories about the customs and traditions of 19th-century
                society.
                <br />
                <br />
                To receive a game ticket, pay a deposit of 1,500 ₽, which you
                can spend on any food and drinks from the menu. You can also
                purchase several tickets to increase your chances of winning.
                The winner receives a 3,000 ₽ certificate for their next visit
                to the restaurant.
            </>
        ),
    },
};
