import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import {
    BellIcon,
    CarProfileIcon,
    CreditCardIcon,
    GiftIcon,
    StampIcon,
} from "@phosphor-icons/react/dist/ssr";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import type { LandingDictionary } from "@/data/landing";
import type { LandingServiceIcon } from "@/data/landing/types";

// Трансфер и консьерж — те же иконки, что на их страницах основного сайта.
const ICONS: Record<LandingServiceIcon, Icon> = {
    visa: StampIcon,
    card: CreditCardIcon,
    transfer: CarProfileIcon,
    concierge: BellIcon,
    gift: GiftIcon,
};

/**
 * «Что мы берем на себя» — компактная полоса из пяти равных колонок без
 * карточек, колонки разделены тонкими вертикальными линиями. На десктопе —
 * max-w-7xl, по ширине модуля бронирования в hero.
 *
 * Десктоп (lg+): grid в 5 колонок; каждая колонка — subgrid на 3 строки
 * (иконка / заголовок / текст), поэтому тексты начинаются на одной высоте,
 * даже если какой-то заголовок переносится на две строки.
 * Мобила/планшет: горизонтальный скролл со snap; колонка ~3/4 экрана,
 * чтобы край следующей подсказывал прокрутку.
 */
export default function LandingServices({
    dict,
}: {
    dict: LandingDictionary["services"];
}) {
    return (
        <section className="py-8 xl:py-10">
            {/* Видимого заголовка нет по макету; h2 остается для скринридеров. */}
            <h2 className="sr-only">{dict.title}</h2>
            <StaggerContainer className="no-scrollbar flex snap-x snap-mandatory scroll-px-6 overflow-x-auto px-6 lg:grid lg:snap-none lg:grid-cols-5 lg:grid-rows-[auto_auto_1fr] lg:overflow-visible xl:mx-auto xl:max-w-7xl xl:px-0">
                {dict.items.map((item) => {
                    const ItemIcon = ICONS[item.icon];
                    return (
                        <StaggerItem
                            key={item.icon}
                            className="flex w-[78%] shrink-0 snap-start flex-col gap-3 border-l border-brand-brown/15 px-5 first:border-l-0 first:pl-0 sm:w-[40%] lg:row-span-3 lg:grid lg:w-auto lg:grid-rows-subgrid lg:gap-0 lg:px-6 lg:last:pr-0 xl:px-8"
                        >
                            <ItemIcon
                                size={28}
                                weight="light"
                                className="text-brand-red"
                                aria-hidden="true"
                            />
                            <h3 className="font-history text-lg uppercase leading-tight text-brand-brown lg:mt-4 xl:text-xl">
                                {item.title}
                            </h3>
                            <p className="text-brand-brown/75 lg:mt-2 xl:text-sm/6">
                                {item.text}
                            </p>
                        </StaggerItem>
                    );
                })}
            </StaggerContainer>
        </section>
    );
}
