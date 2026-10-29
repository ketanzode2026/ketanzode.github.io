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

  // Contact Form Submission -> Auto-Fill & Launch Email + Confetti
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

      // Trigger Celebration Confetti
      launchConfetti();

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
          <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="button btn-ripple" style="padding: 8px 14px; font-size: 12px; background: #ea4335;">Open in Gmail (Web) ↗</a>
          <a href="${mailtoUrl}" class="button light btn-ripple" style="padding: 8px 14px; font-size: 12px; border-color: #79bd39;">Open Default Mail App</a>
        </div>
      `;

      feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // 5. Automatically trigger default mail client with all fields populated
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 450);
    });
  }

  // Set year if element exists
  const yearEl = document.getElementById("year");
  if (yearEl && !yearEl.textContent.trim()) {
    yearEl.textContent = new Date().getFullYear();
  }

  // =========================================================
  // ANIMATION SUITE: 10 Modern Interactive Features
  // =========================================================

  // 1. Hero Reveal & Scroll Reveal
  initHeroAndScrollReveal();

  // 2. Word Rotator
  initWordRotator();

  // 3. Review Shuffle Deck
  initReviewShuffle();

  // 4. Count-up Stats
  initCountUpStats();

  // 5. Bento Build (Interactive Spotlight & Code Preview)
  initBentoBuild();

  // 6. Cursor Tour
  initCursorTour();

  // 7. Process Draw (SVG Dynamic Path)
  initProcessDraw();

  // 8. Before / After Performance Comparison
  initBeforeAfter();

  // 9. Us vs Them Interaction
  initUsVsThem();

  // 10. Click -> Success (Micro-interactions, Ripples, Toast, Confetti)
  initClickSuccess();
});

/* ---------------------------------------------------------
   1. Hero Reveal & Scroll Reveal
   --------------------------------------------------------- */
function initHeroAndScrollReveal() {
  const heroElements = [
    { selector: ".hero .eyebrow", delayClass: "delay-1" },
    { selector: ".hero h1", delayClass: "delay-2" },
    { selector: ".hero .hero-copy", delayClass: "delay-3" },
    { selector: ".hero .hero-actions", delayClass: "delay-4" },
    { selector: ".hero .hero-note", delayClass: "delay-5" },
    { selector: ".stats", delayClass: "delay-6" }
  ];

  heroElements.forEach((item) => {
    const el = document.querySelector(item.selector);
    if (el) {
      el.classList.add("hero-reveal", item.delayClass);
    }
  });

  const portrait = document.querySelector(".portrait-wrap");
  if (portrait) {
    portrait.classList.add("portrait-reveal");
  }

  // IntersectionObserver for elements with .reveal-on-scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}

/* ---------------------------------------------------------
   2. Word Rotator
   --------------------------------------------------------- */
function initWordRotator() {
  const track = document.getElementById("rotatorTrack");
  if (!track) return;

  const phrases = track.querySelectorAll(".rotator-phrase");
  if (phrases.length <= 1) return;

  let currentIndex = 0;
  const total = phrases.length;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % total;
    track.style.transform = `translateY(-${currentIndex * 1.18}em)`;
  }, 2600);
}

/* ---------------------------------------------------------
   3. Review Shuffle Deck
   --------------------------------------------------------- */
function initReviewShuffle() {
  const deck = document.getElementById("reviewDeck");
  if (!deck) return;

  const cards = Array.from(deck.querySelectorAll(".review-card"));
  const nextBtn = document.getElementById("reviewNextBtn");
  const prevBtn = document.getElementById("reviewPrevBtn");
  const indicator = document.getElementById("reviewIndicator");

  if (!cards.length) return;

  let activeIndex = 0;

  function renderDeck() {
    cards.forEach((card, index) => {
      const offset = (index - activeIndex + cards.length) % cards.length;

      if (offset === 0) {
        // Active top card
        card.style.zIndex = "4";
        card.style.transform = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
      } else if (offset === 1) {
        // Second card in stack
        card.style.zIndex = "3";
        card.style.transform = "translate3d(0, 14px, -20px) scale(0.96) rotate(1.5deg)";
        card.style.opacity = "0.85";
        card.style.pointerEvents = "auto";
      } else if (offset === 2) {
        // Third card in stack
        card.style.zIndex = "2";
        card.style.transform = "translate3d(0, 26px, -40px) scale(0.92) rotate(-1.5deg)";
        card.style.opacity = "0.65";
        card.style.pointerEvents = "auto";
      } else {
        // Hidden at back
        card.style.zIndex = "1";
        card.style.transform = "translate3d(0, 38px, -60px) scale(0.88) rotate(0deg)";
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
      }
    });

    if (indicator) {
      indicator.textContent = `${activeIndex + 1} / ${cards.length}`;
    }
  }

  function shuffleNext() {
    const currentCard = cards[activeIndex];
    currentCard.style.transform = "translate3d(120%, -20px, 0) rotate(14deg)";
    currentCard.style.opacity = "0";

    setTimeout(() => {
      activeIndex = (activeIndex + 1) % cards.length;
      renderDeck();
    }, 220);
  }

  function shufflePrev() {
    activeIndex = (activeIndex - 1 + cards.length) % cards.length;
    renderDeck();
  }

  // Click on top card shuffles to next
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      shuffleNext();
    });
  });

  if (nextBtn) nextBtn.addEventListener("click", shuffleNext);
  if (prevBtn) prevBtn.addEventListener("click", shufflePrev);

  renderDeck();
}

/* ---------------------------------------------------------
   4. Count-up Stats Animation
   --------------------------------------------------------- */
function initCountUpStats() {
  const statNumbers = document.querySelectorAll(".stat strong[data-count]");
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          observer.unobserve(el);
          animateCount(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => observer.observe(el));

  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count")) || 0;
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const isDecimal = target % 1 !== 0;
    const duration = 1400;
    const startTime = performance.now();

    el.classList.add("counting");

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = isDecimal ? (target * ease).toFixed(1) : Math.floor(target * ease);

      el.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${target}${suffix}`;
        el.classList.remove("counting");
      }
    }

    requestAnimationFrame(step);
  }
}

