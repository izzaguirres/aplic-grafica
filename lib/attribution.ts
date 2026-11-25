const attributionStorageKey = "aplic_first_touch_attribution_v1"

const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "msclkid",
  // Variante do anúncio do Google Ads (?a=A / ?a=B), usada para a frase do WhatsApp.
  "a",
] as const

type AttributionKey = (typeof attributionKeys)[number]

export type ConversionAttribution = Partial<Record<AttributionKey, string>> & {
  landing_page?: string
  landing_path?: string
  referrer?: string
}

function readCurrentAttribution(): ConversionAttribution {
  if (typeof window === "undefined") return {}

  const parameters = new URLSearchParams(window.location.search)
  const attribution: ConversionAttribution = {}

  for (const key of attributionKeys) {
    const value = parameters.get(key)?.trim()
    if (value) attribution[key] = value
  }

  return attribution
}

function readStoredAttribution(): ConversionAttribution {
  if (typeof window === "undefined") return {}

  try {
    const stored = window.sessionStorage.getItem(attributionStorageKey)
    if (!stored) return {}
    return JSON.parse(stored) as ConversionAttribution
  } catch {
    return {}
  }
}

export function captureConversionAttribution() {
  if (typeof window === "undefined") return {}

  const stored = readStoredAttribution()
  const current = readCurrentAttribution()
  const attribution: ConversionAttribution = {
    ...current,
    ...stored,
    landing_page: stored.landing_page ?? window.location.href,
    landing_path: stored.landing_path ?? window.location.pathname,
    referrer: stored.referrer ?? (document.referrer || undefined),
  }

  try {
    window.sessionStorage.setItem(
      attributionStorageKey,
      JSON.stringify(attribution),
    )
  } catch {}

  return attribution
}

export function getConversionAttribution() {
  return captureConversionAttribution()
}

export type AdVariant = "A" | "B"

export function normalizeAdVariant(value?: string | null): AdVariant | undefined {
  const normalized = value?.trim().toUpperCase()
  return normalized === "A" || normalized === "B" ? normalized : undefined
}

// Lê a variante sem gravar nada: primeiro o primeiro toque da sessão, depois a URL atual.
export function getAdVariant(): AdVariant | undefined {
  if (typeof window === "undefined") return undefined
  return normalizeAdVariant(readStoredAttribution().a ?? readCurrentAttribution().a)
}
