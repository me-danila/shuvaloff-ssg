import type { Metadata } from "next";
import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import DarkHeroSection from "@/components/sections/DarkHeroSection";
import AcademiaRewards from "@/components/ui/AcademiaRewards";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";

export const metadata: Metadata = {
    title: "Программа лояльности — ACADEMIA Особняк Шувалова",
    description:
        "Программа лояльности ACADEMIA REWARDS с привилегиями для гостей отелей сети ACADEMIA",
};

export default function Rewards() {
    return (
        <main className="flex flex-col gap-6">
            <section className="flex flex-col gap-4 mx-6 my-2 xl:max-w-6xl xl:mx-auto">
                <FadeUp className="xl:text-center">
                    <h1>Программа особых привилегий</h1>
                </FadeUp>
                <FadeUp
                    delay={0.1}
                    className="-mt-2 font-alistair text-2xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:text-center xl:-mt-4"
                >
                    Academia Rewards
                </FadeUp>
                <FadeUp
                    delay={0.2}
                    className="mt-2 xl:mt-4 xl:text-center xl:max-w-3xl"
                >
                    <p>
                        Путешествие запоминается не&nbsp;только маршрутами
                        и&nbsp;встречами, но&nbsp;и&nbsp;тем, где
                        вы&nbsp;отдыхаете. Проживание в&nbsp;особняке
                        ACADEMIA&nbsp;&mdash; это больше, чем просто номер
                        в&nbsp;гостинице.
                        <br />
                        Это атмосфера, в&nbsp;которой рождается настроение всей
                        поездки: комфорт, внимание к&nbsp;деталям и&nbsp;доступ
                        к&nbsp;особым привилегиям делают каждый день путешествия
                        действительно запоминающимся.
                    </p>
                </FadeUp>
            </section>
            <BookingForm />
            <DarkHeroSection
                imageMobile={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/4-1.png",
                    alt: "ACADEMIA REWARDS",
                }}
                image={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/d32fcd65cc116fb595757b63897e833e4ed4caf6.png",
                    alt: "ACADEMIA REWARDS",
                }}
                size="3xl"
                blocks={[
                    {
                        title: (
                            <>
                                ПРОГРАММА ЛОЯЛЬНОСТИ
                                <br />
                                ACADEMIA REWARDS
                            </>
                        ),
                        paragraphs: [
                            "Здесь забота о вас — не формальность, а знак особого статуса. Каждый гость получает индивидуальные условия бронирования, а набор привилегий соответствует ожиданиям самых взыскательных путешественников.",
                        ],
                    },
                    {
                        title: "Регистрация займет всего минуту,",
                        paragraphs: [
                            "а с первой ночи начинается ваш путь к высококлассному уровню гостеприимства: чем больше путешествуете с ACADEMIA, тем больше внимания и приятных открытий ждёт вас в каждом отеле нашей сети.",
                        ],
                    },
                ]}
            />
            <section className="flex flex-col gap-4 m-6 text-center xl:max-w-4xl items-center xl:mx-auto xl:my-8 xl:gap-6">
                <FadeUp>
                    <h2>Ваш путь привилегий</h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="mb-4">
                        Присоединяйтесь к&nbsp;ACADEMIA REWARDS, бронируйте
                        проживание в&nbsp;наших отелях и&nbsp;почувствуйте
                        атмосферу, в&nbsp;которой рождается настроение всей
                        поездки: высокий сервис, внимание к&nbsp;деталям
                        и&nbsp;доступ к&nbsp;особым привилегиям.
                    </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <Button
                        href="https://guest.travelline.ru/guest-account/41018/profile/login"
                        target="_blank"
                        variant="primary"
                    >
                        ПРИСОЕДЕНИТЬСЯ К&nbsp;ПРОГРАММЕ ЛОЯЛЬНОСТИ
                    </Button>
                </FadeUp>
            </section>
            <AcademiaRewards />
            <Divider />
            <ContactsSection />
        </main>
    );
}
