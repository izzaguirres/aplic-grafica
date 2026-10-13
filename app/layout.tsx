import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import Script from "next/script"
import "./globals.css"
import "./aplic-design-system.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { ScrollReveal } from "@/components/ScrollReveal"
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp"
import { GoogleTagManager } from "@/components/google-tag-manager"
import { AttributionCapture } from "@/components/AttributionCapture"
import { JsonLd } from "@/components/JsonLd"
import { absoluteUrl, createLocalBusinessSchema, siteConfig } from "@/lib/site"

const gtmContainerId = process.env.NEXT_PUBLIC_GTM_ID

const googleSans = localFont({
  src: "./fonts/GoogleSansFlex.ttf",
  variable: "--font-google-sans",
  weight: "100 1000",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "gráfica florianópolis",
    "gráfica rápida",
    "cartão de visita florianópolis",
    "banners florianópolis",
    "panfletos",
    "adesivos",
    "etiqueta adesiva florianópolis",
    "blocos receituários florianópolis",
    "comunicação visual",
    "impressão digital",
    "gráfica online florianópolis",
  ],
  authors: [{ name: siteConfig.name, url: absoluteUrl("/") }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: "Aplic Gráfica em Florianópolis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.twitterImage)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" suppressHydrationWarning data-mrkr-delivery={process.env.VERCEL_ENV === "production" ? "gtm" : undefined}>
      <body className={`${googleSans.variable} font-sans antialiased`}>
        <GoogleTagManager containerId={gtmContainerId} />
        <Script
          id="atlas-pixel"
          src="https://cdn-pixel.pixerun.com/pixel/site_821pr6lli54jv4/pixel.js"
          strategy="afterInteractive"
        />
        <AttributionCapture />
        <JsonLd data={createLocalBusinessSchema()} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollReveal />
          <Header />
          <main className="min-h-screen">{children}</main>
          <FloatingWhatsApp />
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
