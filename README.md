# Ketan Zode — Java & Spring Boot Portfolio Web Application

A modern, production-ready portfolio web application built with **Java 21+** and **Spring Boot 3.4**, featuring dynamic **Thymeleaf** templates, **Spring MVC**, **Jakarta Bean Validation**, and a **RESTful API**.

---

## 🚀 Tech Stack

- **Language:** Java 21+ (built & tested on JDK 24)
- **Framework:** Spring Boot 3.4.3
  - `spring-boot-starter-web`: Spring MVC REST & Web Controllers
  - `spring-boot-starter-thymeleaf`: Dynamic server-side UI templating
  - `spring-boot-starter-validation`: Jakarta Bean Validation for form and API payloads
  - `spring-boot-starter-test`: JUnit 5, AssertJ, MockMvc integration testing
- **Build Tool:** Apache Maven (includes `./mvnw` wrapper)
- **Styling & Interaction:** Responsive CSS3, Google Fonts (*Manrope* & *DM Mono*), Vanilla JavaScript

---

## 📁 Project Architecture

```
ketanzode.github.io/
├── pom.xml                                      # Maven build configuration
├── mvnw / mvnw.cmd                              # Maven wrapper scripts
├── index.html                                   # Static root entry for GitHub Pages
├── src/
│   ├── main/
│   │   ├── java/com/ketanzode/portfolio/
│   │   │   ├── PortfolioApplication.java       # Spring Boot Main Entry Point
│   │   │   ├── controller/
│   │   │   │   ├── PortfolioController.java    # Web MVC Controller (SSR Thymeleaf)
│   │   │   │   └── PortfolioApiController.java # REST API Endpoints (/api/*)
│   │   │   ├── model/
│   │   │   │   ├── PortfolioProfile.java       # Main immutable profile record
│   │   │   │   ├── ExperienceRecord.java       # Experience data record
│   │   │   │   ├── SkillRecord.java            # Capability data record
│   │   │   │   ├── EducationRecord.java        # Education data record
│   │   │   │   ├── StatRecord.java             # Metric / Stat record
│   │   │   │   └── ContactRequest.java         # Contact form DTO with validation
│   │   │   └── service/
│   │   │       └── PortfolioService.java       # Business logic & data provider
│   │   └── resources/
│   │       ├── application.properties           # Application & server configuration
│   │       ├── templates/
│   │       │   └── index.html                  # Dynamic Thymeleaf HTML template
│   │       └── static/
│   │           ├── css/
│   │           │   └── portfolio.css           # Premium stylesheet & animations
│   │           └── js/
│   │               └── portfolio.js            # Interactive behaviors & live API inspector
│   └── test/
│       └── java/com/ketanzode/portfolio/
│           ├── PortfolioApplicationTests.java  # Context load test
│           └── PortfolioControllerTest.java    # MockMvc web & API integration tests
└── README.md
```

---

## 🛠️ How to Run

### 1. Run the Spring Boot Server Locally
Using the included Maven wrapper:
```bash
./mvnw spring-boot:run
```
Or with installed Maven:
```bash
mvn spring-boot:run
```

Once started, open your browser at:
👉 **[http://localhost:8080](http://localhost:8080)**

### 2. Run the Test Suite
Run all unit and integration tests using MockMvc:
```bash
./mvnw test
```

### 3. Build a Production Executable JAR
```bash
./mvnw clean package
```
Run the generated jar:
```bash
java -jar target/portfolio-0.0.1-SNAPSHOT.jar
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Serves the server-side rendered Thymeleaf web page |
| `GET` | `/api/profile` | Returns full portfolio profile details as JSON |
| `GET` | `/api/health` | Application health and status check |
| `POST` | `/api/contact` | Submits a contact inquiry via JSON payload |
| `POST` | `/contact` | Submits the web contact form with server-side validation |

### Sample API Response (`GET /api/profile`):
```json
{
  "name": "Ketan Zode",
  "initials": "KZ",
  "heroRole": "Java · Spring Boot · Web Architecture",
  "tagline": "Building robust, high-performance applications for the modern web.",
  "location": "Pune, Maharashtra, India",
  "email": "zodeketan50@gmail.com",
  "stats": [
    { "value": "1.5+", "label": "Years of experience" },
    { "value": "10+", "label": "Core technologies" }
  ]
}
```

---

## 🌐 GitHub Pages Deployment

The repository includes a static entry point (`index.html`) at the root. If you host this repository directly on GitHub Pages (`https://ketanzode.github.io`), it will serve the portfolio statically while you can run the full dynamic Spring Boot application anywhere (locally, Docker, Render, AWS, etc.).
