package com.ketanzode.portfolio.model;

public record EducationRecord(
        String period,
        String degree,
        String institution,
        String location,
        String coursework,
        boolean featured
) {}
