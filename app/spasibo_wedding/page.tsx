import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { Parallax } from "@/components/ui/Parallax";

export const metadata: Metadata = {
    title: "Спасибо за вашу заявку!",
    description: "Наш менеджер свяжется с вами в ближайшее время",
};

export default function SpasiboWedding() {
    return (
        <main className="flex flex-col gap-8">
            <section>
                {/* Фото с подписью */}
                <div className="relative overflow-hidden max-w-xl:aspect-8/15 xl:min-h-screen">
                    <FadeIn
                        duration={0.9}
                        className="absolute inset-0 h-full w-full"
                    >
                        <Parallax className="h-full w-full" offset={80}>
                            <Image
                                src="https://academia.spb.ru/wp-content/uploads/2026/04/IMG-145_1_2.jpg"
                                alt="Свадьба в особняке"
                                fill
                                sizes="100vw"
                                loading="eager"
                                className="object-cover object-center"
                            />
                        </Parallax>
                    </FadeIn>

                    {/* Text */}
                    <StaggerContainer className="flex gap-2 h-65 xl:h-180 xl:gap-4 xl:w-full">
                        <div className="absolute bottom-10 md:bottom-20 xl:bottom-32 inset-x-0 text-center text-white z-10 flex flex-col gap-3 px-10 xl:max-w-2xl xl:mx-auto xl:gap-6">
                            <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                                <h1 className="text-4xl xl:text-5xl">
                                    спасибо за обращение!
                                </h1>
                            </StaggerItem>
                            <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                                <p className="text-base">
                                    Мы&nbsp;свяжемся с&nbsp;Вами
                                    в&nbsp;ближайшее время
                                </p>
                            </StaggerItem>
                            <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                                <div className="flex flex-col gap-4 mt-2 md:flex-row md:justify-center">
                                    <Link
                                        href="/wedding/"
                                        className="border border-white bg-white p-4 rounded-md text-black font-baskerville uppercase hover:bg-black hover:border-black hover:text-white duration-200"
                                    >
                                        Вернуться назад
                                    </Link>
                                </div>
                            </StaggerItem>
                        </div>
                    </StaggerContainer>
                </div>
            </section>
        </main>
    );
}
