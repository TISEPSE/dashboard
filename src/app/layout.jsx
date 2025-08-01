"use client"
import { useState } from "react"
import { SessionProvider } from "next-auth/react"
import Navbar from "./components/navbar"
import PageTransition from "./components/PageTransition"
import { CryptoProvider } from "./context/CryptoContext"
import { FavoritesProvider } from "./context/FavoritesContext"
import ErrorBoundary from "./components/ErrorBoundary"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
// import { SpeedInsights } from "@vercel/speed-insights/next"
// import "./utils/suppressDevErrors" // Désactivé temporairement

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <html data-theme="dark" lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ErrorBoundary>
          <SessionProvider>
            <FavoritesProvider>
              <CryptoProvider>
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                <main
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "md:ml-64" : "md:ml-16"
                  } pb-20 md:pb-0`}
                >
                  <PageTransition>
                    {children}
                  </PageTransition>
                </main>
              </CryptoProvider>
            </FavoritesProvider>
          </SessionProvider>
        </ErrorBoundary>
        {/* <SpeedInsights /> */}
      </body>
    </html>
  )
}