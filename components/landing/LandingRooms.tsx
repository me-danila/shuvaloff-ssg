import LandingRoomsCarousel, {
    type LandingRoomCard,
} from "@/components/landing/LandingRoomsCarousel";
import type { LandingDictionary } from "@/data/landing";
import { AllRooms } from "@/data/RoomsData";
import { localizeHref } from "@/lib/i18n/routing";

/** «17 м²», «18-25 м²» → числа для объединенного диапазона. */
const areaNumbers = (area: string) => (area.match(/\d+/g) ?? []).map(Number);

const formatArea = (min: number, max: number) =>
    min === max ? `${min} m²` : `${min}-${max} m²`;

/**
 * Номерной фонд. Серверная часть: собирает карточки из словаря (название,
 * описание) и data/RoomsData (фото, площадь, ссылка бронирования), чтобы
 * тяжелые данные номеров не попадали в клиентский бандл.
 *
 * Клик по карточке — модуль бронирования TravelLine (/en/booking/) с
 * предвыбранной категорией (?be-room=…). У объединенной категории
 * (исторические люксы — два типа номеров) предвыбора нет.
 */
export default function LandingRooms({
    dict,
}: {
    dict: LandingDictionary["rooms"];
}) {
    const bySlug = new Map(AllRooms.en.map((room) => [room.slug, room]));

    const cards: LandingRoomCard[] = dict.categories.map((category) => {
        const rooms = category.rooms.flatMap((slug) => {
            const room = bySlug.get(slug);
            return room ? [room] : [];
        });
        const areas = rooms.flatMap((room) => areaNumbers(room.area));
        const [first] = rooms;

        return {
            title: category.title,
            text: category.text,
            image: {
                src: (rooms.at(-1) ?? first).image.src,
                alt: category.title,
            },
            area: formatArea(Math.min(...areas), Math.max(...areas)),
            href: localizeHref(
                rooms.length === 1 ? first.bookingUrl : "/booking/",
                "en",
            ),
        };
    });

    return (
        <LandingRoomsCarousel title={dict.title} cards={cards} labels={dict} />
    );
}
