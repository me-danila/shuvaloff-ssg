import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Абонементы — ACADEMIA Особняк Шувалова",
    description: "Абоненты на проживание для гостей отелей сети ACADEMIA",
};

export default function AbonementPage() {
    return (
        <main className="flex flex-col gap-8">
            <a
                href="?tl-booking-open=true&tl-booking-scenario=42761-subscription"
                className="border-b-1 max-w-fit mx-auto mt-20"
            >
                При клике на вот эту подчеркнутую ссылку будет открываться попап
                с абонементами.
            </a>
        </main>
    );
}
