document.addEventListener("DOMContentLoaded", () => {
  checkAgeFirst();
});

/* TODO: Check Age */
function checkAgeFirst() {
  const savedAge = parseInt(localStorage.getItem("age"));
  const denied = sessionStorage.getItem("deniedOnce");

  if (denied === "true") {
    denyAccess(); // 🛑 Hard deny if previously denied
  } else if (!isNaN(savedAge) && savedAge < 18) {
    denyAccess();
  } else if (savedAge >= 18) {
    initApp();
  } else {
    showAgePopup();
  }
}

/* TODO:  Age PopUP*/
function showAgePopup() {
  const modal = document.getElementById("ageModal");
  modal.classList.remove("hidden");

  document.getElementById("submitAge").onclick = () => {
    const ageVal = +document.getElementById("ageInput").value;
    if (!ageVal || ageVal < 0) return alert("Enter a valid age.");

    if (sessionStorage.getItem("popupAge")) {
      const existingAge = parseInt(sessionStorage.getItem("popupAge"));

      if (existingAge < 18) {
        alert("Access Denied! You cannot continue.");
        sessionStorage.setItem("deniedOnce", "true");
        denyAccess();
        return;
      }

      alert("You can only update your Date of Birth now.");
      modal.classList.add("hidden");
      return;
    }

    localStorage.setItem("age", ageVal);
    sessionStorage.setItem("popupAge", ageVal);
    modal.classList.add("hidden");

    if (ageVal < 18) {
      const retry = confirm("You must be 18+ to access. Retry?");
      localStorage.removeItem("age");

      if (retry) {
        document.getElementById("ageInput").value = "";
        modal.classList.remove("hidden"); // Keep popup open
      } else {
        sessionStorage.setItem("deniedOnce", "true"); // 🔐 Mark that user is denied
        denyAccess();
      }
    } else {
      initApp();
    }
  };
}

/* TODO: If age <18, Deny access */
function denyAccess() {
  alert("Access Denied! Redirecting...");
  window.location.href = "https://example.com/restricted.html";
}

let ipCountryCode = "";
let ipCountryName = "";

function initApp() {
  loadTheme();
  getUserLocation();
  populateDOB();
  setupCountryDropdown();
  loadFromStorage();
  addEventListeners();
}

/* TODO: User location: IP & Country using API */
function getUserLocation() {
  fetch("https://ipinfo.io/json?token=c8d80fd0dcec6b")
    .then((res) => res.json())
    .then((data) => {
      const ipBox = document.getElementById("ipLocationBox");
      ipCountryCode = data.country;
      ipBox.textContent = `IP: ${data.ip} | Country: ${data.country}`;
      localStorage.setItem("ip", data.ip);
      localStorage.setItem("countryCode", data.country);

      const dropdown = document.getElementById("countryDropdown");
      const waitForDropdown = setInterval(() => {
        if (dropdown.options.length > 1) {
          dropdown.value = data.country;
          dropdown.dispatchEvent(new Event("change"));
          clearInterval(waitForDropdown);
        }
      }, 100);
    })
    .catch(() => {
      document.getElementById("ipLocationBox").textContent =
        "IP: Unknown | Country: Unknown";
    });
}

/* TODO: DOB */
function populateDOB() {
  const now = new Date();
  const day = document.getElementById("dobDay");
  const month = document.getElementById("dobMonth");
  const year = document.getElementById("dobYear");

  for (let d = 1; d <= 31; d++) day.innerHTML += `<option>${d}</option>`;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  months.forEach((m, i) => {
    month.innerHTML += `<option value="${i + 1}">${m}</option>`;
  });

  for (let y = now.getFullYear(); y >= 1900; y--)
    year.innerHTML += `<option>${y}</option>`;

  [day, month, year].forEach((el) => el.addEventListener("change", showAge));
}

