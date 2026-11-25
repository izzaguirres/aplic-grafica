"use client"

import { usePathname } from "next/navigation"
import { ArrowDown, ArrowUpRight, MessageCircle } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"
import { useWhatsAppConversion } from "@/hooks/use-whatsapp-conversion"
import {
  getWhatsAppTrackingAttributes,
  type WhatsAppConversionScope,
} from "@/lib/whatsapp-conversion"
import styles from "./nova-home-actions.module.css"

interface ProductRailButtonProps {
  label?: string
}

export function ProductRailButton({ label = "Ver produtos e preços" }: ProductRailButtonProps) {
  const { trackEvent } = useAnalytics()

  return (
    <button
      type="button"
      className={styles.railButton}
      onClick={() => {
        trackEvent("select_content", {
          content_type: "nova_home_section",
          content_id: "featured_products",
        })
        window.location.hash = "produtos"
      }}
    >
      {label}
      <ArrowDown aria-hidden="true" />
    </button>
  )
}

interface WhatsAppActionProps {
  label: string
  message: string
  source: string
  tone?: "light" | "lime"
  showLeadingIcon?: boolean
  product?: string
  scope?: WhatsAppConversionScope
  context?: string
}

export function WhatsAppAction({
  label,
  message,
  source,
  tone = "lime",
  showLeadingIcon = true,
  product,
  scope = "general_quote",
  context,
}: WhatsAppActionProps) {
  const pathname = usePathname()
  const { getWhatsAppLinkProps } = useWhatsAppConversion()
  const conversion = { message, source, product, scope, context, pathname }
  const linkProps = getWhatsAppLinkProps(message, source, product, { scope, context }, pathname)

  return (
    <a
      className={`${styles.whatsappAction} ${styles[tone]}`}
      {...getWhatsAppTrackingAttributes(conversion)}
      {...linkProps}
    >
      <span>
        {showLeadingIcon && <MessageCircle aria-hidden="true" />}
        {label}
      </span>
      <ArrowUpRight aria-hidden="true" />
    </a>
  )
}
