"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import FooterV2 from "@/components/layout/FooterV2";
import { normalizePath, stripLocalePrefix } from "@/lib/i18n/routing";

export default function FooterSwitch() {
    const pathname = usePathname() || "/";
    const normalized = normalizePath(stripLocalePrefix(pathname));
    if (normalized === "/v2") return <FooterV2 />;
    return <Footer />;
}
