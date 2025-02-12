import { Button } from "./Button"

interface QRCodePreviewProps {
  qrCodeData: { pngUrl: string; epsUrl: string; fileName: string } | null
}

export default function QRCodePreview({ qrCodeData }: QRCodePreviewProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
      <div className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
        {qrCodeData ? (
          <img src={qrCodeData.pngUrl || "/placeholder.svg"} alt="QR Code" className="w-full h-full object-contain" />
        ) : (
          <p className="text-gray-500">Podgląd Kodu QR</p>
        )}
      </div>
      <p className="mt-4 text-sm text-gray-600">Zeskanuj, aby zapisać moje dane kontaktowe</p>
      {qrCodeData && (
        <div className="mt-4 space-y-2">
          <Button
            onClick={() => {
              const link = document.createElement("a")
              link.href = qrCodeData.pngUrl
              link.download = `${qrCodeData.fileName}.png`
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
            className="w-full"
          >
            Pobierz Kod QR PNG
          </Button>
          <Button
            onClick={() => {
              alert("Funkcja eksportu do EPS jest obecnie niedostępna.")
            }}
            className="w-full"
          >
            Pobierz Kod QR EPS (Niedostępne)
          </Button>
        </div>
      )}
    </div>
  )
}

