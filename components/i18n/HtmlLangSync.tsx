"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { detectLocaleFromPath } from "@/lib/i18n/routing";

export default function HtmlLangSync() {
    const pathname = usePathname() || "/";

    useEffect(() => {
        const locale = detectLocaleFromPath(pathname);
        document.documentElement.lang = locale;
    }, [pathname]);

    return null;
}
