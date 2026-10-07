import { en } from "./en";
import type { LandingDictionary } from "./types";

export const de: LandingDictionary = {
    locale: "de",
    draft: true,
    meta: {
        title: "ACADEMIA Mansion Shuvaloff — Boutique-Hotel in Sankt Petersburg",
        description:
            "Boutique-Hotel in einem sorgfältig restaurierten Herrenhaus aus dem 19. Jahrhundert im Zentrum von Sankt Petersburg.",
    },
    ui: {
        skipLink: "Zum Hauptinhalt springen",
        languageSwitcherLabel: "Sprache",
        navLabel: "Hauptmenü",
        book: "Buchen",
        bookNow: "Jetzt buchen",
        menuLabel: "Menü",
        openMenu: "Menü öffnen",
        closeMenu: "Menü schließen",
        // Заглушка: EN-подписи до утверждения переводов.
        nav: en.ui.nav,
    },
    // Заглушка: EN-тексты до утверждения переводов.
    hero: en.hero,
    services: en.services,
    mansion: en.mansion,
};
