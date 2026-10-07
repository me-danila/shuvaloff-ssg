import { en } from "./en";
import type { LandingDictionary } from "./types";

export const it: LandingDictionary = {
    locale: "it",
    draft: true,
    meta: {
        title: "ACADEMIA Mansion Shuvaloff — Boutique hotel a San Pietroburgo",
        description:
            "Boutique hotel in una dimora del XIX secolo restaurata con cura nel centro di San Pietroburgo.",
    },
    ui: {
        skipLink: "Vai al contenuto principale",
        languageSwitcherLabel: "Lingua",
        navLabel: "Principale",
        book: "Prenota",
        // Заглушка: EN-подписи до утверждения переводов.
        nav: en.ui.nav,
    },
    hero: {
        title: "ACADEMIA Mansion Shuvaloff",
        subtitle: "Boutique hotel nel cuore di San Pietroburgo",
    },
};
