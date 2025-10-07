import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Naprawdę darmowy generator kodów QR",
  description: "Generator kodów QR dla wizytówek i innych zastosowań",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
        <header className="p-4 border-b">
          <div className="container mx-auto">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-10 object-contain mr-3"
              />
              <h1 className="text-xl font-bold text-gray-800">Naprawdę darmowy generator kodów QR</h1>
            </div>
          </div>
        </header>
        <main className="container mx-auto py-6 px-4">
          {children}
        </main>
      </body>
    </html>
  )
} 