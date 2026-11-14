document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#menu");
  const header = document.querySelector(".site-header");

  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    menuToggle.innerHTML = `<i class="fa-solid fa-${isOpen ? "xmark" : "bars"}"></i>`;
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));

  const revealVisibleElements = () => {
    revealElements.forEach((element) => {
      const { top, bottom } = element.getBoundingClientRect();

      if (top < window.innerHeight && bottom > 0) {
        element.classList.add("active");
      }
    });
  };

  revealVisibleElements();
  window.addEventListener("load", revealVisibleElements, { once: true });

  const typingElement = document.querySelector("#typing");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion && typingElement) {
    const phrases = ["Matheus Fabri ", "desenvolvedor web ", "</mhfabri> "];
    let phraseIndex = 0;
    let characterIndex = phrases[0].length;
    let deleting = true;

    const type = () => {
      const phrase = phrases[phraseIndex];
      typingElement.textContent = phrase.slice(0, characterIndex);
      if (deleting) {
        characterIndex -= 1;
        if (characterIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      } else {
        characterIndex += 1;
        if (characterIndex === phrases[phraseIndex].length) {
          if (phraseIndex === phrases.length - 1) {
            return;
          }

          deleting = true;
          setTimeout(type, 1700);
          return;
        }
      }
      setTimeout(type, deleting ? 55 : 90);
    };
    setTimeout(type, 1800);
  }
});
