import type { Metadata } from "next"

function normalizeUrl(value?: string) {
  if (!value) return null

  const trimmed = value.trim().replace(/\/+$/, "")
  if (!trimmed) return null

  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export const siteUrl = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) || "https://aplicgrafica.com.br"
const instagramUrl = "https://www.instagram.com/aplicgrafica/"

export const siteConfig = {
  name: "Aplic Gráfica",
  shortName: "Aplic Gráfica",
  url: siteUrl,
  title: "Gráfica rápida em Florianópolis | Aplic Gráfica",
  description:
    "Gráfica online com produção própria e entrega em toda Florianópolis. Cartões, panfletos, banners e adesivos. Peça seu orçamento pelo WhatsApp.",
  ogImage: "/opengraph-image",
  twitterImage: "/twitter-image",
  locale: "pt_BR",
  email: "comercialaplic@hotmail.com",
  phoneDisplay: "(48) 99912-8310",
  phoneE164: "+5548999128310",
  whatsappUrl: "https://wa.me/5548999128310",
  instagramUrl,
  foundedYear: "2011",
  // TODO: confirmar o link oficial do Perfil da Empresa no Google.
  sameAs: [instagramUrl],
  hours: {
    label: "Segunda a sexta, das 9h às 18h",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  location: {
    city: "Florianópolis",
    neighborhoods: ["Centro", "Trindade", "Santa Mônica", "Jurerê", "Canasvieiras", "Ingleses"],
  },
  onlineServiceNote: "Pedidos online pelo WhatsApp, com entrega. Sem atendimento presencial.",
} as const

export const serviceAreas = [
  { "@type": "City", name: siteConfig.location.city },
  ...siteConfig.location.neighborhoods.map((name) => ({
    "@type": "Place",
    name,
    containedInPlace: { "@type": "City", name: siteConfig.location.city },
  })),
]

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return siteConfig.url
  if (/^https?:\/\//i.test(path)) return path
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`
}

export const businessId = `${absoluteUrl("/")}#organization`

export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: siteConfig.phoneE164,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "pt-BR",
      telephone: siteConfig.phoneE164,
      url: siteConfig.whatsappUrl,
    },
    email: siteConfig.email,
    image: absoluteUrl("/images/thumbnail.png"),
    logo: absoluteUrl("/images/logo.png"),
    areaServed: serviceAreas,
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
        areaServed: serviceAreas,
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
