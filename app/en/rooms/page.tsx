import type { Metadata } from "next";
import ContactsSection from "@/components/sections/ContactsSection";
import RoomsSection from "@/components/sections/RoomsSection";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Room Categories — ACADEMIA Shuvaloff Mansion",
    description:
        "Rooms and suites at ACADEMIA Shuvaloff Mansion in Saint Petersburg",
    alternates: getLocaleAlternates("/rooms/", "en"),
};

export default function EnRooms() {
    return (
        <main className="flex flex-col gap-4 xl:gap-10">
            <section className="flex flex-col gap-4 m-6 xl:text-center xl:max-w-6xl xl:mx-auto">
                <FadeUp>
                    <h1>Room Categories</h1>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="xl:mt-2">
                        Our rooms are designed in modern neoclassical style:
                        light tones, calm atmosphere, and clean lines set the
                        mood for rest and balance.
                    </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <p>
                        The mansion hotel offers the following room categories:
                        Classic Standard, Elegant Superior, Two-Room Junior
                        Suite, Two-Room Suite, and two unique historic suites
                        named after the mansion’s owners.
                    </p>
                </FadeUp>
            </section>
            <RoomsSection />
            <Divider />
            <ContactsSection />
        </main>
    );
}
