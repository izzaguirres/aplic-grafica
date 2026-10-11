# Aplic Gráfica

**Gráfica & Marketing · Florianópolis, SC**

Site comercial da Aplic, com catálogo de materiais gráficos, opções de tamanho e quantidade, preços por variação e orçamento pelo WhatsApp. O atendimento é online, com entrega e retirada combinadas.

[Visitar o site](https://aplicgrafica.com.br) · [Explorar o catálogo](https://aplicgrafica.com.br/produtos) · [Documentação técnica](DOCUMENTATION.md)

## O projeto

- Catálogo com busca, famílias de produtos e seleção de variações.
- Páginas de cartões, panfletos, banners, etiquetas, crachás, pastas e blocos.
- Orçamento com produto, quantidade e preço selecionados na mensagem do WhatsApp.
- Páginas institucionais, metadados, dados estruturados, sitemap e robots.
- Atribuição de origem e eventos de clique integrados ao Google Tag Manager.

As condições finais de produção, arte e entrega são confirmadas no atendimento. Um clique no WhatsApp não comprova conversa, orçamento ou venda.

## Stack

| Camada | Tecnologia |
|---|---|
| Aplicação | Next.js 16 · App Router · React 19 · TypeScript |
| Interface | CSS Modules · Tailwind CSS 3 · Radix UI / shadcn/ui |
| Tipografia | Google Sans Flex hospedada localmente |
| Hospedagem | Vercel · Node.js 22 |
| Mensuração | Google Tag Manager · Atlas/Pixerun · mrkr via GTM · Vercel Analytics |

As versões exatas estão em [package-lock.json](package-lock.json). O repositório usa npm.

## Desenvolvimento local

Use Node.js 22 e npm. Para um clone novo:

```bash
git clone https://github.com/izzaguirres/aplic-grafica.git
cd aplic-grafica
npm ci
cp env.example .env.local
npm run dev -- --webpack
```

Acesse [localhost:3000](http://localhost:3000).

O exemplo de ambiente inclui apenas variáveis lidas pela aplicação:

- `NEXT_PUBLIC_SITE_URL`: origem canônica usada nos metadados; o padrão é o domínio oficial.
- `NEXT_PUBLIC_GTM_ID`: contêiner do GTM; deixe vazio no desenvolvimento para não carregar o contêiner de produção.

A variável `VERCEL_ENV` é fornecida pela Vercel. Ela identifica a produção para a entrega do mrkr via GTM. O Atlas/Pixerun possui carregador próprio no layout; omitir o GTM não desativa todas as ferramentas de medição. Consulte o [contrato de tracking](docs/tracking-setup.md) antes de fazer QA com cliques reais.

## Comandos

| Comando | Uso |
|---|---|
| `npm run dev -- --webpack` | Desenvolvimento local com Webpack |
| `npm run type-check` | Verificação de tipos |
| `npm run lint` | ESLint |
| `npm run build` | Build de produção |
| `npm start` | Executar um build existente |

A existência de um comando não significa que o check passou no seu checkout. Registre a validação para o commit que será publicado.

## Onde alterar

| Área | Fonte |
|---|---|
| Home | [app/page.tsx](app/page.tsx) e [app/nova-home/page.tsx](app/nova-home/page.tsx) |
| Produtos, variações e preços | [lib/products-data.ts](lib/products-data.ts) |
| Marca, domínio, contatos e metadados | [lib/site.ts](lib/site.ts) |
| Tokens visuais | [app/aplic-design-system.css](app/aplic-design-system.css) |
| Landings e cards compartilhados | [components/site/](components/site/) |
| Eventos e atribuição | [lib/whatsapp-conversion.ts](lib/whatsapp-conversion.ts) e [lib/attribution.ts](lib/attribution.ts) |
| Integrações globais | [app/layout.tsx](app/layout.tsx) |
| Imagens e mídia | [public/images/](public/images/) |

## Documentação

- [Arquitetura e mapa do código](DOCUMENTATION.md)
- [Repositório, remotes e colaboração](GITHUB_SETUP.md)
- [Publicação na Vercel](DEPLOY.md)
- [Tracking e limites da mensuração](docs/tracking-setup.md)

Os relatórios antigos de status, dependências e proteções estão identificados como históricos. Não representam a versão ou a validação do commit atual. O guia técnico indica as fontes vigentes e os registros anteriores.

## Links

- **Site oficial:** [aplicgrafica.com.br](https://aplicgrafica.com.br)
- **Repositório:** [izzaguirres/aplic-grafica](https://github.com/izzaguirres/aplic-grafica)
- **Instagram:** [@aplicgrafica](https://www.instagram.com/aplicgrafica/)

Desenvolvimento por [Leonardo Izaguirres](https://github.com/izzaguirres).
