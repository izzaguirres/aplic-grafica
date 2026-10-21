import Image from "next/image";
import { BusinessDetails } from "@/components/site/BusinessDetails";
import { siteConfig } from "@/lib/site";
import { Clock3, MapPin, MessageCircleMore } from "lucide-react";
import { WhatsAppAction } from "@/components/nova-home/NovaHomeActions";
import { AplicPageShell } from "@/components/site/AplicPageShell";
import styles from "./contato.module.css";

const contactOptions = [
  {
    number: "01",
    title: "Quero um orçamento",
    text: "Conte o produto, a quantidade e a medida. Se tiver uma referência, mande junto.",
    label: "Pedir orçamento",
    source: "contact_budget",
    scope: "general_quote" as const,
    context: "budget_request",
    message: "Olá! Quero solicitar um orçamento. Vou enviar o produto, a quantidade e a medida.",
  },
  {
    number: "02",
    title: "Quero enviar minha arte",
    text: "Envie o arquivo para conferirmos formato, tamanho e o que precisa ser ajustado antes da produção.",
    label: "Enviar minha arte",
    source: "contact_file",
    scope: "artwork_submission" as const,
    context: "artwork_review",
    message: "Olá! Quero enviar uma arte para conferência e orçamento.",
  },
  {
    number: "03",
    title: "Quero acompanhar um pedido",
    text: "Informe seu nome ou empresa para verificarmos em que etapa está o material.",
    label: "Consultar pedido",
    source: "contact_status",
    scope: "order_support" as const,
    context: "order_status",
    message: "Olá! Gostaria de consultar o andamento do meu pedido.",
  },
];

export default function ContatoPageClient() {
  return (
    <AplicPageShell className={styles.page}>
      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            Fale com a Aplic
          </p>
          <h1 id="contact-title">
            Como podemos ajudar?
          </h1>
          <p>
            Orçamento, envio de arte ou acompanhamento: escolha o assunto e fale com a equipe pelo WhatsApp.
          </p>
          <div className={styles.serviceFacts}>
            <span><Clock3 aria-hidden="true" />{siteConfig.hours.label}</span>
            <span><MapPin aria-hidden="true" />Atendimento em toda {siteConfig.location.city}</span>
          </div>
        </div>

      </section>

      <section className={styles.options} aria-labelledby="contact-options-title">
        <header className="sr-only">
          <h2 id="contact-options-title" data-aplic-reveal="text" data-reveal-order="1">
            Escolha o assunto
          </h2>
        </header>
        <div className={styles.optionGrid}>
          {contactOptions.map((option, index) => (
            <article key={option.number} data-aplic-reveal="text" data-reveal-order={String(index)}>
              <span>{option.number}</span>
              <h3>{option.title}</h3>
              <p>{option.text}</p>
              <WhatsAppAction
                label={option.label}
                message={option.message}
                source={option.source}
                scope={option.scope}
                context={option.context}
                tone={index === 1 ? "light" : "lime"}
                showLeadingIcon={false}
              />
            </article>
          ))}
        </div>
      </section>

        <div className={styles.heroMedia}>
          <Image
            src="/images/campanha/hero-adesivo-faz-propaganda.webp"
            alt="Adesivo da campanha Faz Propaganda sendo aplicado"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 43vw"
          />
        </div>

      <section className={styles.info} aria-label="Informações de atendimento">
        <div data-aplic-reveal="text">
          <MessageCircleMore aria-hidden="true" />
          <p><strong>Atendimento online</strong> pelo WhatsApp, do orçamento à confirmação do pedido.</p>
        </div>
        <div data-aplic-reveal="text" data-reveal-order="1">
          <MapPin aria-hidden="true" />
          <BusinessDetails />
        </div>
      </section>
    </AplicPageShell>
  );
}
