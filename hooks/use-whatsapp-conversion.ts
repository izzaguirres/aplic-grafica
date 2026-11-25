import type { MouseEvent } from 'react'
import { getAdVariant } from '@/lib/attribution'
import { useAnalytics } from './use-analytics'
import {
  buildWhatsAppUrl,
  type WhatsAppConversionDetails,
} from '@/lib/whatsapp-conversion'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export const useWhatsAppConversion = () => {
  const { trackWhatsAppClick } = useAnalytics()

  const handleWhatsAppClick = (
    message?: string,
    source: string = 'general',
    product?: string,
    details: WhatsAppConversionDetails = {},
  ) => {
    const whatsappUrl = buildWhatsAppUrl(message, product, window.location.pathname, getAdVariant())

    trackWhatsAppClick(source, product, whatsappUrl, details)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  /**
   * Props de um link real (`<a>`) para o WhatsApp. Funciona antes da hidratação
   * (href orgânico do servidor) e não depende de pop-up. No clique, troca o href
   * pela mensagem com a variante do anúncio e registra o `whatsapp_click`.
   */
  const getWhatsAppLinkProps = (
    message: string | undefined,
    source: string,
    product?: string,
    details: WhatsAppConversionDetails = {},
    pathname?: string,
  ) => ({
    href: buildWhatsAppUrl(message, product, pathname),
    target: '_blank',
    rel: 'noopener noreferrer',
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      const whatsappUrl = buildWhatsAppUrl(message, product, window.location.pathname, getAdVariant())
      event.currentTarget.href = whatsappUrl
      trackWhatsAppClick(source, product, whatsappUrl, details)
    },
  })

  return { buildWhatsAppUrl, handleWhatsAppClick, getWhatsAppLinkProps }
}
