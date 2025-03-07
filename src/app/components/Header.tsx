import Image from "next/image"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center mb-3 md:mb-0 md:mr-4">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={256}
              height={128}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">Naprawdę darmowy Generator QR</h1>
            <p className="text-gray-600">Stwórz swoją cyfrową wizytówkę w kilka sekund</p>
          </div>
        </div>
      </div>
    </header>
  )
}

