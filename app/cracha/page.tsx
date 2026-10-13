import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProductLandingPage, type ProductLandingFaq } from "@/components/site/ProductLandingPage";
import { productsData } from "@/lib/products-data";
import { createPageMetadata, createServicePageSchema } from "@/lib/site";

const whatsappMessage = "Olá! Quero um orçamento de crachás empresariais. Vou enviar a quantidade, a arte e a lista da equipe.";
const products = productsData.filter((product) => product.id === "cracha-empresarial");
const faqs: ProductLandingFaq[] = [
  { question: "O cordão vem incluso?", answer: "Sim. A opção do catálogo inclui cordão preto. Cores ou personalizações diferentes são cotadas separadamente." },
  { question: "Posso incluir foto, nome e cargo?", answer: "Sim. Envie as fotos e uma lista com os dados da equipe. O layout é preparado e aprovado antes da produção." },
  { question: "Como envio a lista da equipe?", answer: "Você pode enviar uma planilha simples com nome, cargo e o nome de cada arquivo de foto pelo WhatsApp." },
  { question: "Qual é o prazo?", answer: "A produção é feita em até 5 dias úteis após a aprovação do layout e a confirmação de todos os dados." },
];

export const metadata: Metadata = createPageMetadata({ title: "Crachá empresarial em Florianópolis", description: "Crachá empresarial personalizado em Florianópolis, com cordão incluso e aprovação de layout. Atendimento pelo WhatsApp.", path: "/cracha", keywords: ["crachá empresarial florianópolis", "crachá funcionário florianópolis"] });
const pageSchema = createServicePageSchema({ path: "/cracha", name: "Crachá empresarial em Florianópolis", description: "Crachás empresariais personalizados para equipes em Florianópolis.", serviceType: "Produção de crachá empresarial", faqs, relatedProducts: products.map((product) => ({ name: product.name, description: product.description, url: product.landingPage })) });

export default function CrachaPage() {
  return <><JsonLd data={pageSchema} /><ProductLandingPage
    eyebrow="Crachá empresarial"
    title="Sua equipe identificada com a sua marca."
    lead="Personalize nomes, cargos e fotos. Nós organizamos o layout, enviamos para aprovação e produzimos com cordão incluso."
    heroImage={{ src: "/images/campanha/produtos/cracha.webp", alt: "Crachá empresarial da campanha Faz Propaganda", position: "50% 50%" }}
    products={products}
    productsTitle="Escolha a quantidade da sua equipe."
    productsLead="O card mostra o valor por tiragem. A personalização de cada pessoa é confirmada no atendimento."
    highlights={[
      { label: "01", title: "Dados organizados", description: "Nome, cargo e foto são relacionados antes da montagem do arquivo final." },
      { label: "02", title: "Layout aprovado", description: "Você confere a arte e a identificação de cada pessoa antes de produzirmos." },
      { label: "03", title: "Cordão incluso", description: "A opção padrão já vai pronta para a equipe usar quando o pedido chegar." },
    ]}
    faqs={faqs}
    whatsappMessage={whatsappMessage}
    analyticsSource="lp_cracha"
  /></>;
}
