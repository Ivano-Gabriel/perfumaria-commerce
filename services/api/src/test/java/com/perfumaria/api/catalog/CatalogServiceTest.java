package com.perfumaria.api.catalog;

import static org.junit.jupiter.api.Assertions.*;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;

class CatalogServiceTest {
    private final CatalogService service = new CatalogService();

    @Test
    void catalogShowsOnlyDemonstrationProducts() {
        var products = service.listDemoProducts();
        assertEquals(6, products.size());
        assertTrue(products.stream().allMatch(ProductSummary::isDemo));
    }

    @Test
    void pricesUseExactDecimalRepresentation() {
        var product = service.listDemoProducts().getFirst();
        assertEquals(0, new BigDecimal("24.90").compareTo(product.startingPriceBrl()));
    }
}
