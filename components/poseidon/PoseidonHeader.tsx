import Image from "@/components/ui/OptimizedImage";
import { poseidonImages } from "@/data/poseidonData";

/**
 * Хедер промо-страницы /poseidon/: только связка логотипов партнеров
 * «ACADEMIA × Посейдон» поверх hero, без меню основного сайта. Логотип
 * ACADEMIA ведет на главную.
 */
export default function PoseidonHeader() {
    return (
        <header className="absolute inset-x-0 top-0 z-20 flex justify-center px-6 pt-8 xl:pt-12">
            <div className="flex items-center gap-4 text-white xl:gap-5">
                <a
                    href="/"
                    aria-label="ACADEMIA — на главную"
                    className="transition-opacity hover:opacity-80"
                >
                    <Image
                        src={poseidonImages.academiaLogo}
                        alt="ACADEMIA Коллекция особняков"
                        width={146}
                        height={37}
                        priority
                        className="h-auto w-[118px] xl:w-[146px]"
                    />
                </a>
                <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="size-3 shrink-0 xl:size-3.5"
                >
                    <path
                        d="M1 1l14 14M15 1L1 15"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />
                </svg>
                <Image
                    src={poseidonImages.poseidonLogo}
                    alt="Посейдон — первый рыбный ресторан"
                    width={900}
                    height={386}
                    priority
                    sizes="164px"
                    className="h-auto w-[112px] xl:w-[164px]"
                />
            </div>
        </header>
    );
}
