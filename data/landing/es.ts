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
        bookNow: "Reservar ahora",
        menuLabel: "Menú",
        openMenu: "Abrir menú",
        closeMenu: "Cerrar menú",
        // Заглушка: EN-подписи до утверждения переводов.
        nav: en.ui.nav,
    },
    // Заглушка: EN-тексты до утверждения переводов.
    hero: en.hero,
    services: en.services,
};
