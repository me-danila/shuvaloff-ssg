import type { Metadata } from "next";
import ContactsSection from "@/components/sections/ContactsSection";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";

export const metadata: Metadata = {
    title: "Ваш утренний маршрут с философией ACADEMIA — ACADEMIA Особняк Шувалова",
    description:
        "Город ещё спит, а вы уже в движении. Тихие улицы, шелест листвы, отражения рассвета в витринах. Маршрут проходит там, где Петербург особенно красив в это время",
};

export default function Rewards() {
    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-4 m-6 xl:max-w-3xl xl:mx-auto">
                <FadeUp className="xl:text-center">
                    <h1>Ваш утренний маршрут</h1>
                </FadeUp>
                <FadeUp
                    delay={0.1}
                    className="-mt-6 font-alistair text-3xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:text-center"
                >
                    с философией Academia
                </FadeUp>
                <FadeUp delay={0.2} className="mt-2 xl:mt-4 xl:text-center">
                    <p>
                        Город ещё спит, а&nbsp;вы&nbsp;уже в&nbsp;движении.
                        Тихие улицы, шелест листвы, отражения рассвета
                        в&nbsp;витринах. Маршрут проходит там, где Петербург
                        особенно красив в&nbsp;это время&nbsp;&mdash; без шума,
                        без спешки, только ритм шагов и&nbsp;свежий воздух
                        нового&nbsp;дня.
                    </p>
                </FadeUp>
                <FadeUp delay={0.3} className="flex mt-8 gap-4 justify-center">
                    <Button
                        href={"https://yandex.ru/maps/-/CHVxyC~g"}
                        variant="primary"
                        target={"_blank"}
                    >
                        Посмотреть маршрут
                    </Button>
                    <Button
                        href={
                            "https://music.yandex.ru/users/ad.alchemy/playlists/1000?utm_medium=share_link_tg"
                        }
                        variant="primary"
                        target={"_blank"}
                    >
                        Включить ритм
                    </Button>
                </FadeUp>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
