# Datas do sitemap

`app/sitemap.ts` usa `lib/sitemap-dates.json`, gerado do histórico completo do Git. Cada URL possui a data ISO do último commit que alterou seus arquivos de conteúdo/metadados ou as fontes compartilhadas listadas em `scripts/update-sitemap-dates.mjs`. O SHA fica registrado junto da data para auditoria.

A geração executa, por URL:

```bash
git log -1 --format=%cI -- <arquivos da página>
```

Depois de alterar conteúdo ou metadados:

1. Faça commit dos arquivos alterados.
2. Execute `npm run sitemap:dates` em um checkout com histórico completo.
3. Versione `lib/sitemap-dates.json` em um commit de atualização do sitemap.
4. Rode `npm run sitemap:check`, build, lint e TypeScript antes do push.

O gerador recusa fontes com mudanças não commitadas ou clones rasos. A Vercel pode usar um clone raso; por isso o build lê o registro versionado, sem consultar Git em runtime nem inventar uma data de fallback. Datas não mudam por build, deploy, estilo ou documentação. Ao incluir uma página, adicione seus arquivos ao gerador e sua URL ao sitemap, após confirmar HTTP 200.
