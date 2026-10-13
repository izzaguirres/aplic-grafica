import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProductLandingPage, type ProductLandingFaq } from "@/components/site/ProductLandingPage";
import { productsData } from "@/lib/products-data";
import { createPageMetadata, createServicePageSchema } from "@/lib/site";

const whatsappMessage = "Olá! Quero um orçamento de banner ou cavalete. Vou enviar a medida, a quantidade e a arte.";
const products = productsData.filter((product) => /banner|cavalete/i.test(product.id));
const faqs: ProductLandingFaq[] = [
  { question: "O banner vem pronto para instalar?", answer: "O acabamento é combinado conforme o uso. Confirmamos com você se precisa de corda, bastão ou outro modo de fixação." },
  { question: "Vocês fazem tamanhos personalizados?", answer: "Sim. Envie a medida e a referência pelo WhatsApp para receber uma cotação sob medida." },
  { question: "Banner ou cavalete?", answer: "O banner funciona bem suspenso em fachadas e eventos. O cavalete fica no chão e pode ser reposicionado no ponto de venda." },
  { question: "Qual é o prazo?", answer: "O banner do catálogo pode sair em até 3 dias úteis. Medidas especiais e cavaletes têm prazo confirmado no orçamento." },
];

export const metadata: Metadata = createPageMetadata({ title: "Banner em Florianópolis a partir de R$90", description: "Banner em lona em Florianópolis a partir de R$90 (50x50cm), em até 3 dias úteis. Veja medidas e cavaletes. Acabamento confirmado no orçamento.", path: "/banner", keywords: ["banner florianópolis", "banner lona floripa", "cavalete florianópolis"] });
const pageSchema = createServicePageSchema({ path: "/banner", name: "Banner em lona em Florianópolis", description: "Banner em lona e cavaletes para comunicação visual em Florianópolis.", serviceType: "Impressão de banner em lona", faqs, relatedProducts: products.map((product) => ({ name: product.name, description: product.description, url: product.landingPage })) });

export default function BannerPage() {
  return <><JsonLd data={pageSchema} /><ProductLandingPage
    eyebrow="Comunicação visual"
    title="Banners em lona e cavaletes em Florianópolis"
    path="/banner"
    subtitle="Sua mensagem no tamanho que precisa aparecer."
    lead="Banners e cavaletes para fachada, promoção, evento e ponto de venda, com medidas e acabamento confirmados antes da produção."
    heroImage={{ src: "/images/campanha/produtos/banner-lona.webp", alt: "Banner da campanha Faz Propaganda aplicado em uma fachada", position: "50% 42%" }}
    products={products}
    productsTitle="Escolha como sua mensagem vai ocupar o espaço."
    productsLead="Compare medidas de banner ou escolha um cavalete para comunicação móvel no ponto de venda."
    highlights={[
      { label: "01", title: "Medida e uso", description: "O formato parte da distância de leitura, do local e do tempo que o material ficará exposto." },
      { label: "02", title: "Acabamento", description: "Fixação e estrutura são combinadas conforme o ambiente e a aplicação do material." },
      { label: "03", title: "Arte aprovada", description: "Você confere a proporção e o layout antes de autorizarmos a produção." },
    ]}
    faqs={faqs}
    whatsappMessage={whatsappMessage}
    analyticsSource="lp_banner"
  /></>;
}
