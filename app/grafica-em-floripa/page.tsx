import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProductLandingPage, type ProductLandingFaq } from "@/components/site/ProductLandingPage";
import { productsData } from "@/lib/products-data";
import { blocosReceituarioProduct } from "@/lib/quote-products-data";
import { createPageMetadata, createServicePageSchema } from "@/lib/site";

const whatsappMessage = "Olá! Quero um orçamento de impressos por encomenda. Vou enviar o produto, a quantidade e uma arte ou referência.";
const products = [
  "panfleto-a6",
  "cartao-brilho-frente",
  blocosReceituarioProduct,
  "banner-lona",
].flatMap((item) => typeof item === "string"
  ? productsData.filter((product) => product.id === item)
  : [item]);
const faqs: ProductLandingFaq[] = [
  { question: "A Aplic atende pedidos online?", answer: "Sim. Você escolhe o produto, envia a arte pelo WhatsApp, aprova o orçamento e combina entrega ou retirada." },
  { question: "Quais produtos posso pedir?", answer: "Panfletos, cartões de visita, receituários e banners por encomenda. Outros materiais gráficos podem ser consultados no catálogo." },
  { question: "Vocês fazem cópias avulsas de documentos A4 ou A3?", answer: "Não fazemos cópias avulsas ou impressão de documentos A4/A3. Nosso atendimento é voltado a materiais gráficos por encomenda, com produto, quantidade e prazo combinados." },
  { question: "Vocês imprimem na hora?", answer: "Não trabalhamos como impressão imediata de balcão. Cada pedido tem prazo definido conforme produto, quantidade e arquivo." },
  { question: "Como funciona a entrega?", answer: "A entrega atende Florianópolis e região. Endereço, valor e horário são combinados no atendimento." },
];

export const metadata: Metadata = createPageMetadata({ title: "Atendimento no Norte da Ilha e em Florianópolis: retirada e entrega", description: "Panfletos, cartões de visita, receituários e banners por encomenda em Florianópolis. Orçamento pelo WhatsApp, com entrega ou retirada combinada.", path: "/grafica-em-floripa", keywords: ["gráfica em florianópolis", "gráfica em floripa", "gráfica online florianópolis"] });
const pageSchema = createServicePageSchema({ path: "/grafica-em-floripa", name: "Atendimento no Norte da Ilha e em Florianópolis: retirada e entrega", description: "Gráfica online em Florianópolis para impressos e comunicação visual.", serviceType: "Serviços gráficos online", faqs, relatedProducts: products.map((product) => ({ name: product.name, description: product.description, url: product.landingPage })) });

export default function GraficaEmFloripaPage() {
  return <><JsonLd data={pageSchema} /><ProductLandingPage
    eyebrow="Retirada e entrega"
    title="Atendimento no Norte da Ilha e em Florianópolis: retirada e entrega"
    path="/grafica-em-floripa"
    lead="Panfletos, cartões de visita, receituários e banners para empresas e profissionais. Peça seu orçamento pelo WhatsApp."
    qualification="Não fazemos cópias avulsas ou impressão de documentos A4/A3."
    heroImage={{ src: "/images/campanha/hero-adesivo-faz-propaganda.webp", alt: "Material impresso da campanha Faz Propaganda produzido pela Aplic", position: "50% 50%" }}
    products={products}
    productsTitle="Escolha o material para seu pedido."
    productsLead="Veja as opções e os valores de panfletos, cartões e banners. Receituários são feitos sob orçamento."
    highlights={[
      { label: "01", title: "Escolha online", description: "Produtos e preços ficam visíveis para você começar sem esperar uma tabela por mensagem." },
      { label: "02", title: "Produção local", description: "Acompanhamos o pedido em Florianópolis e confirmamos o arquivo antes de produzir." },
      { label: "03", title: "Entrega combinada", description: "O material segue para o endereço ou fica disponível para retirada agendada." },
    ]}
    faqs={faqs}
    whatsappMessage={whatsappMessage}
    analyticsSource="lp_floripa"
  /></>;
}
