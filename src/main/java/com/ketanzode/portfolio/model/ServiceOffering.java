package com.ketanzode.portfolio.model;

import java.util.List;

public record ServiceOffering(
        String id,
        String title,
        String tagline,
        String description,
        List<String> features,
        String badge
) {}
