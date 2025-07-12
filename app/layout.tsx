import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Warkop Smart',
  description: 'Smart Point of Sale System for Coffee Shop',
  generator: 'Warkop Smart POS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
