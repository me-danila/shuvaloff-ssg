import type { LandingDictionary } from "./types";

export const en: LandingDictionary = {
    locale: "en",
    draft: true,
    meta: {
        title: "ACADEMIA Mansion Shuvaloff — Boutique hotel in Saint Petersburg",
        description:
            "Boutique hotel in a carefully restored 19th-century mansion in the centre of Saint Petersburg.",
    },
    ui: {
        skipLink: "Skip to main content",
        languageSwitcherLabel: "Language",
        navLabel: "Main",
        book: "Book",
        bookNow: "Book now",
        menuLabel: "Menu",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        nav: [
            { label: "Rooms", href: "#rooms" },
            { label: "History", href: "#history" },
            { label: "Offers", href: "#offers" },
        ],
    },
    hero: {
        title: "ACADEMIA Mansion Shuvaloff",
        subtitle: "Boutique hotel in the heart of Saint Petersburg",
    },
};