/* ---------------------------------------------------------
   5. Bento Build (Interactive Spotlight & Code Tabs)
   --------------------------------------------------------- */
function initBentoBuild() {
  const bentoCards = document.querySelectorAll(".bento-card");
  bentoCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // Code tabs inside Bento Card 1
  const tabBtns = document.querySelectorAll(".bento-tab-btn");
  const codeContent = document.getElementById("bentoCodeSnippet");

  const snippets = {
    controller: `// App/Http/Controllers/OrderController.php
public function store(StoreOrderRequest $request, OrderService $service) {
    $order = $service->createWithTransaction($request->validated());
    return response()->json(new OrderResource($order), 201);
}`,
    service: `// App/Services/OrderService.php
public function createWithTransaction(array $data): Order {
    return DB::transaction(function() use ($data) {
        $order = $this->orderRepo->create($data);
        $this->eventDispatcher->dispatch(new OrderPlaced($order));
        return $order;
    });
}`,
    repo: `// App/Repositories/OrderRepository.php
public function create(array $data): Order {
    return Order::create([
        'user_id' => $data['user_id'],
        'status'  => OrderStatus::PENDING,
        'amount'  => $data['amount']
    ]);
}`
  };

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const tabKey = btn.getAttribute("data-tab");
      if (codeContent && snippets[tabKey]) {
        codeContent.textContent = snippets[tabKey];
      }
    });
  });
}

/* ---------------------------------------------------------
   6. Cursor Tour (Interactive Guided Walkthrough)
   --------------------------------------------------------- */
function initCursorTour() {
  const trigger = document.getElementById("startTourBtn");
  const cursor = document.getElementById("virtualCursor");
  const dialog = document.getElementById("tourDialog");
  const nextBtn = document.getElementById("tourNextBtn");
  const skipBtn = document.getElementById("tourSkipBtn");
  const badge = document.getElementById("tourStepBadge");
  const title = document.getElementById("tourTitle");
  const text = document.getElementById("tourText");

  if (!trigger || !cursor || !dialog) return;

  const tourSteps = [
    {
      targetId: "top",
      badge: "Step 1 of 4",
      title: "Ketan Zode — Full-Stack Profile",
      text: "PHP/Laravel developer with 1.5+ years experience building web apps, APIs & SEO architectures for UK & global clients.",
      scrollOffset: 0
    },
    {
      targetId: "bento",
      badge: "Step 2 of 4",
      title: "Interactive Bento Capabilities",
      text: "Modular Controller-Service-Repository patterns, dynamic AJAX DataTables admin panels, and REST APIs.",
      scrollOffset: -80
    },
    {
      targetId: "comparison",
      badge: "Step 3 of 4",
      title: "Proven Performance Benchmark",
      text: "Compare legacy bloated applications vs Ketan's optimized < 95ms database queries and 98+ PageSpeed scores.",
      scrollOffset: -80
    },
    {
      targetId: "contact",
      badge: "Step 4 of 4",
      title: "Hire Ketan Directly",
      text: "Available for freelance contracts, remote software developer roles, and technical SEO consultations.",
      scrollOffset: -60
    }
  ];

  let currentStep = 0;
  let isTourActive = false;

  function runStep(stepIndex) {
    if (stepIndex >= tourSteps.length) {
      endTour();
      return;
    }

    const step = tourSteps[stepIndex];
    const target = document.getElementById(step.targetId);
    if (!target) {
      endTour();
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      const rect = target.getBoundingClientRect();
      const cursorX = rect.left + Math.min(rect.width * 0.4, 200);
      const cursorY = rect.top + Math.min(rect.height * 0.35, 160);

      cursor.classList.add("active");
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      // Position dialog safely on screen
      let dialogX = cursorX + 30;
      let dialogY = cursorY + 20;

      if (dialogX + 330 > window.innerWidth) {
        dialogX = Math.max(20, window.innerWidth - 350);
      }
      if (dialogY + 180 > window.innerHeight) {
        dialogY = Math.max(20, cursorY - 180);
      }

      dialog.style.left = `${dialogX}px`;
      dialog.style.top = `${dialogY}px`;

      if (badge) badge.textContent = step.badge;
      if (title) title.textContent = step.title;
      if (text) text.textContent = step.text;
      if (nextBtn) nextBtn.textContent = stepIndex === tourSteps.length - 1 ? "Finish ✓" : "Next →";

      dialog.classList.add("active");
    }, 700);
  }

  function startTour() {
    isTourActive = true;
    currentStep = 0;
    trigger.style.display = "none";
    runStep(currentStep);
  }

  function endTour() {
    isTourActive = false;
    cursor.classList.remove("active");
    dialog.classList.remove("active");
    trigger.style.display = "inline-flex";
  }

  trigger.addEventListener("click", startTour);

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentStep++;
      dialog.classList.remove("active");
      runStep(currentStep);
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener("click", endTour);
  }
}

