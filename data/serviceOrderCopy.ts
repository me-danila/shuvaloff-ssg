import type { HtmlLang } from "@/lib/i18n/routing";

export const serviceOrderCopy = {
    ru: {
        title: "Заказать услугу",
        intro: "Пожалуйста, выберите удобный способ связи. Мы ответим и поможем с оформлением.",
        message: "Написать в ",
        call: "Позвонить",
        phone: "Круглосуточная консьерж‑служба",
        close: "Закрыть",
        note: "* Сервис WhatsApp принадлежит компании Meta Platforms Inc., признанной экстремистской организацией. Её деятельность запрещена в РФ.",
    },
    en: {
        title: "Order a service",
        intro: "Choose how to contact us. Our concierge will help you place your order.",
        message: "Message us on ",
        call: "Call us",
        phone: "24/7 concierge service",
        close: "Close",
        note: "* WhatsApp is owned by Meta Platforms Inc., which is designated an extremist organisation in Russia. Its activities are prohibited in Russia.",
    },
    de: {
        title: "Service bestellen",
        intro: "Wie möchten Sie uns kontaktieren? Unser Concierge hilft Ihnen bei der Bestellung.",
        message: "Nachricht über ",
        call: "Anrufen",
        phone: "Concierge-Service rund um die Uhr",
        close: "Schließen",
        note: "* WhatsApp gehört zu Meta Platforms Inc. Das Unternehmen ist in Russland als extremistische Organisation eingestuft. Seine Tätigkeit ist dort verboten.",
    },
    es: {
        title: "Solicitar un servicio",
        intro: "Elija cómo ponerse en contacto con nosotros. Nuestro equipo de conserjería le ayudará con su solicitud.",
        message: "Escribir por ",
        call: "Llamar",
        phone: "Servicio de conserjería las 24 horas",
        close: "Cerrar",
        note: "* WhatsApp pertenece a Meta Platforms Inc., declarada organización extremista en Rusia. Sus actividades están prohibidas en Rusia.",
    },
    fr: {
        title: "Réserver un service",
        intro: "Comment souhaitez-vous nous contacter ? Notre conciergerie vous aidera à réserver.",
        message: "Écrire sur ",
        call: "Appeler",
        phone: "Conciergerie 24 h/24",
        close: "Fermer",
        note: "* WhatsApp appartient à Meta Platforms Inc., reconnue comme organisation extrémiste en Russie. Ses activités y sont interdites.",
    },
    it: {
        title: "Richiedi un servizio",
        intro: "Scegli come contattarci. Il nostro concierge ti aiuterà a completare la richiesta.",
        message: "Scrivici su ",
        call: "Chiama",
        phone: "Servizio concierge 24 ore su 24",
        close: "Chiudi",
        note: "* WhatsApp appartiene a Meta Platforms Inc., riconosciuta come organizzazione estremista in Russia. Le sue attività sono vietate in Russia.",
    },
} satisfies Record<
    HtmlLang,
    Record<
        "title" | "intro" | "message" | "call" | "phone" | "close" | "note",
        string
    >
>;
