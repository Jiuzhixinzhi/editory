import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from './providers'
import Header from './header'
import clsx from 'clsx'
import getSubdomain from '@/utils/routing'
import Footer from './footer'
import { generalFont } from '@/utils/fonts'
import { Analytics } from '@vercel/analytics/react'

const APP_NAME = 'Editory'
const APP_DEFAULT_TITLE = 'Editory'
const APP_TITLE_TEMPLATE = '%s | Editory'
const APP_DESCRIPTION = 'You handcraft exam papers, we handle the rest.'

export const metadata: Metadata = {
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={clsx(generalFont.className, !getSubdomain() && 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2D2E2F_1px,transparent_1px)] [background-size:20px_20px]')}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