/* ---------------------------------------------------------
   7. Process Draw (SVG Path Drawing)
   --------------------------------------------------------- */
function initProcessDraw() {
  const drawPath = document.getElementById("processDrawPath");
  const stepCards = document.querySelectorAll(".process-step-card");
  if (!drawPath || !stepCards.length) return;

  const pathLength = drawPath.getTotalLength();
  drawPath.style.strokeDasharray = pathLength;
  drawPath.style.strokeDashoffset = pathLength;

  const section = document.getElementById("process");
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          drawPath.style.strokeDashoffset = "0";
          stepCards.forEach((card, idx) => {
            setTimeout(() => {
              card.classList.add("active-step");
            }, idx * 260);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
}

/* ---------------------------------------------------------
   8. Before / After Performance Comparison
   --------------------------------------------------------- */
function initBeforeAfter() {
  const tabBtns = document.querySelectorAll(".ba-tab-btn");
  const views = document.querySelectorAll(".ba-view");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      views.forEach((v) => v.classList.remove("active"));

      btn.classList.add("active");
      const targetView = document.getElementById(btn.getAttribute("data-view"));
      if (targetView) {
        targetView.classList.add("active");
      }
    });
  });
}

/* ---------------------------------------------------------
   9. Us vs Them (Comparison Matrix)
   --------------------------------------------------------- */
function initUsVsThem() {
  const rows = document.querySelectorAll(".matrix-table tbody tr");
  rows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      row.style.background = "rgba(13, 92, 93, 0.04)";
    });
    row.addEventListener("mouseleave", () => {
      row.style.background = "transparent";
    });
  });
}

/* ---------------------------------------------------------
   10. Click -> Success (Micro-interactions, Ripples, Toast, Confetti)
   --------------------------------------------------------- */
function initClickSuccess() {
  // 1. Button ripple effect
  document.querySelectorAll(".button, .nav-cta, .btn-submit, .btn-ripple").forEach((btn) => {
    btn.classList.add("btn-ripple");
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple-wave";
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // 2. Quick Copy Email with Toast Feedback
  const copyBtn = document.getElementById("copyEmailBtn");
  const toast = document.getElementById("copyToast");

  if (copyBtn && toast) {
    copyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = "zodeketan50@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        toast.classList.add("show");
        launchConfetti();
        setTimeout(() => {
          toast.classList.remove("show");
        }, 2800);
      }).catch(() => {
        alert(`Email: ${email}`);
      });
    });
  }
}

/* ---------------------------------------------------------
   Confetti Explosion Runner (Zero Dependencies)
   --------------------------------------------------------- */
function launchConfetti() {
  let canvas = document.getElementById("confettiCanvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "confettiCanvas";
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext("2d");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const colors = ["#c5f36b", "#0d5c5d", "#ef8354", "#ffffff", "#79bd39", "#f59e0b"];
  const particles = [];
  const count = 70;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: width * 0.5 + (Math.random() - 0.5) * 200,
      y: height * 0.45,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -12 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.35,
      opacity: 1
    });
  }

  let startTime = performance.now();

  function animate() {
    ctx.clearRect(0, 0, width, height);
    let activeParticles = 0;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rSpeed;
      p.opacity -= 0.009;

      if (p.opacity > 0 && p.y < height) {
        activeParticles++;
        ctx.save();
        ctx.globalAlpha = Math.max(p.opacity, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (activeParticles > 0) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  requestAnimationFrame(animate);
}
