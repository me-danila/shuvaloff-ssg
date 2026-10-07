import { en } from "./en";
import type { LandingDictionary } from "./types";

export const es: LandingDictionary = {
    locale: "es",
    draft: true,
    meta: {
        title: "ACADEMIA Mansion Shuvaloff — Hotel boutique en San Petersburgo",
        description:
            "Hotel boutique en una mansión del siglo XIX cuidadosamente restaurada en el centro de San Petersburgo.",
    },
    ui: {
        skipLink: "Ir al contenido principal",
        languageSwitcherLabel: "Idioma",
        navLabel: "Principal",
        book: "Reservar",
        // Заглушка: EN-подписи до утверждения переводов.
        nav: en.ui.nav,
    },
    hero: {
        title: "ACADEMIA Mansion Shuvaloff",
        subtitle: "Hotel boutique en el corazón de San Petersburgo",
    },
};
