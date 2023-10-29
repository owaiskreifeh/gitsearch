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
      <head>
        <title>Gitsearch</title>
        <meta name="description" content="GitSearch is a simple web application that allows users to search for GitHub users and view their repositories." />
        <meta name="keywords" content="GitHub, Git, search, repository, user, web application" />
        <meta name="author" content="Owais Kreifeh" />

      </head>
      <storeContext.Provider value={store}>
        <body className={inter.className}>{children}</body>
      </storeContext.Provider>
    </html>
  )
}
