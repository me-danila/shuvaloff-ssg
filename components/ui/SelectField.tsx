import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import type { SelectHTMLAttributes } from "react";

// Нативный <select> со стрелкой справа. Первая опция — неактивный плейсхолдер:
// пока ничего не выбрано, в поле видна подпись. Классы поля приходят из формы,
// чтобы совпасть с остальными полями.

type SelectFieldProps = Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "value" | "onChange" | "children"
> & {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    options: readonly string[];
};

export default function SelectField({
    value,
    onChange,
    placeholder,
    options,
    className = "",
    ...rest
}: SelectFieldProps) {
    return (
        <div className="relative">
            <select
                aria-label={placeholder}
                {...rest}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${className} cursor-pointer appearance-none pr-12`}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            <CaretDownIcon
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
        </div>
    );
}
