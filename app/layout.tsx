import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "../src/app//components/Footer"
import Script from "next/script"
import type React from "react"
import CookieConsentBanner from "./components/CookieConsent"

const inter = Inter({ subsets: ["latin", "latin-ext"] })

export const metadata: Metadata = {
  title: "Darmowy generator QR – szybkie tworzenie kodów QR vCard",
  description: "Darmowy generator QR online. Twórz kody QR vCard i udostępniaj kontakty w kilka sekund. Bez rejestracji, działa w przeglądarce.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://qr.aitrain.pl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Darmowy generator QR – szybkie tworzenie kodów QR vCard",
    description: "Darmowy generator QR online. Twórz kody QR vCard i udostępniaj kontakty w kilka sekund. Bez rejestracji, działa w przeglądarce.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://qr.aitrain.pl",
    siteName: "Darmowy generator QR",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Darmowy generator QR",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darmowy generator QR – szybkie tworzenie kodów QR vCard",
    description: "Darmowy generator QR online. Twórz kody QR vCard i udostępniaj kontakty w kilka sekund. Bez rejestracji, działa w przeglądarce.",
    images: ["/logo.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <head>
        {/* 1. Domyślny stan Consent Mode - BARDZO WAŻNE: musi być pierwszy w <head> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'granted',
                'security_storage': 'granted',
                'personalization_storage': 'denied',
                'wait_for_update': 500
              });
            `
          }}
        />
        {/* Google Analytics - load explicitly or let GTM handle it if used. The prompt implies explicit GA loading is separate but here we only set default consent. The previous code had loadGtag. The prompt example just shows Script id="google-analytics". I will keep the GA loading if it was separate, but wait, the previous code had custom load logic inside the banner logic. I should probably restore a basic GA script if needed, or assume the user will handle it?
           The prompt says "Tu dopiero ładujemy GTM / GA4".
           The previous layout had: loadGtag('G-WGTZCF8H3Q') inside the logic. 
           So I should add the GA4 script tag here as well, respecting the consent mode.
        */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          src={'https://www.googletagmanager.com/gtag/js?id=G-WGTZCF8H3Q'}
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WGTZCF8H3Q');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <CookieConsentBanner />
        {children}
        <Footer />
      </body>
    </html>
  )
}

