import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";

const tiers = [
    {
        label: "BASE",
        discount: "10%",
        badgeBg: "#B3B3B3",
        nights: "от 3 ночей",
        perks: ["Поздний выезд*", "Скидка при бронировании нескольких номеров"],
        note: "Станьте участником программы лояльности уже после первого визита!",
    },
    {
        label: "SILVER",
        discount: "15%",
        badgeBg: "#909090",
        nights: "от 8 ночей",
        perks: [
            "Поздний выезд*",
            "Скидка 15% на все виды услуг в ACADEMIA SPA",
            "Скидка при бронировании нескольких номеров",
        ],
    },
    {
        label: "GOLD",
        discount: "20%",
        badgeBg: "#94754E",
        nights: "от 14 ночей",
        perks: [
            "Поздний выезд*",
            "Фирменный трансфер в одну сторону*",
            "Скидка 15% на все виды услуг в ACADEMIA SPA",
            "Скидка при бронировании нескольких номеров",
        ],
    },
    {
        label: "DIAMOND",
        discount: "25%",
        badgeBg: "#597A87",
        nights: "от 28 ночей",
        perks: [
            "Ранний заезд и поздний выезд*",
            "Фирменный трансфер в одну сторону*",
            "Скидка 20% на все виды услуг в ACADEMIA SPA",
            "Скидка при бронировании нескольких номеров",
        ],
    },
];

export default function AcademiaRewards() {
    return (
        <section className="flex flex-col gap-4 xl:gap-8 px-6 xl:w-full xl:max-w-6xl xl:mx-auto">
            {/* Карточки */}
            <StaggerContainer className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                {tiers.map((tier) => (
                    <StaggerItem
                        key={tier.label}
                        className="relative aspect-square bg-brand-blue-100 rounded-xl p-4 flex flex-col justify-end"
                    >
                        <div
                            className="absolute top-3 right-3 w-14 h-14 rounded-full flex items-center justify-center text-xl font-baskerville"
                            style={{
                                background: tier.badgeBg,
                                color: "#FFF",
                            }}
                        >
                            {tier.discount}
                        </div>
                        <p className="font-baskerville text-xl xl:text-2xl">
                            {tier.label}
                        </p>
                        <p className="text-xs text-warm-gray">
                            ACADEMIA REWARDS
                        </p>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            {/* Детали */}
            <StaggerContainer className="grid grid-cols-1 xl:grid-cols-4 gap-6 xl:gap-8">
                {tiers.map((tier) => (
                    <StaggerItem
                        key={tier.label}
                        className="flex flex-col gap-2"
                    >
                        <p className="uppercase font-baskerville text-lg">
                            {tier.label}: Скидка {tier.discount}
                        </p>
                        <span className="font-alistair self-start text-3xl bg-brand-blue-100 rounded px-3 py-1 mb-1">
                            {tier.nights}
                        </span>
                        <ul className="flex flex-col gap-2">
                            {tier.perks.map((perk) => (
                                <li
                                    key={perk}
                                    className="flex items-start gap-2"
                                >
                                    <span className="mt-2 w-1 h-1 rounded-full bg-current shrink-0" />
                                    <span>{perk}</span>
                                </li>
                            ))}
                        </ul>
                        {tier.note && (
                            <p className="text-xs text-warm-gray">
                                {tier.note}
                            </p>
                        )}
                    </StaggerItem>
                ))}

                <p className="xl:col-span-4 text-xs text-warm-gray border-t border-stone-200 pt-3">
                    * данные привилегии предоставляются при наличии возможности
                </p>
            </StaggerContainer>
        </section>
    );
}
