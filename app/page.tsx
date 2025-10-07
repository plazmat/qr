"use client"

import { useState } from "react"
import Header from "../src/app/components/Header"
import BusinessCardForm from "../src/app/components/BusinessCardForm"
import QRCodePreview from "../src/app/components/QRCodePreview"
import Script from "next/script"

export default function Home() {
  const [qrCodeData, setQrCodeData] = useState<{ url: string; fileName: string } | null>(null)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Intro SEO */}
        <section className="mb-10">
          <p className="text-lg text-gray-800">
            Nasz <strong>darmowy generator QR</strong> pozwala w kilka sekund stworzyć czytelny kod QR vCard
            z danymi kontaktowymi. Skonfiguruj, wygeneruj i pobierz plik PNG, aby dodać kod do wizytówki,
            stopki e‑mail lub materiałów firmowych.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BusinessCardForm setQrCodeData={setQrCodeData} />
          <QRCodePreview qrCodeData={qrCodeData} />
        </div>

        {/* Jak to działa */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Jak działa darmowy generator QR</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-800">
            <li>Wpisz dane wizytówki (imię, nazwisko, telefon, e‑mail, opcjonalnie firma i WWW).</li>
            <li>Kliknij „Generuj kod QR” – aplikacja lokalnie tworzy vCard i obraz PNG kodu.</li>
            <li>Pobierz obraz PNG i użyj go w wizytówce, stopce e‑mail lub materiałach promocyjnych.</li>
          </ol>
        </section>

        {/* Zastosowania */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Zastosowania kodów QR</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li>Wizytówki i identyfikatory na wydarzenia.</li>
            <li>Stopki e‑mail i materiały firmowe.</li>
            <li>Ulotki, plakaty, stoiska targowe.</li>
            <li>Etykiety produktów i opakowania.</li>
          </ul>
        </section>

        {/* Linkowanie wewnętrzne */}
        <section className="mt-12">
          <p className="text-gray-800">
            Poznaj nasz <a href="/" className="underline hover:no-underline">darmowy generator QR</a> i
            szybko twórz czytelne kody QR do wizytówek oraz materiałów firmowych.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ – najczęstsze pytania</h2>
          <div className="space-y-4 text-gray-800">
            <div>
              <h3 className="font-semibold">Czy generator jest naprawdę darmowy?</h3>
              <p>Tak. Narzędzie jest bezpłatne i działa bez rejestracji.</p>
            </div>
            <div>
              <h3 className="font-semibold">Czy moje dane są wysyłane na serwer?</h3>
              <p>Nie. Wszystko przetwarzane jest lokalnie w Twojej przeglądarce.</p>
            </div>
            <div>
              <h3 className="font-semibold">Jakie formaty obsługujecie?</h3>
              <p>Obecnie vCard. Wkrótce dodamy wsparcie dla URL, Wi‑Fi, SMS.</p>
            </div>
            <div>
              <h3 className="font-semibold">Czy mogę edytować dane po wygenerowaniu?</h3>
              <p>Tak, możesz dowolnie poprawić formularz i wygenerować nowy kod.</p>
            </div>
          </div>
        </section>
      </main>
      {/* JSON-LD: HowTo + FAQ */}
      <Script id="ld-howto-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "HowTo",
              "name": "Jak używać darmowego generatora QR",
              "description": "Prosty sposób na stworzenie kodu QR vCard i pobranie obrazu PNG.",
              "step": [
                { "@type": "HowToStep", "name": "Wpisz dane wizytówki" },
                { "@type": "HowToStep", "name": "Kliknij Generuj kod QR" },
                { "@type": "HowToStep", "name": "Pobierz obraz PNG" }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Czy generator jest naprawdę darmowy?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Tak. Narzędzie jest bezpłatne i działa bez rejestracji." }
                },
                {
                  "@type": "Question",
                  "name": "Czy moje dane są wysyłane na serwer?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Nie. Wszystko przetwarzane jest lokalnie w przeglądarce." }
                },
                {
                  "@type": "Question",
                  "name": "Jakie formaty obsługujecie?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Obecnie vCard. Wkrótce dodamy URL, Wi‑Fi i SMS." }
                },
                {
                  "@type": "Question",
                  "name": "Czy mogę edytować dane po wygenerowaniu?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Tak, popraw formularz i wygeneruj nowy kod." }
                }
              ]
            }
          ]
        })}
      </Script>
    </div>
  )
}

