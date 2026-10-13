import type { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { catalogFaqs } from "@/lib/catalog-faqs"
import ProdutosPageClient from "./ProdutosPageClient"
import { productsData } from "@/lib/products-data"
import { absoluteUrl, businessId, createFaqSchema, createPageMetadata, siteConfig } from "@/lib/site"

export const metadata: Metadata = createPageMetadata({
  title: "Produtos gráficos em Florianópolis: catálogo e preços",
  description:
    "Produtos gráficos em Florianópolis: banners a partir de R$90, cartões, panfletos e adesivos. Compare formatos e quantidades e peça pelo WhatsApp.",
  path: "/produtos",
  keywords: [
    "produtos gráficos florianópolis",
    "catálogo gráfica florianópolis",
    "preço cartão de visita florianópolis",
    "panfletos banners adesivos florianópolis",
  ],
})

const productsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    createFaqSchema("/produtos", catalogFaqs),
    {
      "@type": "BreadcrumbList",
      "@id": `${absoluteUrl("/produtos")}#breadcrumb`,
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
          name: "Produtos",
          item: absoluteUrl("/produtos"),
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl("/produtos")}#catalogo`,
      name: "Catálogo de produtos gráficos da Aplic Gráfica",
      description:
        "Catálogo de materiais gráficos, impressão digital e comunicação visual da Aplic Gráfica em Florianópolis.",
      itemListElement: productsData.map((product, index) => {
        const productUrl = absoluteUrl(product.landingPage ?? "/produtos")

        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            "@id": `${productUrl}#${product.id}`,
            name: product.name,
            description: product.description,
            url: productUrl,
            provider: {
              "@id": businessId,
              name: siteConfig.name,
            },
            areaServed: siteConfig.location.areaServed,
          },
        }
      }),
    },
  ],
}

export default function ProdutosPage() {
  return (
    <>
      <JsonLd data={productsSchema} />
      <ProdutosPageClient />
    </>
  )
}
