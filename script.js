document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") AOS.init();

  // Scroll to Top
  function initScrollToTop() {
    const scrollTopBtn = document.querySelector(".scroll-top-btn");
    if (!scrollTopBtn) return;

    window.addEventListener("scroll", () => {
      scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Hamburger Menu
  function initHamburgerMenu() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
        navLinks.classList.remove("show");
      });
    });
  }

  // Theme Toggle
  function initThemeToggle() {
    const body = document.body;
    const themeToggle = document.getElementById("toggle-theme");
    if (!themeToggle) return;

    function updateIcon() {
      if (body.classList.contains("light-mode")) {
        themeToggle.textContent = "🌙";
        themeToggle.title = "Switch to Dark Mode";
        themeToggle.setAttribute("aria-pressed", "true");
      } else {
        themeToggle.textContent = "☀️";
        themeToggle.title = "Switch to Light Mode";
        themeToggle.setAttribute("aria-pressed", "false");
      }
    }

    if (localStorage.getItem("theme") === "light") {
      body.classList.add("light-mode");
    }
    updateIcon();

    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light-mode");
      localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
      updateIcon();
    });
  }

  // Modal
  function initModals() {
    function openModal(id) {
      const modal = document.getElementById(id);
      if (modal) modal.classList.add("show");
    }
    window.openModal = openModal;

    document.querySelectorAll(".close").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modalId = btn.dataset.modal;
        document.getElementById(modalId)?.classList.remove("show");
      });
    });

    window.addEventListener("click", (e) => {
      document.querySelectorAll(".modal.show").forEach((modal) => {
        if (e.target === modal) modal.classList.remove("show");
      });
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal.show").forEach((modal) => modal.classList.remove("show"));
      }
    });
  }

  // Scroll Progress
  function initScrollProgress() {
    const progressBar = document.getElementById("scroll-progress");
    if (!progressBar) return;

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    });
  }

  // Typewriter
  function initTypewriter() {
    const text = "Hi, I’m Sahil 👋";
    const typewriter = document.getElementById("typewriter");
    let index = 0;
    function type() {
      if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
      }
    }
    type();
  }

  // Skills
  function initSkillBars() {
    const skills = document.querySelectorAll(".fill");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const value = parseInt(entry.target.dataset.skill, 10);
          entry.target.style.width = value + "%";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    skills.forEach((bar) => observer.observe(bar));
  }

  // Lightbox
  function initLightbox() {
    const images = document.querySelectorAll(".project-img");
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `<span class="lightbox-close">&times;</span><img src="" alt="Expanded Project Image">`;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector("img");
    const closeBtn = lightbox.querySelector(".lightbox-close");

    images.forEach((img) => {
      img.addEventListener("click", (e) => {
        lightboxImg.src = e.target.src;
        lightbox.classList.add("show");
      });
    });

    closeBtn.addEventListener("click", () => lightbox.classList.remove("show"));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.remove("show"); });
  }

  // Init
  initScrollToTop();
  initHamburgerMenu();
  initThemeToggle();
  initModals();
  initScrollProgress();
  initTypewriter();
  initSkillBars();
  initLightbox();
});
