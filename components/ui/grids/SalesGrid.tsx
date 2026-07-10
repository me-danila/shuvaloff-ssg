import Button from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { AllSales } from "@/data/SalesData";
import { type Locale, localizeHref } from "@/lib/i18n/routing";

const copyByLocale = {
    ru: { book: "Забронировать", more: "Подробнее" },
    en: { book: "Book now", more: "Details" },
} as const;

const renderSaleSubtitle = (subtitle: string) => {
    if (
        subtitle ===
        "Специальные привилегии для именинников и скидка 15% от 2 ночей"
    ) {
        return (
            <>
                Специальные привилегии для именинников
                <br />и скидка 15% от 2 ночей
            </>
        );
    }

    return subtitle;
};

export default function SalesGrid({ locale }: { locale: Locale }) {
    const sales = AllSales[locale];
    const copy = copyByLocale[locale];

    return (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sales.map((sale) => {
                const isExternal = !sale.bookingUrl.startsWith("/");
                const isDetails = sale.actionType === "details" || isExternal;
                const href = isExternal
                    ? sale.bookingUrl
                    : localizeHref(sale.bookingUrl, locale);
                return (
                    <StaggerItem
                        key={sale.title}
                        className="flex flex-col overflow-hidden rounded-[4px] bg-white pb-7 text-center"
                    >
                        <h3 className="flex h-[6.5rem] items-start justify-center px-4 py-5 font-history text-xl uppercase leading-tight text-[#372a24] xl:text-[21px]">
                            <a
                                href={href}
                                target={isExternal ? "_blank" : undefined}
                                rel={
                                    isExternal
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className="transition-colors hover:text-brand-red"
                            >
                                {sale.title}
                            </a>
                        </h3>
                        <a
                            href={href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            aria-label={sale.title}
                            className="relative block aspect-[16/11] w-full overflow-hidden"
                        >
                            <Image
                                src={sale.imgUrl}
                                alt={sale.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
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
                        <p className="mt-5 flex-1 px-5 text-sm leading-6 text-[#372a24] xl:text-base">
                            {renderSaleSubtitle(sale.subtitle)}
                        </p>
                        <div className="mt-6 px-5">
                            <Button
                                href={href}
                                target={isExternal ? "_blank" : undefined}
                                variant={"primary"}
                                size="xl"
                                className="xl:px-8 xl:py-3 xl:text-base"
                            >
                                {isDetails ? copy.more : copy.book}
                            </Button>
                        </div>
                    </StaggerItem>
                );
            })}
        </StaggerContainer>
    );
}
