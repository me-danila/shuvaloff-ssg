import type { ReactNode } from "react";
import { CallIcon, CameraIcon, EditIcon } from "@/components/ui/icons";
import { FadeUp } from "@/components/ui/Motion";
import type { Locale } from "@/lib/i18n/routing";

type Step = { id: string; icon: ReactNode; caption: ReactNode };

const iconClass = "h-6 w-6";

const sectionCopy: Record<Locale, { heading: string; steps: Step[] }> = {
    ru: {
        heading: "Уникальные интерьеры для яркой фотосессии",
        steps: [
            {
                id: "request",
                icon: <EditIcon className={iconClass} color="#fff" />,
                caption: (
                    <>
                        Оставляете заявку,
                        <br />
                        указав желаемую дату
                        <br />и резиденцию
                    </>
                ),
            },
            {
                id: "contact",
                icon: <CallIcon className={iconClass} color="#fff" />,
                caption: (
                    <>
                        Менеджер свяжется
                        <br />с вами в удобном формате
                        <br />и согласует детали визита
                    </>
                ),
            },
            {
                id: "shoot",
                icon: <CameraIcon className={iconClass} color="#fff" />,
                caption: (
                    <>
                        Вы приезжаете
                        <br />и проводите съёмку
                        <br />в выбранном интерьере
                    </>
                ),
            },
        ],
    },
    en: {
        heading: "Unique interiors for a vivid photoshoot",
        steps: [
            {
                id: "request",
                icon: <EditIcon className={iconClass} color="#fff" />,
                caption: (
                    <>
                        You submit a request,
                        <br />
                        choosing the desired date
                        <br />
                        and residence
                    </>
                ),
            },
            {
                id: "contact",
                icon: <CallIcon className={iconClass} color="#fff" />,
                caption: (
                    <>
                        A manager contacts you
                        <br />
                        in a convenient way
                        <br />
                        and confirms the visit details
                    </>
                ),
            },
            {
                id: "shoot",
                icon: <CameraIcon className={iconClass} color="#fff" />,
                caption: (
                    <>
                        You arrive
                        <br />
                        and do the shoot
                        <br />
                        in the chosen interior
                    </>
                ),
            },
        ],
    },
};

export default function PhotoShootStepsSection({ locale }: { locale: Locale }) {
    const copy = sectionCopy[locale];

    return (
        <section className="px-6 xl:px-0">
            <div className="mx-auto max-w-7xl bg-[#efefef] px-6 py-12 xl:px-12">
                <FadeUp>
                    <h2 className="text-center font-alistair text-3xl font-normal normal-case text-[#372a24] xl:text-4xl">
                        {copy.heading}
                    </h2>
                </FadeUp>

                <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-3 sm:gap-8 xl:mt-14">
                    {copy.steps.map((step, i) => (
                        <FadeUp
                            key={step.id}
                            delay={i * 0.1}
                            className="flex flex-col items-center text-center"
                        >
                            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red text-white xl:h-20 xl:w-20">
                                {step.icon}
                            </span>
                            <p className="mt-4 text-[#372a24] sm:mt-6 xl:mt-7">
                                {step.caption}
                            </p>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    );
}
