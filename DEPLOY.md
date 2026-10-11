# Publicação — Aplic Gráfica

O site já está hospedado na Vercel. Reutilize o projeto existente; não crie um novo projeto para uma alteração de conteúdo ou para a renomeação do repositório.

| Item | Configuração |
|---|---|
| Site oficial | [aplicgrafica.com.br](https://aplicgrafica.com.br) |
| Repositório | [izzaguirres/aplic-grafica](https://github.com/izzaguirres/aplic-grafica) |
| Branch de produção | `main` |
| Projeto Vercel | `aplic-grafica-site` |
| Runtime do projeto | Node.js 22 |
| Framework | Next.js |
| Instalação configurada | `npm install` |
| Build | `npm run build` |
| Saída | `.next` |

O nome do projeto Vercel é independente do nome no GitHub. Os domínios `aplicgrafica.com.br` e `www.aplicgrafica.com.br` pertencem à configuração existente. A configuração versionada está em [vercel.json](vercel.json).

## Preparar uma alteração

1. Parta da `main` atual e preserve alterações concorrentes. Confira o diff e os arquivos incluídos.
2. Use Node.js 22 e `npm ci` para instalar o lockfile em um checkout isolado.
3. Execute os checks aplicáveis:

```bash
npm run type-check
npm run lint
npm run build
```

4. Para alterações de interface, observe o fluxo afetado em desktop/mobile. Build não comprova acabamento visual ou comportamento.
5. Confirme o destino e a autorização da entrega antes de publicar. Não publique branches antigas sem incorporar os releases posteriores.

Uma alteração somente documental exige conferência de conteúdo, links e escopo; não precisa de um build para comprovar texto. Mudanças na aplicação exigem os checks correspondentes.

## Ambiente

- `NEXT_PUBLIC_SITE_URL`: domínio canônico. O código usa `https://aplicgrafica.com.br` como padrão.
- `NEXT_PUBLIC_GTM_ID`: contêiner existente do GTM, configurado no ambiente de publicação.
- `VERCEL_ENV`: fornecida pela Vercel e usada para identificar produção na entrega do mrkr pelo GTM.

Use [env.example](env.example) no desenvolvimento. Não copiar senhas de e-mail dos guias antigos: a rota de formulário foi desativada e retorna 410. Não substituir o GTM ou reinstalar mrkr direto ao preparar uma publicação.

## Conferir o resultado

Após uma publicação autorizada, confira commit, status do deployment, domínio e comportamento afetado. Registre limites ou checks indisponíveis. Disponibilidade HTTP não comprova indexação, conversa ou venda.

O script [scripts/deploy.sh](scripts/deploy.sh) é uma alternativa legada com efeitos próprios: limpa artefatos, instala dependências e pode instalar/acionar a CLI da Vercel. Não é necessário executá-lo para atualizar a documentação ou os dados do repositório.

Atualizado em 11/10/2026. Para Git e remotes, veja [GITHUB_SETUP.md](GITHUB_SETUP.md).
