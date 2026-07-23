import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import RoomCategoriesPricesSection from "@/components/sections/RoomCategoriesPricesSection";
import { AllRooms, toRoomListItem } from "@/data/RoomsData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    ...buildPageMetadata({
        locale: "ru",
        path: "/test/prices/",
        title: "Отель ACADEMIA Особняк Шувалова — Санкт-Петербург",
        description:
            "Отель в историческом особняке XIX века в центре Санкт-Петербурга",
    }),
    robots: { index: false, follow: false },
};

export default function Page() {
    return (
        <div className="v2-fonts">
            <HomePage
                locale="ru"
                roomCategories={
                    <RoomCategoriesPricesSection
                        rooms={AllRooms.ru.map(toRoomListItem)}
                    />
                }
            />
        </div>
    );
}
