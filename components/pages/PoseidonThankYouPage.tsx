import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import SkipLink from "@/components/a11y/SkipLink";
import Footer from "@/components/layout/Footer";
import PoseidonHeader from "@/components/poseidon/PoseidonHeader";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { poseidonCopy, poseidonImages } from "@/data/poseidonData";

/**
 * /poseidon/thankyou/ — экран после успешной регистрации в розыгрыше: фото
 * вестибюля на весь экран, карточка с промокодом и кнопкой бронирования.
 * Хедер — тот же, что на /poseidon/; ниже экрана — общий футер сайта.
 */
export default function PoseidonThankYouPage() {
    const { success } = poseidonCopy;

    return (
        <>
            <div className="relative flex min-h-dvh flex-col overflow-hidden text-neutral-900">
                <SkipLink locale="ru" />
                <Image
                    src={poseidonImages.successBackground}
                    alt={success.backgroundAlt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                {/* Затемнение как в макете — два слоя черного по 20%. */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-black/35"
                />
                <PoseidonHeader />

                <main
                    id="main-content"
                    tabIndex={-1}
                    className="relative flex flex-1 flex-col items-center px-5 pt-27 pb-16 focus:outline-none xl:px-6 xl:pt-44 xl:pb-24"
                >
                    <FadeUp
                        mode="mount"
                        className="w-full max-w-[1030px] rounded-2xl bg-[#f3f0e9] p-1 xl:rounded-[20px] xl:p-1.5"
                    >
                        <div className="flex flex-col items-center rounded-xl border border-[#bca589] px-6 py-9 text-center xl:rounded-2xl xl:px-12 xl:py-14">
                            <h1 className="max-w-[260px] text-[20px] font-normal leading-[1.3] text-brand-red xl:max-w-[480px] xl:text-[40px] xl:leading-[1.17]">
                                {success.title}
                            </h1>

                            {/* Горизонтальный разделитель с лилией — как на карточке формы. */}
                            <div
                                aria-hidden="true"
                                className="mt-6 flex w-full max-w-[222px] items-center gap-1.5 xl:mt-8 xl:max-w-[290px]"
                            >
                                <div className="h-px flex-1 bg-[#bca589]" />
                                <Image
                                    src={poseidonImages.fleur}
                                    alt=""
                                    width={16}
                                    height={17}
                                    sizes="32px"
                                    className="rotate-90"
                                />
                                <div className="h-px flex-1 bg-[#bca589]" />
                            </div>

                            <p className="mt-6 whitespace-pre-line text-sm/5 text-[#605f5c] xl:hidden">
                                {success.textMobile}
                            </p>
                            <p className="mt-8 hidden whitespace-pre-line text-xs/4 text-[#605f5c] xl:block">
                                {success.text}
                            </p>

                            <p className="mt-6 flex h-[68px] w-full max-w-[256px] select-all items-center justify-center rounded-xl border border-[#b9a384]/25 bg-white font-history text-[28px] uppercase tracking-wide text-brand-red xl:mt-5 xl:max-w-[320px] xl:text-[38px]">
                                {success.promoCode}
                            </p>

                            <Button
                                href={success.booking.href}
                                size="sm"
                                className="mt-4 w-full max-w-[256px] whitespace-nowrap xl:mt-8 xl:max-w-[350px] xl:text-[15px]"
                            >
                                <span className="flex items-center gap-3">
                                    {success.booking.label}
                                    <ArrowRightIcon
                                        size={22}
                                        weight="light"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Button>
                        </div>
                    </FadeUp>
                </main>
            </div>
            <Footer locale="ru" flush />
        </>
    );
}
