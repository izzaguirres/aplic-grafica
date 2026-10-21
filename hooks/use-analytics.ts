import { getConversionAttribution } from "@/lib/attribution"
import { resolveWhatsAppContext, type WhatsAppConversionDetails } from "@/lib/whatsapp-conversion"

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

const push = (payload: Record<string, unknown>) => {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(payload)

  if (process.env.NODE_ENV === 'development') {
    const root = document.documentElement
    const eventCount = Number(root.dataset.analyticsEventCount ?? '0') + 1
    root.dataset.analyticsEventCount = String(eventCount)
    root.dataset.analyticsLastEvent = JSON.stringify(payload)
  }
}

export const useAnalytics = () => {
  const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
    push({ event: eventName, ...parameters })
  }

  const trackPageView = (url: string) => {
    push({ event: 'page_view', page_path: url })
  }

  const trackWhatsAppClick = (
    source: string,
    product?: string,
    whatsappUrl?: string,
    details: WhatsAppConversionDetails = {},
  ) => {
    const attribution = getConversionAttribution()
    const pathname = typeof window !== 'undefined' ? window.location.pathname : undefined
    const context = resolveWhatsAppContext(product, pathname)

    push({
      event: 'whatsapp_click',
      event_category: 'engagement',
      event_label: source,
      conversion_source: source,
      conversion_scope: details.scope ?? 'general_quote',
      conversion_context: details.context ?? null,
      product: context.product,
      product_id: details.productId ?? null,
      product_variant: details.variant ?? null,
      product_quantity: details.quantity ?? null,
      product_price: details.price ?? null,
      product_currency: typeof details.price === 'number' ? 'BRL' : null,
      whatsapp_url: whatsappUrl,
      page_location: typeof window !== 'undefined' ? window.location.href : undefined,
      page_path: pathname,
      page_title: typeof document !== 'undefined' ? document.title : undefined,
      ...attribution,
    })
  }

  const trackProductView = (productName: string) => {
    push({
      event: 'view_item',
      event_category: 'ecommerce',
      event_label: productName,
      value: 1,
    })
  }

  const trackContactForm = (formType: string) => {
    push({
      event: 'form_submit',
      event_category: 'engagement',
      event_label: formType,
      value: 1,
    })
  }

  return {
    trackEvent,
    trackPageView,
    trackWhatsAppClick,
    trackProductView,
    trackContactForm,
  }
}
