"use client";

import { useId, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Zap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWhatsAppConversion } from "@/hooks/use-whatsapp-conversion";
import type { Product } from "@/lib/products-data";
import { getWhatsAppTrackingAttributes } from "@/lib/whatsapp-conversion";
import styles from "./product-card.module.css";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

type RevealScope = "aplic" | "nova" | "none";

export interface ProductCardProps {
  product: Product;
  displayName?: string;
  displayDescription?: string;
  imageSrc?: string;
  imagePosition?: string;
  eagerImage?: boolean;
  headingLevel?: "h2" | "h3";
  revealIndex?: number;
  revealScope?: RevealScope;
  conversionSource?: string;
  layout?: "card" | "detail";
  showDetailsLink?: boolean;
}

function getRevealProps(
  scope: RevealScope,
  type: "media" | "text",
  order: number,
) {
  if (scope === "none") return {};

  return scope === "nova"
    ? {
        "data-nova-reveal": type,
        "data-reveal-order": String(order),
      }
    : {
        "data-aplic-reveal": type,
        "data-reveal-order": String(order),
      };
}

export function ProductCard({
  product,
  displayName,
  displayDescription,
  imageSrc,
  imagePosition,
  eagerImage = false,
  headingLevel = "h2",
  revealIndex = 0,
  revealScope = "aplic",
  conversionSource = "product_catalog_card",
  layout = "card",
  showDetailsLink = true,
}: ProductCardProps) {
  const pathname = usePathname();
  const { getWhatsAppLinkProps } = useWhatsAppConversion();
  const selectorId = useId();
  const Title = headingLevel;
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);

  const currentPriceItem =
    product.priceTable[selectedPriceIndex] ?? product.priceTable[0];
  const selectorLabel = product.selectorLabel ?? "Quantidade";
  const itemUnit = product.itemUnit ?? "un.";
  const renderItemLabel = (item: typeof currentPriceItem) =>
    item.label ??
    (itemUnit ? `${item.quantidade} ${itemUnit}` : String(item.quantidade));

  const currentItemLabel = currentPriceItem
    ? renderItemLabel(currentPriceItem)
    : undefined;
  const formattedPrice = currentPriceItem
    ? currencyFormatter.format(currentPriceItem.valor)
    : undefined;
  const productionDays = currentPriceItem?.productionDays ?? product.productionDays;
  const quantityPhrase = currentPriceItem
    ? currentPriceItem.label
      ? `*${product.name} ${currentPriceItem.label}*`
      : `*${currentPriceItem.quantidade} unidades* de *${product.name}*`
    : `*${product.name}*`;
  const message = currentPriceItem
    ? `Olá! Gostaria de um orçamento para ${quantityPhrase}. Vi o valor de *${formattedPrice}* no site. Podemos confirmar a arte, o prazo e a entrega?`
    : `Olá! Gostaria de um orçamento para ${quantityPhrase}. Vou enviar o formato, a quantidade e uma arte ou referência para confirmar o valor e o prazo.`;
  const quantity = currentPriceItem
    ? currentPriceItem.label
      ? currentItemLabel
      : `${currentPriceItem.quantidade} ${itemUnit}`.trim()
    : undefined;
  const conversion = {
    message,
    source: conversionSource,
    product: product.name,
    productId: product.id,
    scope: currentPriceItem ? ("catalog_product" as const) : ("custom_order" as const),
    context: product.landingPage ?? "/produtos",
    variant: currentItemLabel,
    quantity,
    price: currentPriceItem?.valor,
  };

  return (
    <article
      className={`${styles.card} ${layout === "detail" ? styles.detail : ""}`}
      id={product.id}
      data-product-card={product.id}
      data-card-scope={revealScope}
    >
      <div
        className={styles.media}
        {...getRevealProps(revealScope, "media", revealIndex % 4)}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            className={styles.image}
            style={
              imagePosition ? { objectPosition: imagePosition } : undefined
            }
            loading={eagerImage ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={styles.image}
            sizes="(max-width: 639px) 88vw, (max-width: 1023px) 50vw, 25vw"
            quality={75}
          />
        )}

        {product.badge && <span className={styles.badge}>{product.badge}</span>}
      </div>

      <div
        className={styles.body}
        {...getRevealProps(revealScope, "text", (revealIndex % 4) + 1)}
      >
        <div className={styles.productInfo}>
          <Title className={styles.title}>
            {showDetailsLink && layout === "card" && product.landingPage ? (
              <Link
                className={styles.detailLink}
                href={`${product.landingPage}${currentPriceItem ? `#${product.id}` : ""}`}
              >
                <span>{displayName ?? product.name}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ) : displayName ?? product.name}
          </Title>
          <p className={styles.description}>
            {displayDescription ?? product.description}
          </p>

          <p
            className={`${styles.fulfillment} ${
              productionDays === 3 ? "" : styles.fulfillmentStandard
            }`}
          >
            {productionDays === 3 ? (
              <Zap aria-hidden="true" />
            ) : (
              <Clock3 aria-hidden="true" />
            )}
            {productionDays
              ? `Produção em até ${productionDays} dias úteis`
              : "Prazo a confirmar no orçamento"}
          </p>
        </div>

        <div className={styles.commerce}>
          {currentPriceItem ? (
            <div className={styles.selectorGroup}>
              <label className={styles.selectorLabel} htmlFor={selectorId}>
                {selectorLabel}
              </label>
              <Select
                value={selectedPriceIndex.toString()}
                onValueChange={(value) => setSelectedPriceIndex(Number(value))}
              >
                <SelectTrigger id={selectorId} className={styles.selectTrigger}>
                  <SelectValue
                    placeholder={`Selecione: ${selectorLabel.toLowerCase()}`}
                  >
                    {currentItemLabel}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {product.priceTable.map((item, index) => (
                    <SelectItem
                      key={`${item.label ?? item.quantidade}-${index}`}
                      value={index.toString()}
                    >
                      {renderItemLabel(item)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className={styles.selectorGroup}>
              <span className={styles.selectorLabel}>Pedido personalizado</span>
              <p className={styles.conditions}>
                Envie o formato, a quantidade e uma referência.
              </p>
            </div>
          )}

          <div className={styles.priceRow} aria-live="polite">
            <span className={styles.priceContext}>Valor</span>
            <strong className={currentPriceItem ? styles.price : styles.quotePrice}>
              {formattedPrice ?? "Sob orçamento"}
            </strong>
          </div>

          <p className={styles.conditions}>
            Frete, serviços de arte e prazo final confirmados no orçamento.
          </p>

          <a
            className={styles.cta}
            {...getWhatsAppTrackingAttributes({ ...conversion, pathname })}
            {...getWhatsAppLinkProps(message, conversionSource, product.name, {
              scope: conversion.scope,
              context: conversion.context,
              productId: conversion.productId,
              variant: conversion.variant,
              quantity: conversion.quantity,
              price: conversion.price,
            }, pathname)}
          >
            <span>Pedir orçamento</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
