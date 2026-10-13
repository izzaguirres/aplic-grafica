import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProductLandingPage, type ProductLandingFaq } from "@/components/site/ProductLandingPage";
import { productsData } from "@/lib/products-data";
import { createPageMetadata, createServicePageSchema } from "@/lib/site";

const whatsappMessage = "Olá! Quero um orçamento de cartão de visita. Vou enviar a quantidade e a arte ou referência.";
const products = productsData.filter((product) => /cartao/i.test(product.id));
const faqs: ProductLandingFaq[] = [
  { question: "Como funciona o pedido?", answer: "Escolha a quantidade no card e abra o pedido no WhatsApp. Envie a arte ou referência para conferirmos antes de produzir." },
  { question: "Qual a diferença entre brilho total e verniz localizado?", answer: "O brilho total cobre todo o cartão. O verniz localizado cria contraste entre o fundo fosco e áreas brilhantes, como logo ou nome." },
  { question: "Preciso enviar a arte pronta?", answer: "O ideal é enviar a arte final. Ajustes simples podem ser avaliados na mesma conversa antes do orçamento ser confirmado." },
  { question: "Qual é o prazo?", answer: "O cartão brilho total pode sair em até 3 dias úteis. Outros acabamentos têm prazo confirmado no orçamento antes da produção." },
];

export const metadata: Metadata = createPageMetadata({
  title: "Cartão de visita em Floripa desde R$185",
  description: "Cartão de visita em Florianópolis a partir de R$185 (100 un., brilho total), em até 3 dias úteis. Compare acabamentos e peça pelo WhatsApp.",
  path: "/cartao-de-visita",
  keywords: ["cartão de visita florianópolis", "cartão de visita floripa", "cartão brilho localizado florianópolis"],
});

const pageSchema = createServicePageSchema({
  path: "/cartao-de-visita",
  name: "Cartão de visita em Florianópolis",
  description: "Cartões de visita em couchê 300g com acabamentos brilho e fosco, atendimento pelo WhatsApp.",
  serviceType: "Impressão de cartão de visita",
  faqs,
  relatedProducts: products.map((product) => ({ name: product.name, description: product.description, url: product.landingPage })),
});

export default function CartaoDeVisitaPage() {
  return <><JsonLd data={pageSchema} /><ProductLandingPage
    eyebrow="Cartão de visita"
    title="Cartão de visita em Florianópolis"
    path="/cartao-de-visita"
    subtitle="Seu primeiro contato começa antes da conversa."
    lead="Escolha o acabamento e a quantidade. Nós conferimos a arte, confirmamos o prazo e produzimos em Florianópolis."
    heroImage={{ src: "/images/campanha/produtos/cartao-visita.webp", alt: "Cartão de visita da campanha Faz Propaganda", position: "50% 54%" }}
    products={products}
    productsTitle="Escolha o acabamento que combina com sua marca."
    productsLead="Brilho total, verniz localizado ou formato mini, com preço por quantidade no próprio card."
    highlights={[
      { label: "01", title: "Papel e acabamento", description: "Couchê de alta gramatura com acabamento escolhido para o efeito que sua marca precisa." },
      { label: "02", title: "Arte conferida", description: "Formato, margens e arquivo são conferidos antes de o cartão entrar em produção." },
      { label: "03", title: "Prazo combinado", description: "O prazo de cada acabamento é confirmado com você antes de começar." },
    ]}
    faqs={faqs}
    whatsappMessage={whatsappMessage}
    analyticsSource="lp_cartao"
  /></>;
}
