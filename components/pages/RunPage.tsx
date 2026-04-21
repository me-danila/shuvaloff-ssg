import ContactsSection from "@/components/sections/ContactsSection";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";
import type { Locale } from "@/lib/i18n/routing";

type RunCopy = {
    title: string;
    subtitle: string;
    description: string;
    viewRoute: string;
    playMusic: string;
};

const copyByLocale: Record<Locale, RunCopy> = {
    ru: {
        title: "Ваш утренний маршрут",
        subtitle: "с философией Academia",
        description:
            "Город ещё спит, а вы уже в движении. Тихие улицы, шелест листвы, отражения рассвета в витринах. Маршрут проходит там, где Петербург особенно красив в это время — без шума, без спешки, только ритм шагов и свежий воздух нового дня.",
        viewRoute: "Посмотреть маршрут",
        playMusic: "Включить ритм",
    },
    en: {
        title: "Your morning route",
        subtitle: "with Academia philosophy",
        description:
            "The city is still asleep, and you are already in motion. Quiet streets, rustling leaves, dawn reflections in the windows. The route passes through places where St. Petersburg is especially beautiful at this time — without noise, without hurry, only the rhythm of steps and the fresh air of a new day.",
        viewRoute: "View route",
        playMusic: "Play rhythm",
    },
};

export default function RunPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];

    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-4 m-6 xl:max-w-3xl xl:mx-auto">
                <FadeUp className="xl:text-center">
                    <h1>{copy.title}</h1>
                </FadeUp>
                <FadeUp
                    delay={0.1}
                    className="-mt-6 font-alistair text-3xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:text-center"
                >
                    {copy.subtitle}
                </FadeUp>
                <FadeUp delay={0.2} className="mt-2 xl:mt-4 xl:text-center">
                    <p>{copy.description}</p>
                </FadeUp>
                <FadeUp
                    delay={0.3}
                    className="flex flex-col sm:flex-row mt-8 gap-4 justify-center items-center"
                >
                    <Button
                        href="https://yandex.ru/maps/-/CHVxyC~g"
                        variant="primary"
                        target="_blank"
                    >
                        {copy.viewRoute}
                    </Button>
                    <Button
                        href="https://music.yandex.ru/users/ad.alchemy/playlists/1000?utm_medium=share_link_tg"
                        variant="primary"
                        target="_blank"
                    >
                        {copy.playMusic}
                    </Button>
                </FadeUp>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
