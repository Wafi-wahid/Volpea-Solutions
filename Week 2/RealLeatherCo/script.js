const hamburger = document.getElementById("hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", function () {
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
});

window.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".review-cards");
  const dots = document.querySelectorAll(".dot");

  if (!track || dots.length === 0) return;

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      track.style.transform = `translateX(-${index * 100}%)`;

      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });
});
