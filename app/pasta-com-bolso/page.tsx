import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProductLandingPage, type ProductLandingFaq } from "@/components/site/ProductLandingPage";
import { productsData } from "@/lib/products-data";
import { createPageMetadata, createServicePageSchema } from "@/lib/site";

const whatsappMessage = "Olá! Quero um orçamento de pasta com bolso personalizada. Vou enviar a quantidade, o uso e a arte ou referência.";
const products = productsData.filter((product) => product.id === "pasta-bolso");
const faqs: ProductLandingFaq[] = [
  { question: "Para que serve a pasta com bolso?", answer: "Ela organiza propostas, contratos, apresentações e documentos A4 em uma entrega mais profissional." },
  { question: "A pasta pode levar minha marca?", answer: "Sim. A capa e a contracapa recebem a identidade aprovada para o pedido." },
  { question: "Preciso enviar a arte pronta?", answer: "Se tiver a arte final, envie. Se houver somente logo e referência, avaliamos o que precisa ser preparado antes da produção." },
  { question: "Qual é o prazo?", answer: "A pasta é produzida em até 5 dias úteis após a aprovação do arquivo. O prazo exato é confirmado no orçamento." },
];

export const metadata: Metadata = createPageMetadata({ title: "Pasta com bolso em Florianópolis", description: "Pasta com bolso personalizada em Florianópolis para propostas, contratos e apresentações. Atendimento pelo WhatsApp.", path: "/pasta-com-bolso", keywords: ["pasta com bolso florianópolis", "pasta personalizada floripa", "pasta corporativa florianópolis"] });
const pageSchema = createServicePageSchema({ path: "/pasta-com-bolso", name: "Pasta com bolso personalizada em Florianópolis", description: "Pasta personalizada para propostas, contratos e apresentações.", serviceType: "Impressão de pasta com bolso", faqs, relatedProducts: products.map((product) => ({ name: product.name, description: product.description, url: product.landingPage })) });

export default function PastaComBolsoPage() {
  return <><JsonLd data={pageSchema} /><ProductLandingPage
    eyebrow="Material corporativo"
    title="Sua proposta chega mais organizada."
    lead="Pasta A4 personalizada com bolso interno para contratos, apresentações e documentos que precisam carregar sua marca."
    placeholderLabel="Foto de campanha da pasta em produção"
    products={products}
    productsTitle="Escolha a quantidade para sua próxima apresentação."
    productsLead="O formato padrão recebe sua identidade na capa e contracapa, com bolso interno para os documentos."
    highlights={[
      { label: "01", title: "Conteúdo organizado", description: "O bolso interno reúne folhas, contratos e materiais entregues na reunião." },
      { label: "02", title: "Marca aplicada", description: "A identidade visual é preparada para capa e contracapa antes da aprovação." },
      { label: "03", title: "Apresentação completa", description: "Quantidade, arquivo e prazo são confirmados antes do material entrar em produção." },
    ]}
    faqs={faqs}
    whatsappMessage={whatsappMessage}
    analyticsSource="lp_pasta"
  /></>;
}
