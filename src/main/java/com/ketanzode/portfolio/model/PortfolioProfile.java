package com.ketanzode.portfolio.model;

import java.util.List;

public record PortfolioProfile(
        String name,
        String initials,
        String heroRole,
        String headlinePrefix,
        String headlineEmphasis,
        String headlineSuffix,
        String objective,
        String location,
        String email,
        String githubUrl,
        String linkedinUrl,
        List<StatRecord> stats,
        List<ExperienceRecord> experiences,
        List<String> achievements,
        List<SkillGroup> skillGroups,
        List<EducationRecord> educations,
        List<CertificationRecord> certifications,
        List<String> spokenLanguages,
        List<String> interests,
        List<ServiceOffering> services,
        List<FaqItem> faqs
) {}
