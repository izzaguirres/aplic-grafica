import { siteConfig } from "@/lib/site";
import styles from "./business-details.module.css";

export function BusinessDetails() {
  const { location, hours } = siteConfig;
  return (
    <address className={styles.details}>
      <strong>{siteConfig.name}</strong>
      {location.confirmedAddress && <span>{location.confirmedAddress.streetAddress}</span>}
      <span>{location.neighborhood}, {location.city}/{location.region}</span>
      {location.confirmedAddress && <span>CEP {location.confirmedAddress.postalCode}</span>}
      <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phoneDisplay}</a>
      <span>{hours.label}</span>
      <span>{location.operationalOfficeNote}</span>
    </address>
  );
}
