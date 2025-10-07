import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "../src/app//components/Footer"
import Script from "next/script"
import type React from "react"

const inter = Inter({ subsets: ["latin", "latin-ext"] })

export const metadata: Metadata = {
  title: "Darmowy generator QR – szybkie tworzenie kodów QR vCard",
  description: "Darmowy generator QR online. Twórz kody QR vCard i udostępniaj kontakty w kilka sekund. Bez rejestracji, działa w przeglądarce.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "/",
  },
  openGraph: {
    title: "Darmowy generator QR – szybkie tworzenie kodów QR vCard",
    description: "Darmowy generator QR online. Twórz kody QR vCard i udostępniaj kontakty w kilka sekund. Bez rejestracji, działa w przeglądarce.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "/",
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
        <Script id="consent-mode" strategy="beforeInteractive">
          {`
  // Consent Mode v2 – domyślnie odmowa (poza security)
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted'
  });

  // Pomocnicze: ładowanie gtag.js i inicjalizacja GA4
  function loadGtag(id) {
    if (!id) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    var init = document.createElement('script');
    init.innerHTML = "gtag('js', new Date()); gtag('config', '" + id + "');";
    document.head.appendChild(init);
  }

  // Jeśli wcześniej zaakceptowano – zaktualizuj zgody i doładuj GA
  (function() {
    try {
      var consent = localStorage.getItem('cookieConsent');
      if (consent === 'granted') {
        gtag('consent', 'update', {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          functionality_storage: 'granted',
          personalization_storage: 'granted',
          security_storage: 'granted'
        });
        loadGtag('G-WGTZCF8H3Q');
      }
    } catch (e) {}
  })();
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {/* Cookie Banner */}
        <div id="cookieBanner" style={{position:"fixed",left:0,right:0,bottom:0,zIndex:9999,background:"#0b1023",color:"#fff",padding:"16px",display:"none",boxShadow:"0 -4px 16px rgba(0,0,0,.2)"}}>
          <div style={{maxWidth:"1100px",margin:"0 auto",display:"flex",flexWrap:"wrap",alignItems:"center",gap:"12px"}}>
            <div style={{flex:1,minWidth:"240px",lineHeight:1.5}}>
              Używamy plików cookie do analityki i personalizacji zgodnie z Consent Mode v2.
              Możesz zaakceptować lub odrzucić wszystkie poza niezbędnymi do bezpieczeństwa.
            </div>
            <div style={{display:"flex",gap:"8px",whiteSpace:"nowrap"}}>
              <button id="cookieReject" style={{background:"#2b2f45",color:"#fff",border:0,padding:"10px 14px",cursor:"pointer"}}>Odrzuć</button>
              <button id="cookieAccept" style={{background:"#2ecc71",color:"#fff",border:0,padding:"10px 14px",cursor:"pointer"}}>Akceptuj</button>
            </div>
          </div>
        </div>
        <Script id="cookie-banner-logic" strategy="afterInteractive">
          {`
  (function() {
    function showBanner() {
      var banner = document.getElementById('cookieBanner');
      if (banner) banner.style.display = 'block';
    }
    function hideBanner() {
      var banner = document.getElementById('cookieBanner');
      if (banner) banner.style.display = 'none';
    }
    function loadGtag(id) {
      if (!id) return;
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
      document.head.appendChild(s);
      var init = document.createElement('script');
      init.innerHTML = "gtag('js', new Date()); gtag('config', '" + id + "');";
      document.head.appendChild(init);
    }
    function accept() {
      try { localStorage.setItem('cookieConsent', 'granted'); } catch(e) {}
      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          functionality_storage: 'granted',
          personalization_storage: 'granted',
          security_storage: 'granted'
        });
      }
      loadGtag('G-WGTZCF8H3Q');
      hideBanner();
    }
    function reject() {
      try { localStorage.setItem('cookieConsent', 'denied'); } catch(e) {}
      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          functionality_storage: 'denied',
          personalization_storage: 'denied',
          security_storage: 'granted'
        });
      }
      hideBanner();
    }
    function init() {
      var consent = null;
      try { consent = localStorage.getItem('cookieConsent'); } catch(e) {}
      if (!consent) { showBanner(); }
      var a = document.getElementById('cookieAccept');
      var r = document.getElementById('cookieReject');
      if (a) a.addEventListener('click', accept);
      if (r) r.addEventListener('click', reject);

      var openLink = document.getElementById('openCookieSettings');
      if (openLink) {
        openLink.addEventListener('click', function(ev) {
          ev.preventDefault();
          showBanner();
        });
      }
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else { init(); }
  })();
          `}
        </Script>
        {children}
        <Footer />
      </body>
    </html>
  )
}

