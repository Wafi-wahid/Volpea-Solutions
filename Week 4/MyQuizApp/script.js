let isMuted = localStorage.getItem("muted") === "true";

function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem("muted", isMuted);
  updateMuteIcon();
}

function updateMuteIcon() {
  document.querySelector(".mute-toggle").textContent = isMuted ? "🔇" : "🔊";
}

const questions = [
  {
    q: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    answer: 1,
  },
  {
    q: "What planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Pluto"],
    answer: 1,
  },
  {
    q: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2,
  },
  { q: "2 + 2 * 2 = ?", options: ["6", "8", "4"], answer: 0 },
  {
    q: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Tolkien", "Hemingway", "Dickens"],
    answer: 0,
  },
  {
    q: "Hardest natural substance?",
    options: ["Gold", "Iron", "Diamond", "Coal"],
    answer: 2,
  },
  {
    q: "JS keyword to declare variable?",
    options: ["var", "int", "function", "const"],
    answer: 0,
  },
  {
    q: "Fastest land animal?",
    options: ["Cheetah", "Lion", "Tiger", "Rabbit"],
    answer: 0,
  },
];

let currentQ = 0,
  score = 0,
  timer;
let timeLeft = 60;
let shuffled;

const startScreen = document.getElementById("start-screen");
const quizContainer = document.getElementById("quiz-container");
const resultScreen = document.getElementById("result-screen");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const finalScore = document.getElementById("final-score");
const finalTime = document.getElementById("final-time");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

function startQuiz() {
  updateMuteIcon();
  shuffled = questions.sort(() => Math.random() - 0.5);
  currentQ = 0;
  score = 0;
  timeLeft = 60;
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  updateScore();
  startTimer();
  showQuestion();
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) finishQuiz();
  }, 1000);
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function showQuestion() {
  const q = shuffled[currentQ];
  questionContainer.innerHTML = `<h3>${q.q}</h3>`;
  optionsContainer.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i);
    optionsContainer.appendChild(btn);
  });

  document.getElementById("question-counter").textContent = `Question ${
    currentQ + 1
  } of ${shuffled.length}`;

  const progress = ((currentQ + 1) / shuffled.length) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;
}

function selectAnswer(index) {
  const buttons = optionsContainer.querySelectorAll("button");
  buttons.forEach((b) => (b.disabled = true));
  const q = shuffled[currentQ];
  if (index === q.answer) {
    buttons[index].classList.add("correct");
    if (!isMuted) correctSound.play(); // ✅ Play only if unmuted
    score++;
  } else {
    buttons[index].classList.add("wrong");
    buttons[q.answer].classList.add("correct");
    if (!isMuted) wrongSound.play(); // ✅ Play only if unmuted
  }
  updateScore();
}

function nextQuestion() {
  const buttons = optionsContainer.querySelectorAll("button");
  const anyClicked = [...buttons].some((btn) => btn.disabled);
  if (!anyClicked) return alert("Please answer the question before moving on.");
  currentQ++;
  if (currentQ < shuffled.length) showQuestion();
  else finishQuiz();
}

function finishQuiz() {
  clearInterval(timer);
  quizContainer.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  const percent = Math.round((score / shuffled.length) * 100);
  finalScore.textContent = `You got ${score} out of ${shuffled.length} (${percent}%)`;
  finalTime.textContent = `Time used: ${60 - timeLeft}s`;
  localStorage.setItem("lastScore", score);
  if (percent >= 70) showConfetti();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
function confirmRestart() {
  if (confirm("Wanna restart again?")) {
    startQuiz();
  }
}

function showConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
