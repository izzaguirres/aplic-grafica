"use client"

import { usePathname } from "next/navigation"
import { useAnalytics } from "@/hooks/use-analytics"
import { siteConfig } from "@/lib/site"
import { buildWhatsAppUrl, getWhatsAppTrackingAttributes } from "@/lib/whatsapp-conversion"

export function BusinessWhatsAppLink() {
  const pathname = usePathname()
  const { trackWhatsAppClick } = useAnalytics()
  const whatsappUrl = buildWhatsAppUrl(undefined, undefined, pathname)

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...getWhatsAppTrackingAttributes({ source: "business_details", pathname })}
      onClick={() => trackWhatsAppClick("business_details", undefined, whatsappUrl)}
    >
      WhatsApp {siteConfig.phoneDisplay}
    </a>
  )
}
