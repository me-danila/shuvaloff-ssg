"use client";

import { ArrowRight, Phone, X } from "@phosphor-icons/react";
import {
    type ComponentProps,
    createContext,
    useContext,
    useId,
    useRef,
} from "react";
import Button from "@/components/ui/Button";
import { serviceOrderCopy } from "@/data/serviceOrderCopy";
import type { HtmlLang } from "@/lib/i18n/routing";
import { ORDER_URL } from "@/lib/seo/site";

const contacts = [
    {
        title: "Telegram",
        accent: "[--contact-color:#229ED9]",
        href: "https://t.me/ConciergeACADEMIA",
        icon: (
            <img
                src="/icons/telegram-brand.svg"
                alt=""
                width={22}
                height={22}
            />
        ),
    },
    {
        title: "Max",
        accent: "[--contact-color:#5066F5]",
        href: ORDER_URL,
        icon: (
            <svg
                width="21"
                height="21"
                viewBox="0 0 100 100"
                aria-hidden="true"
            >
                <path
                    fill="currentColor"
                    d="M50.7571 0.261719C78.2929 0.261719 99.8857 22.5974 99.8857 50.1474C99.8857 77.6974 77.6071 99.4903 51.0214 99.4903C41.5857 99.4903 37.0143 98.1617 29.65 92.9474C29.1429 92.5903 28.45 92.6831 28.0214 93.1403C22.3571 99.1831 7.85 103.426 7.18571 95.176C7.18571 80.7903 0 71.4474 0 49.876C0 21.5546 23.2214 0.261719 50.7571 0.261719ZM51.5286 24.8117C38.4643 24.126 28.2643 33.1974 26.0143 47.3831C24.15 59.1332 27.45 73.4546 30.2786 74.176C31.4786 74.4832 34.3571 72.276 36.4571 70.2974C36.85 69.926 37.45 69.8617 37.9071 70.1474C41.1786 72.1474 44.8786 73.6474 48.9571 73.8617C62.3714 74.5617 74.2571 64.0617 74.9643 50.6474C75.6643 37.2331 64.9429 25.5046 51.5286 24.8046V24.8117Z"
                />
            </svg>
        ),
    },
    {
        title: "WhatsApp",
        accent: "[--contact-color:#25D366]",
        href: "https://wa.me/79668342743",
        icon: (
            <img
                src="/icons/whatsapp-brand.svg"
                alt=""
                width={24}
                height={24}
            />
        ),
    },
    {
        title: "Phone",
        accent: "[--contact-color:var(--color-brand-red)]",
        href: "tel:+79668342743",
        icon: <Phone size={22} />,
    },
];

const ServiceOrderContext = createContext<() => void>(() => {
    throw new Error("Missing ServiceOrderProvider");
});

export default function ServiceOrderButton(
    props: Omit<ComponentProps<typeof Button>, "href" | "target" | "onClick">,
) {
    const open = useContext(ServiceOrderContext);
    return <Button {...props} onClick={open} />;
}

export function ServiceOrderTileButton({ label }: { label: string }) {
    const open = useContext(ServiceOrderContext);
    return (
        <button
            type="button"
            aria-label={label}
            onClick={open}
            className="absolute inset-0 cursor-pointer"
        />
    );
}

export function ServiceOrderProvider({
    locale,
    children,
}: {
    locale: HtmlLang;
    children: React.ReactNode;
}) {
    const dialog = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const copy = serviceOrderCopy[locale];
    return (
        <ServiceOrderContext.Provider value={() => dialog.current?.showModal()}>
            {children}
            <dialog
                ref={dialog}
                aria-labelledby={titleId}
                data-lenis-prevent
                className="service-order fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-4 text-brand-brown backdrop:bg-black/55 open:flex open:items-end open:justify-center sm:open:items-center"
            >
                <button
                    type="button"
                    aria-hidden="true"
                    tabIndex={-1}
                    aria-label={copy.close}
                    className="absolute inset-0"
                    onClick={() => dialog.current?.close()}
                />
                <div className="relative max-h-full w-full max-w-[520px] overflow-y-auto overscroll-contain rounded-md bg-white p-5 sm:p-8">
                    <button
                        type="button"
                        aria-label={copy.close}
                        onClick={() => dialog.current?.close()}
                        className="absolute right-2 top-2 grid size-11 cursor-pointer place-items-center rounded-md hover:bg-brand-light"
                    >
                        <X size={22} />
                    </button>
                    <h2
                        id={titleId}
                        className="pr-9 text-[24px] leading-tight text-black sm:text-[28px]"
                    >
                        {copy.title}
                    </h2>
                    <p className="mt-3 text-pretty text-sm/5">{copy.intro}</p>
                    <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                        {contacts.map(({ title, href, icon, accent }) => (
                            <a
                                key={href}
                                href={href}
                                target={
                                    href.startsWith("tel:")
                                        ? undefined
                                        : "_blank"
                                }
                                rel="noopener noreferrer"
                                className={`relative flex min-h-14 items-center gap-3 rounded-md border border-neutral-300 p-2 transition-colors hover:border-(--contact-color) focus-visible:outline-(--contact-color) sm:flex-col sm:items-start sm:p-4 ${accent}`}
                            >
                                <span
                                    aria-hidden="true"
                                    className="grid size-9 shrink-0 place-items-center text-(--contact-color)"
                                >
                                    {icon}
                                </span>
                                <span className="flex-1">
                                    <strong className="block text-sm tracking-widest uppercase">
                                        {title === "Phone"
                                            ? copy.call
                                            : title === "WhatsApp"
                                              ? "WhatsApp*"
                                              : title}
                                    </strong>
                                    <span className="block text-sm/5">
                                        {title === "Phone"
                                            ? copy.phone
                                            : copy.message + title}
                                    </span>
                                </span>
                                <ArrowRight
                                    aria-hidden="true"
                                    size={18}
                                    className="mr-1 shrink-0 text-neutral-500 sm:absolute sm:top-6 sm:right-4"
                                />
                            </a>
                        ))}
                    </div>
                    <p className="mt-5 text-xs/4 text-neutral-600">
                        {copy.note}
                    </p>
                </div>
            </dialog>
        </ServiceOrderContext.Provider>
    );
}
