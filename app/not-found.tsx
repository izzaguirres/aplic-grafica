import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Página não encontrada | Aplic Gráfica" },
  description: "Esta página não foi encontrada. Veja os produtos ou fale com a Aplic Gráfica.",
  robots: null,
  alternates: null,
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <section className="container mx-auto px-6 pb-24 pt-40">
      <p className="mb-4 font-semibold">404</p>
      <h1 className="text-4xl font-semibold">Página não encontrada</h1>
      <p className="my-6">Confira nossos materiais gráficos ou fale com a equipe.</p>
      <div className="flex flex-wrap gap-6 underline underline-offset-4">
        <Link href="/">Voltar ao início</Link>
        <Link href="/produtos">Ver produtos</Link>
        <Link href="/contato">Falar com a Aplic</Link>
      </div>
    </section>
  );
}
