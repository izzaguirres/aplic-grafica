import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProductLandingPage, type ProductLandingFaq } from "@/components/site/ProductLandingPage";
import { productsData } from "@/lib/products-data";
import { createPageMetadata, createServicePageSchema } from "@/lib/site";

const whatsappMessage = "Olá! Quero um orçamento de panfletos ou folders. Vou enviar o formato, a quantidade e a arte.";
const products = productsData.filter((product) => /panfleto|filipeta|folder/i.test(product.id));
const faqs: ProductLandingFaq[] = [
  { question: "Qual formato escolher?", answer: "O A6 é compacto e econômico para distribuição. O A5 oferece mais área de leitura. Folder e filipeta funcionam melhor quando o conteúdo precisa de organização ou mais rigidez." },
  { question: "A impressão é frente e verso?", answer: "As opções do catálogo são impressas frente e verso. Se o pedido tiver outra configuração, confirme pelo WhatsApp." },
  { question: "Preciso enviar a arte pronta?", answer: "O ideal é enviar a arte final. Se houver apenas uma referência, avaliamos o ajuste necessário antes da produção." },
  { question: "Qual é o prazo?", answer: "O A6 de 1.000 unidades pode sair em até 3 dias úteis. Tiragens e formatos diferentes têm prazo confirmado no orçamento." },
];

export const metadata: Metadata = createPageMetadata({ title: "Panfleto em Florianópolis desde R$385", description: "Panfletos e folders em Florianópolis. A6: 1.000 un. por R$385, frente e verso, em até 3 dias úteis. Confira formatos e peça pelo WhatsApp.", path: "/panfleto", keywords: ["panfleto florianópolis", "panfleto a6 floripa", "folder florianópolis"] });
const pageSchema = createServicePageSchema({ path: "/panfleto", name: "Panfletos e folders em Florianópolis", description: "Panfletos A5 e A6, folders e filipetas em Florianópolis.", serviceType: "Impressão de panfletos", faqs, relatedProducts: products.map((product) => ({ name: product.name, description: product.description, url: product.landingPage })) });

export default function PanfletoPage() {
  return <><JsonLd data={pageSchema} /><ProductLandingPage
    eyebrow="Panfletos e folders"
    title="Panfletos e folders em Florianópolis"
    path="/panfleto"
    subtitle="Informação impressa para circular e vender."
    lead="Compare formatos e tiragens para divulgação, cardápio, evento ou apresentação. O pedido segue direto para o WhatsApp."
    heroImage={{ src: "/images/campanha/produtos/panfleto-a6.webp", alt: "Panfleto da campanha Faz Propaganda", position: "50% 48%" }}
    products={products}
    productsTitle="Do panfleto direto ao folder completo."
    productsLead="Escolha pela quantidade de informação, pelo formato e pela tiragem que a ação precisa."
    highlights={[
      { label: "01", title: "Formato certo", description: "A6 para distribuição, A5 para mais conteúdo e folder quando a leitura precisa de etapas." },
      { label: "02", title: "Frente e verso", description: "Mais espaço para organizar oferta, contato e chamada sem apertar a mensagem." },
      { label: "03", title: "Tiragem confirmada", description: "Quantidade, valor e prazo ficam claros antes de o material entrar em produção." },
    ]}
    faqs={faqs}
    whatsappMessage={whatsappMessage}
    analyticsSource="lp_panfleto"
  /></>;
}
