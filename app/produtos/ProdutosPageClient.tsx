"use client"

import { catalogFaqs } from "@/lib/catalog-faqs"
import { FaqAccordion } from "@/components/nova-home/FaqAccordion"
import { ProductLinks } from "@/components/site/ProductLinks"
import { useMemo, useState } from "react"
import { ArrowUpRight, PackageSearch, Search, X } from "lucide-react"
import { EditorialReveal } from "@/components/site/EditorialReveal"
import { ProductCard } from "@/components/site/ProductCard"
import { useWhatsAppConversion } from "@/hooks/use-whatsapp-conversion"
import { productCampaignMedia } from "@/lib/product-campaign-media"
import { productsData } from "@/lib/products-data"
import { getWhatsAppTrackingAttributes } from "@/lib/whatsapp-conversion"
import styles from "./produtos.module.css"

const catalogSections = [
  {
    id: "cartoes-de-visita",
    label: "Cartões de visita",
    productIds: [
      "cartao-brilho-frente",
      "cartao-fosco-localizado",
      "cartao-mini-brilho",
    ],
  },
  {
    id: "panfletos-e-folders",
    label: "Panfletos e impressos",
    productIds: [
      "panfleto-a6",
      "panfleto-a5",
      "folder-2-dobras",
      "filipeta-10x20",
      "marca-pagina",
    ],
  },
  {
    id: "adesivos-e-embalagens",
    label: "Adesivos e embalagens",
    productIds: ["etiqueta-adesiva", "tag-furo-9x5"],
  },
  {
    id: "comunicacao-visual",
    label: "Comunicação visual",
    productIds: ["banner-lona", "cavalete-madeira", "cavalete-ferro"],
  },
  {
    id: "materiais-para-empresas",
    label: "Materiais para empresas",
    productIds: ["cracha-empresarial", "pasta-bolso", "nao-perturbe"],
  },
]

const catalogCardCopy: Record<
  string,
  { displayName?: string; description: string }
> = {
  "cartao-brilho-frente": {
    description: "9x5cm · Couchê 300g · Laminação verniz brilho total.",
  },
  "cartao-fosco-localizado": {
    displayName: "Cartão com Verniz",
    description: "9x5cm · Couchê 300g · Fosco com verniz localizado.",
  },
  "cartao-mini-brilho": {
    description: "4x5cm · Couchê 250g · Laminação brilho.",
  },
  "panfleto-a6": {
    description: "10x14cm · Couchê 90g · Frente e verso.",
  },
  "panfleto-a5": {
    description: "15x21cm · Couchê 90g · Frente e verso.",
  },
  "folder-2-dobras": {
    description: "A4 aberto · Couchê 90g · Frente e verso, duas dobras.",
  },
  "filipeta-10x20": {
    description: "10x20cm · Couchê 300g · Frente e verso.",
  },
  "marca-pagina": {
    description: "5x18cm · Couchê 300g · Frente e verso.",
  },
  "etiqueta-adesiva": {
    description: "Até 10x10cm · Impressão digital para rótulos e embalagens.",
  },
  "tag-furo-9x5": {
    description: "9x5cm · Couchê 300g · Furo para cordão.",
  },
  "banner-lona": {
    description: "Lona fosca · Impressão digital · Acabamento sob medida.",
  },
  "cavalete-madeira": {
    description: "50x100cm · PVC adesivado · Estrutura em madeira.",
  },
  "cavalete-ferro": {
    description: "50x100cm · PVC adesivado · Estrutura em ferro.",
  },
  "pasta-bolso": {
    description: "A4 · Supremo 300g · Capa colorida e bolso interno.",
  },
  "nao-perturbe": {
    displayName: "Aviso de Porta",
    description: "5x18cm · Couchê 300g · Gancho para maçaneta.",
  },
}

const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()

