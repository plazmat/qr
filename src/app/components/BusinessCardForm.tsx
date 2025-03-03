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
      const dataUrl = await QRCode.toDataURL(content, { type: "image/png", width: 256 })
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
    <div className="business-card-form p-4 border rounded-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            Imię:
            <input
              type="text"
              name="name"
              value={contactData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </label>
          <label className="block">
            Nazwisko:
            <input
              type="text"
              name="surname"
              value={contactData.surname}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </label>
          <label className="block">
            Firma:
            <input
              type="text"
              name="company"
              value={contactData.company}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </label>
          <label className="block">
            Stanowisko:
            <input
              type="text"
              name="position"
              value={contactData.position}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </label>
          <label className="block">
            Telefon:
            <input
              type="tel"
              name="phone"
              value={contactData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </label>
          <label className="block">
            Email:
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </label>
          <label className="block">
            Strona WWW:
            <input
              type="text"
              name="website"
              value={contactData.website}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded p-2"
              placeholder="example.com"
            />
          </label>
        </div>
        
        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Generuj Wizytówkę QR
          </button>
        </div>
      </form>
    </div>
  )
}

