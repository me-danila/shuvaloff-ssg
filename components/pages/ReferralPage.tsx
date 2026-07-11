import ContactsSection from "@/components/sections/ContactsSection";
import HeroHistoricalRooms from "@/components/sections/HeroHistoricalRooms";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";
import TransportSlider from "@/components/ui/TransportSlider";
import type { Locale } from "@/lib/i18n/routing";
import { buildWebPageSchema } from "@/lib/seo/schema";

const BREADCRUMB_PATHS = ["/", "/rewards/"] as const;

const seo = {
    ru: {
        name: "Реферальная программа привилегий",
        description:
            "Каждый участник программы привилегий ACADEMIA REWARDS может приглашать друзей присоединиться к программе и получать за это приятные бонусы для обоих.",
        crumbs: ["Главная", "ACADEMIA Rewards"],
    },
    en: {
        name: "Referral Rewards Program",
        description:
            "Every member of the ACADEMIA REWARDS loyalty program can invite friends to join the program and receive great rewards for both of you.",
        crumbs: ["Home", "ACADEMIA Rewards"],
    },
} as const;

type RewardsCopy = {
    title: string;
    intro: React.ReactNode;
    howItWorksLabel: string;
    howItWorksList: string[];
    conditionsLabel: string;
    conditionList: string[];
    pathTitle: React.ReactNode;
    joinLabel: string;
    transportTitle: string;
    transportDescription: React.ReactNode;
};

const copyByLocale: Record<Locale, RewardsCopy> = {
    ru: {
        title: "Реферальная программа привилегий",
        intro: (
            <>
                Каждый участник{" "}
                <a href="/rewards/" className="font-semibold border-b">
                    программы привилегий ACADEMIA REWARDS
                </a>{" "}
                может приглашать друзей присоединиться к&nbsp;программе
                и&nbsp;получать за&nbsp;это приятные бонусы для обоих.
                <br />
                <br />
                Просто поделитесь уникальной ссылкой-приглашением из&nbsp;вашего
                личного кабинета,
                <br />
                и&nbsp;ваш друг после регистрации в&nbsp;программе мгновенно
                получит карту лояльности и&nbsp;приветственный ваучер
                на&nbsp;скидку&nbsp;15%. А&nbsp;после проживании друга повысится
                ваш личный уровень в&nbsp;программе привилегий.
            </>
        ),
        howItWorksLabel: "Как это работает",
        howItWorksList: [
            "Войдите в личный кабинет на сайте и переходите в раздел «Программа лояльности».",
            "Нажмите кнопку «Поделиться ссылкой» и отправляйте ее другу удобным способом.",
            "Друг регистрируется по вашей ссылке, подтверждает почту — и сразу получает карту лояльности и приветственный ваучер на скидку 15%.",
            "Друг применяет ваучер на последнем шаге бронирования на сайте.",
            "После проживания друга вы получаете бонус — повышение уровня в программе.",
        ],
        conditionsLabel: "Условия",
        conditionList: [
            "Воспользоваться программой могут все, кто зарегистрирован в системе",
            "Ваучер сгорает при отмене бронирования, к которому он был применен",
            "Ваучер действует на тарифы «Без завтрака» и «Завтрак включен» и не применяется к пиковым датам (указаны в условиях в программе)",
            "Ваучер не суммируется с другими скидками и специальными предложениями.",
        ],
        pathTitle: (
            <>
                Присоединяйтесь к&nbsp;ACADEMIA REWARDS и&nbsp;получайте
                привилегии вместе с&nbsp;друзьями!
            </>
        ),
        joinLabel: "ПЕРЕЙТИ В ЛИЧНЫЙ КАБИНЕТ",
        transportTitle: "Путь в Петербург из Москвы — без лишних забот",
        transportDescription: (
            <>
                Мы&nbsp;сделали всё, чтобы поездка началась легко: выберите
                билеты на&nbsp;самолёт или &laquo;Сапсан&raquo; прямо
                на&nbsp;сайте&nbsp;&mdash; и&nbsp;сосредоточьтесь
                на&nbsp;главном&nbsp;&mdash; предвкушении встречи с&nbsp;городом
                и&nbsp;с&nbsp;ACADEMIA.
            </>
        ),
    },
    en: {
        title: "Referral Rewards Program",
        intro: (
            <>
                Every member of the{" "}
                <a href="/en/rewards/" className="font-semibold border-b">
                    ACADEMIA REWARDS loyalty program
                </a>{" "}
                can invite friends to join the program and receive great bonuses
                for both of you.
                <br />
                <br />
                Simply share the unique invitation link from your personal
                account, and your friend will instantly receive a loyalty card
                and a welcome voucher for a 15% discount after registering for
                the program. And after your friend stays with us, your personal
                level in the rewards program will increase.
            </>
        ),
        howItWorksLabel: "How it works",
        howItWorksList: [
            "Log in to your account on the website and go to the Loyalty Program section",
            "Click the ‘Share Link’ button and send it to a friend using your preferred method",
            "Your friend registers using your link, confirms their email address, and immediately receives a loyalty card and a welcome voucher for a 15% discount",
            "Your friend applies the voucher during the final step of the booking process on the website",
            "After your friend's stay, you receive a bonus — a level upgrade in the program",
        ],
        conditionsLabel: "Conditions",
        conditionList: [
            "Anyone registered in the system can take advantage of this program",
            "The voucher expires if the reservation to which it was applied is canceled",
            "The voucher is valid for No Breakfast and Breakfast Included rates and does not apply to peak dates (specified in the program terms and conditions)",
            "The voucher cannot be combined with other discounts or special offers",
        ],
        pathTitle: (
            <>
                Join ACADEMIA REWARDS and enjoy exclusive benefits with your
                friends!
            </>
        ),
        joinLabel: "JOIN THE LOYALTY PROGRAM",
        transportTitle:
            "The journey to St. Petersburg from Moscow — without extra worries",
        transportDescription: (
            <>
                We have made everything to ensure your trip starts easily:
                choose your plane or Sapsan train tickets right on the website —
                and focus on the main thing — the anticipation of meeting the
                city and ACADEMIA
            </>
        ),
    },
};

