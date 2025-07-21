document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu
  const hamburger = document.getElementById("hamburger");
  const closeIcon = document.getElementById("closeIcon");
  const mobileSidebar = document.getElementById("mobileSidebar");

  const toggleSidebar = (show) => {
    mobileSidebar?.classList.toggle("show", show);
    hamburger?.style.setProperty("display", show ? "none" : "inline-block");
    closeIcon?.style.setProperty("display", show ? "inline-block" : "none");
  };

  hamburger?.addEventListener("click", () => toggleSidebar(true));
  closeIcon?.addEventListener("click", () => toggleSidebar(false));

  const testimonialTrack = document.querySelector(".testimonial-track");
  const testimonialDots = document.querySelectorAll(".testimonial-dot");

  if (testimonialTrack && testimonialDots.length > 0) {
    // Fix: force reset position
    testimonialTrack.style.transform = "translateX(0%)";

    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        const offset = index * -100;
        testimonialTrack.style.transform = `translateX(${offset}%)`;

        testimonialDots.forEach((d) => d.classList.remove("active"));
        dot.classList.add("active");
      });
    });
  }

  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;

      // Close all others
      document.querySelectorAll(".faq-answer").forEach((a) => {
        if (a !== answer) a.classList.remove("open");
      });
      document.querySelectorAll(".faq-question").forEach((q) => {
        if (q !== btn) q.classList.remove("active");
      });

      // Toggle current
      answer.classList.toggle("open");
      btn.classList.toggle("active");
    });
  });
});

const footerTriggers = document.querySelectorAll(".footer-trigger");

footerTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".footer-item");

    // Close all other dropdowns
    document.querySelectorAll(".footer-item").forEach((el) => {
      if (el !== item) el.classList.remove("active");
    });

    // Toggle current
    item.classList.toggle("active");
  });
});
