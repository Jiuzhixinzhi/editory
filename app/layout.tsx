import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './provider'
import Header from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Editory',
    template: '%s | Editory'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2D2E2F_1px,transparent_1px)] [background-size:20px_20px]`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
