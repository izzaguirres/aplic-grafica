import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = new URL("../lib/sitemap-dates.json", import.meta.url);
const shared = ["app/layout.tsx", "components/Footer.tsx", "components/site/BusinessDetails.tsx", "lib/site.ts"];
const product = ["components/site/ProductLandingPage.tsx", "components/site/ProductCard.tsx", "components/site/ProductLinks.tsx", "lib/product-links.ts", "lib/products-data.ts"];
const pages = {
  "/": ["app/page.tsx", "app/nova-home/page.tsx", "components/site/ServiceAreas.tsx", "components/nova-home/ProductCardV2.tsx", "lib/products-data.ts"],
  "/produtos": ["app/produtos/page.tsx", "app/produtos/ProdutosPageClient.tsx", "lib/catalog-faqs.ts", ...product],
  "/sobre": ["app/sobre/page.tsx", "app/sobre/SobrePageClient.tsx"],
  "/contato": ["app/contato/page.tsx", "app/contato/ContatoPageClient.tsx"],
  "/cartao-de-visita": ["app/cartao-de-visita/page.tsx", ...product],
  "/panfleto": ["app/panfleto/page.tsx", ...product],
  "/banner": ["app/banner/page.tsx", ...product],
  "/cracha": ["app/cracha/page.tsx", ...product],
  "/grafica-em-floripa": ["app/grafica-em-floripa/page.tsx", "components/site/ServiceAreas.tsx", "components/site/ProductLinks.tsx", "lib/product-links.ts"],
  "/etiquetas-adesivas": ["app/etiquetas-adesivas/page.tsx", ...product],
  "/pasta-com-bolso": ["app/pasta-com-bolso/page.tsx", ...product],
  "/blocos-receituario": ["app/blocos-receituario/page.tsx", "lib/quote-products-data.ts", ...product],
};
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();

if (git("rev-parse", "--is-shallow-repository") !== "false") {
  throw new Error("Gere as datas em um checkout com histórico Git completo.");
}

const files = [...new Set([...shared, ...Object.values(pages).flat()])];
if (git("status", "--porcelain", "--", ...files)) {
  throw new Error("Faça commit das alterações das páginas antes de gerar as datas do sitemap.");
}

const dates = Object.fromEntries(Object.entries(pages).map(([path, sources]) => {
  const files = [...shared, ...sources];
  const lastModified = git("log", "-1", "--format=%cI", "--", ...files);
  const commit = git("log", "-1", "--format=%H", "--", ...files);
  if (!lastModified || Number.isNaN(Date.parse(lastModified)) || !commit) {
    throw new Error(`Sem data de commit válida para ${path}`);
  }
  return [path, { lastModified, commit }];
}));
const content = `${JSON.stringify(dates, null, 2)}\n`;

if (process.argv.includes("--check")) {
  if (readFileSync(output, "utf8") !== content) {
    throw new Error("Datas desatualizadas. Execute npm run sitemap:dates e versione o resultado.");
  }
  console.log("Datas das 12 URLs conferidas com o histórico Git.");
} else {
  writeFileSync(output, content);
  console.log("lib/sitemap-dates.json atualizado com datas reais do Git.");
}
