import type { Metadata } from "next"
import SobrePageClient from "./SobrePageClient"
import { createPageMetadata } from "@/lib/site"

export const metadata: Metadata = createPageMetadata({
  title: "Sobre a gráfica online em Florianópolis",
  description:
    "Conheça a Aplic Gráfica: 15 anos de experiência, produção própria e atendimento online. Peça pelo WhatsApp, com entrega em toda Florianópolis.",
  path: "/sobre",
  keywords: [
    "sobre aplic gráfica",
    "gráfica rápida em florianópolis",
    "impressão digital florianópolis",
    "comunicação visual florianópolis",
  ],
})

export default function SobrePage() {
  return <SobrePageClient />
}
