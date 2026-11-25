"use client";

import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

const RulesUrl = createContext<string | null>(null);

export function GiveawayRules({
    url,
    published,
    children,
}: {
    url: string;
    published: boolean;
    children: ReactNode;
}) {
    const [availableUrl, setAvailableUrl] = useState<string | null>(null);
    useEffect(() => {
        if (published) return;
        const controller = new AbortController();
        fetch(url, {
            method: "HEAD",
            signal: controller.signal,
            cache: "no-store",
        })
            .then((response) => {
                if (response.ok && !controller.signal.aborted)
                    setAvailableUrl(url);
            })
            .catch(() => {
                /* До публикации файла регистрация закрыта. */
            });
        return () => controller.abort();
    }, [url, published]);
    return (
        <RulesUrl.Provider
            value={published || availableUrl === url ? url : null}
        >
            {children}
        </RulesUrl.Provider>
    );
}

export const useGiveawayRulesUrl = () => useContext(RulesUrl);

export function GiveawayRulesLink({
    className,
    children,
}: {
    className: string;
    children: ReactNode;
}) {
    const href = useGiveawayRulesUrl();
    return href ? (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            {children}
        </a>
    ) : null;
}
