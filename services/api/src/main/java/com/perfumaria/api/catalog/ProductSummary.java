package com.perfumaria.api.catalog;

import java.math.BigDecimal;

public record ProductSummary(
        String id,
        String slug,
        String name,
        String category,
        BigDecimal startingPriceBrl,
        boolean isDemo
) { }
