# Verificação desta entrega

- **OK:** 5 testes unitários de lógica da vitrine (busca normalizada, categoria, subtotal, quantidade e soma de carrinho).
- **OK:** sintaxe TypeScript/TSX verificada por transpiler local (não substitui type-check completo).
- **OK:** `pom.xml` é XML bem-formado.
- **NÃO EXECUTADO:** `npm install`, type-check completo e `next build`, pois o ambiente não conseguiu acessar `registry.npmjs.org`.
- **NÃO EXECUTADO:** testes Maven/Spring Boot, pois Maven não está instalado neste ambiente.
- **NÃO EXECUTADO:** testes reais de pagamento, frete e pedidos (ainda não estão implementados).
- **NÃO PUBLICADO:** GitHub e Vercel/Render.

Próximos gates: gerar `package-lock.json` ao rodar `npm install`, trocar CI por `npm ci`, executar testes e validar build no GitHub Actions antes de qualquer deploy.
