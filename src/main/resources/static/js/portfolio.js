document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const nav = document.getElementById("nav");
  const menuButton = document.getElementById("menuButton");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
      menuButton.textContent = open ? "×" : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      });
    });
  }

  // Smooth scroll and auto-focus for Hire Me & Contact buttons
  document.querySelectorAll('a[href="#contact"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        e.preventDefault();
        if (nav && nav.classList.contains("open")) {
          nav.classList.remove("open");
          if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "☰";
          }
        }
        contactSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const nameInput = document.getElementById("name");
          if (nameInput) {
            nameInput.focus();
          }
        }, 600);
      }
    });
  });

  // Contact Form Submission -> Auto-Fill & Launch Email
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameEl = document.getElementById("name");
      const emailEl = document.getElementById("email");
      const subjectEl = document.getElementById("subject");
      const messageEl = document.getElementById("message");

      const name = nameEl ? nameEl.value.trim() : "";
      const email = emailEl ? emailEl.value.trim() : "";
      const subject = subjectEl && subjectEl.value.trim() ? subjectEl.value.trim() : "Freelance Laravel Project / Job Inquiry";
      const message = messageEl ? messageEl.value.trim() : "";

      if (!name || !email || !message) {
        alert("Please complete your name, email, and project details.");
        return;
      }

      // 1. Post to Spring Boot API backend in background if running
      try {
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message })
        }).catch(() => {});
      } catch (err) {}

      // 2. Format pre-filled email content
      const recipient = "zodeketan50@gmail.com";
      const emailSubject = `[Inquiry] ${subject} - From ${name}`;
      const emailBody = `Hi Ketan,

I am reaching out via your portfolio website regarding an opportunity/project.

--- Contact Details ---
Name: ${name}
Email: ${email}
Project Type / Role: ${subject}

--- Project Details ---
${message}

Looking forward to connecting!`;

      // 3. Construct target URLs
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // 4. In-page confirmation banner with direct one-click email actions
      let feedback = document.getElementById("contactFeedback");
      if (!feedback) {
        feedback = document.createElement("div");
        feedback.id = "contactFeedback";
        feedback.className = "alert alert-success";
        contactForm.prepend(feedback);
      }

      feedback.innerHTML = `
        <div style="line-height: 1.5;">
          <strong>✓ Opening your email client, ${name}!</strong><br>
          Your project inquiry has been formatted and pre-filled to send directly to <b>${recipient}</b>.
        </div>
        <div style="margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap;">
          <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="button" style="padding: 8px 14px; font-size: 12px; background: #ea4335;">Open in Gmail (Web) ↗</a>
          <a href="${mailtoUrl}" class="button light" style="padding: 8px 14px; font-size: 12px; border-color: #79bd39;">Open Default Mail App</a>
        </div>
      `;

      feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // 5. Automatically trigger default mail client with all fields populated
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 300);
    });
  }

  // Set year if element exists
  const yearEl = document.getElementById("year");
  if (yearEl && !yearEl.textContent.trim()) {
    yearEl.textContent = new Date().getFullYear();
  }
});
