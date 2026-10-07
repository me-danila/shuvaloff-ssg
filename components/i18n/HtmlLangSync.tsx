"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { detectHtmlLang } from "@/lib/i18n/routing";

export default function HtmlLangSync() {
    const pathname = usePathname() || "/";

    useEffect(() => {
        document.documentElement.lang = detectHtmlLang(pathname);
    }, [pathname]);

    return null;
}
