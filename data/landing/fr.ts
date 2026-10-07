import { en } from "./en";
import type { LandingDictionary } from "./types";

export const fr: LandingDictionary = {
    locale: "fr",
    draft: true,
    meta: {
        title: "ACADEMIA Mansion Shuvaloff — Hôtel boutique à Saint-Pétersbourg",
        description:
            "Hôtel boutique dans un hôtel particulier du XIXᵉ siècle soigneusement restauré, au centre de Saint-Pétersbourg.",
    },
    ui: {
        skipLink: "Aller au contenu principal",
        languageSwitcherLabel: "Langue",
        navLabel: "Principal",
        book: "Réserver",
        bookNow: "Réserver",
        menuLabel: "Menu",
        openMenu: "Ouvrir le menu",
        closeMenu: "Fermer le menu",
        // Заглушка: EN-подписи до утверждения переводов.
        nav: en.ui.nav,
    },
    // Заглушка: EN-тексты до утверждения переводов.
    hero: en.hero,
    services: en.services,
    mansion: en.mansion,
};
