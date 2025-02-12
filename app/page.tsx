"use client"

import { useState } from "react"
import Header from "../src/app/components/Header"
import BusinessCardForm from "../src/app/components/BusinessCardForm"
import QRCodePreview from "../src/app/components/QRCodePreview"

export default function Home() {
  const [qrCodeData, setQrCodeData] = useState<{ url: string; fileName: string } | null>(null)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BusinessCardForm setQrCodeData={setQrCodeData} />
          <QRCodePreview qrCodeData={qrCodeData} />
        </div>
      </main>
    </div>
  )
}

