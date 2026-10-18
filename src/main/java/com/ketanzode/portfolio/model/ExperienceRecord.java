package com.ketanzode.portfolio.model;

import java.util.List;

public record ExperienceRecord(
        String period,
        String role,
        String company,
        String location,
        String tag,
        List<String> bulletPoints
) {}
