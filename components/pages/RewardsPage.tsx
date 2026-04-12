import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import DarkHeroSection from "@/components/sections/DarkHeroSection";
import AcademiaRewards from "@/components/ui/AcademiaRewards";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";
import type { Locale } from "@/lib/i18n/routing";

type RewardsCopy = {
    title: string;
    subtitle: string;
    intro: string;
    loyaltyTitle: string;
    loyaltyParagraph: string;
    registerTitle: string;
    registerParagraph: string;
    pathTitle: string;
    pathText: string;
    joinLabel: string;
};

const copyByLocale: Record<Locale, RewardsCopy> = {
    ru: {
        title: "Программа особых привилегий",
        subtitle: "Academia Rewards",
        intro: "Путешествие запоминается не только маршрутами и встречами, но и тем, где вы отдыхаете. Проживание в особняке ACADEMIA — это больше, чем просто номер в гостинице. Это атмосфера, в которой рождается настроение всей поездки: комфорт, внимание к деталям и доступ к особым привилегиям делают каждый день путешествия действительно запоминающимся.",
        loyaltyTitle: "ПРОГРАММА ЛОЯЛЬНОСТИ ACADEMIA REWARDS",
        loyaltyParagraph:
            "Здесь забота о вас — не формальность, а знак особого статуса. Каждый гость получает индивидуальные условия бронирования, а набор привилегий соответствует ожиданиям самых взыскательных путешественников.",
        registerTitle: "Регистрация займет всего минуту,",
        registerParagraph:
            "а с первой ночи начинается ваш путь к высококлассному уровню гостеприимства: чем больше путешествуете с ACADEMIA, тем больше внимания и приятных открытий ждёт вас в каждом отеле нашей сети.",
        pathTitle: "Ваш путь привилегий",
        pathText:
            "Присоединяйтесь к ACADEMIA REWARDS, бронируйте проживание в наших отелях и почувствуйте атмосферу, в которой рождается настроение всей поездки: высокий сервис, внимание к деталям и доступ к особым привилегиям.",
        joinLabel: "ПРИСОЕДИНИТЬСЯ К ПРОГРАММЕ ЛОЯЛЬНОСТИ",
    },
    en: {
        title: "A program of special privileges",
        subtitle: "Academia Rewards",
        intro: "A memorable trip is shaped not only by routes and meetings, but also by where you stay. A stay at the ACADEMIA mansion is more than just a hotel room. It is an atmosphere that defines your journey: comfort, attention to detail, and access to special privileges make every travel day truly memorable.",
        loyaltyTitle: "ACADEMIA REWARDS LOYALTY PROGRAM",
        loyaltyParagraph:
            "Here, caring for you is not a formality but a mark of special status. Every guest receives personalized booking conditions, and the set of privileges meets the expectations of even the most discerning travelers.",
        registerTitle: "Registration takes just a minute,",
        registerParagraph:
            "and from the very first night your path to premium hospitality begins: the more you travel with ACADEMIA, the more attention and delightful discoveries await you at every hotel in our collection.",
        pathTitle: "Your privilege journey",
        pathText:
            "Join ACADEMIA REWARDS, book stays at our hotels, and experience the atmosphere that sets the tone for your entire trip: high service standards, attention to detail, and access to special privileges.",
        joinLabel: "JOIN THE LOYALTY PROGRAM",
    },
};

export default function RewardsPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];

    return (
        <main className="flex flex-col gap-6">
            <section className="flex flex-col gap-4 mx-6 my-2 xl:max-w-6xl xl:mx-auto">
                <FadeUp className="xl:text-center">
                    <h1>{copy.title}</h1>
                </FadeUp>
                <FadeUp
                    delay={0.1}
                    className="-mt-2 font-alistair text-2xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:text-center xl:-mt-4"
                >
                    {copy.subtitle}
                </FadeUp>
                <FadeUp
                    delay={0.2}
                    className="mt-2 xl:mt-4 xl:text-center xl:max-w-3xl"
                >
                    <p>{copy.intro}</p>
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
                        title: copy.loyaltyTitle,
                        paragraphs: [copy.loyaltyParagraph],
                    },
                    {
                        title: copy.registerTitle,
                        paragraphs: [copy.registerParagraph],
                    },
                ]}
            />
            <section className="flex flex-col gap-4 m-6 text-center xl:max-w-4xl items-center xl:mx-auto xl:my-8 xl:gap-6">
                <FadeUp>
                    <h2>{copy.pathTitle}</h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="mb-4">{copy.pathText}</p>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <Button
                        href={`https://guest.travelline.ru/guest-account/41018/profile/login${locale === "en" ? "?lang=en" : ""}`}
                        target="_blank"
                        variant="primary"
                    >
                        {copy.joinLabel}
                    </Button>
                </FadeUp>
            </section>
            <AcademiaRewards />
            <Divider />
            <ContactsSection />
        </main>
    );
}
