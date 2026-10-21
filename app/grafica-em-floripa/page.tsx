import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { FaqAccordion } from "@/components/nova-home/FaqAccordion";
import { WhatsAppAction } from "@/components/nova-home/NovaHomeActions";
import { AplicPageShell } from "@/components/site/AplicPageShell";
import { ProductLinks } from "@/components/site/ProductLinks";
import { ServiceAreas } from "@/components/site/ServiceAreas";
import { createPageMetadata, createServicePageSchema, siteConfig } from "@/lib/site";
import styles from "@/components/site/product-landing-page.module.css";

const title = "Áreas atendidas em Florianópolis";
const description = "Gráfica online com produção própria e entrega em toda Florianópolis. Conheça as áreas atendidas e peça seu orçamento pelo WhatsApp.";
const faqs = [
  { question: "Como faço meu pedido online?", answer: "Você escolhe o produto no site, envia a arte pelo WhatsApp, aprova o orçamento e combina a entrega. A Aplic tem produção própria e não realiza atendimento presencial." },
  { question: "Quais bairros a Aplic atende?", answer: `Atendemos toda Florianópolis, incluindo ${siteConfig.location.neighborhoods.join(", ")} e demais bairros.` },
  { question: "Qual é o prazo e o custo da entrega?", answer: "O prazo e o custo da entrega são confirmados no atendimento pelo WhatsApp antes da aprovação do pedido." },
  { question: "Quais produtos posso pedir?", answer: "Panfletos, cartões de visita, receituários e banners por encomenda. Outros materiais gráficos podem ser consultados no catálogo." },
  { question: "Vocês fazem cópias avulsas de documentos A4 ou A3?", answer: "Não fazemos cópias avulsas ou impressão de documentos A4/A3. Nosso atendimento é voltado a materiais gráficos por encomenda, com produto, quantidade e prazo combinados." },
  { question: "Vocês imprimem na hora?", answer: "A produção é feita por encomenda. Cada pedido tem prazo definido conforme produto, quantidade e arquivo." },
];

export const metadata: Metadata = createPageMetadata({ title, description, path: "/grafica-em-floripa" });
const pageSchema = createServicePageSchema({ path: "/grafica-em-floripa", name: title, description, serviceType: "Serviços gráficos online com entrega em Florianópolis", faqs });

export default function GraficaEmFloripaPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <AplicPageShell className={styles.page}>
        <section className={styles.hero} aria-labelledby="areas-page-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Áreas atendidas</p>
            <h1 id="areas-page-title">Atendemos toda Florianópolis</h1>
            <p className={styles.heroLead}>
              Gráfica online com produção própria. Escolha seu produto no site, peça pelo WhatsApp e combine a entrega do seu material.
            </p>
            <p className={styles.heroQualification}>
              {siteConfig.onlineServiceNote}
            </p>
            <div className={styles.heroActions}>
              <WhatsAppAction
                label="Pedir orçamento"
                source="lp_floripa_hero"
                message="Olá! Quero um orçamento de impressos com entrega em Florianópolis."
                scope="general_quote"
                context="service_areas"
                tone="lime"
              />
              <Link className={styles.secondaryAction} href="/produtos">Catálogo <ArrowUpRight aria-hidden="true" /></Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <Image src="/images/campanha/hero-adesivo-faz-propaganda.webp" alt="Material impresso da campanha Faz Propaganda produzido pela Aplic" width={1122} height={1402} priority />
          </div>
        </section>
        <ServiceAreas showDetailsLink={false} />
        <section className={styles.faq} aria-labelledby="areas-faq-title">
          <div className={styles.faqHeading} data-aplic-reveal="text">
            <p className={styles.eyebrow}>Pedido e entrega</p>
            <h2 id="areas-faq-title">Como funciona o atendimento online.</h2>
            <p>Escolha seu material e confirme as condições pelo WhatsApp.</p>
          </div>
          <div data-aplic-reveal="text" data-reveal-order="1"><FaqAccordion items={faqs} /></div>
        </section>
        <ProductLinks currentPath="/grafica-em-floripa" />
      </AplicPageShell>
    </>
  );
}