/* TODO: Calculated Age based on DOB*/
function showAge() {
  const day = parseInt(document.getElementById("dobDay").value);
  const month = parseInt(document.getElementById("dobMonth").value);
  const year = parseInt(document.getElementById("dobYear").value);

  if (!day || !month || !year) {
    document.getElementById("ageResult").innerText =
      "Please select complete DOB.";
    return;
  }

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Save DOB
  localStorage.setItem("dob", JSON.stringify({ d: day, m: month, y: year }));

  // Show result
  const ageResult = document.getElementById("ageResult");
  ageResult.innerText = `You are ${years} years, ${months} months, ${days} days old`;

  // Match with popup age
  const popupAge = parseInt(sessionStorage.getItem("popupAge"));
  if (!isNaN(popupAge) && popupAge !== years) {
    const retried = sessionStorage.getItem("retryOnce");

    if (retried === "true") {
      alert("Second mismatch detected. Access denied.");
      window.location.href = "/restricted.html";
      return;
    }

    const retry = confirm(
      "Mismatch in age entered and DOB-calculated age!\nWould you like to retry?"
    );

    if (retry) {
      sessionStorage.setItem("retryOnce", "true"); // 👈 mark that they've already retried once

      alert("Please correct your Date of Birth to match the entered age.");
      document.getElementById("ageModal").classList.add("hidden"); // hide popup
      document
        .getElementById("dobSection")
        .scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/restricted.html";
    }

    return;
  }
}

/* TODO: Country Dropdown */
async function setupCountryDropdown() {
  const dropdown = document.getElementById("countryDropdown");

  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,population,flags,cca2"
    );
    if (!response.ok) throw new Error("Failed to fetch countries.");

    const data = await response.json();
    const validCountries = data.filter((c) => c.name?.common && c.cca2);
    validCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    dropdown.innerHTML = `<option disabled selected value="">Select Country</option>`;
    validCountries.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.cca2;
      opt.textContent = c.name.common;
      opt.dataset.name = c.name.common;
      dropdown.appendChild(opt);
    });

    // Pre-select based on IP
    const savedCode = localStorage.getItem("countryCode");
    if (savedCode) {
      setTimeout(() => {
        dropdown.value = savedCode;
        dropdown.dispatchEvent(new Event("change"));
      }, 0);
    }

    dropdown.addEventListener("change", () => {
      const selectedCode = dropdown.value;
      const selectedData = validCountries.find((c) => c.cca2 === selectedCode);
      if (!selectedData) return;

      // If IP country exists and mismatches selection
      if (ipCountryCode && selectedCode !== ipCountryCode) {
        const confirmChange = confirm(
          `Your IP country is ${ipCountryCode}, but you selected ${selectedData.name.common}. Do you want to override it?`
        );

        if (!confirmChange) {
          //  Cancelled, revert dropdown and do NOT update flag/fact
          dropdown.value = ipCountryCode;
          return;
        }

        //  User confirmed, update stored IP (override)
        ipCountryCode = selectedCode;
        ipCountryName = selectedData.name.common;
        localStorage.setItem("countryCode", selectedCode);
        localStorage.setItem("selectedCountry", selectedData.name.common);
        localStorage.setItem("ip", "Overridden manually");
      } else {
        //  Match or no IP country found
        localStorage.setItem("countryCode", selectedCode);
        localStorage.setItem("selectedCountry", selectedData.name.common);
      }

      // Show country flag & facts only *after* confirmation
      const flag = selectedData.flags?.svg || "";
      const fact = `Capital: ${
        selectedData.capital?.[0] || "N/A"
      }, Population: ${selectedData.population?.toLocaleString() || "N/A"}`;

      document.getElementById(
        "flagBox"
      ).innerHTML = `<img src="${flag}" alt="Flag" width="100"/>`;
      document.getElementById("countryFact").textContent = fact;
    });
  } catch (err) {
    console.error("Countries fetch failed:", err);
  }
}

/* TODO: Automatically refill */
function loadFromStorage() {
  const dob = JSON.parse(localStorage.getItem("dob") || "{}");
  const dobDay = document.getElementById("dobDay");
  const dobMonth = document.getElementById("dobMonth");
  const dobYear = document.getElementById("dobYear");

  if (dob.d) dobDay.value = dob.d;
  if (dob.m) dobMonth.value = dob.m;
  if (dob.y) dobYear.value = dob.y;
  if (dob.d && dob.m && dob.y) {
    showAge(); // Trigger age calculation if all are prefilled
  }

  const savedCountryCode = localStorage.getItem("countryCode");
  if (savedCountryCode) {
    const dropdown = document.getElementById("countryDropdown");
    dropdown.value = savedCountryCode;
    dropdown.dispatchEvent(new Event("change"));
  }
}

/* TODO: Event Listeners */
function addEventListeners() {
  document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  };

  document.getElementById("resetBtn").onclick = () => {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  };
  document.getElementById("calculateBtn").addEventListener("click", showAge);
}

/* TODO: Theme */
function loadTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") document.body.classList.add("dark");
}
