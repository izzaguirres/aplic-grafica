import type { Metadata } from "next"

function normalizeUrl(value?: string) {
  if (!value) return null

  const trimmed = value.trim().replace(/\/+$/, "")
  if (!trimmed) return null

  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export const siteUrl = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) || "https://aplicgrafica.com.br"

// Preencher somente após confirmação. Não usar endereços de diretórios como fonte.
export const TODO_ENDERECO = null as { streetAddress: string; postalCode: string } | null

export const siteConfig = {
  name: "Aplic Gráfica",
  shortName: "Aplic Gráfica",
  url: siteUrl,
  title: "Gráfica rápida em Canasvieiras, Florianópolis | Aplic Gráfica",
  description:
    "Gráfica rápida em Canasvieiras, Florianópolis. Cartões de visita, panfletos, banners e adesivos. Peça pelo WhatsApp; entrega ou retirada combinada.",
  ogImage: "/opengraph-image",
  twitterImage: "/twitter-image",
  locale: "pt_BR",
  email: "comercialaplic@hotmail.com",
  phoneDisplay: "(48) 99912-8310",
  phoneE164: "+5548999128310",
  whatsappUrl: "https://wa.me/5548999128310",
  foundedYear: "2011",
  // TODO: confirmar perfis oficiais e seus links visíveis antes de usar sameAs.
  sameAs: [] as string[],
  hours: {
    label: "Segunda a sexta, das 9h às 18h",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  location: {
    neighborhood: "Canasvieiras",
    city: "Florianópolis",
    region: "SC",
    country: "BR",
    areaServed: "Florianópolis",
    serviceArea: ["Florianópolis", "São José", "Palhoça", "Biguaçu"],
    operationalOfficeNote:
      "Atendimento pelo WhatsApp; entrega ou retirada previamente combinada.",
    confirmedAddress: TODO_ENDERECO,
  },
} as const

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return siteConfig.url
  if (/^https?:\/\//i.test(path)) return path
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`
}

export const businessId = `${absoluteUrl("/")}#organization`

export function createLocalBusinessSchema() {
  const address = siteConfig.location.confirmedAddress
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    image: absoluteUrl("/images/thumbnail.png"),
    logo: absoluteUrl("/images/logo.png"),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
      ...(address ? { streetAddress: address.streetAddress, postalCode: address.postalCode } : {}),
    },
    areaServed: siteConfig.location.areaServed,
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: siteConfig.hours.days,
      opens: siteConfig.hours.opens,
      closes: siteConfig.hours.closes,
    }],
    ...(siteConfig.sameAs.length ? { sameAs: siteConfig.sameAs } : {}),
  }
}

export function createFaqSchema(path: string, faqs: Array<{ question: string; answer: string }>) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }
}

export function getYearsInBusiness() {
  return new Date().getFullYear() - parseInt(siteConfig.foundedYear, 10)
}

type PageMetadataOptions = {
  title: string
  description: string
  path?: string
  keywords?: string[]
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords,
}: PageMetadataOptions): Metadata {
  return {
    title: { absolute: title.endsWith(`| ${siteConfig.name}`) ? title : `${title} | ${siteConfig.name}` },
    description,
    keywords,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title,
      description,
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
      title,
      description,
      images: [absoluteUrl(siteConfig.twitterImage)],
    },
  }
}

type ServicePageSchemaOptions = {
  path: string
  name: string
  description: string
  serviceType: string
  faqs?: Array<{ question: string; answer: string }>
  relatedProducts?: Array<{ name: string; description: string; url?: string }>
}

export function createServicePageSchema({
  path,
  name,
  description,
  serviceType,
  faqs = [],
  relatedProducts = [],
}: ServicePageSchemaOptions) {
  const pageUrl = absoluteUrl(path)

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name,
        description,
        serviceType,
        provider: {
          "@id": businessId,
        },
        areaServed: siteConfig.location.serviceArea,
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: absoluteUrl("/contato"),
          availableLanguage: ["pt-BR"],
        },
        url: pageUrl,
        hasOfferCatalog:
          relatedProducts.length > 0
            ? {
                "@type": "OfferCatalog",
                name: "Produtos relacionados",
                itemListElement: relatedProducts.map((product) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: product.name,
                    description: product.description,
                    url: product.url ? absoluteUrl(product.url) : pageUrl,
                  },
                })),
              }
            : undefined,
      },
      ...(faqs.length > 0 ? [createFaqSchema(path, faqs)] : []),
    ],
  }
}
