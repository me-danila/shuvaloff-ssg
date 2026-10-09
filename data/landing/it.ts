import { en } from "./en";
import { withTexts } from "./localize";
import type { LandingDictionary } from "./types";

// Тексты блоков — из ТЗ («ТЗ сайт Шувалова. Иностранцы»); подписи
// интерфейса, контакты и футер — перевод по EN-версии.
export const it: LandingDictionary = {
    locale: "it",
    draft: false,
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
        bookNow: "Prenota ora",
        menuLabel: "Menu",
        openMenu: "Apri il menu",
        closeMenu: "Chiudi il menu",
        nav: withTexts(en.ui.nav, [
            { label: "Camere" },
            { label: "Storia" },
            { label: "Offerte" },
        ]),
    },
    hero: {
        title: "ACADEMIA Palazzo Shuvaloff",
        subtitle:
            "Immergetevi nel XIX secolo e incontrate la famiglia dei conti",
    },
    services: {
        title: "Di cosa ci occupiamo",
        items: withTexts(en.services.items, [
            {
                title: "Assistenza per il visto",
                text: "Ti aiuteremo con l'invito e i documenti necessari per ottenere il visto",
            },
            {
                title: "Pagamento con carta",
                text: "Pagamento con carte di qualsiasi paese, senza limitazioni relative alla banca",
            },
            {
                title: "Trasferimento",
                text: "Vi verremo a prendere all'aeroporto e vi organizzeremo un'auto per raggiungere qualsiasi punto della città",
            },
            {
                title: "Concierge digitale 24 ore su 24, 7 giorni su 7",
                text: "Affidateci l'organizzazione del vostro tempo libero. Vi aiuteremo a prenotare un ristorante, a fissare un appuntamento per un massaggio, ad acquistare biglietti per il teatro e a organizzare un'escursione esclusiva",
            },
            {
                title: "Ricevi un regalo",
                text: "Prenota una camera sul nostro sito e ti invieremo una guida ai luoghi segreti di San Pietroburgo",
            },
        ]),
    },
    mansion: {
        title: "Una dimora storica nel centro della città",
        tiles: withTexts(en.mansion.tiles, [
            {
                title: "Colazioni da conte",
                text: "Una mattinata negli interni del XIX secolo con una classica colazione san-pietroburghese",
            },
            {
                title: "Ristorante",
                text: "Cucina d'autore al ristorante ACADEMIA Shuvaloff",
            },
            {
                title: "ACADEMIA SPA",
                text: "Centro di recupero e massaggi professionali",
            },
            {
                title: "Un tuffo nell'atmosfera del XIX secolo",
                text: "Residenze storiche con oggetti d'antiquariato e arredi autentici dell'epoca",
            },
        ]),
        slides: withTexts(en.mansion.slides, [
            {
                label: "Storia",
                image: {
                    ...en.mansion.slides[0].image,
                    alt: "Disegno della facciata del Palazzo Shuvaloff ACADEMIA",
                },
                title: "Una dimora storica",
                paragraphs: [
                    "La dimora che oggi ospita l’hotel si trova in via Mokhovaya, una strada che risale ai tempi della fondazione della città sulla Neva. In origine qui vivevano i «khamovniki», tessitori che realizzavano le vele per la flotta.",
                    "Nel 1854 il terreno fu acquistato dal generale di divisione e consigliere di Stato effettivo conte Andrei Pavlovich Shuvaloff. Su sua richiesta, l’edificio a due piani fu trasformato in una dimora a tre piani con una facciata di rappresentanza e lo stemma di famiglia: tre unicorni, simbolo araldico della casata degli Shuvaloff. Successivamente, negli anni 1913–1914, gli interni del primo piano furono allestiti dall’architetto Ivan Fomin per la figlia del conte, Elisabetta Vorontsova-Dashkova.",
                    "Oggi, nell’edificio accuratamente restaurato, con gli elementi del patrimonio culturale riportati al loro antico splendore, ha sede l'hotel ACADEMIA Palazzo Shuvaloff. La dimora rivive una nuova vita e accoglie nuovamente con calore i propri ospiti.",
                ],
            },
            {
                label: "Posizione",
                image: {
                    ...en.mansion.slides[1].image,
                    alt: "Facciata dell’hotel ACADEMIA Palazzo Shuvaloff in via Mokhovaya",
                },
                title: "A due passi dal centro",
                paragraphs: [
                    "La villa si trova in via Mokhovaya, vicino al Giardino d’Estate, al Castello di Mikhailovsky e sulle rive della Fontanka, a pochi passi dalle principali attrazioni del centro città.",
                ],
            },
        ]),
        prev: "Precedente",
        next: "Successivo",
    },
    rooms: {
        title: "Categorie di camere",
        // Названия категорий — как на EN (не переводим), только описания.
        categories: withTexts(en.rooms.categories, [
            {
                text: "Camera d'albergo classica con letto matrimoniale dotato di materasso ortopedico e ampio bagno con doccia",
            },
            {
                text: "Camera superior con letto matrimoniale, zona relax e ampio bagno con doccia",
            },
            {
                text: "Camera mansarda di categoria superiore con letto matrimoniale, zona relax e ampio bagno con doccia",
            },
            {
                text: "Camera di categoria superiore con camera da letto separata, salottino e ampio bagno",
            },
            {
                text: "Camera di categoria superiore situata nella mansarda, con camera da letto separata, salotto e ampio bagno",
            },
            {
                text: "Camera a tre stanze con due camere da letto separate, salotto e ampio bagno",
            },
            {
                // Сокращено по смыслу, как в EN: полный текст ТЗ не влезает
                // в карточку.
                text: "Residenze storiche con finiture originali e oggetti d’antiquariato della fine del XIX e dell’inizio del XX secolo",
            },
        ]),
        book: "Prenota ora",
        prev: "Precedente",
        next: "Successivo",
    },
    offers: {
        title: "Offerte speciali",
        items: withTexts(en.offers.items, [
            {
                title: "Codice promozionale GENIUS",
                text: "Ricevi un bonus alla prima prenotazione sul sito. Garanzia del miglior prezzo",
            },
            {
                title: "Prenotazione anticipata",
                text: "Organizza il tuo viaggio in anticipo: a partire da 3 notti, da settembre a dicembre, sconto dal 15%",
            },
            {
                title: "Soggiorni prolungati",
                text: "Sconto del 20% per prenotazioni a partire da 5 notti",
            },
            {
                title: "Compleanno",
                text: "Privilegi per chi festeggia il compleanno e sconto del 20%",
            },
        ]),
        book: "Prenota ora",
    },
    scenarios: {
        title: "Idee per un soggiorno nella dimora storica",
        items: withTexts(en.scenarios.items, [
            {
                title: "Autunno da conte",
                text: "Un'atmosfera suggestiva per una vacanza autunnale all'insegna dell'aristocrazia",
            },
            {
                title: "San Pietroburgo aristocratica",
                text: "Una vacanza all’insegna delle sfarzose tradizioni aristocratiche (da maggio a settembre)",
            },
            {
                title: "Il vostro giorno libero come un’opera d’arte",
                text: "Il giorno libero come una cerimonia speciale nello spirito delle tradizioni delle dimore nobiliari del XIX secolo",
            },
        ]),
        book: "Prenota ora",
    },
    contacts: {
        title: "Contatti",
        subtitle: "Ufficio prenotazioni 24/7",
        address: "Via Mokhovaya 10, San Pietroburgo",
        whatsapp: "Scrivici su WhatsApp",
        mapTitle: "ACADEMIA Palazzo Shuvaloff sulla mappa",
        book: "Prenota ora",
    },
    booking: {
        metaTitle: "Prenotazione camere — ACADEMIA Palazzo Shuvaloff",
        metaDescription:
            "Garanzia del miglior prezzo prenotando le camere dell’hotel ACADEMIA Palazzo Shuvaloff sul sito ufficiale",
        title: "Prenotazione camere",
        line1: "Prenotando sul sito ufficiale ti garantiamo le condizioni migliori.",
        line2: "Clicca su",
        line3: "per applicare lo sconto automatico.",
    },
    footer: {
        home: "Torna su",
        languages: "Lingue",
        social: "Seguici",
        socialText: "Scopri per primo annunci, novità e offerte speciali",
        legal: "Note legali",
        policy: "Informativa sul trattamento dei dati personali (in russo)",
        legalInfo: "Informazioni legali (in russo)",
        copyright: "© 2026 ACADEMIA BOUTIQUE HOTELS ®, San Pietroburgo",
        company: en.footer.company,
    },
};
