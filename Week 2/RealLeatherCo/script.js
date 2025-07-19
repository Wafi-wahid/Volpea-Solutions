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

  if (track && dots.length > 0) {
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const slide = parseInt(dot.getAttribute("data-slide"));
        const offset = slide * -100; // each slide is now 100% width

        track.style.transform = `translateX(${offset}%)`;

        dots.forEach((d) => d.classList.remove("active"));
        dot.classList.add("active");
      });
    });
  }

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
