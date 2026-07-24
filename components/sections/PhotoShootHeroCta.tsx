"use client";

import Button from "@/components/ui/Button";
import PhotoShootFormModal from "@/components/ui/modals/PhotoShootFormModal";

/**
 * Пара CTA-кнопок для hero страницы /photo-shoot/. Вынесено в клиентский
 * компонент, потому что `renderTrigger` — функция, а её нельзя передать из
 * серверного PhotoShootPage напрямую в клиентский PhotoShootFormModal. Кнопки
 * используют брендовый `Button`: «Оставить заявку» — обычный primary
 * (открывает модалку заявки), «Узнать стоимость» — light-glass-якорь на
 * секцию «Тарифы» (#tariffs) той же страницы.
 */
export default function PhotoShootHeroCta({
    requestButton,
    costButton,
}: {
    requestButton: string;
    costButton: string;
}) {
    return (
        <div className="flex flex-col gap-4 mt-2 md:flex-row md:justify-center">
            <PhotoShootFormModal
                triggerLabel={requestButton}
                renderTrigger={(open) => (
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={open}
                        className="w-full md:w-auto"
                    >
                        {requestButton}
                    </Button>
                )}
            />
            <Button
                variant="light-glass"
                size="lg"
                href="#tariffs"
                className="w-full md:w-auto"
            >
                {costButton}
            </Button>
        </div>
    );
}
