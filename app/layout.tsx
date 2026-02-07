import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Punto Medio - Todas las perspectivas, un solo lugar',
  description: 'Punto Medio te muestra las noticias desde múltiples narrativas para que formes tu propia opinión.',
}

export const viewport: Viewport = {
  themeColor: '#FFFBEA',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
