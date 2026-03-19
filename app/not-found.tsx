import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Страница не найдена — ACADEMIA Особняк Шувалова",
};

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 text-center">
            <p className="text-8xl xl:text-[160px] font-baskerville text-stone-200 leading-none select-none">
                404
            </p>
            <div className="flex flex-col gap-2 -mt-4">
                <h1 className="text-2xl xl:text-3xl">Страница не найдена</h1>
                <p className="text-warm-gray">
                    Возможно, она была перемещена или удалена
                </p>
            </div>
            <Button href="/" variant="primary" size="xl">
                Вернуться на главную
            </Button>
        </main>
    );
}
