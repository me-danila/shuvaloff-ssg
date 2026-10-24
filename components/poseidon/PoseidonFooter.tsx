import Image from "@/components/ui/OptimizedImage";
import { poseidonImages, poseidonLegal } from "@/data/poseidonData";

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

const LINKS = [
    poseidonLegal.agreement,
    poseidonLegal.policy,
    poseidonLegal.rules,
];

/**
 * Футер промо-страницы /poseidon/: баннеры партнеров с логотипами (мобила —
 * два квадрата в ряд, десктоп — две полосы во всю ширину), юр. ссылки и
 * копирайт. Цвета — как у страницы, не темный футер основного сайта.
 */
export default function PoseidonFooter() {
    return (
        <footer className="bg-[#f2efe8] text-neutral-900">
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

            <div className="mx-auto max-w-[1224px] px-6 xl:px-0">
                <nav aria-label="Документы">
                    <ul className="flex flex-col items-center gap-3 py-6 text-center text-sm xl:flex-row xl:justify-between xl:py-7 xl:text-sm">
                        {LINKS.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="transition-colors hover:text-brand-red xl:underline xl:underline-offset-4"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="-mx-6 border-t border-neutral-300 px-6 py-6 text-center text-[#605f5c] xl:mx-0 xl:px-0 xl:py-8">
                    <p className="text-[13px]/6 xl:text-sm/6">
                        {poseidonLegal.copyright}
                    </p>
                    <p className="text-[13px]/6 xl:text-sm/6">
                        {poseidonLegal.official}
                    </p>
                </div>
            </div>
        </footer>
    );
}
