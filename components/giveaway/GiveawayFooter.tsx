import Footer from "@/components/layout/Footer";
import Image from "@/components/ui/OptimizedImage";
import { type Giveaway, giveawayImages } from "@/data/giveaway";

export default function GiveawayFooter({
    interior,
    logo,
}: Pick<Giveaway, "interior" | "logo">) {
    const banners = [
        {
            key: "academia",
            image: giveawayImages.footerAcademia,
            logo: (
                <Image
                    src={giveawayImages.academiaLogo}
                    alt="ACADEMIA Коллекция особняков"
                    width={146}
                    height={37}
                    className="h-auto w-[122px] xl:w-[262px]"
                />
            ),
        },
        {
            key: "partner",
            image: interior,
            logo: (
                <Image
                    {...logo}
                    sizes="(min-width: 1200px) 300px, 125px"
                    className="h-auto w-[125px] xl:w-[300px]"
                />
            ),
        },
    ];

    return (
        <>
            <div className="grid grid-cols-2 xl:grid-cols-1">
                {banners.map((banner) => (
                    <div
                        key={banner.key}
                        className="relative flex aspect-[180/225] items-center justify-center overflow-hidden xl:aspect-auto xl:h-[225px]"
                    >
                        <Image
                            src={banner.image}
                            alt=""
                            fill
                            sizes="(min-width: 1200px) 100vw, 50vw"
                            loading="lazy"
                            className="object-cover"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-black/45"
                        />
                        <div className="relative">{banner.logo}</div>
                    </div>
                ))}
            </div>
            <Footer locale="ru" flush />
        </>
    );
}
