import type { LandingDictionary } from "./types";

export const en: LandingDictionary = {
    locale: "en",
    draft: true,
    meta: {
        title: "ACADEMIA Mansion Shuvaloff — Boutique hotel in Saint Petersburg",
        description:
            "Boutique hotel in a carefully restored 19th-century mansion in the centre of Saint Petersburg.",
    },
    ui: {
        skipLink: "Skip to main content",
        languageSwitcherLabel: "Language",
        navLabel: "Main",
        book: "Book",
        bookNow: "Book now",
        menuLabel: "Menu",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        nav: [
            { label: "Rooms", href: "#rooms" },
            { label: "History", href: "#history" },
            { label: "Offers", href: "#offers" },
        ],
    },
    hero: {
        title: "ACADEMIA Mansion Shuvaloff",
        subtitle:
            "Immerse yourself in the 19th century and meet the family of the Counts",
    },
    services: {
        title: "What we take care of",
        items: [
            {
                icon: "visa",
                title: "Visa support",
                text: "We can help with the invitation letter and the documents required to apply for a visa",
            },
            {
                icon: "card",
                title: "Card payments",
                text: "We accept cards from any country, no matter your bank",
            },
            {
                icon: "transfer",
                title: "Transfer",
                text: "We’ll meet you at the airport and arrange a car to take you anywhere in the city",
            },
            {
                icon: "concierge",
                title: "24/7 Online Concierge",
                text: "Let us take care of organising your leisure activities. We can help you book a restaurant, arrange a massage, buy theatre tickets or organise an exclusive tour",
            },
            {
                icon: "gift",
                title: "Get a free gift",
                text: "Book a room on our website and we’ll send you a guide to St Petersburg’s hidden gems",
            },
        ],
    },
};
