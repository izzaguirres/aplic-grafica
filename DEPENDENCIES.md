# 📦 Dependências do Projeto - Aplic Gráfica Site

> **Registro histórico.** As versões e os comandos abaixo não são o inventário vigente. Consulte [package.json](package.json), [package-lock.json](package-lock.json) e o [README](README.md) antes de instalar ou atualizar bibliotecas.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Dependências Principais](#dependências-principais)
- [Dependências de Desenvolvimento](#dependências-de-desenvolvimento)
- [shadcn/ui Components](#shadcnui-components)
- [Radix UI](#radix-ui)
- [Formulários e Validação](#formulários-e-validação)
- [Estilização](#estilização)
- [Ícones](#ícones)
- [Temas](#temas)
- [Animações](#animações)
- [Utilitários](#utilitários)
- [Atualizações](#atualizações)

---

## 🎯 Visão Geral

Este documento detalha todas as dependências utilizadas no projeto **Aplic Gráfica Site**, explicando o propósito de cada uma e como elas se integram ao ecossistema.

### Versões Principais
- **Next.js**: 14.2.16
- **React**: 18.x
- **TypeScript**: 5.x
- **Tailwind CSS**: 3.4.17
- **Node.js**: 18.17+ (recomendado)

---

## 🚀 Dependências Principais

### Next.js 14.2.16
```json
"next": "14.2.16"
```
**Propósito**: Framework React com App Router, SSR, SSG e otimizações automáticas.

**Recursos utilizados**:
- App Router (nova arquitetura de roteamento)
- Server Components
- Image Optimization
- Font Optimization
- API Routes
- Middleware
- Metadata API

**Benefícios**:
- Performance otimizada
- SEO automático
- Code splitting
- Hot reloading
- TypeScript nativo

### React 18
```json
"react": "^18",
"react-dom": "^18"
```
**Propósito**: Biblioteca JavaScript para interfaces de usuário.

**Recursos utilizados**:
- Hooks (useState, useEffect, useRef)
- Context API
- Server Components
- Concurrent Features

### TypeScript 5
```json
"typescript": "^5"
```
**Propósito**: Superset JavaScript com tipagem estática.

**Benefícios**:
- Type safety
- IntelliSense melhorado
- Detecção de erros em tempo de desenvolvimento
- Melhor refatoração

---

## 🛠️ Dependências de Desenvolvimento

### TypeScript Types
```json
"@types/node": "^22",
"@types/react": "^18",
"@types/react-dom": "^18"
```
**Propósito**: Definições de tipos para TypeScript.

### PostCSS e Autoprefixer
```json
"postcss": "^8.5",
"autoprefixer": "^10.4.20"
```
**Propósito**: Processamento CSS e prefixos automáticos.

### Tailwind CSS
```json
"tailwindcss": "^3.4.17"
```
**Propósito**: Framework CSS utilitário.

---

## 🎨 shadcn/ui Components

### Componentes Base
```json
"@radix-ui/react-slot": "latest"
```
**Propósito**: Componente base para composição de componentes.

### Formulários
```json
"@radix-ui/react-label": "2.1.1",
"@radix-ui/react-checkbox": "1.1.3",
"@radix-ui/react-select": "2.1.4",
"@radix-ui/react-textarea": "1.1.1"
```
**Propósito**: Componentes de formulário acessíveis.

### Navegação
```json
"@radix-ui/react-navigation-menu": "1.2.3",
"@radix-ui/react-dropdown-menu": "2.1.4",
"@radix-ui/react-menubar": "1.1.4"
```
**Propósito**: Componentes de navegação.

### Feedback
```json
"@radix-ui/react-toast": "1.2.4",
"@radix-ui/react-alert-dialog": "1.1.4",
"@radix-ui/react-dialog": "1.1.4",
"@radix-ui/react-popover": "1.1.4",
"@radix-ui/react-tooltip": "1.1.6"
```
**Propósito**: Componentes de feedback e interação.

### Layout
```json
"@radix-ui/react-separator": "1.1.1",
"@radix-ui/react-scroll-area": "1.2.2",
"@radix-ui/react-aspect-ratio": "1.1.1"
```
**Propósito**: Componentes de layout e estrutura.

### Interação
```json
"@radix-ui/react-switch": "1.1.2",
"@radix-ui/react-toggle": "1.1.1",
"@radix-ui/react-toggle-group": "1.1.1",
"@radix-ui/react-slider": "1.2.2",
"@radix-ui/react-progress": "1.1.1",
"@radix-ui/react-radio-group": "1.2.2"
```
**Propósito**: Componentes interativos.

### Estrutura
```json
"@radix-ui/react-accordion": "1.2.2",
"@radix-ui/react-collapsible": "1.1.2",
"@radix-ui/react-context-menu": "2.2.4",
"@radix-ui/react-hover-card": "1.1.4",
"@radix-ui/react-avatar": "1.1.2"
```
**Propósito**: Componentes estruturais e de organização.

---

## 🎭 Radix UI

### Visão Geral
Radix UI fornece componentes primitivos acessíveis e sem estilos, que são a base dos componentes shadcn/ui.

**Características**:
- Acessibilidade nativa
- Sem estilos (headless)
- Comportamento consistente
- Suporte a teclado
- Screen reader friendly

### Componentes Utilizados

#### Formulários
- **Label**: Rótulos acessíveis
- **Checkbox**: Caixas de seleção
- **Select**: Seletores dropdown
- **Textarea**: Áreas de texto

#### Navegação
- **Navigation Menu**: Menu de navegação
- **Dropdown Menu**: Menus dropdown
- **Menubar**: Barra de menus

#### Feedback
- **Toast**: Notificações toast
- **Alert Dialog**: Diálogos de alerta
- **Dialog**: Modais e diálogos
- **Popover**: Popovers
- **Tooltip**: Tooltips

#### Layout
- **Separator**: Separadores visuais
- **Scroll Area**: Áreas com scroll
- **Aspect Ratio**: Controle de proporção

#### Interação
- **Switch**: Interruptores
- **Toggle**: Botões toggle
- **Toggle Group**: Grupos de toggle
- **Slider**: Controles deslizantes
- **Progress**: Barras de progresso
- **Radio Group**: Grupos de radio

---

## 📝 Formulários e Validação

### React Hook Form
```json
"react-hook-form": "latest"
```
**Propósito**: Gerenciamento de formulários com performance otimizada.

**Recursos utilizados**:
- Controle de estado de formulários
- Validação integrada
- Performance otimizada
- Redução de re-renders

### Zod
```json
"zod": "^3.24.1"
```
**Propósito**: Validação de schemas TypeScript-first.

**Recursos utilizados**:
- Validação de tipos
- Schemas de validação
- Inferência de tipos
- Mensagens de erro customizadas

### Hookform Resolvers
```json
"@hookform/resolvers": "latest"
```
**Propósito**: Integração entre React Hook Form e Zod.

**Benefícios**:
- Validação type-safe
- Integração perfeita
- Mensagens de erro consistentes

---

## 🎨 Estilização

### Tailwind CSS
```json
"tailwindcss": "^3.4.17"
```
**Propósito**: Framework CSS utilitário.

**Recursos utilizados**:
- Classes utilitárias
- Sistema de cores customizado
- Responsividade
- Dark mode
- Animações

### Tailwind CSS Animate
```json
"tailwindcss-animate": "^1.0.7"
```
**Propósito**: Animações CSS para Tailwind.

**Animações utilizadas**:
- Fade in/out
- Slide in/out
- Accordion animations
- Hover effects

### Class Variance Authority
```json
"class-variance-authority": "^0.7.1"
```
**Propósito**: Gerenciamento de variantes de componentes.

**Benefícios**:
- Variantes type-safe
- Composição de classes
- Reutilização de estilos

### Tailwind Merge
```json
"tailwind-merge": "^2.5.5"
```
**Propósito**: Merge inteligente de classes Tailwind.

**Benefícios**:
- Resolução de conflitos
- Classes duplicadas removidas
- Performance otimizada

### CLSX
```json
"clsx": "^2.1.1"
```
**Propósito**: Utilitário para composição de classes CSS.

**Recursos**:
- Composição condicional
- Arrays e objetos
- Performance otimizada

---

## 🎯 Ícones

### Lucide React
```json
"lucide-react": "^0.454.0"
```
**Propósito**: Biblioteca de ícones SVG.

**Ícones utilizados**:
- MessageCircle (WhatsApp)
- ArrowRight (setas)
- CheckCircle (sucesso)
- AlertCircle (erro)
- Loader2 (loading)
- Sun/Moon (tema)
- Phone, Mail, Clock, MapPin (contato)
- Sparkles, Star (destaque)

**Características**:
- Ícones SVG
- Customizáveis
- Tree-shakable
- Consistentes

---

## 🌓 Temas

### Next Themes
```json
"next-themes": "latest"
```
**Propósito**: Gerenciamento de temas (claro/escuro).

**Recursos utilizados**:
- Toggle de tema
- Persistência de preferência
- Detecção automática do sistema
- SSR safe

**Configuração**:
```typescript
<ThemeProvider 
  attribute="class" 
  defaultTheme="light" 
  enableSystem 
  disableTransitionOnChange
>
```

---

## ✨ Animações

### Embla Carousel React
```json
"embla-carousel-react": "8.5.1"
```
**Propósito**: Carrossel acessível e performático.

**Recursos utilizados**:
- Carrossel de depoimentos
- Navegação por gestos
- Autoplay
- Responsivo

### React Resizable Panels
```json
"react-resizable-panels": "^2.1.7"
```
**Propósito**: Painéis redimensionáveis.

### Vaul
```json
"vaul": "^0.9.6"
```
**Propósito**: Drawer component.

---

## 📊 Utilitários

### Date FNS
```json
"date-fns": "4.1.0"
```
**Propósito**: Manipulação de datas.

### Recharts
```json
"recharts": "2.15.0"
```
**Propósito**: Gráficos React.

### Sonner
```json
"sonner": "^1.7.1"
```
**Propósito**: Notificações toast modernas.

### Geist
```json
"geist": "^1.3.1"
```
**Propósito**: Font family alternativa.

### Input OTP
```json
"input-otp": "1.4.1"
```
**Propósito**: Input para códigos OTP.

### React Day Picker
```json
"react-day-picker": "9.8.0"
```
**Propósito**: Seletor de datas.

### CMDK
```json
"cmdk": "1.0.4"
```
**Propósito**: Command palette component.

---

## 🔄 Atualizações

### Comandos de Atualização

#### Atualizar Todas as Dependências
```bash
# Verificar dependências desatualizadas
pnpm outdated

# Atualizar todas as dependências
pnpm update

# Atualizar dependências específicas
pnpm add package@latest
```

#### Atualizar Next.js
```bash
# Atualizar Next.js e React
pnpm add next@latest react@latest react-dom@latest

# Verificar breaking changes
pnpm build
```

#### Atualizar shadcn/ui
```bash
# Atualizar componentes
npx shadcn@latest add --yes

# Atualizar CLI
npm install -g shadcn@latest
```

### Verificação de Segurança
```bash
# Verificar vulnerabilidades
pnpm audit

# Corrigir vulnerabilidades automaticamente
pnpm audit --fix
```

### Limpeza
```bash
# Limpar cache
pnpm store prune

# Remover node_modules e reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 📋 Checklist de Dependências

### ✅ Essenciais
- [x] Next.js 14
- [x] React 18
- [x] TypeScript 5
- [x] Tailwind CSS 3.4
- [x] shadcn/ui components
- [x] React Hook Form
- [x] Zod
- [x] Lucide React
- [x] Next Themes

### ✅ Opcionais
- [x] Embla Carousel
- [x] Sonner (toast)
- [x] Date FNS
- [x] Recharts
- [x] Input OTP
- [x] React Day Picker

### 🔄 Futuras Considerações
- [ ] React Query (para cache de dados)
- [ ] Zustand (para gerenciamento de estado)
- [ ] Framer Motion (para animações avançadas)
- [ ] React Hook Form DevTools (para debug)
- [ ] MSW (para mock de API)

---

## 📚 Recursos Adicionais

### Documentação Oficial
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)

### Comunidade
- [Next.js Discord](https://discord.gg/nextjs)
- [React Community](https://reactjs.org/community)
- [Tailwind CSS Discord](https://discord.gg/tailwindcss)

---

**Última atualização**: Dezembro 2024  
**Versão do documento**: 1.0.0 