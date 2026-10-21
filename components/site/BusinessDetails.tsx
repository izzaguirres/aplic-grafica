import { siteConfig } from "@/lib/site";
import { BusinessWhatsAppLink } from "./BusinessWhatsAppLink";
import styles from "./business-details.module.css";

export function BusinessDetails() {
  const { location, hours } = siteConfig;
  return (
    <div className={styles.details}>
      <strong>{siteConfig.name}</strong>
      <span>Gráfica online com produção própria.</span>
      <span>Atendimento em toda {location.city}.</span>
      <BusinessWhatsAppLink />
      <span>{hours.label}</span>
      <span>{siteConfig.onlineServiceNote}</span>
    </div>
  );
}
