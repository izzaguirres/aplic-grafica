import Link from "next/link";
import { productLinks } from "@/lib/product-links";
import styles from "./product-links.module.css";

export function ProductLinks({ currentPath }: { currentPath?: string }) {
  return (
    <nav className={styles.links} aria-label={currentPath ? "Produtos relacionados" : "Produtos da gráfica"}>
      <p>{currentPath ? "Veja também" : "Encontre seu impresso"}</p>
      <ul>
        {productLinks.filter((link) => link.href !== currentPath).map((link) => (
          <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
        ))}
        <li><Link href="/contato">Contato e retirada</Link></li>
      </ul>
    </nav>
  );
}
