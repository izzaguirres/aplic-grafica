import type { Metadata } from "next";
import { BusinessDetails } from "@/components/site/BusinessDetails";
import { ProductLinks } from "@/components/site/ProductLinks";
import Image from "next/image";
import { ProductionVideo } from "@/components/site/ProductionVideo";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { TrustedClients } from "@/components/TrustedClients";
import {
  ProductRailButton,
  WhatsAppAction,
} from "@/components/nova-home/NovaHomeActions";
import { FaqAccordion } from "@/components/nova-home/FaqAccordion";
import { NovaHomeMotion } from "@/components/nova-home/NovaHomeMotion";
import { ProductCardV2 } from "@/components/nova-home/ProductCardV2";
import { productCampaignMedia } from "@/lib/product-campaign-media";
import { productsData } from "@/lib/products-data";
import styles from "./nova-home.module.css";

const homeProductIds = [
  "cartao-brilho-frente",
  "panfleto-a6",
  "banner-lona",
  "etiqueta-adesiva",
  "cracha-empresarial",
  "folder-2-dobras",
  "pasta-bolso",
  "tag-furo-9x5",
];

const homeProductDescriptions: Record<string, string> = {
  "cartao-brilho-frente":
    "9x5cm · Couchê 300g · Laminação verniz brilho total.",
  "panfleto-a6": "10x14cm · Couchê 90g · Frente e verso para divulgação.",
  "banner-lona":
    "Lona fosca impressa, com acabamento para fachada, evento ou ponto de venda.",
  "etiqueta-adesiva":
    "Adesivo com corte em até 5x5cm ou 10x10cm, para rótulos e embalagens.",
  "folder-2-dobras":
    "A4 aberto 28x20cm · Couchê 90g · Frente e verso com duas dobras.",
  "pasta-bolso":
    "A4 · Supremo 300g · Capa e contracapa coloridas, com bolso interno.",
  "tag-furo-9x5":
    "Couchê 300g · Furo para cordão, ideal para produtos e embalagens.",
};

const homeProducts = homeProductIds.flatMap((id) => {
  const product = productsData.find((item) => item.id === id);
  return product
    ? [
        {
          ...product,
          description: homeProductDescriptions[id] ?? product.description,
        },
      ]
    : [];
});

const orderSteps = [
  {
    number: "01",
    image: "/images/campanha/processo/escolha-produto-3d.png",
    title: "Escolha o produto",
    text: "Compare formatos, quantidades e valores direto na página.",
  },
  {
    number: "02",
    image: "/images/campanha/processo/envie-arte-3d.png",
    title: "Envie sua arte",
    text: "O WhatsApp abre com o pedido preenchido para você anexar o arquivo ou uma referência.",
  },
  {
    number: "03",
    image: "/images/campanha/processo/aprove-layout-3d.png",
    title: "Aprove antes de produzirmos",
    text: "Você confere e aprova a arte ou o layout antes de iniciarmos a produção.",
  },
];

const faqs = [
  {
    question: "Preciso ter a arte pronta?",
    answer:
      "O ideal é enviar a arte final. Se você tiver apenas uma referência ou precisar de um ajuste simples, a Aplic avalia isso no atendimento antes da produção.",
  },
  {
    question: "O preço mostrado já é o valor do pedido?",
    answer:
      "O card mostra o valor da combinação escolhida. Frete, acabamentos fora do padrão ou alterações de arquivo são confirmados no orçamento antes de você aprovar.",
  },
  {
    question: "Quando meu material fica pronto?",
    answer:
      "O prazo varia por produto e tiragem. Produtos marcados como produção rápida podem sair em até 3 dias úteis; o prazo exato é confirmado no orçamento.",
  },
  {
    question: "A Aplic entrega em Florianópolis?",
    answer:
      "Sim. A entrega atende Florianópolis e região, e a retirada pode ser combinada quando fizer mais sentido para o pedido.",
  },
];

