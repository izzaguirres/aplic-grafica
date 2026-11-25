"use client"

import { useSyncExternalStore } from "react"
import { usePathname } from "next/navigation"
import { useAnalytics } from "@/hooks/use-analytics"
import { getAdVariant } from "@/lib/attribution"
import { siteConfig } from "@/lib/site"
import { buildWhatsAppUrl, getWhatsAppTrackingAttributes } from "@/lib/whatsapp-conversion"

const subscribeNoop = () => () => {}

export function BusinessWhatsAppLink() {
  const pathname = usePathname()
  const { trackWhatsAppClick } = useAnalytics()
  // A variante do anúncio só existe no navegador; o servidor (e a hidratação) usam a mensagem orgânica.
  const variant = useSyncExternalStore(subscribeNoop, getAdVariant, () => undefined)
  const whatsappUrl = buildWhatsAppUrl(undefined, undefined, pathname, variant)

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...getWhatsAppTrackingAttributes({ source: "business_details", pathname })}
      data-whatsapp-url={whatsappUrl}
      onClick={() => trackWhatsAppClick("business_details", undefined, whatsappUrl)}
    >
      WhatsApp {siteConfig.phoneDisplay}
    </a>
  )
}
