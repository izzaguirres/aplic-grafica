import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProductLandingPage, type ProductLandingFaq } from "@/components/site/ProductLandingPage";
import { productsData } from "@/lib/products-data";
import { createPageMetadata, createServicePageSchema } from "@/lib/site";

const whatsappMessage = "Olá! Quero um orçamento de etiquetas adesivas. Vou enviar a medida, a quantidade e a arte ou referência.";
const products = productsData.filter((product) => /etiqueta|tag|adesivo/i.test(product.id));
const faqs: ProductLandingFaq[] = [
  { question: "Que tipo de etiqueta vocês fazem?", answer: "Produzimos etiquetas e rótulos para produtos, embalagens e identificação. O material e o corte são confirmados conforme o uso." },
  { question: "Vocês fazem corte personalizado?", answer: "Sim. Envie a medida e o formato desejado para avaliarmos o corte e o melhor aproveitamento." },
  { question: "Preciso enviar a arte pronta?", answer: "O ideal é enviar a arte final. Ajustes simples podem ser avaliados antes de confirmar o pedido." },
  { question: "Como escolher o tamanho e a quantidade das etiquetas?", answer: "Confira as opções no seletor do card de etiquetas adesivas. Para outra medida ou formato, envie a referência pelo WhatsApp para avaliarmos o pedido." },
  { question: "O que preciso informar sobre a embalagem?", answer: "Envie a medida disponível, o formato desejado, a quantidade e a arte ou referência. Informe também a superfície e o uso da embalagem para avaliarmos o material e o acabamento antes da produção." },
  { question: "Qual é o prazo?", answer: "As etiquetas do catálogo podem sair em até 3 dias úteis. Formatos especiais têm prazo confirmado no orçamento." },
];

export const metadata: Metadata = createPageMetadata({ title: "Etiquetas adesivas em Floripa desde R$145", description: "Etiquetas adesivas em Florianópolis a partir de R$145 (100 un., até 5x5cm). Produção em até 3 dias úteis. Peça seu orçamento pelo WhatsApp.", path: "/etiquetas-adesivas", keywords: ["etiquetas adesivas florianópolis", "rótulos personalizados floripa", "adesivos florianópolis"] });
const pageSchema = createServicePageSchema({ path: "/etiquetas-adesivas", name: "Etiquetas adesivas em Florianópolis", description: "Etiquetas e rótulos personalizados para produtos e embalagens.", serviceType: "Impressão de etiquetas adesivas", faqs, relatedProducts: products.map((product) => ({ name: product.name, description: product.description, url: product.landingPage })) });

export default function EtiquetasAdesivasPage() {
  return <><JsonLd data={pageSchema} /><ProductLandingPage
    eyebrow="Etiquetas e rótulos"
    title="Etiquetas adesivas e adesivos em Florianópolis"
    path="/etiquetas-adesivas"
    subtitle="Sua marca presente em cada embalagem."
    lead="Escolha tamanho e quantidade para rótulos, produtos e embalagens. A arte e o acabamento são conferidos antes da produção."
    heroImage={{ src: "/images/campanha/produtos/etiqueta-adesiva.webp", alt: "Etiqueta adesiva da campanha Faz Propaganda aplicada em uma embalagem", position: "50% 54%" }}
    products={products}
    productsTitle="Da etiqueta adesiva à tag de produto."
    productsLead="Compare tamanhos, quantidades e formas de identificação para a embalagem da sua marca."
    highlights={[
      { label: "01", title: "Tamanho real", description: "A medida é definida pelo espaço disponível na embalagem e pela informação que precisa aparecer." },
      { label: "02", title: "Corte e aplicação", description: "O formato e o material são avaliados conforme superfície, uso e acabamento desejado." },
      { label: "03", title: "Arquivo conferido", description: "Texto, margens e contorno de corte são confirmados antes de iniciar a produção." },
    ]}
    faqs={faqs}
    whatsappMessage={whatsappMessage}
    analyticsSource="lp_etiquetas"
  /></>;
}
