import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { SmoothScroll } from "../components/ui/SmoothScroll";

const baskerville = localFont({
    src: "../public/fonts/BaskervilleCyr.woff2",
    variable: "--font-baskerville",
    display: "swap",
});

const alistair = localFont({
    src: "../public/fonts/Alistair-Signature.woff2",
    variable: "--font-alistair",
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body
                className={`${baskerville.variable} ${alistair.variable} antialiased`}
            >
                <Script
                    src="/scripts/travelline.js"
                    strategy="beforeInteractive"
                />
                <SmoothScroll>
                    <Header />
                    {children}
                    <Footer />
                </SmoothScroll>
                <Script id="hotbot" strategy="lazyOnload">{`
  var s = document.createElement('script');
  s.src = 'https://cdn.hotbot.ai/w/hb.js';
  s.onload = function() { HotBot.init({ appId: '66714551573a85001e63f919' }); };
  document.body.appendChild(s);
`}</Script>
            </body>
        </html>
    );
}
