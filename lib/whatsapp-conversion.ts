import { type AdVariant } from "@/lib/attribution"
import { siteConfig } from "@/lib/site"

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

// Frases por anúncio do Google Ads. `full` vai nos botões gerais; `opener` abre as mensagens
// que já têm conteúdo próprio (produto, quantidade, preço), que é mantido.
const adPhrases: Record<AdVariant, { full: string; opener: string }> = {
  A: { full: "Oi! Vi vocês no Google e queria um orçamento.", opener: "Oi! Vi vocês no Google." },
  B: { full: "Olá! Achei a Aplic no Google, queria fazer um orçamento.", opener: "Olá! Achei a Aplic no Google." },
}

const leadingGreeting = /^(ol[áa]|oi)\s*[!,.]?\s*/i

function withoutGreeting(message: string) {
  const body = message.replace(leadingGreeting, "").trim()
  return body.charAt(0).toUpperCase() + body.slice(1)
}

export function buildWhatsAppText(message?: string, product?: string, pathname?: string, variant?: AdVariant) {
  const custom = message?.trim()
  const { origin } = resolveWhatsAppContext(product, pathname)

  if (variant) {
    const phrase = adPhrases[variant]
    return custom ? `${phrase.opener} ${withoutGreeting(custom)}` : phrase.full
  }

  return custom
    ? `Olá! Vim pelo site (${origin}). ${withoutGreeting(custom)}`
    : `Olá! Vim pelo site (${origin}) e quero um orçamento.`
}

export function buildWhatsAppUrl(message?: string, product?: string, pathname?: string, variant?: AdVariant) {
  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(buildWhatsAppText(message, product, pathname, variant))}`
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
