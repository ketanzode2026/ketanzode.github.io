package com.ketanzode.portfolio.controller;

import com.ketanzode.portfolio.model.ContactRequest;
import com.ketanzode.portfolio.model.PortfolioProfile;
import com.ketanzode.portfolio.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PortfolioApiController {

    private final PortfolioService portfolioService;

    public PortfolioApiController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/profile")
    public ResponseEntity<PortfolioProfile> getProfile() {
        return ResponseEntity.ok(portfolioService.getProfile());
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "application", "Ketan Zode Java Portfolio",
                "timestamp", Instant.now().toString()
        ));
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, Object>> submitContact(@Valid @RequestBody ContactRequest request) {
        portfolioService.recordContact(request);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Thank you, " + request.getName() + "! Your message has been received."
        ));
    }
}
