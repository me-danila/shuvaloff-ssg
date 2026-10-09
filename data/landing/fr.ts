import { en } from "./en";
import { withTexts } from "./localize";
import type { LandingDictionary } from "./types";

// Тексты блоков — из ТЗ («ТЗ сайт Шувалова. Иностранцы»); подписи
// интерфейса, контакты и футер — перевод по EN-версии. Французская
// типографика: неразрывный пробел перед « : », « % » и внутри « ».
export const fr: LandingDictionary = {
    locale: "fr",
    draft: false,
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
        nav: withTexts(en.ui.nav, [
            { label: "Chambres" },
            { label: "Histoire" },
            { label: "Offres" },
        ]),
    },
    hero: {
        title: "ACADEMIA Maison de Maître de Shuvaloff",
        subtitle:
            "Plongez dans le XIXe siècle et rencontrez la famille des comtes",
    },
    services: {
        title: "Ce que nous prenons en charge",
        items: withTexts(en.services.items, [
            {
                title: "Assistance pour les visas",
                text: "Nous vous aidons à obtenir la lettre d'invitation et les documents nécessaires à l'obtention d'un visa",
            },
            {
                title: "Paiement par carte",
                text: "Paiement par carte de n'importe quel pays, sans restriction quant à la banque",
            },
            {
                title: "Transfert",
                text: "Nous viendrons vous chercher à l'aéroport et organiserons votre transport vers n'importe quel endroit de la ville",
            },
            {
                title: "Concierge en ligne 24h/24, 7j/7",
                text: "Confiez-nous l'organisation de vos loisirs. Nous vous aiderons à réserver un restaurant, à prendre rendez-vous pour un massage, à acheter des billets de théâtre ou à organiser une visite guidée exclusive",
            },
            {
                title: "Recevez un cadeau",
                text: "Réservez une chambre sur notre site et nous vous enverrons un guide des lieux secrets de Saint-Pétersbourg",
            },
        ]),
    },
    mansion: {
        title: "Une demeure historique au cœur de la ville",
        tiles: withTexts(en.mansion.tiles, [
            {
                title: "Petits-déjeuners comtaux",
                text: "Une matinée dans des intérieurs du XIXe siècle avec un petit-déjeuner classique de Saint-Pétersbourg",
            },
            {
                title: "Restaurant",
                text: "Cuisine d'auteur au restaurant de la Maison de Maître de Shuvaloff",
            },
            {
                title: "ACADEMIA SPA",
                text: "Studio de remise en forme et de massage professionnel",
            },
            {
                title: "Une immersion dans l'atmosphère du XIXe siècle",
                text: "Des demeures historiques ornées d'objets anciens et d'un décor d'époque authentique",
            },
        ]),
        slides: withTexts(en.mansion.slides, [
            {
                label: "Histoire",
                image: {
                    ...en.mansion.slides[0].image,
                    alt: "Dessin de la façade de la Maison de Maître de Shuvaloff ACADEMIA",
                },
                title: "Une demeure chargée d'histoire",
                paragraphs: [
                    "La demeure qui abrite aujourd'hui l'hôtel se trouve rue Mokhovaya, dont l'origine remonte à l'époque de la fondation de la ville sur la Néva. À l'origine, elle était habitée par des « khamovniki », des tisserands qui fabriquaient des voiles pour la flotte.",
                    "En 1854, le terrain fut acquis par le général de division et conseiller d'État effectif, le comte Andreï Pavlovitch Shuvaloff. À sa demande, le bâtiment de deux étages fut transformé en une demeure de trois étages dotée d'une façade d'apparat et arborant les armoiries familiales : trois licornes, symbole héraldique de la famille Shuvaloff. Plus tard, entre 1913 et 1914, l'architecte Ivan Fomin aménagea les intérieurs du premier étage pour la fille du comte, Élisabeth Vorontsova-Dashkova.",
                    "Aujourd’hui, le bâtiment, soigneusement remis en état et dont les éléments du patrimoine culturel ont été restaurés, abrite l'ACADEMIA Maison de Maître de Shuvaloff. La demeure connaît une nouvelle vie et accueille à nouveau ses hôtes à bras ouverts.",
                ],
            },
            {
                label: "Emplacement",
                image: {
                    ...en.mansion.slides[1].image,
                    alt: "Façade de l’hôtel ACADEMIA Maison de Maître de Shuvaloff, rue Mokhovaya",
                },
                title: "À deux pas du centre-ville",
                paragraphs: [
                    "La demeure se trouve rue Mokhovaya, à proximité du Jardin d'été, du château Mikhaïlovski et des berges de la Fontanka, à quelques minutes à pied des principales attractions du centre-ville.",
                ],
            },
        ]),
        prev: "Précédent",
        next: "Suivant",
    },
    rooms: {
        title: "Catégories de chambres",
        // Названия категорий — как на EN (не переводим), только описания.
        categories: withTexts(en.rooms.categories, [
            {
                text: "Chambre d'hôtel classique dotée d'un lit double avec matelas orthopédique et d'une salle de bains spacieuse avec douche",
            },
            {
                text: "Chambre supérieure avec un lit double, un coin salon et une salle de bains spacieuse équipée d'une douche",
            },
            {
                text: "Chambre mansardée de catégorie supérieure avec un lit double, un coin salon et une salle de bains spacieuse équipée d'une douche",
            },
            {
                text: "Chambre de confort supérieur comprenant une chambre à coucher séparée, un salon et une salle de bains spacieuse",
            },
            {
                text: "Chambre de grand confort située dans les combles, comprenant une chambre à coucher indépendante, un salon pour se détendre et une salle de bains spacieuse",
            },
            {
                text: "Chambre à trois pièces comprenant deux chambres séparées, un salon et une salle de bains spacieuse",
            },
            {
                // Сокращено по смыслу, как в EN: полный текст ТЗ не влезает
                // в карточку.
                text: "Résidences historiques au décor d’origine, ornées d’objets anciens de la fin du XIXe et du début du XXe siècle",
            },
        ]),
        book: "Réserver",
        prev: "Précédent",
        next: "Suivant",
    },
    offers: {
        title: "Offres spéciales",
        items: withTexts(en.offers.items, [
            {
                title: "Code promotionnel GENIUS",
                text: "Bénéficiez d'un bonus lors de votre première réservation sur le site. Meilleur prix garanti",
            },
            {
                title: "Réservation anticipée",
                text: "Planifiez votre séjour à l'avance : à partir de 3 nuits, de septembre à décembre, bénéficiez d'une réduction de 15 %",
            },
            {
                title: "Séjour de longue durée",
                text: "20 % de réduction pour toute réservation de 5 nuits ou plus",
            },
            {
                title: "Anniversaire",
                text: "Avantages pour les personnes fêtant leur anniversaire et réduction de 20 %",
            },
        ]),
        book: "Réserver",
    },
    scenarios: {
        title: "Expériences dans la demeure",
        items: withTexts(en.scenarios.items, [
            {
                title: "L'automne comtal",
                text: "Un cadre enchanteur pour un séjour aristocratique en automne",
            },
            {
                title: "Saint-Pétersbourg comtal",
                text: "Un séjour dans l'esprit des fastueuses traditions aristocratiques (de mai à septembre)",
            },
            {
                title: "Votre journée de repos : un véritable art",
                text: "Une journée de repos comme une cérémonie particulière, dans l'esprit des traditions des maisons nobles du XIXe siècle",
            },
        ]),
        book: "Réserver",
    },
    contacts: {
        title: "Contacts",
        subtitle: "Service de réservation 24h/24, 7j/7",
        address: "10, rue Mokhovaya, Saint-Pétersbourg",
        whatsapp: "Écrivez-nous sur WhatsApp",
        mapTitle: "ACADEMIA Maison de Maître de Shuvaloff sur la carte",
        book: "Réserver",
    },
    booking: {
        metaTitle:
            "Réservation des chambres — ACADEMIA Maison de Maître de Shuvaloff",
        metaDescription:
            "Meilleur prix garanti en réservant une chambre à l’ACADEMIA Maison de Maître de Shuvaloff sur le site officiel",
        title: "Réservation des chambres",
        line1: "Nous vous garantissons les meilleures conditions en réservant sur le site officiel.",
        line2: "Cliquez sur",
        line3: "pour appliquer la réduction automatique.",
    },
    footer: {
        home: "Retour en haut",
        languages: "Langues",
        social: "Suivez-nous",
        socialText:
            "Soyez les premiers informés de nos annonces, actualités et offres spéciales",
        legal: "Mentions légales",
        policy: "Politique de traitement des données personnelles (en russe)",
        legalInfo: "Informations légales (en russe)",
        copyright: "© 2026 ACADEMIA BOUTIQUE HOTELS ®, Saint-Pétersbourg",
        company: en.footer.company,
    },
};
