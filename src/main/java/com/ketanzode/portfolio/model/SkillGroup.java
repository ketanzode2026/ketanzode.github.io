package com.ketanzode.portfolio.model;

import java.util.List;

public record SkillGroup(
        String category,
        List<String> skills
) {}
