import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Informacje o przetwarzaniu danych i plikach cookie.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Polityka prywatności</h1>
      <p className="mb-6">
        <Link href="/" className="underline hover:no-underline">← Wróć na stronę główną</Link>
      </p>
      <p className="mb-3">
        Szanujemy Twoją prywatność. Ta strona wyjaśnia, jak korzystamy z plików cookie i innych
        technologii w celu analityki oraz personalizacji, zgodnie z Consent Mode v2.
      </p>
      <p className="mb-3">
        Domyślnie pliki cookie (poza niezbędnymi do bezpieczeństwa) są wyłączone. W każdej chwili
        możesz zmienić swoją decyzję dotyczącą zgód, otwierając ustawienia cookies.
      </p>
      <p className="mb-6">
        <a href="#" id="openCookieSettingsInline" className="underline hover:no-underline">
          Ustawienia cookies
        </a>
      </p>

      <h2 className="text-xl font-semibold mb-2">Dane przetwarzane lokalnie</h2>
      <p className="mb-3">
        Aplikacja działa w Twojej przeglądarce. Wprowadzane dane nie są wysyłane na serwer i
        pozostają lokalnie po Twojej stronie.
      </p>

      <h2 className="text-xl font-semibold mb-2">Analityka</h2>
      <p className="mb-3">
        Po wyrażeniu zgody włączamy Google Analytics 4, aby lepiej rozumieć korzystanie z serwisu i
        móc go ulepszać. Do tego czasu skrypt analityczny nie jest ładowany.
      </p>

      <Script id="open-cookie-settings-inline" strategy="afterInteractive">
        {`
  (function(){
    var link = document.getElementById('openCookieSettingsInline');
    if (link) {
      link.addEventListener('click', function(e){
        e.preventDefault();
        var opener = document.getElementById('openCookieSettings');
        if (opener) opener.click();
        else {
          var banner = document.getElementById('cookieBanner');
          if (banner) banner.style.display = 'block';
        }
      });
    }
  })();
        `}
      </Script>
    </main>
  )
}


