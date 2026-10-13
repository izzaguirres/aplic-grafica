import Link from "next/link";
import { ProductLinks } from "./ProductLinks";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { FaqAccordion } from "@/components/nova-home/FaqAccordion";
import { WhatsAppAction } from "@/components/nova-home/NovaHomeActions";
import { productCampaignMedia } from "@/lib/product-campaign-media";
import type { Product } from "@/lib/products-data";
import { AplicPageShell } from "./AplicPageShell";
import { ProductCard } from "./ProductCard";
import styles from "./product-landing-page.module.css";

export interface ProductLandingHighlight {
  label: string;
  title: string;
  description: string;
}

export interface ProductLandingFaq {
  question: string;
  answer: string;
}

interface ProductLandingPageProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  path?: string;
  lead: string;
  qualification?: string;
  heroImage?: {
    src: string;
    alt: string;
    position?: string;
  };
  placeholderLabel?: string;
  products: Product[];
  productsTitle: string;
  productsLead: string;
  highlights: ProductLandingHighlight[];
  faqs: ProductLandingFaq[];
  whatsappMessage: string;
  analyticsSource: string;
  proof?: string;
}

export function ProductLandingPage({
  eyebrow,
  title,
  subtitle,
  path,
  lead,
  qualification,
  heroImage,
  placeholderLabel = "Imagem da campanha em produção",
  products,
  productsTitle,
  productsLead,
  highlights,
  faqs,
  whatsappMessage,
  analyticsSource,
  proof = "Gráfica online com produção própria e entrega em toda Florianópolis.",
}: ProductLandingPageProps) {
  const singleProduct = products.length === 1 ? products[0] : undefined;

  return (
    <AplicPageShell className={styles.page}>
      {singleProduct ? (
        <section className={styles.singleProduct} aria-labelledby="product-page-title">
          <header className={styles.singleHeading}>
            <p className={styles.eyebrow} data-aplic-reveal="text">{eyebrow}</p>
            <h1 id="product-page-title" data-aplic-reveal="text">{title}</h1>
            <p className={styles.heroLead} data-aplic-reveal="text">{subtitle && <><strong>{subtitle}</strong>{" "}</>}{lead}</p>
          </header>
          <div id="opcoes" className={styles.singleOptions}>
            <ProductCard
              product={singleProduct}
              imageSrc={heroImage?.src ?? productCampaignMedia[singleProduct.id]?.src}
              imagePosition={heroImage?.position ?? productCampaignMedia[singleProduct.id]?.position}
              eagerImage
              layout="detail"
              conversionSource={`${analyticsSource}_product_card`}
            />
          </div>
          <p className={styles.proof}>
            <MapPin aria-hidden="true" />
            {proof}
          </p>
        </section>
      ) : (
        <>
      <section className={styles.hero} aria-labelledby="product-page-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-aplic-reveal="text">
            {eyebrow}
          </p>
          <h1 id="product-page-title" data-aplic-reveal="text" data-reveal-order="1">
            {title}
          </h1>
          <p className={styles.heroLead} data-aplic-reveal="text" data-reveal-order="2">
            {subtitle && <><strong>{subtitle}</strong>{" "}</>}{lead}
          </p>
          {qualification && <p className={styles.heroQualification} data-aplic-reveal="text" data-reveal-order="2">
            {qualification}
          </p>}
          <div className={styles.heroActions} data-aplic-reveal="text" data-reveal-order="3">
            <WhatsAppAction
              label="Pedir orçamento"
              source={`${analyticsSource}_hero`}
              message={whatsappMessage}
              product={eyebrow}
              scope="product_family"
              context={analyticsSource}
              tone="lime"
            />
            {products.length > 0 && (
              <Link className={styles.secondaryAction} href="#opcoes">
                Ver opções e preços
                <ArrowDown aria-hidden="true" />
              </Link>
            )}
          </div>
          <p className={styles.proof} data-aplic-reveal="text" data-reveal-order="4">
            <MapPin aria-hidden="true" />
            {proof}
          </p>
        </div>

        <div className={styles.heroVisual} data-aplic-reveal="media">
          {heroImage ? (
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              width="1122"
              height="1402"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              style={heroImage.position ? { objectPosition: heroImage.position } : undefined}
            />
          ) : (
            <div className={styles.placeholder} role="img" aria-label={placeholderLabel}>
              <span>Aplic gráfica</span>
              <strong>{placeholderLabel}</strong>
              <small>Vamos fazer propaganda</small>
            </div>
          )}
        </div>
      </section>

      {products.length > 0 ? (
        <section id="opcoes" className={styles.products} aria-labelledby="product-options-title">
          <header className={styles.sectionHeading}>
            <p className={styles.eyebrow} data-aplic-reveal="text">
              Escolha seu formato
            </p>
            <h2 id="product-options-title" data-aplic-reveal="text" data-reveal-order="1">
              {productsTitle}
            </h2>
            <p data-aplic-reveal="text" data-reveal-order="2">
              {productsLead}
            </p>
          </header>

          {products.length > 1 && (
            <p className={styles.mobileHint} aria-hidden="true">
              Deslize para comparar <span>→</span>
            </p>
          )}
          <div className={styles.productRail}>
            {products.map((product, index) => {
              const media = productCampaignMedia[product.id];

              return (
                <div className={styles.productItem} key={product.id}>
                  <ProductCard
                    product={product}
                    showDetailsLink={product.priceTable.length === 0}
                    imageSrc={media?.src}
                    imagePosition={media?.position}
                    eagerImage={index < 3}
                    headingLevel="h3"
                    revealIndex={index}
                    conversionSource={`${analyticsSource}_product_card`}
                  />
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <section className={styles.directOrder} aria-labelledby="direct-order-title">
          <div data-aplic-reveal="text">
            <p className={styles.eyebrow}>Pedido personalizado</p>
            <h2 id="direct-order-title">Conte a medida, o uso e a quantidade.</h2>
          </div>
          <div data-aplic-reveal="text" data-reveal-order="1">
            <p>
              Este produto ainda não tem uma opção pronta no catálogo. Envie uma referência e nós confirmamos material, valor e prazo antes da produção.
            </p>
            <WhatsAppAction
              label="Descrever meu pedido"
              source={`${analyticsSource}_direct_order`}
              message={whatsappMessage}
              product={eyebrow}
              scope="custom_order"
              context={`${analyticsSource}_special_format`}
              tone="lime"
            />
          </div>
        </section>
      )}

        </>
      )}

      <section className={styles.highlights} aria-labelledby="highlights-title">
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow} data-aplic-reveal="text">
            Antes de produzir
          </p>
          <h2 id="highlights-title" data-aplic-reveal="text" data-reveal-order="1">
            O que você confirma com a gente.
          </h2>
        </header>
        <ol>
          {highlights.map((item, index) => (
            <li key={item.title} data-aplic-reveal="text" data-reveal-order={String(index)}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.faq} aria-labelledby="product-faq-title">
        <div className={styles.faqHeading} data-aplic-reveal="text">
          <p className={styles.eyebrow}>Dúvidas frequentes</p>
          <h2 id="product-faq-title">Antes de pedir, vale saber.</h2>
          <p>Respostas diretas sobre arquivo, prazo e entrega.</p>
        </div>
        <div data-aplic-reveal="text" data-reveal-order="1">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {path && <ProductLinks currentPath={path} />}

      <section className={styles.finalCta} aria-labelledby="product-final-cta">
        <div data-aplic-reveal="text">
          <p className={styles.eyebrow}>Pronto para produzir?</p>
          <h2 id="product-final-cta">Seu pedido começa numa mensagem.</h2>
          <p>Envie a quantidade e a arte ou referência. O valor e o prazo são confirmados antes de começar.</p>
        </div>
        <div className={styles.finalCtaAction} data-aplic-reveal="text" data-reveal-order="1">
          <WhatsAppAction
            label="Falar com a Aplic"
            source={`${analyticsSource}_final_cta`}
            message={whatsappMessage}
            product={eyebrow}
            scope="product_family"
            context={analyticsSource}
            tone="light"
          />
          <Link href="/produtos">
            Ver catálogo completo
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </AplicPageShell>
  );
}