export default function ProdutosPageClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const { handleWhatsAppClick } = useWhatsAppConversion()

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeSearch(searchQuery)

    return productsData.filter((product) => {
      const searchableText = normalizeSearch(
        `${product.name} ${product.description} ${product.category ?? ""}`,
      )
      const matchesSearch = searchableText.includes(normalizedQuery)
      return matchesSearch
    })
  }, [searchQuery])

  const visibleSections = useMemo(
    () =>
      catalogSections
        .map((section) => ({
          ...section,
          products: section.productIds
            .map((productId) =>
              filteredProducts.find((product) => product.id === productId),
            )
            .filter((product): product is (typeof productsData)[number] => Boolean(product)),
        }))
        .filter((section) => section.products.length > 0),
    [filteredProducts],
  )

  const clearFilters = () => {
    setSearchQuery("")
  }

  const hasActiveFilter = searchQuery !== ""
  const customProjectMessage =
    "Olá! Preciso de um orçamento personalizado. Vou enviar a referência, as medidas e a quantidade."
  const customProjectConversion = {
    message: customProjectMessage,
    source: "catalog_custom_project",
    scope: "custom_order" as const,
    context: "catalog_special_format",
  }

  return (
    <div
      data-aplic-page
      data-aplic-shell
      data-motion-ready="true"
      className={styles.page}
    >
      <noscript>
        <style>{`
          [data-aplic-page] [data-aplic-reveal] {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
          }
        `}</style>
      </noscript>
      <EditorialReveal />

      <section className={styles.hero} aria-labelledby="catalog-title">
        <div className={styles.heroHeading}>
          <p className={styles.eyebrow} data-aplic-reveal="text">
            Catálogo de produtos
          </p>
          <h1 id="catalog-title">
            <span data-aplic-reveal="text" data-reveal-order="1">
              Produtos gráficos{" "}
            </span>
            <span data-aplic-reveal="text" data-reveal-order="2">
              em Florianópolis
            </span>
          </h1>
          <p
            className={styles.heroLead}
            data-aplic-reveal="text"
            data-reveal-order="3"
          >
            Escolha seu impresso. Veja o preço na hora. Selecione o produto e a quantidade para seguir com o orçamento no WhatsApp.
          </p>
          <p className={styles.localContext} data-aplic-reveal="text" data-reveal-order="3">
            Produção em Canasvieiras, com entrega ou retirada combinada em Florianópolis.
          </p>
        </div>

        <div
          className={styles.filterPanel}
          data-aplic-reveal="text"
          data-reveal-order="4"
        >
          <div className={styles.searchField}>
            <Search aria-hidden="true" />
            <input
              type="search"
              placeholder="Buscar cartão, banner, adesivo..."
              aria-label="Buscar produtos"
              value={searchQuery}
              onChange={(event) => {
                setHasSearched(true)
                setSearchQuery(event.target.value)
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Limpar busca"
                className={styles.clearSearch}
              >
                <X aria-hidden="true" />
              </button>
            )}
          </div>

          <div
            className={styles.categories}
            aria-label="Navegar pelas categorias"
          >
            {visibleSections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.label}
              </a>
            ))}
          </div>

          <div className={styles.resultSummary} aria-live="polite">
            <p>
              <strong>{filteredProducts.length}</strong>{" "}
              {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>
            {hasActiveFilter && (
              <button
                type="button"
                onClick={clearFilters}
                className={styles.clearFilters}
              >
                Limpar filtros
                <X aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className={styles.catalog} aria-label="Produtos do catálogo">
        {visibleSections.length > 0 ? (
          <div className={styles.groupedCatalog}>
            {visibleSections.map((section, sectionIndex) => (
              <section
                key={section.id}
                id={section.id}
                className={styles.categorySection}
                aria-labelledby={`${section.id}-title`}
              >
                <header className={styles.categoryHeader} data-aplic-reveal="text">
                  <div>
                    <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                    <h2 id={`${section.id}-title`}>{section.label}</h2>
                  </div>
                  <p>
                    {section.products.length}{" "}
                    {section.products.length === 1 ? "produto" : "produtos"}
                    {section.products.length > 1 && (
                      <span aria-hidden="true">→</span>
                    )}
                  </p>
                </header>

                <div
                  className={`${styles.productRail} ${
                    section.products.length <= 4
                      ? styles.productRailCentered
                      : ""
                  }`}
                  role="list"
                  aria-label={section.label}
                >
                  {section.products.map((product, productIndex) => {
                    const media = productCampaignMedia[product.id]
                    const copy = catalogCardCopy[product.id]

                    return (
                      <div
                        key={product.id}
                        className={styles.railItem}
                        role="listitem"
                      >
                        <ProductCard
                          product={product}
                          displayName={copy?.displayName}
                          displayDescription={copy?.description}
                          imageSrc={media?.src}
                          imagePosition={media?.position}
                          eagerImage={sectionIndex === 0 && productIndex < 3}
                          headingLevel="h3"
                          revealIndex={productIndex}
                          revealScope={hasSearched ? "none" : "aplic"}
                        />
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <PackageSearch aria-hidden="true" />
            </div>
            <h2>Não encontramos esse produto.</h2>
            <p>
              Tente outro termo ou fale com a equipe para pedir uma medida,
              formato ou acabamento personalizado.
            </p>
            <div className={styles.emptyActions}>
              <button
                type="button"
                {...getWhatsAppTrackingAttributes(customProjectConversion)}
                onClick={() => handleWhatsAppClick(
                  customProjectMessage,
                  customProjectConversion.source,
                  undefined,
                  { scope: customProjectConversion.scope, context: customProjectConversion.context },
                )}
              >
                Pedir orçamento personalizado
              </button>
              <button type="button" className={styles.clearEmptySearch} onClick={clearFilters}>
                Limpar busca
              </button>
            </div>
          </div>
        )}
      </section>

      <section className={styles.faq} aria-labelledby="catalog-faq-title">
        <h2 id="catalog-faq-title">Dúvidas sobre o catálogo</h2>
        <FaqAccordion items={catalogFaqs} />
      </section>
      <ProductLinks currentPath="/produtos" />

      <section
        className={styles.customProject}
        aria-labelledby="custom-catalog-title"
      >
        <div className={styles.customProjectCopy} data-aplic-reveal="text">
          <p className={styles.eyebrow}>Pedido personalizado</p>
          <h2 id="custom-catalog-title">Não encontrou o formato que precisa?</h2>
          <p>
            Envie a referência, as medidas e a quantidade. Avaliamos formatos
            maiores, cortes e acabamentos fora do catálogo.
          </p>
        </div>
        <button
          type="button"
          className={styles.customProjectCta}
          data-aplic-reveal="text"
          data-reveal-order="1"
          {...getWhatsAppTrackingAttributes(customProjectConversion)}
          onClick={() =>
            handleWhatsAppClick(
              customProjectMessage,
              customProjectConversion.source,
              undefined,
              {
                scope: customProjectConversion.scope,
                context: customProjectConversion.context,
              },
            )
          }
        >
          <span>Descrever meu pedido</span>
          <ArrowUpRight aria-hidden="true" />
        </button>
      </section>
    </div>
  )
}
