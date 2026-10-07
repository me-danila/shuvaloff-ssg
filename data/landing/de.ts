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
        // Заглушка: EN-подписи до утверждения переводов.
        nav: en.ui.nav,
    },
    hero: {
        title: "ACADEMIA Mansion Shuvaloff",
        subtitle: "Boutique-Hotel im Herzen von Sankt Petersburg",
    },
};