export default function ReferralPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];

    return (
        <main className="flex flex-col gap-6">
            <StructuredData
                data={buildWebPageSchema({
                    locale,
                    path: "/rewards/referral/",
                    name: seo[locale].name,
                    description: seo[locale].description,
                    breadcrumbs: [
                        ...seo[locale].crumbs.map((name, i) => ({
                            name,
                            path: BREADCRUMB_PATHS[i],
                        })),
                        { name: seo[locale].name, path: "/rewards/referral/" },
                    ],
                })}
            />

            <HeroHistoricalRooms
                title={copy.title}
                image={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/05/чел-с-телефоном.avif",
                    alt: copy.title,
                }}
                withBookingForm
            />

            <FadeUp
                delay={0.2}
                className="mx-6 xl:mx-auto mt-2 xl:text-center xl:max-w-3xl my-2 xl:my-4"
            >
                <p>{copy.intro}</p>
            </FadeUp>

            <FadeUp
                delay={0.3}
                className="mx-6 flex flex-col gap-8 xl:gap-12 md:flex-row mx-auto my-4 xl:my-8 xl:max-w-7xl px-6 xl:px-0"
            >
                <div className="flex flex-col md:gap-2">
                    <h3 className="font-history text-2xl xl:text-3xl uppercase mb-2">
                        {copy.howItWorksLabel}:
                    </h3>
                    <ol className="list-disc space-y-1 ml-4">
                        {copy.howItWorksList.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ol>
                </div>
                <div className="flex flex-col md:gap-2">
                    <h3 className="font-history text-2xl xl:text-3xl uppercase mb-2">
                        {copy.conditionsLabel}:
                    </h3>
                    <ol className="list-disc space-y-1 ml-4">
                        {copy.conditionList.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ol>
                </div>
            </FadeUp>

            <section className="flex flex-col gap-4 m-6 text-center xl:max-w-4xl items-center xl:mx-auto xl:my-8 xl:gap-6">
                <FadeUp>
                    <h2 className="text-xl xl:text-3xl">{copy.pathTitle}</h2>
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
            <section className="mx-6 my-4 xl:max-w-7xl xl:mx-auto xl:w-full flex flex-col gap-6 xl:my-2">
                <FadeUp className="xl:max-w-4xl">
                    <h2 className="xl:text-2xl">{copy.transportTitle}</h2>
                    <p className="mt-2 hidden md:block">
                        {copy.transportDescription}
                    </p>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <TransportSlider />
                </FadeUp>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
