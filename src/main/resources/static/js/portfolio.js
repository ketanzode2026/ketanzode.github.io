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
        // Close mobile nav if open
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

  // Set year if element exists
  const yearEl = document.getElementById("year");
  if (yearEl && !yearEl.textContent.trim()) {
    yearEl.textContent = new Date().getFullYear();
  }
});
