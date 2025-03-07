import Link from "next/link"

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 p-4 flex justify-between items-center text-sm text-gray-600 bg-white bg-opacity-90">
      <div className="ml-4">
        Wszystkie operacje wykonywane są wyłącznie w Twojej przeglądarce. Dane wprowadzone w formularzu nie są przesyłane ani przechowywane na żadnym serwerze.
      </div>
      <div>
        Created with{" "}
        <Link
          href="https://aitrain.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          AITRAIN
        </Link>
      </div>
    </footer>
  )
}

