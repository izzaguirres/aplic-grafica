# Documentação técnica — Aplic Gráfica

Mapa do código vigente na `main`. Comece pelo [README](README.md) para instalar e executar o projeto.

## Arquitetura

A aplicação usa Next.js 16 com App Router, React 19 e TypeScript. O catálogo está em código; o fluxo comercial direciona o pedido ao WhatsApp. Não há checkout ou confirmação de pagamento implementados neste fluxo.

| Responsabilidade | Fonte |
|---|---|
| Layout, fonte, integrações e metadados globais | [app/layout.tsx](app/layout.tsx) |
| Home oficial | [app/page.tsx](app/page.tsx), que renderiza [app/nova-home/page.tsx](app/nova-home/page.tsx) |
| Catálogo e filtros | [app/produtos/](app/produtos/) |
| Dados dos produtos | [lib/products-data.ts](lib/products-data.ts) |
| Cards e páginas de produto | [components/site/](components/site/) |
| Navegação e rodapé | [components/Header.tsx](components/Header.tsx) e [components/Footer.tsx](components/Footer.tsx) |
| Identidade, domínio e helpers de SEO | [lib/site.ts](lib/site.ts) |
| Sitemap e robots | [app/sitemap.ts](app/sitemap.ts) e [app/robots.ts](app/robots.ts) |
| Design system | [app/aplic-design-system.css](app/aplic-design-system.css), [app/globals.css](app/globals.css), CSS Modules dos componentes |
| Segurança HTTP | [middleware.ts](middleware.ts), [next.config.mjs](next.config.mjs) e [vercel.json](vercel.json) |

A pasta `components/ui/` contém os componentes base. A configuração de aliases está em [tsconfig.json](tsconfig.json), a de lint em [eslint.config.mjs](eslint.config.mjs).

## Rotas

- Institucionais: `/`, `/sobre`, `/contato`, `/grafica-em-floripa`.
- Catálogo: `/produtos`.
- Produtos: `/cartao-de-visita`, `/panfleto`, `/banner`, `/etiquetas-adesivas`, `/cracha`, `/pasta-com-bolso`, `/blocos-receituario`.
- `/nova-home` mantém a implementação da home que também é usada em `/`.
- `POST /api/contact` é uma rota legada e responde **410**. Ela não envia e-mail. O atendimento atual está na [página de contato](app/contato/ContatoPageClient.tsx).

## Catálogo e conteúdo

Preços, quantidades, formatos e prazos dos cards vêm de `lib/products-data.ts`. As FAQs e os metadados específicos ficam nas respectivas páginas de produto. Confira a correspondência entre essas fontes antes de mudar uma oferta; a presença de um valor no código não substitui a confirmação comercial.

A identidade visual vem dos tokens e componentes existentes. Documentação ou galerias de design ainda não integradas à `main` não são parte desta entrega. O histórico de QA não certifica um diff novo.

## Ambiente e tracking

[env.example](env.example) e [env.local.example](env.local.example) documentam `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_GTM_ID`, lidas pelo código. Valores com prefixo `NEXT_PUBLIC_` são públicos no navegador; não coloque credenciais neles. Não são necessárias credenciais de e-mail para o fluxo atual.

- GTM: [components/google-tag-manager.tsx](components/google-tag-manager.tsx).
- Atribuição: [components/AttributionCapture.tsx](components/AttributionCapture.tsx) e [lib/attribution.ts](lib/attribution.ts).
- WhatsApp: [hooks/use-whatsapp-conversion.ts](hooks/use-whatsapp-conversion.ts) e [lib/whatsapp-conversion.ts](lib/whatsapp-conversion.ts).
- Atlas/Pixerun: carregador próprio no layout raiz.
- mrkr: entrega pelo GTM, usando o marcador de produção do layout; não reinstalar carregador direto.

Veja o [contrato de tracking](docs/tracking-setup.md). Clique, conversa, orçamento e venda precisam de evidências diferentes.

## Publicação e manutenção

Consulte [DEPLOY.md](DEPLOY.md) para o projeto Vercel existente e [GITHUB_SETUP.md](GITHUB_SETUP.md) para Git e worktrees. `package.json` define as faixas de dependências; `package-lock.json` registra as versões resolvidas. Alterações de dependências, tracking e configurações de produção exigem sua própria validação.

## Registros históricos

Estes arquivos foram preservados para consulta, mas seus exemplos e resultados não comprovam o estado atual:

- [DEPENDENCIES.md](DEPENDENCIES.md): inventário anterior de bibliotecas e versões.
- [STATUS.md](STATUS.md): snapshot anterior de build e funcionalidades.
- [PROTECTION_SUMMARY.md](PROTECTION_SUMMARY.md): relatório anterior de controles.
- [SECURITY.md](SECURITY.md): orientações e descrições anteriores de segurança; conferir a implementação vigente.
- [design-qa.md](design-qa.md): evidências de uma rodada anterior de interface.

Atualizado em 11/10/2026, a partir da `main` com o tracking de 06/10 incorporado. Esta atualização documental não é uma auditoria de segurança nem uma nova medição comercial.
