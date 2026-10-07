import Button from "@/components/ui/Button";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { LandingDictionary } from "@/data/landing";
import { AllSales } from "@/data/SalesData";
import { type LandingLocale, landingHref } from "@/lib/i18n/routing";

/**
 * Спецпредложения. Карточка — разметка SpecialOffersSection главной (серый
 * фон секции, белая карточка: название, фото 16:11, текст, кнопка), но
 * сеткой: 4 в ряд на десктопе, 2×2 на мобиле — поэтому на мобиле шрифты и
 * отступы компактнее. Фото — из AllSales.en по bookingUrl; клик ведет в
 * форму бронирования TravelLine с оффером/промокодом этой акции.
 */
export default function LandingOffers({
    dict,
    locale,
}: {
    dict: LandingDictionary["offers"];
    locale: LandingLocale;
}) {
    const sales = new Map(AllSales.en.map((sale) => [sale.bookingUrl, sale]));

    return (
        <section
            id="offers"
            className="scroll-mt-16 bg-[#ededeb] py-10 xl:py-16"
        >
            <div className="mx-auto max-w-7xl px-4 xl:px-0">
                <FadeUp>
                    <h2 className="text-center text-[#3d2b22]">{dict.title}</h2>
                </FadeUp>

                <StaggerContainer className="mt-8 grid grid-cols-2 gap-3 xl:mt-12 xl:grid-cols-4 xl:gap-4">
                    {dict.items.map((offer) => {
                        const sale = sales.get(offer.bookingUrl);
                        const href = landingHref(offer.bookingUrl, locale);
                        return (
                            <StaggerItem
                                key={offer.bookingUrl}
                                className="flex flex-col overflow-hidden rounded-[4px] bg-white pb-4 text-center xl:pb-7"
                            >
                                <h3 className="flex min-h-[4.5rem] items-start justify-center px-2 py-3 font-history text-sm uppercase leading-tight text-[#372a24] xl:h-[6.5rem] xl:px-4 xl:py-5 xl:text-[21px]">
                                    <a
                                        href={href}
                                        className="transition-colors hover:text-brand-red"
                                    >
                                        {offer.title}
                                    </a>
                                </h3>
                                {sale && (
                                    <a
                                        href={href}
                                        aria-label={offer.title}
                                        className="relative block aspect-[16/11] w-full overflow-hidden"
                                    >
                                        <Image
                                            src={sale.imgUrl}
                                            alt={offer.title}
                                            fill
                                            sizes="(max-width: 1280px) 50vw, 25vw"
                                            className="object-cover"
                                            style={
                                                sale.mediaObjectPosition
                                                    ? {
                                                          objectPosition:
                                                              sale.mediaObjectPosition,
                                                      }
                                                    : undefined
                                            }
                                        />
                                    </a>
                                )}
                                <p className="mt-3 flex-1 px-2 text-xs leading-5 text-[#372a24] xl:mt-5 xl:px-5 xl:text-base xl:leading-6">
                                    {offer.text}
                                </p>
                                <div className="mt-4 px-2 xl:mt-6 xl:px-5">
                                    <Button
                                        href={href}
                                        size="xs"
                                        className="w-full xl:w-auto xl:px-8 xl:py-3 xl:text-base"
                                    >
                                        {dict.book}
                                    </Button>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </div>
        </section>
    );
}
