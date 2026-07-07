import StructuredData from "@/components/seo/StructuredData";

export type FAQItem = {
    question: string;
    answer: string;
};

/**
 * Блок «Вопросы и ответы» для статей: видимая разметка + FAQPage JSON-LD.
 * Ответы — plain text (попадают в schema как есть).
 */
export default function FAQ({
    title = "Вопросы и ответы",
    items,
}: {
    title?: string;
    items: FAQItem[];
}) {
    return (
        <section className="my-8">
            <StructuredData
                data={{
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: items.map((item) => ({
                        "@type": "Question",
                        name: item.question,
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: item.answer,
                        },
                    })),
                }}
            />
            <h2>{title}</h2>
            <dl className="mt-4 flex flex-col gap-5">
                {items.map((item) => (
                    <div key={item.question}>
                        <dt className="font-bold">{item.question}</dt>
                        <dd className="mt-1 text-sm/6 xl:text-base/7">
                            {item.answer}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
