import Button from "@/components/ui/Button";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { LandingDictionary } from "@/data/landing";
import { AllSales } from "@/data/SalesData";
import { type LandingLocale, landingHref } from "@/lib/i18n/routing";

/**
 * Сценарии особняка — премиальные тематические пакеты, поэтому крупнее
 * спецпредложений: вертикальные карточки на всё фото, текст поверх
 * затемнения снизу (как блок «Графский Петербург» главной). Десктоп — 3 в
 * ряд, мобила — горизонтальный скролл со snap (край следующей карточки
 * подсказывает прокрутку).
 *
 * Фото — из AllSales.en по bookingUrl. Клик ведет в модуль бронирования
 * TravelLine с оффером пакета (не на детальную страницу).
 */
export default function LandingScenarios({
    dict,
    locale,
}: {
    dict: LandingDictionary["scenarios"];
    locale: LandingLocale;
}) {
    const sales = new Map(AllSales.en.map((sale) => [sale.bookingUrl, sale]));

    return (
        <section className="bg-white py-10 xl:py-16">
            <div className="mx-auto max-w-7xl xl:px-0">
                <FadeUp>
                    <h2 className="px-6 text-center text-[#3d2b22]">
                        {dict.title}
                    </h2>
                </FadeUp>

                <StaggerContainer
                    data-lenis-prevent-horizontal
                    className="no-scrollbar mt-8 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 md:grid md:snap-none md:grid-cols-3 md:overflow-visible xl:mt-12 xl:gap-4 xl:px-0"
                >
                    {dict.items.map((item) => {
                        const sale = sales.get(item.bookingUrl);
                        const href = landingHref(item.bookingUrl, locale);
                        return (
                            <StaggerItem
                                key={item.bookingUrl}
                                className="group relative flex aspect-4/5 w-[85%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[4px] bg-stone-800 text-white md:w-auto xl:aspect-3/4"
                            >
                                {/* Фото — ссылка на всю карточку: клик по
                                    любому месту, включая фото. С клавиатуры
                                    ссылка — кнопка ниже, поэтому эта вне
                                    tab-порядка. Текст сверху пропускает
                                    клики насквозь, кроме кнопки. */}
                                <a
                                    href={href}
                                    tabIndex={-1}
                                    aria-label={item.title}
                                    className="absolute inset-0"
                                >
                                    {sale && (
                                        <Image
                                            src={sale.imgUrl}
                                            alt=""
                                            fill
                                            sizes="(max-width: 768px) 85vw, 33vw"
                                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                                            style={
                                                item.imagePosition
                                                    ? {
                                                          objectPosition:
                                                              item.imagePosition,
                                                      }
                                                    : undefined
                                            }
                                        />
                                    )}
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent"
                                    />
                                </a>
                                <div className="pointer-events-none relative flex flex-col items-start gap-3 p-6 xl:gap-4 xl:p-8">
                                    <h3 className="text-balance font-history text-xl uppercase leading-tight text-white xl:text-2xl">
                                        {item.title}
                                    </h3>
                                    <p className="max-w-[22rem] text-pretty text-sm leading-6 text-white/85 xl:text-base">
                                        {item.text}
                                    </p>
                                    <div className="pointer-events-auto mt-2">
                                        <Button
                                            href={href}
                                            size="xs"
                                            className="px-6 xl:px-8 xl:py-3 xl:text-base"
                                        >
                                            {dict.book}
                                        </Button>
                                    </div>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </div>
        </section>
    );
}
