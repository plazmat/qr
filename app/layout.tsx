import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "../src/app//components/Footer"
import type React from "react"

const inter = Inter({ subsets: ["latin", "latin-ext"] })

export const metadata: Metadata = {
  title: "Naprawdę darmowy generator kodów QR",
  description: "Wygeneruj kod QR vCard dla swojej wizytówki",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}

