import type { Metadata } from "next";
import NovaHomePage from "./nova-home/page";
import { productsData } from "@/lib/products-data";
import { absoluteUrl, businessId, createPageMetadata, siteConfig } from "@/lib/site";

const homeTitle = siteConfig.title;
const homeDescription = siteConfig.description;

const featuredProducts = productsData
  .filter((product) => product.isFeatured)
  .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      url: absoluteUrl("/"),
      name: siteConfig.name,
      description: homeDescription,
      inLanguage: "pt-BR",
      publisher: { "@id": businessId },
    },
    {
      "@type": "Service",
      "@id": `${absoluteUrl("/")}#service`,
      name: "Impressão gráfica rápida e comunicação visual em Florianópolis",
      serviceType: "Serviços gráficos e impressão digital",
      provider: { "@id": businessId },
      areaServed: siteConfig.location.areaServed,
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: absoluteUrl("/contato"),
        availableLanguage: ["pt-BR"],
      },
    },
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl("/")}#featured-products`,
      name: "Produtos em destaque",
      itemListElement: featuredProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(product.landingPage ?? "/produtos"),
        name: product.name,
        description: product.description,
      })),
    },
  ],
};

export const metadata: Metadata = createPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
  keywords: [
    "gráfica rápida florianópolis",
    "gráfica em florianópolis",
    "cartão de visita florianópolis",
    "panfletos florianópolis",
    "banners florianópolis",
    "adesivos florianópolis",
    "comunicação visual florianópolis",
  ],
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <NovaHomePage />
    </>
  );
}
