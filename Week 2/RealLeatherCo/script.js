document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu
  const hamburger = document.getElementById("hamburger");
  const navbar = document.querySelector(".navbar");

  if (hamburger && navbar) {
    hamburger.addEventListener("click", () => {
      navbar.classList.toggle("show");
    });
  }

  const track = document.querySelector(".review-track");
  const dots = document.querySelectorAll(".dot");

  if (!track || dots.length === 0) return;

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slide = parseInt(dot.getAttribute("data-slide"));
      const offset = slide * -85; // 80% + 5% margin = 85%

      track.style.transform = `translateX(${offset}%)`;

      // Update dot styles
      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });

  const track1 = document.querySelector(".review-cards");
  const dots1 = document.querySelectorAll(".dot");

  if (!track1 || dots1.length === 0) return;

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      track.style.transform = `translateX(-${index * 100}%)`;

      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });

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
