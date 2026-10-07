import type { LandingLocale } from "@/lib/i18n/routing";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import type { LandingDictionary } from "./types";

export type { LandingDictionary } from "./types";

export const LANDING_DICTIONARIES: Record<LandingLocale, LandingDictionary> = {
    en,
    it,
    de,
    fr,
    es,
};

/** Подписи переключателя — каждый язык своим самоназванием. */
export const LANDING_LANGUAGE_NAMES: Record<LandingLocale, string> = {
    en: "English",
    it: "Italiano",
    de: "Deutsch",
    fr: "Français",
    es: "Español",
};
