package com.ketanzode.portfolio;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@SpringBootTest
@AutoConfigureMockMvc
class PortfolioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testHomePageLoads() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("index"))
                .andExpect(model().attributeExists("profile"))
                .andExpect(model().attributeExists("contactRequest"))
                .andExpect(content().string(containsString("Ketan Zode")))
                .andExpect(content().string(containsString("Blazenix IT Consulting")))
                .andExpect(content().string(containsString("Pune, Maharashtra, India")));
    }

    @Test
    void testProfileApiEndpoint() throws Exception {
        mockMvc.perform(get("/api/profile"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Ketan Zode"))
                .andExpect(jsonPath("$.initials").value("KZ"))
                .andExpect(jsonPath("$.email").value("zodeketan50@gmail.com"))
                .andExpect(jsonPath("$.location").value("Pune, Maharashtra, India"))
                .andExpect(jsonPath("$.experiences[0].company").value("Blazenix IT Consulting"))
                .andExpect(jsonPath("$.experiences[1].company").value("ARDSOFT IT Solution Pvt. Ltd."))
                .andExpect(jsonPath("$.educations[0].period").value("2024 — 2026 (COMPLETED)"));
    }

    @Test
    void testHealthEndpoint() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"));
    }

    @Test
    void testApiContactSubmission() throws Exception {
        String payload = """
            {
              "name": "Sarah Connor",
              "email": "sarah@example.com",
              "subject": "Web Dev Project",
              "message": "Let's collaborate on a web application project!"
            }
            """;

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void testFormContactSubmissionSuccess() throws Exception {
        mockMvc.perform(post("/contact")
                        .param("name", "John Doe")
                        .param("email", "john@example.com")
                        .param("subject", "Web Development")
                        .param("message", "Great work on this portfolio!"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/#contact"));
    }

    @Test
    void testFormContactSubmissionValidationError() throws Exception {
        mockMvc.perform(post("/contact")
                        .param("name", "")
                        .param("email", "invalid-email")
                        .param("message", ""))
                .andExpect(status().isOk())
                .andExpect(view().name("index"))
                .andExpect(model().hasErrors());
    }
}
