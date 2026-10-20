"use client"

import { useState, useEffect, useRef } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWhatsAppConversion } from "@/hooks/use-whatsapp-conversion"
import { getWhatsAppTrackingAttributes } from "@/lib/whatsapp-conversion"
import mobileMenuStyles from "./header-mobile-menu.module.css"

// Hoisted: array estático fora do componente para evitar recriação a cada render
const navItems = [
  { name: "Início", href: "/" },
  { name: "Produtos", href: "/produtos" },
  { name: "Sobre", href: "/sobre" },
  { name: "Contato", href: "/contato" },
] as const

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const { handleWhatsAppClick } = useWhatsAppConversion()
  const [isOpen, setIsOpen] = useState(false)
  const desktopNavigationRef = useRef<HTMLElement>(null)
  const isHome = pathname === "/" || pathname === "/nova-home"
  const headerConversion = {
    source: "header",
    scope: "general_quote" as const,
    context: "desktop_navigation",
  }
  const mobileHeaderConversion = {
    source: "header_mobile",
    scope: "general_quote" as const,
    context: "mobile_navigation",
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isHome) {
        const hero = document.querySelector<HTMLElement>("[data-nova-home-hero-surface]")

        if (hero) {
          setIsScrolled(hero.getBoundingClientRect().top <= 96)
          return
        }
      }

      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [isHome, pathname])

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)")
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false)
    }

    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [])

  return (
    <header
      data-site-header
      data-over-hero={isHome && !isScrolled ? "true" : undefined}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,padding] duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-[#CDD2D7]/50 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group" aria-label="Aplic Gráfica">
          <div data-site-brand-icon className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110 flex-shrink-0">
            <Image
              src="/images/favicon.png"
              alt="Aplic Gráfica Ícone"
              fill
              unoptimized
              loading="eager"
              className="object-contain"
              sizes="40px"
            />
          </div>
          <div data-site-wordmark className="relative h-6 w-24 md:h-8 md:w-32 transition-opacity duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-80">
            <Image
              src="/images/logo.png"
              alt="Aplic Gráfica"
              fill
              unoptimized
              loading="eager"
              className="object-contain object-left"
              sizes="(max-width: 768px) 96px, 128px"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav ref={desktopNavigationRef} className="hidden md:flex items-center space-x-2" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={pathname === item.href || (item.href === "/" && isHome) ? "page" : undefined}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#052c23] ${
                isScrolled
                ? "text-zinc-800 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-zinc-100 [@media(hover:hover)_and_(pointer:fine)]:hover:text-black"
                : "text-zinc-800 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/50 [@media(hover:hover)_and_(pointer:fine)]:hover:text-black"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button
            {...getWhatsAppTrackingAttributes(headerConversion)}
            onClick={() =>
              handleWhatsAppClick(undefined, headerConversion.source, undefined, {
                scope: headerConversion.scope,
                context: headerConversion.context,
              })
            }
            data-header-cta
            className="ml-4 bg-[#18181b] text-[#E6FF50] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#18181b]/90 font-bold rounded-xl shadow-md [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-lg transition-[background-color,box-shadow]"
          >
            <span>Fazer orçamento</span>
            <span data-header-cta-icon aria-hidden="true">
              <ArrowUpRight />
            </span>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
            <DialogPrimitive.Trigger asChild>
              <Button variant="ghost" size="icon" className="text-[#28282D]">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay
                className={mobileMenuStyles.overlay}
              />
              <DialogPrimitive.Content
                className={mobileMenuStyles.content}
                onCloseAutoFocus={(event) => {
                  if (!window.matchMedia("(min-width: 768px)").matches) return

                  event.preventDefault()
                  const navigation = desktopNavigationRef.current
                  const target = navigation?.querySelector<HTMLAnchorElement>(
                    'a[aria-current="page"]',
                  ) ?? navigation?.querySelector<HTMLAnchorElement>("a")
                  target?.focus({ preventScroll: true })
                }}
              >
                <div className={mobileMenuStyles.header}>
                  <DialogPrimitive.Title className={mobileMenuStyles.title}>
                    Menu
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="sr-only">
                    Navegue pelas páginas do site
                  </DialogPrimitive.Description>
                  <DialogPrimitive.Close
                    className={mobileMenuStyles.closeButton}
                    aria-label="Fechar menu"
                  >
                    <X aria-hidden="true" />
                  </DialogPrimitive.Close>
                </div>

                <nav className={mobileMenuStyles.links} aria-label="Navegação mobile">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                      || (item.href === "/" && pathname === "/nova-home")

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={mobileMenuStyles.link}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>

                <button
                  type="button"
                  {...getWhatsAppTrackingAttributes(mobileHeaderConversion)}
                  onClick={() => {
                    handleWhatsAppClick(
                      undefined,
                      mobileHeaderConversion.source,
                      undefined,
                      {
                        scope: mobileHeaderConversion.scope,
                        context: mobileHeaderConversion.context,
                      },
                    )
                    setIsOpen(false)
                  }}
                  className={mobileMenuStyles.cta}
                >
                  <span>Fazer orçamento</span>
                  <ArrowUpRight aria-hidden="true" />
                </button>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  )
}
