package com.ketanzode.portfolio.service;

import com.ketanzode.portfolio.model.CertificationRecord;
import com.ketanzode.portfolio.model.ContactRequest;
import com.ketanzode.portfolio.model.EducationRecord;
import com.ketanzode.portfolio.model.ExperienceRecord;
import com.ketanzode.portfolio.model.FaqItem;
import com.ketanzode.portfolio.model.PortfolioProfile;
import com.ketanzode.portfolio.model.ServiceOffering;
import com.ketanzode.portfolio.model.SkillGroup;
import com.ketanzode.portfolio.model.StatRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class PortfolioService {

    private static final Logger log = LoggerFactory.getLogger(PortfolioService.class);

    public record SubmittedContact(
            String name,
            String email,
            String subject,
            String message,
            LocalDateTime timestamp
    ) {}

    private final List<SubmittedContact> submittedContacts = new CopyOnWriteArrayList<>();

    public PortfolioProfile getProfile() {
        return new PortfolioProfile(
                "Ketan Zode",
                "KZ",
                "Freelance PHP / Laravel Developer & SEO Expert",
                "Building high-performance web applications for the ",
                "web.",
                "",
                "Results-driven PHP/Laravel Developer with 1.5+ years of hands-on experience in building web applications, admin panels, REST APIs, and database-driven solutions. Skilled in Laravel, PHP, MySQL, JavaScript, AJAX, Bootstrap, and MVC architecture. Experienced working with UK-based clients and delivering technical improvements alongside SEO optimization tasks. Available for hire for freelance projects, remote contracts, and full-time software developer jobs.",
                "Pune, Maharashtra, India",
                "zodeketan50@gmail.com",
                "https://github.com/ketanzode50",
                "https://linkedin.com/in/ketanz",
                List.of(
                        new StatRecord("1.5+", "Years of hands-on experience"),
                        new StatRecord("10+", "Core tools & technologies"),
                        new StatRecord("UK", "Client website experience"),
                        new StatRecord("100%", "Dedication to code quality & SEO")
                ),
                List.of(
                        new ExperienceRecord(
                                "JULY 2024 — PRESENT",
                                "PHP Laravel Developer & SEO Executive",
                                "Blazenix IT Consulting",
                                "Surat, India",
                                "Current role",
                                List.of(
                                        "Developed and maintained full-stack web applications using PHP and Laravel following the Controller-Service-Repository-Model architecture pattern.",
                                        "Built dynamic admin panel modules including order history, Marketing Material Requests, Color Folder Requests, and chatbot CRUD using DataTables and AJAX.",
                                        "Implemented reusable Blade components and SweetAlert2 modal notifications across the application.",
                                        "Worked on client websites for UK-based businesses and supported SEO improvements, technical fixes, and structured data implementation.",
                                        "Managed schema markup such as BreadcrumbList, LocalBusiness, Service, and FAQ for better search visibility.",
                                        "Performed keyword analysis, meta tag optimization, and URL structure improvements using Google Search Console, SEMrush, and Ahrefs."
                                )
                        ),
                        new ExperienceRecord(
                                "2023",
                                "Web Development Intern",
                                "ARDSOFT IT Solution Pvt. Ltd.",
                                "Nagpur, India",
                                "Foundation",
                                List.of(
                                        "Assisted in developing database-driven web applications using PHP, MySQL, HTML, CSS, and JavaScript.",
                                        "Worked on CRUD operations, user authentication, and backend functionality.",
                                        "Contributed to e-commerce website development including product and order management features.",
                                        "Collaborated with team members using Git and followed software development best practices."
                                )
                        )
                ),
                List.of(
                        "Developed Laravel-based modules for admin management, request forms, and chatbot CRUD with AJAX and DataTables.",
                        "Supported SEO work for UK-based client websites and implemented structured data, meta tags, and technical improvements.",
                        "Improved website content and crawlability through keyword research, schema markup, and internal linking fixes.",
                        "Worked with both backend development and SEO tasks, giving exposure to technical and client-facing work."
                ),
                List.of(
                        new SkillGroup("Programming Languages", List.of("PHP", "JavaScript", "Python (basics)", "Java (basics)", "HTML5", "CSS3")),
                        new SkillGroup("Frameworks & Libraries", List.of("Laravel", "Bootstrap", "jQuery", "AJAX", "Blade Templating")),
                        new SkillGroup("Database Systems", List.of("MySQL", "phpMyAdmin")),
                        new SkillGroup("SEO Tools", List.of("SEMrush", "Ahrefs", "Google Search Console", "Google Analytics", "Microsoft Clarity")),
                        new SkillGroup("Schema & Structured Data", List.of("JSON-LD", "BreadcrumbList", "LocalBusiness", "Service", "FAQ Schema", "Sitelinks Searchbox")),
                        new SkillGroup("DevOps & Version Control", List.of("Git", "GitHub", "Composer", "npm", "cPanel")),
                        new SkillGroup("Other Tools & APIs", List.of("DataTables", "SweetAlert2", "REST APIs", "Postman", "VS Code", "Microsoft Excel")),
                        new SkillGroup("Architecture Patterns", List.of("MVC", "Controller-Service-Repository-Model", "RESTful API Design"))
                ),
                List.of(
                        new EducationRecord(
                                "2024 — 2026 (COMPLETED)",
                                "Master of Computer Applications (MCA) – CBCS",
                                "Kamla Nehru Mahavidyalaya, Nagpur · RTM Nagpur University",
                                "Nagpur, India",
                                "Coursework: Data Mining, Machine Learning Fundamentals, Advanced Web Technologies",
                                true
                        ),
                        new EducationRecord(
                                "2021 — 2023",
                                "Bachelor of Science – Computer Science (B.Sc. CS)",
                                "Shivaji Science College, Pauni",
                                "Maharashtra, India",
                                "",
                                false
                        )
                ),
                List.of(
                        new CertificationRecord("Ahrefs SEO Certification", "Ahrefs Academy"),
                        new CertificationRecord("SEMrush SEO Certification", "SEMrush Academy")
                ),
                List.of("English", "Hindi", "Marathi"),
                List.of("Web Development", "Search Engine Optimization", "Artificial Intelligence & Machine Learning", "Digital Marketing"),
                // SEO-targeted Freelance & Developer Services
                List.of(
                        new ServiceOffering(
                                "custom-laravel",
                                "Custom Laravel Web Application Development",
                                "End-to-End Full Stack Engineering",
                                "Custom web apps built on PHP & Laravel using Controller-Service-Repository-Model design pattern, secure authentication, role-based permissions, and high-performance MySQL databases.",
                                List.of("Clean MVC & PSR Standards", "Blade Reusable Component Libraries", "Database Migration & Eloquent ORM", "Secure REST APIs & Webhooks"),
                                "Core Service"
                        ),
                        new ServiceOffering(
                                "admin-dashboards",
                                "Custom Admin Panels & CRUD Systems",
                                "Operational Efficiency & Business Tools",
                                "Dynamic back-office admin dashboards, order management workflows, chatbot management, and real-time data inspection powered by DataTables, AJAX, and SweetAlert2.",
                                List.of("Instant Search & Export with DataTables", "AJAX Asynchronous CRUD Operations", "Interactive Form Validation & Notifications", "Role-Based Access Control (RBAC)"),
                                "Popular"
                        ),
                        new ServiceOffering(
                                "freelance-laravel",
                                "Freelance Laravel Developer for Remote Projects",
                                "Flexible Contracts & Dedicated Hiring",
                                "Available as a freelance Laravel developer for UK, US, European, and Indian clients. Proven track record collaborating remotely, meeting deadlines, and delivering production-ready code.",
                                List.of("Hourly & Fixed-Price Contracts", "Fast Turnaround & Milestone Delivery", "Direct Technical Communication", "Git Collaboration & Clean Commits"),
                                "Freelance & Hiring"
                        ),
                        new ServiceOffering(
                                "technical-seo",
                                "Technical SEO & Schema Markup Optimization",
                                "Rank High & Dominate Search Results",
                                "Advanced technical SEO audits, structured data (JSON-LD BreadcrumbList, LocalBusiness, FAQPage), Google Search Console health, meta tag optimization, and crawlability fixes.",
                                List.of("JSON-LD Rich Snippet Schemas", "Google Search Console & SEMrush Audits", "Core Web Vitals & Speed Tuning", "Crawl Error Resolution & Indexing Fixes"),
                                "SEO Expertise"
                        )
                ),
                // FAQ section for Google "People Also Ask" and Rich Snippets
                List.of(
                        new FaqItem(
                                "Why should I hire Ketan Zode for my Laravel web project?",
                                "Ketan brings 1.5+ years of hands-on experience in full-stack Laravel development, clean Controller-Service-Repository architecture, and proven technical SEO skills. Having worked with UK-based clients, he delivers high-quality, maintainable code engineered to rank well on search engines and perform reliably under real-world usage."
                        ),
                        new FaqItem(
                                "Are you available for freelance Laravel development and remote jobs?",
                                "Yes! Ketan is actively available for freelance contracts, full-time Laravel developer roles, remote software engineering positions, and consulting projects worldwide. You can reach out directly via email at zodeketan50@gmail.com or connect on LinkedIn."
                        ),
                        new FaqItem(
                                "What Laravel services and technical capabilities do you offer?",
                                "Services include custom Laravel application development, dynamic admin panels with DataTables and AJAX, REST API design, e-commerce backend systems, database optimization with MySQL, and comprehensive technical SEO audits with JSON-LD schema markup."
                        ),
                        new FaqItem(
                                "Do you work with international clients (UK, US, Europe)?",
                                "Yes. Ketan has direct professional experience working on client websites for UK-based businesses, coordinating technical requirements, implementing structured data, resolving search indexation issues, and delivering robust full-stack features on schedule."
                        ),
                        new FaqItem(
                                "How do you combine Laravel development with technical SEO?",
                                "Ketan ensures that every web application is built with search engines in mind from day one: clean URL structures, semantic HTML5, fast server-side rendering, JSON-LD structured schemas, mobile responsiveness, and optimal crawlability verified through Google Search Console, Ahrefs, and SEMrush."
                        )
                )
        );
    }

    public boolean recordContact(ContactRequest request) {
        log.info("Received new contact submission from {} <{}>: Subject: {}",
                request.getName(), request.getEmail(), request.getSubject());
        submittedContacts.add(new SubmittedContact(
                request.getName(),
                request.getEmail(),
                request.getSubject(),
                request.getMessage(),
                LocalDateTime.now()
        ));
        return true;
    }

    public List<SubmittedContact> getSubmittedContacts() {
        return List.copyOf(submittedContacts);
    }
}
