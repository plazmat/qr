import type { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Informacje o przetwarzaniu danych i plikach cookie.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Polityka prywatności</h1>
      <p className="text-sm text-gray-600 mb-2">Data aktualizacji: 05.01.2026</p>
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
        <button type="button" data-cc="show-preferencesModal" className="underline hover:no-underline bg-transparent border-0 p-0 text-indigo-600 cursor-pointer">
          Ustawienia cookies
        </button>
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
    </main>
  )
}


