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

  // Live REST API Drawer
  const apiToggle = document.getElementById("apiToggle");
  const apiPre = document.getElementById("apiPre");

  if (apiToggle && apiPre) {
    let loaded = false;
    apiToggle.addEventListener("click", async () => {
      const isVisible = apiPre.classList.toggle("visible");
      apiToggle.querySelector(".toggle-icon").textContent = isVisible ? "▲ Collapse" : "▼ Preview JSON";

      if (isVisible && !loaded) {
        try {
          const res = await fetch("/api/profile");
          if (res.ok) {
            const data = await res.json();
            apiPre.textContent = JSON.stringify(data, null, 2);
            loaded = true;
          } else {
            apiPre.textContent = "// Error fetching /api/profile";
          }
        } catch (e) {
          apiPre.textContent = "// Could not connect to API: " + e.message;
        }
      }
    });
  }

  // Set year if element exists
  const yearEl = document.getElementById("year");
  if (yearEl && !yearEl.textContent.trim()) {
    yearEl.textContent = new Date().getFullYear();
  }
});
