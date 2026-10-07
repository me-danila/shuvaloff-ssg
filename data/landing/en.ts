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
    mansion: {
        title: "A historic mansion in the city centre",
        slides: [
            {
                label: "History",
                image: {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/img250-1.png",
                    alt: "Drawing of the ACADEMIA Shuvalov Mansion façade",
                },
                title: "A mansion steeped in history",
                paragraphs: [
                    "The mansion that now houses the hotel is situated on Mokhovaya Street, which dates back to the time when the city on the Neva was first founded. Originally, the area was home to ‘khamovniki’—weavers who made sails for the fleet.",
                    "In 1854, the plot was purchased by Major-General and Actual State Councillor Count Andrei Pavlovich Shuvalov. On his instructions, the two-storey building was converted into a three-storey mansion with a grand façade and the family coat of arms — three unicorns, the heraldic symbol of the Shuvalov family. Later, in 1913–1914, the interiors of the second floor were designed by the architect Ivan Fomin for the Count’s daughter, Elizaveta Vorontsova-Dashkova.",
                    "Today, the carefully restored building, with its lovingly preserved heritage details, is home to the ACADEMIA Shuvalov Mansion Hotel. The mansion has been given a new lease of life and once again warmly welcomes guests.",
                ],
            },
            {
                label: "Location",
                image: {
                    src: "https://academia.spb.ru/wp-content/uploads/2025/09/fasad.avif",
                    alt: "Façade of the ACADEMIA Shuvalov Mansion Hotel on Mokhovaya Street",
                },
                title: "A stone’s throw from the city centre",
                paragraphs: [
                    "The mansion is situated on Mokhovaya Street, next to the Summer Garden, Mikhailovsky Castle and the Fontanka embankment — within walking distance of the city centre’s main attractions.",
                ],
            },
        ],
        prev: "Previous",
        next: "Next",
    },
    rooms: {
        title: "Room categories",
        categories: [
            {
                rooms: ["standard"],
                title: "Standard",
                text: "A classic hotel room with a double bed featuring an orthopaedic mattress and a spacious bathroom with a shower",
            },
            {
                rooms: ["superior"],
                title: "Superior",
                text: "An upgraded room with a double bed, a seating area and a spacious bathroom with a shower",
            },
            {
                rooms: ["superior-mansarda"],
                title: "Superior Attic Room",
                text: "An upgraded attic room with a double bed, a seating area and a spacious bathroom with a shower",
            },
            {
                rooms: ["junior-suite"],
                title: "Junior Suite",
                text: "A superior room featuring a separate bedroom, a lounge area and a spacious bathroom",
            },
            {
                rooms: ["junior-suite-mansarda"],
                title: "Attic Junior Suite",
                text: "A superior room in the attic with a separate bedroom, a lounge area and a spacious bathroom",
            },
            {
                rooms: ["suite"],
                title: "Two-Room Suite",
                text: "A three-room suite with two separate bedrooms, a living room and a spacious bathroom",
            },
            {
                rooms: ["dashkova", "shuvalov"],
                title: "Historic Suites",
                text: "Heritage residences with original décor and antiques from the late 19th and early 20th centuries",
            },
        ],
        book: "Book now",
        prev: "Previous",
        next: "Next",
    },
};
