"use client"

import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWhatsAppConversion } from "@/hooks/use-whatsapp-conversion"
import { BusinessDetails } from "@/components/site/BusinessDetails"
import { getYearsInBusiness, siteConfig } from "@/lib/site"
import { getWhatsAppTrackingAttributes } from "@/lib/whatsapp-conversion"

export function Footer() {
  const { handleWhatsAppClick } = useWhatsAppConversion()
  const years = getYearsInBusiness()
  const footerConversion = {
    source: "footer",
    scope: "general_quote" as const,
    context: "site_footer",
  }

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-foreground to-foreground/90" />

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {/* Logo e Descrição */}
          <div className="space-y-4 md:space-y-6 lg:col-span-2">
            <div className="flex items-center">
              <div className="relative h-8 md:h-10 w-32 md:w-40">
                <Image
                  src="/images/logo2.png"
                  alt="Aplic Gráfica"
                  fill
                  loading="lazy"
                  className="object-contain"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            </div>
            <p className="text-background/80 leading-relaxed max-w-md text-sm md:text-base">
              Gráfica online com produção própria e {years} anos de mercado.
              Orçamento pelo WhatsApp e entrega em toda Florianópolis.
            </p>
            <Button 
              data-footer-whatsapp
              {...getWhatsAppTrackingAttributes(footerConversion)}
              onClick={() =>
                handleWhatsAppClick(undefined, footerConversion.source, undefined, {
                  scope: footerConversion.scope,
                  context: footerConversion.context,
                })
              }
              variant="secondary" 
              className="font-medium"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Falar no WhatsApp
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="font-semibold text-base md:text-lg">Links Rápidos</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-background/80 [@media(hover:hover)_and_(pointer:fine)]:hover:text-primary transition-colors motion-reduce:transition-none flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 motion-safe:[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" />
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos"
                  className="text-background/80 [@media(hover:hover)_and_(pointer:fine)]:hover:text-primary transition-colors motion-reduce:transition-none flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 motion-safe:[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" />
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="/grafica-em-floripa"
                  className="text-background/80 [@media(hover:hover)_and_(pointer:fine)]:hover:text-primary transition-colors motion-reduce:transition-none flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 motion-safe:[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" />
                  Áreas atendidas
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-background/80 [@media(hover:hover)_and_(pointer:fine)]:hover:text-primary transition-colors motion-reduce:transition-none flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 motion-safe:[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" />
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-background/80 [@media(hover:hover)_and_(pointer:fine)]:hover:text-primary transition-colors motion-reduce:transition-none flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 motion-safe:[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" />
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Produtos */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="font-semibold text-base md:text-lg">Produtos</h3>
            <ul className="space-y-2 md:space-y-3">
              {[
                { label: "Cartão de Visita", href: "/cartao-de-visita" },
                { label: "Panfleto", href: "/panfleto" },
                { label: "Banner em Lona", href: "/banner" },
                { label: "Crachá Empresarial", href: "/cracha" },
                { label: "Etiquetas Adesivas", href: "/etiquetas-adesivas" },
                { label: "Pasta com Bolso", href: "/pasta-com-bolso" },
                { label: "Blocos e Receituário", href: "/blocos-receituario" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-background/80 [@media(hover:hover)_and_(pointer:fine)]:hover:text-primary transition-colors motion-reduce:transition-none flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 motion-safe:[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="font-semibold text-base md:text-lg">Contato</h3>
            <div className="space-y-3 md:space-y-4">
              <BusinessDetails />
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="text-background/80 text-xs md:text-sm break-words">{siteConfig.email}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Aplic Gráfica. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Desenvolvido por <a href="https://www.serotiva.com" target="_blank" rel="noopener noreferrer" className="font-bold text-[#E6FF50] [@media(hover:hover)_and_(pointer:fine)]:hover:underline">Serotiva</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
