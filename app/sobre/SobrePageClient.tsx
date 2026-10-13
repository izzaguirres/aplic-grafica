import Image from "next/image";
import { ProductionVideo } from "@/components/site/ProductionVideo";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { WhatsAppAction } from "@/components/nova-home/NovaHomeActions";
import { AplicPageShell } from "@/components/site/AplicPageShell";
import styles from "./sobre.module.css";

const values = [
  {
    number: "01",
    title: "Atendimento direto",
    text: "Você conversa com quem entende do pedido, do arquivo e do acabamento.",
  },
  {
    number: "02",
    title: "Produção própria",
    text: "Acompanhamos cada etapa e combinamos prazo antes de colocar o material em produção.",
  },
  {
    number: "03",
    title: "Entrega do jeito certo",
    text: "Entregamos em toda Florianópolis. Prazo e custo de entrega são confirmados no atendimento.",
  },
];

export default function SobrePageClient() {
  return (
    <AplicPageShell className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-aplic-reveal="text">
            Sobre a Aplic
          </p>
          <h1 id="about-title" data-aplic-reveal="text" data-reveal-order="1">
            Há 15 anos, transformamos ideias em material impresso.
          </h1>
          <p data-aplic-reveal="text" data-reveal-order="2">
            Somos uma gráfica online com produção própria, feita para empresas e pessoas que precisam resolver bem, sem perder tempo entre orçamento, arte e produção.
          </p>
          <div className={styles.heroActions} data-aplic-reveal="text" data-reveal-order="3">
            <WhatsAppAction
              label="Falar com a Aplic"
              message="Olá! Conheci a história da Aplic pelo site e quero conversar sobre um projeto."
              source="about_hero"
              scope="general_quote"
              context="about_hero"
              tone="lime"
            />
            <Link href="/produtos">
              Conhecer os produtos
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className={styles.heroMedia} data-aplic-reveal="media">
          <Image
            src="/images/campanha/cta/revista-leitura.webp"
            alt="Pessoa lendo uma revista produzida pela Aplic Gráfica"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 44vw"
          />
        </div>
      </section>

      <section className={styles.story} aria-labelledby="story-title">
        <div className={styles.storyMedia} data-aplic-reveal="media">
          <ProductionVideo label="Materiais produzidos pela Aplic Gráfica" />
        </div>
        <div className={styles.storyCopy}>
          <p className={styles.eyebrow} data-aplic-reveal="text">
            Feito em Florianópolis
          </p>
          <h2 id="story-title" data-aplic-reveal="text" data-reveal-order="1">
            A experiência de quem vive impressão todos os dias.
          </h2>
          <p data-aplic-reveal="text" data-reveal-order="2">
            Começamos em 2011 e crescemos junto de negócios locais, eventos, profissionais e projetos pessoais. Hoje, o atendimento acontece online e a produção continua próxima, acompanhada por gente de verdade.
          </p>
          <p className={styles.location} data-aplic-reveal="text" data-reveal-order="3">
            <MapPin aria-hidden="true" />
            Pedidos online pelo WhatsApp, com entrega em toda Florianópolis. Sem atendimento presencial.
          </p>
        </div>
      </section>

      <section className={styles.values} aria-labelledby="values-title">
        <header>
          <p className={styles.eyebrow} data-aplic-reveal="text">
            Como trabalhamos
          </p>
          <h2 id="values-title" data-aplic-reveal="text" data-reveal-order="1">
            Próximo o bastante para cuidar de cada detalhe.
          </h2>
        </header>
        <ol>
          {values.map((value, index) => (
            <li key={value.number} data-aplic-reveal="text" data-reveal-order={String(index)}>
              <span>{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.finalCta} aria-labelledby="about-cta-title">
        <div data-aplic-reveal="text">
          <p className={styles.eyebrow}>Seu projeto, nossa produção</p>
          <h2 id="about-cta-title">Vamos colocar sua ideia em circulação.</h2>
        </div>
        <div data-aplic-reveal="text" data-reveal-order="1">
          <p>Conte o que precisa. Nós ajudamos a escolher o formato e confirmamos valor e prazo antes de começar.</p>
          <WhatsAppAction
            label="Começar orçamento"
            message="Olá! Vim pela página Sobre e quero começar um orçamento."
            source="about_final_cta"
            scope="general_quote"
            context="about_final_cta"
            tone="light"
          />
        </div>
      </section>
    </AplicPageShell>
  );
}
