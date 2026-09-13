import { legalText } from "@/components/legal/LegalText";
import ContactsSection from "@/components/sections/ContactsSection";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";
import {
    type PolicyBlock,
    type PolicyTableRow,
    policySections,
    policyTableColumns,
    policyTableRows,
} from "@/data/policyData";
import { nbsp } from "@/lib/typography";

/** Колонки таблицы п. 7: порядок и ширина; подписи берутся из policyTableColumns. */
const tableColumns = [
    { key: "purpose", width: "w-64" },
    { key: "data", width: "w-56" },
    { key: "subjects", width: "w-48" },
    { key: "method", width: "w-40" },
    { key: "storage", width: "w-48" },
    { key: "destruction", width: "w-96" },
    { key: "basis", width: "w-56" },
    { key: "actions", width: "w-80" },
] as const satisfies readonly { key: keyof PolicyTableRow; width: string }[];

function ProcessingTable() {
    return (
        <div className="flex flex-col gap-3">
            {/* Мобильная версия: восемь колонок не читаются на узком экране,
                поэтому каждая цель обработки показана отдельной карточкой. */}
            <ul className="flex flex-col gap-4 xl:hidden">
                {policyTableRows.map((row) => (
                    <li
                        key={row.purpose}
                        className="flex flex-col gap-3 rounded-md border border-brand-brown/15 p-4"
                    >
                        <h3 className="text-sm/6">{nbsp(row.purpose)}</h3>
                        <dl className="flex flex-col gap-2">
                            {tableColumns.slice(1).map((column, index) => (
                                <div key={column.key}>
                                    <dt className="text-brand-brown/60 text-xs uppercase">
                                        {policyTableColumns[index + 1]}
                                    </dt>
                                    <dd className="text-sm/6">
                                        {nbsp(row[column.key])}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </li>
                ))}
            </ul>

            {/* Десктоп: таблица целиком, с горизонтальной прокруткой —
                восемь колонок шире контейнера даже на больших экранах. */}
            <div className="hidden overflow-x-auto xl:block">
                <table className="w-max border-collapse text-sm/6">
                    <thead>
                        <tr>
                            {tableColumns.map((column, index) => (
                                <th
                                    key={column.key}
                                    scope="col"
                                    className={`${column.width} border-brand-brown/20 border-b-2 px-3 py-2 text-left align-bottom font-bold`}
                                >
                                    {nbsp(policyTableColumns[index])}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {policyTableRows.map((row) => (
                            <tr key={row.purpose}>
                                {tableColumns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="border-brand-brown/10 border-b px-3 py-3 align-top"
                                    >
                                        {nbsp(row[column.key])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="hidden text-brand-brown/60 text-xs xl:block">
                Таблица прокручивается по горизонтали
            </p>
        </div>
    );
}

/** Стабильный ключ блока: его собственный текст, а не индекс в массиве. */
function blockKey(sectionId: string, block: PolicyBlock): string {
    if (block.type === "table") return `${sectionId}-table`;
    if (block.type === "list") return `${sectionId}-${block.items[0]}`;
    return `${sectionId}-${block.text.slice(0, 40)}`;
}

function Block({ block }: { block: PolicyBlock }) {
    if (block.type === "table") {
        return <ProcessingTable />;
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

export default function PolicyPage() {
    return (
        <main className="flex flex-col gap-8">
            <section className="my-6 flex w-full flex-col gap-5 max-xl:px-6 xl:mx-auto xl:max-w-7xl xl:gap-6">
                <FadeUp className="xl:text-center">
                    <h1 className="text-xl xl:text-3xl">
                        Политика в&nbsp;отношении обработки персональных данных
                    </h1>
                </FadeUp>

                {policySections.map((section, index) => (
                    <FadeUp
                        key={section.id}
                        id={section.id}
                        className="flex scroll-mt-24 flex-col gap-2"
                    >
                        <h2 className="text-base xl:text-xl">
                            {index + 1}. {nbsp(section.title)}
                        </h2>
                        {section.blocks.map((block) => (
                            <Block
                                key={blockKey(section.id, block)}
                                block={block}
                            />
                        ))}
                    </FadeUp>
                ))}
            </section>

            <Divider />
            <ContactsSection />
        </main>
    );
}
