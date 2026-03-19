import Image from "next/image";
import { AllSales } from "@/data/SalesData";

export default function SalesGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {AllSales.map((sale) => (
                <a
                    key={sale.title}
                    href={sale.bookingUrl}
                    className="relative aspect-square rounded-md overflow-hidden group"
                >
                    <Image
                        src={sale.imgUrl}
                        alt={sale.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/50" />
                    <div className="absolute inset-0 flex flex-col justify-between text-white p-8">
                        <div className="flex justify-between gap-4">
                            <h2 className="font-baskerville uppercase leading-tight xl:text-2xl">
                                {sale.title}
                            </h2>
                            <span className="hidden xl:block text-2xl">›</span>
                        </div>
                        {sale.subtitle && (
                            <p className="text-sm text-white/90">
                                {sale.subtitle}
                            </p>
                        )}
                    </div>
                </a>
            ))}
        </div>
    );
}
