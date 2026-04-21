"use client";

import { usePathname } from "next/navigation";
import { detectLocaleFromPath, type Locale } from "@/lib/i18n/routing";

export const useLocale = (): Locale => {
    const pathname = usePathname() || "/";
    return detectLocaleFromPath(pathname);
};