export const metadata: Metadata = {
  title: "Nova Home · Teste Revenue-Centric",
  description:
    "Rota local de experimentação da nova home e dos cards de produto da Aplic Gráfica.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NovaHomePage() {
  return (
    <div
      data-nova-home
      data-aplic-shell
      data-motion-ready="true"
      className={styles.page}
    >
      <noscript>
        <style>{`
          [data-nova-home] [data-nova-reveal] {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
          }
        `}</style>
      </noscript>
      <NovaHomeMotion />
      <section
        data-nova-home-hero
        className={styles.hero}
        aria-labelledby="nova-home-title"
      >
        <div data-nova-home-hero-surface className={styles.heroSurface}>
          <picture
            className={styles.heroMedia}
            data-nova-reveal="media"
            data-reveal-order="0"
          >
            <source
              media="(max-width: 639px)"
              srcSet="/images/campanha/hero-panfleto-mobile.webp"
            />
            <img
              src="/images/campanha/hero-adesivo-desktop.webp"
              alt="Materiais impressos da campanha Faz Propaganda, produzidos pela Aplic Gráfica"
              width="1374"
              height="773"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className={styles.heroImage}
            />
          </picture>
          <div className={styles.heroShade} />

          <div className={styles.heroCopy}>
            <h1 id="nova-home-title" className={styles.heroTitle}>
              <span data-nova-reveal="text" data-reveal-order="0">
                Gráfica rápida{" "}
              </span>
              <span data-nova-reveal="text" data-reveal-order="1">
                em Canasvieiras,{" "}
              </span>
              <span data-nova-reveal="text" data-reveal-order="2">
                Florianópolis.
              </span>
            </h1>
            <p
              className={styles.heroLead}
              data-nova-reveal="text"
              data-reveal-order="3"
            >
              Cartões, panfletos, adesivos, banners e mais. Escolha a opção,
              veja o valor e peça pelo WhatsApp.
            </p>

            <div
              className={styles.heroActionGroup}
              data-nova-reveal="text"
              data-reveal-order="4"
            >
              <div className={styles.heroButtons}>
                <WhatsAppAction
                  label="Fazer orçamento"
                  source="nova_home_hero_cta"
                  message="Olá! Vim pela nova página da Aplic e quero fazer um orçamento."
                  scope="general_quote"
                  context="home_hero"
                  tone="light"
                  showLeadingIcon={false}
                />
                <ProductRailButton label="Ver produtos" />
              </div>
            </div>
          </div>
        </div>

        <div
          className={styles.clientProof}
          data-nova-reveal="text"
          data-reveal-order="1"
        >
          <TrustedClients />
        </div>
      </section>

      <section
        id="produtos"
        className={styles.products}
        aria-labelledby="products-title"
      >
        <div className={styles.sectionHeading}>
          <p
            className={`${styles.eyebrow} ${styles.productsEyebrow}`}
            data-nova-reveal="text"
            data-reveal-order="0"
          >
            Mais vendidos
          </p>
          <h2 id="products-title">
            <span data-nova-reveal="text" data-reveal-order="1">
              Seu próximo impresso
            </span>
            <span data-nova-reveal="text" data-reveal-order="2">
              começa aqui.
            </span>
          </h2>
        </div>

        <div className={styles.mobileHint} aria-hidden="true">
          Deslize para ver mais
          <span>→</span>
        </div>

        <div className={styles.productGrid}>
          {homeProducts.map((product, index) => {
            const media = productCampaignMedia[product.id];

            return (
              <ProductCardV2
                key={product.id}
                product={product}
                imageSrc={media?.src}
                imagePosition={media?.position}
                eagerImage={index < 4}
                revealIndex={index}
              />
            );
          })}
        </div>

        <div className={styles.catalogFooter} data-nova-reveal="text">
          <p>Não encontrou o que precisa?</p>
          <Link href="/produtos">
            Ver catálogo completo
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <ProductLinks />

      <section className={styles.trust} aria-labelledby="trust-title">
        <div className={styles.trustCopy}>
          <p
            className={styles.eyebrow}
            data-nova-reveal="text"
            data-reveal-order="0"
          >
            Onde estamos e retirada
          </p>
          <h2 id="trust-title">
            <span data-nova-reveal="text" data-reveal-order="1">
              Seu material ganha
            </span>
            <span data-nova-reveal="text" data-reveal-order="2">
              forma aqui.
            </span>
          </h2>
          <p data-nova-reveal="text" data-reveal-order="3">
            Há 15 anos, produzimos impressos para empresas, eventos, embalagens
            e projetos pessoais da região.
          </p>
          <div
            className={styles.trustNote}
            data-nova-reveal="text"
            data-reveal-order="4"
          >
            <MapPin aria-hidden="true" />
            <BusinessDetails />
          </div>
        </div>
        <div className={styles.trustMedia} data-nova-reveal="media">
          <ProductionVideo label="Produção gráfica real da Aplic em Florianópolis" />
        </div>
      </section>

      <section className={styles.process} aria-labelledby="process-title">
        <div className={styles.processInner}>
          <div className={styles.processIntro}>
            <div data-nova-reveal="text" data-reveal-order="0">
              <p className={styles.eyebrow}>Como funciona</p>
              <h2 id="process-title">
                <span>Da escolha à produção,</span>
                <span>sem complicação.</span>
              </h2>
            </div>
            <p data-nova-reveal="text" data-reveal-order="1">
              Escolha o produto, envie a arte e aprove os detalhes. Nós cuidamos
              da produção em Florianópolis.
            </p>
          </div>

          <ol className={styles.steps}>
            {orderSteps.map((step, index) => (
              <li key={step.number}>
                <div className={styles.stepMeta}>
                  <span>{step.number}</span>
                </div>
                <div className={styles.stepVisual} aria-hidden="true">
                  <div
                    className={styles.stepVisualMotion}
                    data-nova-reveal="media"
                    data-reveal-order={String(index)}
                  >
                    <Image
                      src={step.image}
                      alt=""
                      width={240}
                      height={240}
                    />
                  </div>
                </div>
                <div
                  data-nova-reveal="text"
                  data-reveal-order={String(index)}
                >
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className={styles.customProject}
        aria-labelledby="custom-project-title"
      >
        <div className={styles.customProjectCard}>
          <div className={styles.customProjectIntro} data-nova-reveal="text">
            <p className={styles.eyebrow}>Pedido personalizado</p>
            <h2 id="custom-project-title">Não encontrou o que precisa?</h2>
            <p>
              Fazemos medidas especiais, formatos maiores e materiais fora do
              catálogo. Envie sua ideia para avaliarmos o melhor caminho.
            </p>
          </div>
          <div
            className={styles.customProjectAction}
            data-nova-reveal="text"
            data-reveal-order="1"
          >
            <div
              className={styles.customProjectTags}
              aria-label="Exemplos de pedidos personalizados"
            >
              <span>Medidas especiais</span>
              <span>Grandes formatos</span>
              <span>Outros acabamentos</span>
            </div>
            <WhatsAppAction
              label="Pedir orçamento personalizado"
              source="nova_home_custom_project"
              message="Olá! Preciso de um orçamento personalizado. Vou enviar o produto ou referência, as medidas e a quantidade."
              scope="custom_order"
              context="special_measure_or_finish"
              tone="lime"
            />
            <small>Envie uma referência, a medida e a quantidade pelo WhatsApp</small>
          </div>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <div className={styles.faqHeading} data-nova-reveal="text">
          <p className={styles.eyebrow}>Dúvidas frequentes</p>
          <h2 id="faq-title">Antes de pedir, vale saber.</h2>
          <p>O essencial sobre arte, valores, prazo e entrega.</p>
        </div>
        <div data-nova-reveal="text" data-reveal-order="1">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="final-cta-title">
        <div className={styles.finalCtaCard}>
          <div className={styles.finalCtaContent} data-nova-reveal="text">
            <p className={styles.eyebrow}>Seu projeto começa aqui</p>
            <h2 id="final-cta-title">Vamos produzir o que você imaginou.</h2>
            <p>
              Conte o que precisa, a quantidade e a medida. Nossa equipe
              confirma o valor e o prazo antes de começar.
            </p>
            <WhatsAppAction
              label="Falar com a Aplic"
              source="nova_home_final_cta"
              message="Olá! Vim pela nova página da Aplic e quero começar um orçamento."
              scope="general_quote"
              context="home_final_cta"
              tone="light"
            />
            <small>Atendimento direto · sem cadastro</small>
          </div>
          <div
            className={styles.finalCtaMedia}
            data-nova-reveal="media"
            data-reveal-order="1"
          >
            <Image
              src="/images/campanha/cta/revista-leitura.webp"
              alt="Pessoa segurando uma revista produzida para a campanha da Aplic"
              fill
              sizes="(max-width: 820px) 100vw, 42vw"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
