import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { domAnimation, LazyMotion } from "framer-motion";
import Script from "next/script";
import { Suspense } from "react";
import HtmlLangSync from "@/components/i18n/HtmlLangSync";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import TravelLineManager from "@/components/sections/TravelLineManager";
import StructuredData from "@/components/seo/StructuredData";
import { siteMetadataBase } from "@/lib/i18n/metadata";
import { buildSiteSchema } from "@/lib/seo/schema";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/seo/site";
import { SmoothScroll } from "../components/ui/SmoothScroll";

const alistair = localFont({
    src: "../public/fonts/Alistair-Signature.woff2",
    variable: "--font-alistair",
    display: "swap",
});

const historyPro = localFont({
    src: [
        {
            path: "../public/fonts/History-Pro.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/History-Pro-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-history",
    display: "swap",
});

const centuryGothic = localFont({
    src: [
        {
            path: "../public/fonts/CenturyGothic.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/CenturyGothic-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../public/fonts/CenturyGothic-Italic.woff2",
            weight: "400",
            style: "italic",
        },
    ],
    variable: "--font-century",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: siteMetadataBase,
    title: {
        default: SITE_NAME,
        template: "%s",
    },
    description:
        "Бутик-отель в бережно отреставрированном особняке XIX века в центре Санкт-Петербурга.",
    applicationName: SITE_NAME,
    manifest: "/manifest.webmanifest",
    formatDetection: {
        address: false,
        email: false,
        telephone: false,
    },
    category: "hotel",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "ru_RU",
        alternateLocale: ["en_US"],
        siteName: SITE_NAME,
        title: SITE_NAME,
        description:
            "Бутик-отель в бережно отреставрированном особняке XIX века в центре Санкт-Петербурга.",
        images: [
            {
                url: DEFAULT_OG_IMAGE,
                width: 1200,
                height: 630,
                alt: SITE_NAME,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_NAME,
        description:
            "Бутик-отель в бережно отреставрированном особняке XIX века в центре Санкт-Петербурга.",
        images: [DEFAULT_OG_IMAGE],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <head>
                <link rel="preconnect" href="https://academia.spb.ru" />
                <link rel="preconnect" href="https://static.academia.spb.ru" />
                <link rel="preconnect" href="https://mc.yandex.ru" />
                <link rel="preconnect" href="https://ru-ibe.tlintegration.ru" />
                <link rel="preconnect" href="https://ibe.tlintegration.ru" />
                <link rel="preconnect" href="https://ibe.tlintegration.com" />
            </head>
            <body
                className={`${alistair.variable} ${historyPro.variable} ${centuryGothic.variable} antialiased`}
            >
                <StructuredData data={buildSiteSchema("ru")} />
                <HtmlLangSync />
                <TravelLineManager />
                <Script
                    src="/scripts/travelline.js"
                    strategy="beforeInteractive"
                />
                <Script
                    src="/scripts/calltracking.js"
                    strategy="afterInteractive"
                />
                <Script src="/scripts/metrika.js" strategy="lazyOnload" />
                <SmoothScroll>
                    <LazyMotion features={domAnimation}>
                        <Suspense fallback={null}>
                            <Header />
                        </Suspense>
                        <Suspense fallback={null}>{children}</Suspense>
                        <Footer />
                    </LazyMotion>
                </SmoothScroll>
                <Script id="hotbot" strategy="lazyOnload">{`
  window.addEventListener('scroll', function() {
    if (window.hotbotLoaded) return;
    window.hotbotLoaded = true;
    var s = document.createElement('script');
    s.src = 'https://cdn.hotbot.ai/w/hb.js';
    s.onload = function() { HotBot.init({ appId: '66714551573a85001e63f919' }); };
    document.body.appendChild(s);
  }, { once: true, passive: true });
`}</Script>
            </body>
        </html>
    );
}
