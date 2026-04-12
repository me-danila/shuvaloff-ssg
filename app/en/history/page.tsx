import type { Metadata } from "next";
import DividerHistory from "@/components/ui/divider/History";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "History of Count Shuvalov Mansion — ACADEMIA Shuvaloff Mansion",
    description:
        "A journey through time: the history of Count Shuvalov Mansion in Saint Petersburg",
    alternates: getLocaleAlternates("/history/", "en"),
};

export default function EnHistory() {
    return (
        <main className="flex flex-col gap-6 xl:gap-6">
            <FadeUp duration={1.2}>
                <section className="flex flex-col gap-6 mx-6 text-center xl:mx-auto mt-6 xl:max-w-3xl">
                    <FadeUp>
                        <h1>A Journey Through Time</h1>
                    </FadeUp>
                    <FadeUp
                        delay={0.1}
                        className="-mt-2 font-alistair text-2xl xl:text-[40px] xl:max-w-4xl mx-auto xl:-mt-4"
                    >
                        Shuvalov Mansion
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        Travel is remembered not only by routes and meetings,
                        but also by where you stay. Life in the ACADEMIA mansion
                        is more than a hotel room.
                    </FadeUp>
                    <FadeUp delay={0.3}>
                        <p>
                            It is an atmosphere that shapes the whole trip:
                            comfort, thoughtful details, and access to special
                            privileges make each day truly memorable.
                        </p>
                    </FadeUp>
                    <DividerHistory style={1} />
                </section>
            </FadeUp>

            <FadeUp duration={1.2}>
                <section className="relative h-90 overflow-hidden rounded-lg xl:rounded-md xl:h-150">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/03/Антиквариат-в-резиденциях-Дашковой-и-Шувалова_page-0003.jpg"
                        alt="Mokhovaya Street on a historical map of Saint Petersburg"
                        fill
                        loading="lazy"
                        className="object-cover object-center"
                    />
                </section>
            </FadeUp>

            <FadeUp duration={1.2}>
                <section className="flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    <DividerHistory style={2} />
                    <p>
                        The mansion where the hotel is now located stands on
                        Mokhovaya Street, one of the oldest streets in the city.
                        In the 18th century, this area was inhabited by weavers
                        and craftsmen who worked for the Admiralty and civil
                        shipyard.
                    </p>
                    <p>
                        During the second half of the 18th century, prosperous
                        merchants settled here, followed by noble families. By
                        the late 19th century, Mokhovaya gradually gained the
                        architectural character we still admire today.
                    </p>
                    <DividerHistory style={3} />
                </section>
            </FadeUp>

            <FadeUp duration={1.2}>
                <section className="flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    <h2 className="text-center uppercase">The Mansion</h2>
                    <p>
                        The history of the house begins in 1735, when a wooden
                        estate with a garden stood on this site. Over time, the
                        property passed through several owners from military and
                        civil circles of the Russian Empire.
                    </p>
                    <p>
                        In 1854, the plot was acquired by Count Andrey Pavlovich
                        Shuvalov. By his order, architect Hermann Paucker built
                        a new three-story mansion and an additional wing.
                    </p>
                    <p>
                        In 1858, architect Luigi Ferracini redesigned the facade
                        and enlarged the upper-level windows, giving the
                        building a brighter and more ceremonial look.
                    </p>
                    <div className="relative my-8 mx-auto aspect-3/1 w-90 xl:w-200 xl:my-10">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/03/img13-Photoroom-1.png"
                            alt="Shuvalov Mansion"
                            fill
                            sizes="(max-width: 1200px) 360px, 800px"
                            loading="lazy"
                            className="object-contain"
                        />
                    </div>
                    <DividerHistory style={3} />
                </section>
            </FadeUp>

            <FadeUp duration={1.2}>
                <section className="flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    <p>
                        In 1912, the mansion was inherited by Elizaveta
                        Vorontsova-Dashkova, daughter of Count Shuvalov. She
                        commissioned architect Ivan Fomin to create new
                        interiors in an elegant neoclassical style.
                    </p>
                    <p>
                        The building on Mokhovaya was used as an income house.
                        Among its residents was composer and musicologist Boris
                        Asafiev, who lived here from 1909 to 1917. Ceremonial
                        rooms remained in the family estate zone.
                    </p>
                    <p>
                        After a fire in 1913, Fomin carried out major
                        restoration and redecoration works. The house received
                        updated interiors, electricity, telephone lines, and an
                        elevator.
                    </p>
                    <DividerHistory style={3} />
                </section>
            </FadeUp>

            <FadeUp duration={1.2}>
                <section className="flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    <p>
                        The Vorontsov-Dashkov family left Russia in 1919, and
                        the mansion stood partially abandoned for years. During
                        the Siege of Leningrad, the building suffered severe
                        shelling damage. On November 14, 1941, an aerial bomb
                        struck the house, causing major destruction.
                    </p>
                    <p>
                        After World War II, the condition of the mansion
                        remained critical: damaged walls, lost facade elements,
                        broken glazing, and ruined interiors. Restoration
                        attempts were made over decades, often without a
                        permanent owner.
                    </p>
                    <p>
                        Today, the carefully restored building with preserved
                        heritage elements has entered a new chapter as ACADEMIA
                        Shuvaloff Mansion.
                    </p>
                    <DividerHistory style={3} />
                </section>
            </FadeUp>

            <FadeUp duration={1.2}>
                <section className="flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/03/img27.jpg"
                        alt="Coat of arms of the Shuvalov family"
                        width={360}
                        height={390}
                        loading="lazy"
                        className="object-contain mx-auto"
                    />
                    <h2 className="text-center uppercase">
                        Coat of Arms of the Shuvalov Family
                    </h2>
                    <p>
                        The rise of the Shuvalov family was closely connected
                        with Empress Elizabeth Petrovna. In 1746, the family
                        coat of arms was officially approved, emphasizing their
                        new status in imperial society.
                    </p>
                    <p>
                        The heraldic composition combines symbols of service,
                        honor, and dynastic continuity, and remains one of the
                        iconic visual signs of the family legacy.
                    </p>
                    <DividerHistory style={3} />
                </section>
            </FadeUp>

            <FadeUp duration={1.2}>
                <section className="flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    <h2 className="text-center uppercase">
                        Mansion in the 21st Century
                    </h2>
                    <p>
                        Restoration of the mansion was based on historical
                        archives, heritage requirements, and careful
                        conservation of surviving details. The goal was to
                        preserve character, not imitate it.
                    </p>
                    <p>
                        Today, historical rooms coexist with contemporary
                        comfort: restored plasterwork, classical proportions,
                        and modern engineering systems form a single living
                        environment.
                    </p>
                    <p>
                        ACADEMIA Shuvaloff Mansion is now a place where guests
                        can experience the atmosphere of aristocratic Saint
                        Petersburg in a meaningful and comfortable way.
                    </p>
                    <DividerHistory style={1} />
                </section>
            </FadeUp>
        </main>
    );
}
