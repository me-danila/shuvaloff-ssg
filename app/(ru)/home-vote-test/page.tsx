import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

// Тестовый дубль главной: три hero подряд с вариантами кнопки голосования
// (кнопка в списке / карточка слева / карточка справа). Не индексируется.
export const metadata: Metadata = {
    ...buildPageMetadata({
        locale: "ru",
        path: "/home-vote-test/",
        title: "Отель ACADEMIA Особняк Шувалова — Санкт-Петербург",
        description:
            "Отель в историческом особняке XIX века в центре Санкт-Петербурга",
    }),
    robots: { index: false, follow: false },
};

export default function HomeVoteTest() {
    return (
        <div className="v2-fonts">
            <HomePage
                locale="ru"
                voteVariants={[
                    "button",
                    "left",
                    "right",
                    "bottom-left",
                    "bottom-right",
                ]}
            />
        </div>
    );
}
