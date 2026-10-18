package com.ketanzode.portfolio.controller;

import com.ketanzode.portfolio.model.ContactRequest;
import com.ketanzode.portfolio.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.Year;

@Controller
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/")
    public String index(Model model) {
        if (!model.containsAttribute("contactRequest")) {
            model.addAttribute("contactRequest", new ContactRequest());
        }
        model.addAttribute("profile", portfolioService.getProfile());
        model.addAttribute("currentYear", Year.now().getValue());
        return "index";
    }

    @PostMapping("/contact")
    public String handleContactSubmit(
            @Valid @ModelAttribute("contactRequest") ContactRequest contactRequest,
            BindingResult bindingResult,
            Model model,
            RedirectAttributes redirectAttributes
    ) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("profile", portfolioService.getProfile());
            model.addAttribute("currentYear", Year.now().getValue());
            model.addAttribute("errorMessage", "Please correct the highlighted errors before submitting.");
            return "index";
        }

        portfolioService.recordContact(contactRequest);
        redirectAttributes.addFlashAttribute("successMessage",
                "Thank you, " + contactRequest.getName() + "! Your message has been received.");
        return "redirect:/#contact";
    }
}
