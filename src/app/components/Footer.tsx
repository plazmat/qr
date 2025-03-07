import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full p-4 mt-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 border-t border-gray-200 bg-white">
      <div className="mb-3 md:mb-0 text-center md:text-left md:w-2/3">
        Wszystkie operacje wykonywane są wyłącznie w Twojej przeglądarce. Dane wprowadzone w formularzu nie są przesyłane ani przechowywane na żadnym serwerze.
      </div>
      <div className="text-center md:text-right">
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

