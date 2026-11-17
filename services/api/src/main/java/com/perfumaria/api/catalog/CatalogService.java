package com.perfumaria.api.catalog;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CatalogService {
    public List<ProductSummary> listDemoProducts() {
        return List.of(
                new ProductSummary("a1", "ambar-noturno", "Âmbar Noturno", "decants", new BigDecimal("24.90"), true),
                new ProductSummary("b2", "brisa-mineral", "Brisa Mineral", "decants", new BigDecimal("19.90"), true),
                new ProductSummary("c3", "fleur-de-lune", "Fleur de Lune", "decants", new BigDecimal("22.90"), true),
                new ProductSummary("d4", "cedar-08", "Cedar Nº 08", "inteiros", new BigDecimal("299.90"), true),
                new ProductSummary("e5", "rota-verde", "Rota Verde", "automotivos", new BigDecimal("39.90"), true),
                new ProductSummary("f6", "kit-primeiras-notas", "Kit Primeiras Notas", "kits", new BigDecimal("59.90"), true)
        );
    }
}
