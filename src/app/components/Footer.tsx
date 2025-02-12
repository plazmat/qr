import Link from "next/link"

export default function Footer() {
  return (
    <footer className="fixed bottom-0 right-0 p-4 text-sm text-gray-600">
      Created with{" "}
      <Link
        href="https://aitrain.pl"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        AITRAIN
      </Link>
    </footer>
  )
}

