const dropdownButtons = document.querySelectorAll(".dropdown-btn");
const footerItems = document.querySelectorAll(".footer-item");

dropdownButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.closest(".footer-item");
    const isActive = parent.classList.contains("active");

    // Close all
    footerItems.forEach((item) => item.classList.remove("active"));

    // Toggle current
    if (!isActive) parent.classList.add("active");
  });
});

document.querySelectorAll(".close-btn").forEach((close) => {
  close.addEventListener("click", () => {
    close.closest(".footer-item").classList.remove("active");
  });
});
document.querySelectorAll(".dropdown-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.closest(".footer-item");
    parent.classList.toggle("active");
  });
});

document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = btn.closest(".footer-item");
    panel.classList.remove("active");
  });
});

const hamburger = document.getElementById("hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("show");
});
