import { legalText } from "@/components/legal/LegalText";
import ContactsSection from "@/components/sections/ContactsSection";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";
import {
    type ConsentBlock,
    consentBlocks,
    consentOperator,
    consentTitle,
} from "@/data/consentData";
import { nbsp } from "@/lib/typography";

function Block({ block }: { block: ConsentBlock }) {
    if (block.type === "ordered") {
        return (
            // Нумерация начинается с 2, как в исходном документе: сами пункты
            // ссылаются друг на друга по этим номерам («в пунктах 8 и 9»).
            <ol
                start={block.start}
                className="flex list-decimal flex-col gap-2 pl-6"
            >
                {block.items.map((item) => (
                    <li key={item}>{legalText(item)}</li>
                ))}
            </ol>
        );
    }

    if (block.type === "list") {
        return (
            <ul className="flex list-disc flex-col gap-2 pl-6">
                {block.items.map((item) => (
                    <li key={item}>{legalText(item)}</li>
                ))}
            </ul>
        );
    }

    return <p>{legalText(block.text)}</p>;
}

/** Стабильный ключ блока: его собственный текст, а не индекс в массиве. */
function blockKey(block: ConsentBlock): string {
    return block.type === "p" ? block.text.slice(0, 40) : block.items[0];
}

export default function ConsentPage() {
    return (
        <main className="flex flex-col gap-8">
            <section className="my-6 flex w-full flex-col gap-5 max-xl:px-6 xl:mx-auto xl:max-w-7xl xl:gap-6">
                <FadeUp className="xl:text-center">
                    <h1 className="text-xl xl:text-3xl">
                        {nbsp(consentTitle)}
                    </h1>
                </FadeUp>

                <FadeUp className="flex flex-col gap-2">
                    {consentBlocks.map((block) => (
                        <Block key={blockKey(block)} block={block} />
                    ))}
                </FadeUp>

                <FadeUp className="flex flex-col gap-1 border-brand-brown/15 border-t pt-4">
                    {consentOperator.map((line) => (
                        <p key={line}>{legalText(line)}</p>
                    ))}
                </FadeUp>
            </section>

            <Divider />
            <ContactsSection />
        </main>
    );
}
