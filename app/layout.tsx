import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "../src/app/components/Footer"
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
        {/* gtag.js jest doładowywany dopiero po zgodzie na analitykę – zob. app/utils/cookieConsentConfig.ts */}
      </head>
      <body className={inter.className}>
        <CookieConsentBanner />
        {children}
        <Footer />
      </body>
    </html>
  )
}

