document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initNavbar();
  initSmoothScroll();
  initMobileMenu();
  initScrollSpy();
  initBackToTop();
  initFAQ();
  initContactForm();
  initNewsletter();
  initCookieBanner();
  initScrollAnimations();
  initVideoLazyLoad();
});

function initPreloader() {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;

  // Hide preloader after a short delay
  setTimeout(() => {
    preloader.classList.add("hidden");
    document.body.classList.add("fade-in");
  }, 1000);
}

function initNavbar() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        const offset = 70;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        if (mobileMenuActive()) {
          closeMobileMenu();
        }
      }
    });
  });

  function mobileMenuActive() {
    const mobileMenu = document.querySelector(".mobile-menu");
    return mobileMenu && mobileMenu.classList.contains("active");
  }

  function closeMobileMenu() {
    const mobileMenu = document.querySelector(".mobile-menu");
    const menuBtn = document.querySelector(".mobile-menu-btn");
    if (mobileMenu) mobileMenu.classList.remove("active");
    if (menuBtn) menuBtn.classList.remove("active");
  }
}

function initMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    menuBtn.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove("active");
      menuBtn.classList.remove("active");
    }
  });

  mobileMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      menuBtn.classList.remove("active");
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link:not(.btn-nav)");

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

function initFAQ() {
  const faqButtons = document.querySelectorAll("#faq button");

  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector("span:last-child");

      if (answer.style.display === "none") {
        answer.style.display = "block";
        if (icon) icon.textContent = "-";
      } else {
        answer.style.display = "none";
        if (icon) icon.textContent = "+";
      }
    });
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const subject = data.subject || "New Contact Form Submission";
    const message = `*Name:* ${data.name}\n*Email:* ${data.email}\n\n*Subject:* ${subject}\n\n*Message:*\n${data.message}`;

    const whatsappUrl = `https://wa.me/2348165321429?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    form.reset();
  });
}

function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("animate-in");
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".service-card, .project-card, .faq-item, .contact-card, .skill-category",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  setTimeout(() => {
    document.querySelectorAll(".animate-in").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, 100);
}

function initBackToTop() {
  const backToTopBtn = document.querySelector(".back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function initNewsletter() {
  const newsletterForm = document.getElementById("newsletterForm");
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = newsletterForm.querySelector('input[type="email"]').value;
    const message = `*New Newsletter Subscription*\n\n*Email:* ${email}`;

    const whatsappUrl = `https://wa.me/2348165321429?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    newsletterForm.reset();
    alert("Thanks for subscribing! Check your WhatsApp to confirm.");
  });
}

function initCookieBanner() {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("acceptCookies");

  if (!cookieBanner || !acceptBtn) return;

  const cookiesAccepted = localStorage.getItem("cookiesAccepted");

  if (!cookiesAccepted) {
    setTimeout(() => {
      cookieBanner.classList.add("show");
    }, 2000);
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.classList.remove("show");
  });
}

window.addEventListener("load", () => {
  const heroElements = document.querySelectorAll(
    ".hero-badge, .hero-title, .hero-description, .hero-stats, .hero-actions",
  );
  heroElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.animation = `slideUp 0.6s ease ${index * 0.1}s forwards`;
  });
});

// CSS animation keyframes for slideUp
const style = document.createElement("style");
style.innerHTML = `
@keyframes slideUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(style);

// Video Lazy Load - Load YouTube embeds on click (facade pattern)
function initVideoLazyLoad() {
  const videoWrappers = document.querySelectorAll(".video-skeleton");

  videoWrappers.forEach((skeleton) => {
    skeleton.addEventListener("click", function () {
      const wrapper = this.closest(".video-wrapper");
      const videoId = wrapper.dataset.videoId;

      if (!videoId) return;

      // Create iframe element
      const iframe = document.createElement("iframe");
      iframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/${videoId}?autoplay=1`,
      );
      iframe.setAttribute("title", "YouTube video player");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      );
      iframe.setAttribute("allowfullscreen", "");
      iframe.style.width = "100%";
      iframe.style.height = "100%";

      // Clear skeleton and append iframe
      wrapper.innerHTML = "";
      wrapper.appendChild(iframe);
    });
  });
}
