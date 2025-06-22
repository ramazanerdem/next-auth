import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './lib/auth/config'
import AuthSessionProvider from './components/auth/SessionProvider'
import './globals.css'
// import { getSession } from 'next-auth/react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Kayra Auth Sistemi',
  description: 'Next.js 15 + NextAuth.js v4 + Auth0 + JWT + TailwindCSS v4',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  // const session = await getSession()

  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
      </body>
    </html>
  )
}
