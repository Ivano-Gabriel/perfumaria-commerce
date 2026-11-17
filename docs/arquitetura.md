# Arquitetura v0.1

## Escolha

Monorepo, deploys independentes e **monólito modular** no backend. Nenhum microserviço, Redis ou fila no MVP sem necessidade medida. Vitrine Next.js com geração estática/SSR para SEO e interatividade local de carrinho; API Spring Boot valida negócio e aplica transações; PostgreSQL é fonte de verdade.

```
Cliente -> Next.js/Vercel -> Spring Boot/API -> PostgreSQL
                                      |-> Provedor de pagamento
                                      |-> Provedor de frete
                                      |-> Mídia/armazenamento
```

## Fronteiras de domínio propostas

- **Catálogo:** produtos, categoria, família, variações, imagens, notas olfativas, disponibilidade publicada.
- **Estoque:** locais, lotes, movimentações, frascos originais, volume remanescente e perdas; decantação somente após revisão sanitária.
- **Carrinho/promoções:** preço calculado no servidor, cupom elegível e reserva de estoque.
- **Pedidos:** endereço, frete selecionado, snapshots imutáveis de itens/preços e ciclo de vida.
- **Pagamentos:** tentativas, webhook assinado, idempotência, reconciliação e estado confirmado pelo provedor.
- **Logística:** embalagem, etiqueta, rastreio, devolução e regras por produto/transportadora.
- **Admin:** login seguro e RBAC para os dois sócios. Logs de ações sensíveis.
- **Conteúdo:** páginas legais, vídeos dos sócios, depoimentos moderados e quiz de fragrâncias.

## Contrato REST (proposto; NÃO implementado integralmente)

- `GET /api/v1/products?category=decants&page=0&size=20`: listagem pública paginada.
- `GET /api/v1/products/{slug}`: detalhe com variações.
- `POST /api/v1/checkout/quotes`: cotação de total e frete calculados no backend.
- `POST /api/v1/orders`: criação idempotente de pedido com preços revalidados.
- `POST /api/v1/payments/webhooks/{provider}`: notificações verificadas e idempotentes.
- `/api/v1/admin/*`: autenticado e autorizado (RBAC).

**Implementado nesta base:** apenas `GET /api/v1/health` e `GET /api/v1/products` com dados fictícios.

## Regras essenciais

- Não armazenar dados de cartão. Redirecionar para checkout seguro do parceiro.
- Valores monetários em centavos/integer ou decimal exato; jamais `float` para total financeiro.
- `Idempotency-Key` em operações com efeitos financeiros; registrar intenção, deduplicar por constraint e reconciliar estado incerto.
- Webhooks: verificar origem/assinatura, deduplicar evento, consultar pagamento ao provedor e atualizar transacionalmente.
- Reservar/rebaixar estoque sob transação, inclusive para decants por volume. Não vender volume ou unidades já esgotadas.
- CORS restrito, TLS, rate limit, autenticação do admin, logs sem PII e acesso por necessidade.
- LGPD: coletar só dados necessários, base legal e retenção documentada.

## Caminho de implantação

1. Protótipo e testes visuais (este pacote).
2. Banco, migrations, catálogo real, admin e mídia.
3. Estoque transacional, pedidos e checkout sandbox.
4. Frete real, testes de expedição e homologação comercial/sanitária.
5. Publicação em domínio próprio e monitoramento.
