"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "./Button"
import QRCode from "qrcode"
import VCard from "vcard-creator"
import QRCodeSVG from "qrcode-svg"

interface BusinessCardFormProps {
  setQrCodeData: (data: { pngUrl: string; epsUrl: string; fileName: string } | null) => void
}

export default function BusinessCardForm({ setQrCodeData }: BusinessCardFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    position: "",
    email: "",
    phone: "",
    address: "",
    website: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Create vCard
    let formattedWebsite = formData.website
    if (formattedWebsite && !formattedWebsite.startsWith("http://") && !formattedWebsite.startsWith("https://")) {
      formattedWebsite = "https://" + formattedWebsite
    }

    const vCard = new VCard()
    vCard
      .addName(formData.lastName, formData.firstName)
      .addCompany(formData.company)
      .addRole(formData.position)
      .addEmail(formData.email)
      .addPhoneNumber(formData.phone)
      .addAddress("", "", formData.address, "", "", "", "")
      .addURL(formattedWebsite)

    const vCardString = vCard.toString()

    try {
      // Generate PNG QR code
      const pngDataUrl = await QRCode.toDataURL(vCardString, {
        errorCorrectionLevel: "M",
        type: "image/png",
        width: 900,
        margin: 4,
        color: {
          dark: "#000000FF",
          light: "#FFFFFFFF",
        },
      })

      // Generate SVG QR code
      const qrSvg = new QRCodeSVG({
        content: vCardString,
        width: 900,
        height: 900,
        padding: 4,
        color: "#000000",
        background: "#ffffff",
        ecl: "L",
      })

      // Convert SVG to EPS
      const svgString = qrSvg.svg()
      const epsContent = `%!PS-Adobe-3.0 EPSF-3.0
%%BoundingBox: 0 0 900 900
%%Creator: vCard QR Generator
%%EndComments
/m {moveto} def
/l {lineto} def
/h {closepath} def
/f {fill} def
${svgString
  .replace(/<\?xml.*?\?>/, "")
  .replace(/<svg.*?>/, "")
  .replace(/<\/svg>/, "")
  .replace(/<rect/g, "0 0 900 900 rectfill")
  .replace(/<path d="([^"]*)".*?\/>/g, (_, d) => {
    return (
      d
        .split(/(?=[MLZ])/)
        .map((cmd) => {
          const type = cmd[0]
          const coords = cmd
            .slice(1)
            .trim()
            .split(/[,\s]+/)
            .map(Number)
          switch (type) {
            case "M":
              return `${coords[0]} ${900 - coords[1]} m`
            case "L":
              return `${coords[0]} ${900 - coords[1]} l`
            case "Z":
              return "h f"
            default:
              return ""
          }
        })
        .join("\n") + "\n"
    )
  })}
showpage
%%EOF`

      const epsBlob = new Blob([epsContent], { type: "application/postscript" })
      const epsDataUrl = URL.createObjectURL(epsBlob)

      const fileName = `${formData.firstName}_${formData.lastName}_${formData.company}`.replace(/\s+/g, "_")
      setQrCodeData({ pngUrl: pngDataUrl, epsUrl: epsDataUrl, fileName })
    } catch (err) {
      console.error("Error generating QR code:", err)
      setQrCodeData(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Imię
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Jan"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Nazwisko
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Kowalski"
            required
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Firma
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Firma XYZ"
          />
        </div>
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Stanowisko
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Specjalista ds. Marketingu"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="jan@przyklad.pl"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="+48 123 456 789"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Adres firmy
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="ul. Przykładowa 123, 00-000 Warszawa"
          />
        </div>
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            Strona www
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="www.przyklad.pl"
          />
        </div>
      </div>
      <div className="mt-6">
        <Button type="submit">Generuj Kod QR</Button>
      </div>
    </form>
  )
}

