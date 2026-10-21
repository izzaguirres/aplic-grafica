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
    const whatsappUrl = buildWhatsAppUrl(message, product, window.location.pathname)

    trackWhatsAppClick(source, product, whatsappUrl, details)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return { buildWhatsAppUrl, handleWhatsAppClick }
}
