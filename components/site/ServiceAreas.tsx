import Link from "next/link";
import { siteConfig } from "@/lib/site";
import styles from "./service-areas.module.css";

export function ServiceAreas({ showDetailsLink = true }: { showDetailsLink?: boolean }) {
  return (
    <section className={styles.section} aria-labelledby="service-areas-title">
      <div>
        <h2 id="service-areas-title">Atendemos toda a Ilha</h2>
        <p>
          A Aplic é uma gráfica online com produção própria e entrega em toda Florianópolis.
          Escolha seu produto no site, envie a arte pelo WhatsApp e aprove o orçamento antes da produção.
        </p>
        {showDetailsLink && <Link href="/grafica-em-floripa">Conheça as áreas atendidas</Link>}
      </div>
      <div>
        <ul aria-label="Bairros atendidos em Florianópolis">
          {siteConfig.location.neighborhoods.map((name) => <li key={name}>{name}</li>)}
        </ul>
        <p>E demais bairros de Florianópolis.</p>
        <p>O prazo e o custo da entrega são confirmados no atendimento. Não há atendimento presencial.</p>
      </div>
    </section>
  );
}
