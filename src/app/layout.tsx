'use client'
import { Inter } from 'next/font/google'
import { storeContext, store } from '@/lib/stores'

import './globals.css'
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <storeContext.Provider value={store}>
        <body className={inter.className}>{children}</body>
      </storeContext.Provider>
    </html>
  )
}
