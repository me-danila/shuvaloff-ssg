import { en } from "./en";
import { withTexts } from "./localize";
import type { LandingDictionary } from "./types";

// Тексты блоков — из ТЗ («ТЗ сайт Шувалова. Иностранцы»); подписи
// интерфейса, контакты и футер — перевод по EN-версии.
export const es: LandingDictionary = {
    locale: "es",
    draft: false,
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
        nav: withTexts(en.ui.nav, [
            { label: "Habitaciones" },
            { label: "Historia" },
            { label: "Ofertas" },
        ]),
    },
    hero: {
        title: "ACADEMIA Mansión Shuvalov",
        subtitle:
            "Sumérgete en el siglo XIX y conoce a la familia de los condes",
    },
    services: {
        title: "De qué nos encargamos",
        items: withTexts(en.services.items, [
            {
                title: "Asistencia para la tramitación de visados",
                text: "Te ayudaremos con la invitación y la documentación necesaria para tramitar el visado",
            },
            {
                title: "Pago con tarjeta",
                text: "Pago con tarjetas de cualquier país, sin restricciones bancarias",
            },
            {
                title: "Traslado",
                text: "Te recogeremos en el aeropuerto y te organizaremos un vehículo para llevarte a cualquier punto de la ciudad",
            },
            {
                title: "Conserje digital 24/7",
                text: "Déjanos a nosotros la organización de tu tiempo libre. Te ayudaremos a reservar mesa en un restaurante, concertar una sesión de masaje, comprar entradas para el teatro u organizar una excursión exclusiva",
            },
            {
                title: "Recibe un regalo",
                text: "Reserva una habitación en nuestra web y te enviaremos una guía con los lugares secretos de San Petersburgo",
            },
        ]),
    },
    mansion: {
        title: "Una mansión histórica en el centro de la ciudad",
        tiles: withTexts(en.mansion.tiles, [
            {
                title: "Desayunos de la nobleza",
                text: "Una mañana en un entorno del siglo XIX con un desayuno clásico de San Petersburgo",
            },
            {
                title: "Restaurante",
                text: "Cocina de autor en restaurante ACADEMIA Shuvalov",
            },
            {
                title: "ACADEMIA Masaje y Spa",
                text: "Estudio de recuperación y masaje profesional",
            },
            {
                title: "Una inmersión en la atmósfera del siglo XIX",
                text: "Residencias históricas con objetos de antigüedades y decoración auténtica de la época",
            },
        ]),
        slides: withTexts(en.mansion.slides, [
            {
                label: "Historia",
                image: {
                    ...en.mansion.slides[0].image,
                    alt: "Dibujo de la fachada de la Mansión Shuvalov ACADEMIA",
                },
                title: "Una mansión con historia",
                paragraphs: [
                    "La mansión en la que actualmente se encuentra el hotel está situada en la calle Mokhovaya, que ya existía en la época de la fundación de la ciudad a orillas del río Neva. En un principio, aquí vivían los «khamovniki», unos tejedores que confeccionaban velas para la flota.",
                    "En 1854, el terreno fue adquirido por el general de división y consejero de Estado titular, el conde Andréi Pávlovich Shuvalov. Por encargo suyo, el edificio de dos plantas se reformó para convertirlo en una mansión de tres plantas con una fachada principal y el escudo familiar: tres unicornios, símbolo heráldico de la familia Shuvalov. Más tarde, entre 1913 y 1914, el arquitecto Iván Fomin diseñó los interiores de la primera planta para la hija del conde, Elizaveta Vorontsova-Dashkova.",
                    "En la actualidad, el edificio, cuidadosamente restaurado y con sus elementos de patrimonio cultural recuperados, alberga el hotel ACADEMIA Mansión Shuvalov. La mansión ha cobrado nueva vida y vuelve a recibir a sus huéspedes con los brazos abiertos.",
                ],
            },
            {
                label: "Ubicación",
                image: {
                    ...en.mansion.slides[1].image,
                    alt: "Fachada del hotel ACADEMIA Mansión Shuvalov en la calle Mokhovaya",
                },
                title: "A un paso de lo más importante",
                paragraphs: [
                    "La mansión se encuentra en la calle Mokhovaya, junto al Jardín de Verano, el Castillo de Mijáilovsk y el paseo de la Fontanka, a poca distancia a pie de los principales lugares de interés del centro de la ciudad.",
                ],
            },
        ]),
        prev: "Anterior",
        next: "Siguiente",
    },
    rooms: {
        title: "Categorías de habitaciones",
        categories: withTexts(en.rooms.categories, [
            {
                title: "Estándar",
                text: "Habitación clásica de hotel con cama de matrimonio con colchón ortopédico y un amplio cuarto de baño con ducha",
            },
            {
                title: "Superior",
                text: "Habitación superior con cama de matrimonio, zona de descanso y un amplio cuarto de baño con ducha",
            },
            {
                title: "Superior abuhardillada",
                text: "Habitación mejorada en el ático con cama de matrimonio, zona de descanso y un amplio cuarto de baño con ducha",
            },
            {
                title: "Junior Suite",
                text: "Habitación de mayor confort con dormitorio independiente, salón para descansar y un amplio cuarto de baño",
            },
            {
                title: "Junior Suite en el ático",
                text: "Habitación de mayor confort en el ático con dormitorio independiente, salón para relajarse y un amplio cuarto de baño",
            },
            {
                title: "Suite de dos habitaciones",
                text: "Habitación de tres habitaciones con dos dormitorios independientes, salón y un amplio cuarto de baño",
            },
            {
                title: "Suites históricas",
                // Сокращено по смыслу, как в EN: полный текст ТЗ не влезает
                // в карточку.
                text: "Residencias históricas con decoración original y antigüedades de finales del siglo XIX y principios del XX",
            },
        ]),
        book: "Reservar ahora",
        prev: "Anterior",
        next: "Siguiente",
    },
    offers: {
        title: "Ofertas especiales",
        items: withTexts(en.offers.items, [
            {
                title: "Código promocional GENIUS",
                text: "Consigue un bono con tu primera reserva en la web. Garantía del mejor precio",
            },
            {
                title: "Reserva anticipada",
                text: "Planifica tu viaje con antelación: a partir de 3 noches, de septiembre a diciembre, descuento del 15 %",
            },
            {
                title: "Estancias prolongadas",
                text: "20 % de descuento en reservas de 5 noches o más",
            },
            {
                title: "Cumpleaños",
                text: "Ventajas para los que cumplen años y un 20 % de descuento",
            },
        ]),
        book: "Reservar ahora",
    },
    scenarios: {
        title: "Experiencias en la mansión",
        items: withTexts(en.scenarios.items, [
            {
                title: "Otoño condal",
                text: "Un evocador escenario de descanso aristocrático otoñal",
            },
            {
                title: "San Petersburgo condal",
                text: "Una estancia al estilo de las fastuosas tradiciones aristocráticas (de mayo a septiembre)",
            },
            {
                title: "Tu día libre como una obra de arte",
                text: "Un día libre como una ceremonia especial al estilo de las tradiciones de las casas nobiliarias del siglo XIX",
            },
        ]),
        book: "Reservar ahora",
    },
    contacts: {
        title: "Contacto",
        subtitle: "Departamento de reservas 24/7",
        address: "Calle Mokhovaya, 10, San Petersburgo",
        whatsapp: "Escríbenos por WhatsApp",
        mapTitle: "ACADEMIA Mansión Shuvalov en Google Maps",
        book: "Reservar ahora",
    },
    booking: {
        metaTitle: "Reserva de habitaciones — ACADEMIA Mansión Shuvalov",
        metaDescription:
            "Garantía del mejor precio al reservar habitaciones en el hotel ACADEMIA Mansión Shuvalov en la web oficial",
        title: "Reserva de habitaciones",
        line1: "Te garantizamos las mejores condiciones al reservar en la web oficial.",
        line2: "Haz clic en",
        line3: "para aplicar el descuento automático.",
    },
    footer: {
        home: "Volver arriba",
        languages: "Idiomas",
        social: "Síguenos",
        socialText:
            "Sé el primero en conocer nuestros anuncios, novedades y ofertas especiales",
        legal: "Aviso legal",
        policy: "Política de tratamiento de datos personales (en ruso)",
        legalInfo: "Información legal (en ruso)",
        copyright: "© 2026 ACADEMIA BOUTIQUE HOTELS ®, San Petersburgo",
        company: en.footer.company,
    },
};
