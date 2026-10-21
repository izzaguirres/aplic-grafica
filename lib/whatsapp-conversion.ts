import { siteConfig } from "@/lib/site"

export const defaultWhatsAppMessage =
  "Olá, vim do site da Aplic Gráfica e quero um orçamento."

export type WhatsAppConversionScope =
  | "general_quote"
  | "product_family"
  | "catalog_product"
  | "custom_order"
  | "artwork_submission"
  | "order_support"

export interface WhatsAppConversionDetails {
  scope?: WhatsAppConversionScope
  context?: string
  productId?: string
  variant?: string
  quantity?: string
  price?: number
}

export interface WhatsAppConversionInput extends WhatsAppConversionDetails {
  message?: string
  source: string
  product?: string
  pathname?: string
}

const productByPath: Record<string, string> = {
  "/cartao-de-visita": "Cartão de visita",
  "/panfleto": "Panfletos e folders",
  "/etiquetas-adesivas": "Etiquetas adesivas",
  "/banner": "Banner",
  "/pasta-com-bolso": "Pasta com bolso",
  "/blocos-receituario": "Blocos e receituários",
  "/cracha": "Crachá",
}

const pageByPath: Record<string, string> = {
  "/": "Home",
  "/nova-home": "Home",
  "/produtos": "Catálogo",
  "/contato": "Contato",
  "/sobre": "Sobre a Aplic",
  "/grafica-em-floripa": "Gráfica em Floripa",
}

export function resolveWhatsAppContext(product?: string, pathname?: string) {
  const path = pathname?.split(/[?#]/)[0].replace(/\/+$/, "") || "/"
  const selectedProduct = product?.trim() || productByPath[path]

  return {
    product: selectedProduct || "Orçamento geral",
    origin: selectedProduct || (pathname ? pageByPath[path] : undefined) || "Site",
  }
}

export function buildWhatsAppUrl(message?: string, product?: string, pathname?: string) {
  const text = message?.trim() || defaultWhatsAppMessage
  const { origin } = resolveWhatsAppContext(product, pathname)
  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(`Vim pelo site – ${origin}.\n\n${text}`)}`
}

export function getWhatsAppTrackingAttributes({
  message,
  source,
  product,
  pathname,
  scope = "general_quote",
  context,
  productId,
  variant,
  quantity,
  price,
}: WhatsAppConversionInput) {
  return {
    "data-whatsapp-cta": "true",
    "data-whatsapp-url": buildWhatsAppUrl(message, product, pathname),
    "data-conversion-source": source,
    "data-conversion-scope": scope,
    ...(context ? { "data-conversion-context": context } : {}),
    ...(product ? { "data-product-name": product } : {}),
    ...(productId ? { "data-product-id": productId } : {}),
    ...(variant ? { "data-product-variant": variant } : {}),
    ...(quantity ? { "data-product-quantity": quantity } : {}),
    ...(typeof price === "number"
      ? { "data-product-price": price.toFixed(2) }
      : {}),
  }
}
