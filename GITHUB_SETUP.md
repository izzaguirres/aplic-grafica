# Repositório e colaboração — Aplic Gráfica

O projeto já existe no GitHub: [izzaguirres/aplic-grafica](https://github.com/izzaguirres/aplic-grafica). A branch principal é `main`; o site oficial é [aplicgrafica.com.br](https://aplicgrafica.com.br).

## Novo clone

```bash
git clone https://github.com/izzaguirres/aplic-grafica.git
cd aplic-grafica
npm ci
```

## Clone existente

O repositório foi renomeado de `aplic-grafica-site` para `aplic-grafica`. Para atualizar um remote antigo, confira primeiro o destino:

```bash
git remote -v
git remote set-url origin https://github.com/izzaguirres/aplic-grafica.git
git remote -v
```

Os nomes das pastas locais podem continuar diferentes do nome no GitHub. Não renomeie pastas de worktrees em uso apenas para acompanhar o slug. Worktrees do mesmo repositório compartilham a configuração de remotes.

## Fluxo de trabalho

1. Confira branch, alterações locais e worktrees antes de começar: `git status --short --branch` e `git worktree list`.
2. Atualize as referências com `git fetch origin`.
3. Use uma branch `codex/<tarefa>` ou outra convenção combinada com o responsável.
4. Faça alterações com escopo definido e execute os checks pertinentes do [README](README.md).
5. Revise o diff e adicione explicitamente os arquivos da entrega. Preserve arquivos e alterações de outras tarefas.
6. Envie a mudança pelo fluxo acordado para o projeto. Um push na branch de produção pode iniciar um deployment na Vercel.

Não é necessário criar outro repositório, outra integração GitHub ou um workflow de deploy para trabalhar neste projeto. A publicação usa o projeto Vercel existente, descrito em [DEPLOY.md](DEPLOY.md).

## Identidade do repositório

- Nome: `aplic-grafica`.
- Apresentação: **Aplic Gráfica — Gráfica online com produção própria**.
- Homepage: `https://aplicgrafica.com.br`.
- Pacote npm privado: `aplic-grafica`.

Atualizado em 11/10/2026.
