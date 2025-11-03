import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { DataProvider } from "@/lib/data-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MobileMetrics Analytics - Simulador de Descargas",
  description: "Sistema de modelado predictivo para descargas de aplicaciones móviles usando mínimos cuadrados",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  )
}
