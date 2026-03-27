import Image from "@/components/ui/OptimizedImage";

type CardServiceBigProps = {
    title: string;
    imgUrl: string;
    slug?: string;
};

export default function CardServiceBig({
    title,
    imgUrl,
    slug,
}: CardServiceBigProps) {
    return (
        <a
            href={`/services/${slug}/`}
            className="relative rounded-md overflow-hidden aspect-3/2 flex-1"
        >
            <Image
                src={imgUrl}
                alt={title}
                fill
                sizes="(max-width: 1200px) 100vw, 50vw"
                loading="lazy"
                className="object-cover object-center"
            />

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.3) 100%)",
                }}
            />

            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10 xl:p-8">
                <p className="font-baskerville uppercase text-xl xl:text-2xl xl:leading-tight">
                    {title}
                </p>
                <p className="flex items-center gap-6 uppercase tracking-widest text-sm">
                    Подробнее
                    <span className="text-2xl mb-1">›</span>
                </p>
            </div>
        </a>
    );
}
