import Footer from "@/components/layout/Footer";
import Image from "@/components/ui/OptimizedImage";
import { poseidonImages } from "@/data/poseidonData";

const BANNERS = [
    {
        key: "academia",
        image: poseidonImages.footerAcademia,
        logo: (
            <Image
                src={poseidonImages.academiaLogo}
                alt="ACADEMIA Коллекция особняков"
                width={146}
                height={37}
                className="h-auto w-[122px] xl:w-[262px]"
            />
        ),
    },
    {
        key: "poseidon",
        image: poseidonImages.footerPoseidon,
        logo: (
            <Image
                src={poseidonImages.poseidonLogo}
                alt="Посейдон — первый рыбный ресторан"
                width={900}
                height={386}
                sizes="(min-width: 1200px) 300px, 125px"
                className="h-auto w-[125px] xl:w-[300px]"
            />
        ),
    },
];

/**
 * Футер промо-страницы /poseidon/: баннеры партнеров с логотипами (мобила —
 * два квадрата в ряд, десктоп — две полосы во всю ширину), под ними — общий
 * футер сайта: заказчик хочет, чтобы с промо гости уходили на основную версию.
 */
export default function PoseidonFooter() {
    return (
        <>
            <div className="grid grid-cols-2 xl:grid-cols-1">
                {BANNERS.map((banner) => (
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
