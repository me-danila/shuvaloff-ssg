/**
 * Кнопка-«бургер» мобильного меню: две тонкие линии цвета текста.
 * `-m-3 p-3` — зона нажатия ~44px при неизменной визуальной раскладке.
 */
export default function BurgerButton({
    onClick,
    label,
    expanded,
    controls,
    className = "",
}: {
    onClick: () => void;
    label: string;
    expanded?: boolean;
    controls?: string;
    className?: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`-m-3 flex cursor-pointer flex-col gap-1.5 p-3 ${className}`}
            aria-label={label}
            aria-expanded={expanded}
            aria-controls={controls}
        >
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
        </button>
    );
}
