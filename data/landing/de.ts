import { en } from "./en";
import { withTexts } from "./localize";
import type { LandingDictionary } from "./types";

// Тексты блоков — из ТЗ («ТЗ сайт Шувалова. Иностранцы»); подписи
// интерфейса, контакты и футер — перевод по EN-версии.
export const de: LandingDictionary = {
    locale: "de",
    draft: false,
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
        nav: withTexts(en.ui.nav, [
            { label: "Zimmer" },
            { label: "Geschichte" },
            { label: "Angebote" },
        ]),
    },
    hero: {
        title: "ACADEMIA Shuvalov-Anwesen",
        subtitle:
            "Tauchen Sie ein ins 19. Jahrhundert und lernen Sie die Grafenfamilie kennen",
    },
    services: {
        title: "Was wir für Sie übernehmen",
        items: withTexts(en.services.items, [
            {
                title: "Unterstützung bei der Visumbeantragung",
                text: "Wir helfen Ihnen bei der Einladung und den Unterlagen für die Visumbeantragung",
            },
            {
                title: "Zahlung per Karte",
                text: "Zahlung mit Karten aus jedem Land, ohne Einschränkungen hinsichtlich der Bank",
            },
            {
                title: "Transfer",
                text: "Wir holen Sie am Flughafen ab und organisieren einen Transfer zu jedem Ort in der Stadt",
            },
            {
                title: "Elektronischer Concierge rund um die Uhr",
                text: "Überlassen Sie uns die Organisation Ihrer Freizeit. Wir helfen Ihnen gerne dabei, einen Tisch im Restaurant zu reservieren, einen Massagetermin zu vereinbaren, Theaterkarten zu kaufen oder eine exklusive Stadtführung zu organisieren",
            },
            {
                title: "Erhalten Sie ein Geschenk",
                text: "Buchen Sie ein Zimmer auf unserer Website, und wir senden Ihnen einen Reiseführer mit Geheimtipps für Sankt Petersburg zu",
            },
        ]),
    },
    mansion: {
        title: "Historisches Herrenhaus im Stadtzentrum",
        tiles: withTexts(en.mansion.tiles, [
            {
                title: "Grafenfrühstück",
                text: "Ein Morgen in einem Interieur aus dem 19. Jahrhundert mit einem klassischen St. Petersburger Frühstück",
            },
            {
                title: "Restaurant",
                text: "Kreative Küche im Restaurant ACADEMIA Shuvalov",
            },
            {
                title: "ACADEMIA Massage & Spa",
                text: "Studio für Regeneration und professionelle Massagen",
            },
            {
                title: "Eintauchen in die Atmosphäre des 19. Jahrhunderts",
                text: "Historische Residenzen mit Antiquitäten und authentischem Dekor aus dieser Epoche",
            },
        ]),
        slides: withTexts(en.mansion.slides, [
            {
                label: "Geschichte",
                image: {
                    ...en.mansion.slides[0].image,
                    alt: "Zeichnung der Fassade des ACADEMIA Shuvalov-Anwesens",
                },
                title: "Ein Herrenhaus mit Geschichte",
                paragraphs: [
                    "Das Herrenhaus, in dem sich heute das Hotel befindet, liegt in der Mokhova-Straße, die bereits zur Zeit der Gründung der Stadt an der Newa entstand. Ursprünglich lebten hier die „Khamovniki“ – Weber, die Segel für die Flotte herstellten.",
                    "Im Jahr 1854 erwarb Generalmajor und tatsächlicher Staatsrat Graf Andrej Pawlowitsch Shuvalov das Grundstück. In seinem Auftrag wurde das zweistöckige Gebäude zu einem dreistöckigen Herrenhaus mit einer repräsentativen Fassade und dem Familienwappen – drei Einhörnern, dem heraldischen Symbol des Geschlechts der Schuwalovs – umgebaut. Später, in den Jahren 1913–1914, gestaltete der Architekt Ivan Fomin die Innenräume des ersten Stockwerks für die Tochter des Grafen, Elizaveta Vorontsova-Dashkova.",
                    "Heute befindet sich in dem sorgfältig restaurierten Gebäude mit seinen wiederhergestellten Elementen des Kulturerbes das Hotel ACADEMIA „Shuvalov-Anwesen“. Die Villa erlebt eine neue Blütezeit und heißt ihre Gäste wieder herzlich willkommen.",
                ],
            },
            {
                label: "Lage",
                image: {
                    ...en.mansion.slides[1].image,
                    alt: "Fassade des Hotels ACADEMIA Shuvalov-Anwesen in der Mokhova-Straße",
                },
                title: "Nur einen Katzensprung vom Zentrum entfernt",
                paragraphs: [
                    "Das Herrenhaus befindet sich in der Mokhova-Straße, in unmittelbarer Nähe des Sommergartens, des Michailow-Schlosses und der Fontanka-Uferpromenade – in fußläufiger Entfernung zu den wichtigsten Sehenswürdigkeiten des Stadtzentrums.",
                ],
            },
        ]),
        prev: "Zurück",
        next: "Weiter",
    },
    rooms: {
        title: "Zimmerkategorien",
        categories: withTexts(en.rooms.categories, [
            {
                title: "Standard",
                text: "Klassisches Hotelzimmer mit einem Doppelbett mit orthopädischer Matratze und einem geräumigen Badezimmer mit Dusche",
            },
            {
                title: "Superior",
                text: "Zimmer der gehobenen Kategorie mit einem Doppelbett, einer Sitzecke und einem geräumigen Badezimmer mit Dusche",
            },
            {
                title: "Superior-Zimmer im Dachgeschoss",
                text: "Verbessertes Zimmer im Dachgeschoss mit einem Doppelbett, einer Sitzecke und einem geräumigen Badezimmer mit Dusche",
            },
            {
                title: "Junior-Suite",
                text: "Zimmer mit erhöhtem Komfort, separatem Schlafzimmer, Wohnzimmer zum Entspannen und geräumigem Badezimmer",
            },
            {
                title: "Junior-Suite im Dachgeschoss",
                text: "Zimmer mit gehobenem Komfort im Dachgeschoss mit separatem Schlafzimmer, Wohnzimmer zum Entspannen und geräumigem Badezimmer",
            },
            {
                title: "Zweizimmer-Suite",
                text: "Dreizimmer-Suite mit zwei separaten Schlafzimmern, Wohnzimmer und geräumigem Badezimmer",
            },
            {
                title: "Historische Suiten",
                // Сокращено по смыслу, как в EN: полный текст ТЗ не влезает
                // в карточку.
                text: "Historische Residenzen mit originaler Ausstattung und Antiquitäten aus dem späten 19. und frühen 20. Jahrhundert",
            },
        ]),
        book: "Jetzt buchen",
        prev: "Zurück",
        next: "Weiter",
    },
    offers: {
        title: "Sonderangebote",
        items: withTexts(en.offers.items, [
            {
                title: "Gutscheincode GENIUS",
                text: "Erhalten Sie einen Bonus bei Ihrer ersten Buchung auf der Website. Bestpreisgarantie",
            },
            {
                title: "Frühbucherrabatt",
                text: "Planen Sie Ihre Reise im Voraus – ab 3 Übernachtungen von September bis Dezember erhalten Sie einen Rabatt von 15 %",
            },
            {
                title: "Langzeitaufenthalt",
                text: "20 % Rabatt bei Buchungen ab 5 Übernachtungen",
            },
            {
                title: "Geburtstag",
                text: "Vorteile für Geburtstagskinder und 20 % Rabatt",
            },
        ]),
        book: "Jetzt buchen",
    },
    scenarios: {
        title: "Aufenthaltskonzepte im Anwesen",
        items: withTexts(en.scenarios.items, [
            {
                title: "Herbst im Grafenhaus",
                text: "Ein stimmungsvolles Konzept für einen aristokratischen Herbsturlaub",
            },
            {
                title: "St. Petersburg im Stil der Grafen",
                text: "Ein Urlaub im Zeichen prunkvoller aristokratischer Traditionen (von Mai bis September)",
            },
            {
                title: "Ihr freier Tag als Kunst",
                text: "Ein freier Tag als besondere Zeremonie im Geiste der Traditionen der Adelshäuser des 19. Jahrhunderts",
            },
        ]),
        book: "Jetzt buchen",
    },
    contacts: {
        title: "Kontakt",
        subtitle: "Reservierungsabteilung rund um die Uhr",
        address: "Mokhova-Straße 10, Sankt Petersburg",
        whatsapp: "Schreiben Sie uns auf WhatsApp",
        mapTitle: "ACADEMIA Shuvalov-Anwesen auf Google Maps",
        book: "Jetzt buchen",
    },
    booking: {
        metaTitle: "Zimmerbuchung — ACADEMIA Shuvalov-Anwesen",
        metaDescription:
            "Bestpreisgarantie bei der Zimmerbuchung im Hotel ACADEMIA Shuvalov-Anwesen auf der offiziellen Website",
        title: "Zimmerbuchung",
        line1: "Bei einer Buchung auf der offiziellen Website garantieren wir Ihnen die besten Konditionen.",
        line2: "Klicken Sie auf",
        line3: "um den automatischen Rabatt anzuwenden.",
    },
    footer: {
        home: "Nach oben",
        languages: "Sprachen",
        social: "Folgen Sie uns",
        socialText:
            "Erfahren Sie als Erste von Ankündigungen, Neuigkeiten und Sonderangeboten",
        legal: "Rechtliches",
        policy: "Datenschutzrichtlinie (auf Russisch)",
        legalInfo: "Rechtliche Hinweise (auf Russisch)",
        copyright: "© 2026 ACADEMIA BOUTIQUE HOTELS ®, Sankt Petersburg",
        company: en.footer.company,
    },
};
