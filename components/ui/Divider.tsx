import Image from "next/image";

type DividerProps = {
    dark?: boolean;
};

export default function Divider({ dark = false }: DividerProps) {
    return (
        <div className="flex items-center gap-4 xl:w-full xl:max-w-6xl xl:mx-auto">
            <div
                className={`hidden xl:block flex-1 h-px ${dark ? "bg-stone-200" : "bg-stone-300"}`}
            />
            <Image
                src="https://academia.spb.ru/wp-content/uploads/2026/03/divider.png"
                width={149}
                height={42}
                alt=""
                className="mx-auto xl:mx-0 xl:mt-4"
            />
            <div
                className={`hidden xl:block flex-1 h-px ${dark ? "bg-stone-200" : "bg-stone-300"}`}
            />
        </div>
    );
}
