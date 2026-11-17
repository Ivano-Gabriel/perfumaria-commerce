# Publicar o monorepo no GitHub

O pacote entregue **não foi publicado automaticamente**. A integração GitHub disponível não possui a ação de criar repositórios.

## Passo 1 — criar repo vazio

Abrir https://github.com/new e configurar:

- Owner: `Ivano-Gabriel`
- Repository name: `perfumaria-commerce` (nome **técnico provisório**, não a marca)
- Visibility: **Public**
- NÃO criar README, .gitignore ou licença no GitHub (já existem no pacote, sem licença por enquanto)

## Passo 2 — enviar os arquivos

Extrair o ZIP, abrir terminal na pasta `perfumaria-commerce` e executar:

```bash
git init -b main
git add .
git commit -m "chore: scaffold da loja de perfumaria"
git remote add origin https://github.com/Ivano-Gabriel/perfumaria-commerce.git
git push -u origin main
```

O GitHub pode pedir autenticação no navegador ou token pela ferramenta Git Credential Manager. **Não enviar token no chat.**

## Passo 3 — preparar colaboração

- Adicionar seu sócio como collaborator com permissões adequadas.
- Ativar proteção de branch (`main`) e revisão obrigatória antes de merge.
- Conceder ao conector GitHub acesso ao novo repositório para nossos próximos PRs, caso a instalação permita acesso seletivo.
- Não ativar deploy de produção comercial até aprovação das integrações e checklist.

> O código tem dados fictícios e checkout indisponível; não há segredos a cadastrar neste momento.
