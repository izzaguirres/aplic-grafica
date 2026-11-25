"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MessageCircle } from "lucide-react"
import { useWhatsAppConversion } from "@/hooks/use-whatsapp-conversion"
import { getWhatsAppTrackingAttributes } from "@/lib/whatsapp-conversion"
import styles from "./mobile-whatsapp-bar.module.css"

const conversion = {
  source: "mobile_sticky_bar",
  scope: "general_quote" as const,
  context: "mobile_sticky_bar",
}

/**
 * Barra fixa de WhatsApp no celular (até 767px). Aparece depois que o topo da
 * página sai da tela, para não cobrir o botão principal do hero.
 */
export function MobileWhatsAppBar() {
  const pathname = usePathname()
  const { getWhatsAppLinkProps } = useWhatsAppConversion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div className={styles.bar} data-visible={visible ? "true" : "false"} data-mobile-whatsapp-bar>
      <a
        className={styles.link}
        tabIndex={visible ? 0 : -1}
        aria-hidden={visible ? undefined : true}
        {...getWhatsAppTrackingAttributes({ ...conversion, pathname })}
        {...getWhatsAppLinkProps(undefined, conversion.source, undefined, {
          scope: conversion.scope,
          context: conversion.context,
        }, pathname)}
      >
        <MessageCircle aria-hidden="true" />
        <span>Pedir orçamento no WhatsApp</span>
      </a>
    </div>
  )
}
