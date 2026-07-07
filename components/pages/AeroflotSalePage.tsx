import ContactsSection from "@/components/sections/ContactsSection";
import HeroHistoricalRooms from "@/components/sections/HeroHistoricalRooms";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";
import type { Locale } from "@/lib/i18n/routing";

const registerHref =
    "https://guest.travelline.ru/guest-account/41018/profile/login";

type AeroflotCopy = {
    title: string;
    heading: string;
    intro: string;
    button: string;
    conditionsTitle: string;
    conditions: string[];
};

const copyByLocale: Record<Locale, AeroflotCopy> = {
    ru: {
        title: "Аэрофлот Бонус",
        heading:
            "Отдыхайте в Коллекции особняков ACADEMIA и копите мили «Аэрофлот Бонус»!",
        intro: "Для начисления миль зарегистрируйтесь в программе привилегий Академиа и добавьте номер карты «Аэрофлот Бонус» при бронировании.",
        button: "ЗАРЕГИСТРИРОВАТЬСЯ",
        conditionsTitle: "УСЛОВИЯ ПРОГРАММЫ НАЧИСЛЕНИЯ МИЛЬ",
        conditions: [
            "За каждую ночь проживания в номерах категорий «Стандарт», «Студия», «Делюкс», «Апартаменты» и «Супериор (улучшенный)» - 300 миль",
            "За каждую ночь проживания в номерах категории «Джуниор Сьют (полулюкс)» и «Люкс с 1 спальней» - 500 миль",
            "За каждую ночь проживания в номерах категорий «Сьют (люкс)», «Люкс с 2 спальнями» и «Панорамный Сьют (люкс)» - 700 миль",
            "За каждую ночь проживания в номерах категорий «Резиденция» - 1 000 миль",
            "Начисление миль производится исключительно за услуги проживания в отелях Академиа особняк Шувалова, Академиа особняк Теплова, Академиа Васильевский",
            "Начисление миль производится при бронировании проживания напрямую в отелях через официальный сайт, по телефонам и электронной почте, указанных на сайте в разделе контакты",
            "При проживании в одном номере двух и более участников программы «Аэрофлот Бонус» мили начисляются на карту только одного из участников",
            "Максимальное количество ночей, подлежащих к начислению миль в одном из отелей сети, составляет не более 14 ночей",
            "Начисление миль не осуществляется при выборе тарифа «Длительное проживание»",
            "Начисление миль не осуществляется за приобретение любых дополнительных услуг, включая услуги общественного питания в ресторанах отелей, за исключением услуг, включенных в стоимость проживания",
            "Начисление миль не суммируется с акциями и/или спецпредложениями отелей, за исключением скидок за услугу проживания по тарифам «Самая низкая цена», «Без завтрака», «Завтрак включен»",
            "Начисление миль осуществляется при одновременном применении скидки программы лояльности отел",
            "Начисление миль осуществляется при использовании промокода",
            "Мили начисляются в течение 14 дней после выезда из отеля.",
        ],
    },
    en: {
        title: "Aeroflot Bonus",
        heading:
            "Stay at the ACADEMIA Collection of Mansions and earn Aeroflot Bonus miles!",
        intro: "To earn miles, register for the ACADEMIA Privileges program and add your Aeroflot Bonus card number when booking.",
        button: "REGISTER",
        conditionsTitle: "MILE ACCRUAL PROGRAM TERMS",
        conditions: [
            "For each night in Standard, Studio, Deluxe, Apartments and Superior room categories - 300 miles",
            "For each night in Junior Suite and One-Bedroom Suite room categories - 500 miles",
            "For each night in Suite, Two-Bedroom Suite and Panoramic Suite room categories - 700 miles",
            "For each night in the Residence room category - 1,000 miles",
            "Miles are accrued exclusively for accommodation services at ACADEMIA Shuvaloff Mansion, ACADEMIA Teploff Mansion and ACADEMIA Vasilievsky hotels",
            "Miles are accrued when accommodation is booked directly with the hotels through the official website, by phone or by email listed in the Contacts section of the website",
            "If two or more Aeroflot Bonus members stay in one room, miles are credited to only one member's card",
            "The maximum number of nights eligible for miles accrual at one hotel in the chain is no more than 14 nights",
            "Miles are not accrued when the Long Stay rate is selected",
            "Miles are not accrued for any additional services, including food and beverage services in hotel restaurants, except for services included in the accommodation price",
            "Miles accrual cannot be combined with hotel promotions and/or special offers, except for discounts on accommodation under the Best Price, No Breakfast and Breakfast Included rates",
            "Miles are accrued when the hotel loyalty program discount is applied at the same time",
            "Miles are accrued when a promo code is used",
            "Miles are credited within 14 days after hotel check-out.",
        ],
    },
};

export default function AeroflotSalePage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];

    return (
        <main className="flex flex-col gap-6">
            <HeroHistoricalRooms
                title={copy.title}
                image={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/07/IMG_9448-ГОРИЗОНТАЛЬ.jpg",
                    alt: copy.title,
                }}
                withBookingForm
            />

            <section className="mx-6 my-4 flex flex-col gap-6 xl:mx-auto xl:my-8 xl:max-w-4xl xl:text-center">
                <FadeUp>
                    <h3 className="font-history text-2xl uppercase leading-tight xl:text-3xl">
                        {copy.heading}
                    </h3>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p>{copy.intro}</p>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <Button
                        href={`${registerHref}${locale === "en" ? "?lang=en" : ""}`}
                        target="_blank"
                        variant="primary"
                    >
                        {copy.button}
                    </Button>
                </FadeUp>
            </section>

            <FadeUp
                delay={0.3}
                className="mx-6 my-4 flex flex-col gap-4 xl:mx-auto xl:my-8 xl:max-w-5xl"
            >
                <h3 className="font-history text-2xl uppercase leading-tight xl:text-3xl">
                    {copy.conditionsTitle}:
                </h3>
                <ul className="ml-4 list-disc space-y-2">
                    {copy.conditions.map((condition) => (
                        <li key={condition}>{condition}</li>
                    ))}
                </ul>
            </FadeUp>

            <Divider />
            <ContactsSection />
        </main>
    );
}
