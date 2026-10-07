import LandingRoomsCarousel, {
    type LandingRoomCard,
} from "@/components/landing/LandingRoomsCarousel";
import type { LandingDictionary } from "@/data/landing";
import { AllRooms } from "@/data/RoomsData";
import { type LandingLocale, landingHref } from "@/lib/i18n/routing";

/** «17 м²», «18-25 м²» → числа для объединенного диапазона. */
const areaNumbers = (area: string) => (area.match(/\d+/g) ?? []).map(Number);

/**
 * Названия длиннее этого переносятся на 2 строки (DE/FR/ES/IT). Тогда всем
 * заголовкам задаем высоту в 2 строки — иначе фото в ряду стоят на разной
 * высоте. Короткие (EN) — по содержимому, без пустоты над фото. На мобиле
 * карточка одна на экран, выравнивать нечего.
 */
const ONE_LINE_TITLE_MAX = 20;
const TWO_LINE_TITLE_CLASS = "md:min-h-[5.8rem]";

const formatArea = (min: number, max: number) =>
    min === max ? `${min} m²` : `${min}-${max} m²`;

/**
 * Номерной фонд. Серверная часть: собирает карточки из словаря (название,
 * описание) и data/RoomsData (фото, площадь, ссылка бронирования), чтобы
 * тяжелые данные номеров не попадали в клиентский бандл.
 *
 * Клик по карточке — модуль бронирования TravelLine (/en/booking/, /it/booking/, …) с
 * предвыбранной категорией (?be-room=…). У объединенной категории
 * (исторические люксы — два типа номеров) предвыбора нет.
 */
export default function LandingRooms({
    dict,
    locale,
}: {
    dict: LandingDictionary["rooms"];
    locale: LandingLocale;
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
            href: landingHref(
                rooms.length === 1 ? first.bookingUrl : "/booking/",
                locale,
            ),
        };
    });

    return (
        <LandingRoomsCarousel
            title={dict.title}
            cards={cards}
            labels={dict}
            titleHeightClassName={
                cards.some((card) => card.title.length > ONE_LINE_TITLE_MAX)
                    ? TWO_LINE_TITLE_CLASS
                    : ""
            }
        />
    );
}
