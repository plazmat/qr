import { Button } from "./Button"

interface QRCodePreviewProps {
  qrCodeData: { url: string; fileName: string } | null
}

export default function QRCodePreview({ qrCodeData }: QRCodePreviewProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
      <div className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
        {qrCodeData ? (
          // eslint-disable-next-line @next/next/no-img-element -- podgląd to data URL generowany lokalnie, next/image nie ma tu zastosowania
          <img src={qrCodeData.url} alt="QR Code" className="w-full h-full object-contain" />
        ) : (
          <p className="text-gray-500">Podgląd Kodu QR</p>
        )}
      </div>
      
      {qrCodeData && (
        <div className="mt-4 space-y-2">
          <Button
            onClick={() => {
              const link = document.createElement("a")
              link.href = qrCodeData.url
              link.download = qrCodeData.fileName
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
            className="w-full"
          >
            Pobierz QR w formacie PNG
          </Button>
        </div>
      )}
    </div>
  )
}

