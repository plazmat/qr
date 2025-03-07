import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

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
      <body className={inter.className}>
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