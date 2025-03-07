"use client"

import { useState } from "react"
import QRCode from "qrcode"

interface BusinessCardFormProps {
  setQrCodeData: (data: { url: string; fileName: string } | null) => void
}

interface ContactData {
  name: string
  surname: string
  company: string
  position: string
  phone: string
  email: string
  website: string
}

export default function BusinessCardForm({ setQrCodeData }: BusinessCardFormProps) {
  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    surname: "",
    company: "",
    position: "",
    phone: "",
    email: "",
    website: ""
  })
  const [pngUrl, setPngUrl] = useState<string | null>(null)

  const generateVCardData = (data: ContactData): string => {
    const websiteWithPrefix = data.website ? `https://${data.website}` : ''
    
    return `BEGIN:VCARD
VERSION:3.0
N:${data.surname};${data.name}
FN:${data.name} ${data.surname}
ORG:${data.company}
TITLE:${data.position}
TEL:${data.phone}
EMAIL:${data.email}
URL:${websiteWithPrefix}
END:VCARD`
  }

  const generateFileName = (data: ContactData): string => {
    const fileName = `${data.name}_${data.surname}${data.company ? '_' + data.company : ''}`
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '')
    return `${fileName}.png`
  }

  const generateQRCodePNG = async (content: string) => {
    try {
      const dataUrl = await QRCode.toDataURL(content, { type: "image/png", width: 1024 })
      const fileName = generateFileName(contactData)
      setQrCodeData({ url: dataUrl, fileName })
      setPngUrl(dataUrl)
    } catch (error) {
      console.error("Błąd generowania QR Code:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const vCardData = generateVCardData(contactData)
    await generateQRCodePNG(vCardData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === 'website') {
      const cleanValue = value.replace(/^(https?:\/\/)/, '')
      setContactData(prev => ({
        ...prev,
        [name]: cleanValue
      }))
    } else {
      setContactData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <div className="business-card-form p-6 border rounded-lg shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Twoja Wizytówka QR</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block">
            <span className="text-gray-700 font-medium">Imię:</span>
            <input
              type="text"
              name="name"
              value={contactData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-medium">Nazwisko:</span>
            <input
              type="text"
              name="surname"
              value={contactData.surname}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-medium">Firma:</span>
            <input
              type="text"
              name="company"
              value={contactData.company}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-medium">Stanowisko:</span>
            <input
              type="text"
              name="position"
              value={contactData.position}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-medium">Telefon:</span>
            <input
              type="tel"
              name="phone"
              value={contactData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-medium">Email:</span>
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-medium">Strona WWW:</span>
            <input
              type="text"
              name="website"
              value={contactData.website}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="nazwa_strony.pl"
            />
          </label>
        </div>
        
        <div className="flex justify-center mt-8">
          <button 
            type="submit" 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 font-medium"
          >
            Generuj Wizytówkę QR
          </button>
        </div>
      </form>
    </div>
  )
}

