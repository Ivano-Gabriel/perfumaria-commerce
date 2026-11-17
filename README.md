# Perfumaria Commerce — nome provisório

Base de uma loja virtual independente de fragrâncias, perfumes completos, decants, aromas automotivos e kits.

> **Estado: protótipo técnico.** Produtos, preços e avaliações mostrados na interface são dados fictícios de demonstração. **Não aceita pagamentos nem pedidos reais.** Identidade visual é temporária. **Não publicar para venda** antes de concluir as integrações, testes e validação regulatória.

## Tecnologias

- **Vitrine:** Next.js 16, React 19, TypeScript e Tailwind CSS 4, CSS responsivo.
- **API:** Java 21 + Spring Boot 3.5 (monólito modular).
- **Banco futuro:** PostgreSQL, migrations Flyway e isolamento de dados por serviço.
- **Integrações futuras:** pagamento, frete, armazenamento de mídia, notificações.
- **Organização:** monorepo com deploy independente de `apps/storefront` e `services/api`.

## Estrutura

```
apps/storefront/       Vitrine, catálogo, produto e carrinho demonstrativos
services/api/          Base REST (health e catálogo demonstrativo)
docs/                  Arquitetura, direção visual e checklist de lançamento
.github/workflows/     CI inicial
```

## Executar vitrine

Requisitos: Node.js >= 20.9 (preferencialmente Node 22 LTS) e npm.

```bash
cd apps/storefront
npm install
npm run dev
```

Abrir `http://localhost:3000`.

Para testar:

```bash
npm test
npm run build
```

## Executar API

Requisitos: Java 21 e Maven >=3.9.

```bash
cd services/api
mvn test
mvn spring-boot:run
```

API em `http://localhost:8080`, rotas `GET /api/v1/health` e `GET /api/v1/products` (demonstrativas). O frontend usa dados locais por enquanto; a API ainda não está integrada à vitrine.

## Regras do projeto

1. `main` sempre estável; alterações por branch e pull request; **merge somente após aprovação dos sócios**.
2. Nunca salvar tokens, chaves, dados de clientes ou credenciais no GitHub.
3. A API calcula preços e valida estoque, frete, cupom e pagamentos. Nunca confiar no navegador para esses valores.
4. Não implementar checkout real até definir o negócio, regras de envio, regime fiscal e requisitos de tratamento/fracionamento.
5. Não usar marcas, imagens, vídeos ou textos de concorrentes no produto final sem autorização.
6. Imagens, depoimentos e avaliações reais apenas com autorização e origem rastreável.

Veja `docs/arquitetura.md`, `docs/brief-visual.md`, `docs/roadmap.md`, `docs/lancamento.md`, `VERIFICACAO.md` e `COMO_PUBLICAR.md`.

**Prévia HTML offline:** `preview/index.html` é uma maquete estática para ver direção visual sem instalar dependências; a aplicação real é a de `apps/storefront`.
