const API_URL = "https://reqres.in/api/users";
const userList = document.getElementById("userList");
const addUserBtn = document.getElementById("addUserBtn");
const modal = document.getElementById("userModal");
const form = document.getElementById("userForm");
const toggleTheme = document.getElementById("toggleTheme");
const cancelBtn = document.getElementById("cancelBtn");

let editingUserId = null;
let currentPage = 1;
const usersPerPage = 6;
let totalPages = 2;

// ======== Theme Toggle =========
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleTheme.classList.toggle("rotate");
});

// ➕ Open Modal
addUserBtn.onclick = () => {
  form.reset();
  editingUserId = null;
  document.getElementById("modalTitle").textContent = "Add User";
  modal.classList.remove("hidden");
};

// ❌ Cancel Modal
cancelBtn.onclick = () => modal.classList.add("hidden");

// 🔔 Toast Notification
function showToast(message = "Action successful!") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// 📥 Load Users from API or localStorage
function loadUsers(page = 1, searchTerm = "") {
  const localUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Filter by name or email
  const filtered = localUsers.filter((u) => {
    const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
    const email = (u.email || "").toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });

  const start = (page - 1) * usersPerPage;
  const paginated = filtered.slice(start, start + usersPerPage);

  renderUsers(paginated);
  totalPages = Math.ceil(filtered.length / usersPerPage);
  currentPage = page;
  updatePageInfo();
}

// 🧱 Render Users
function renderUsers(users) {
  userList.innerHTML = users
    .map(
      (user) => `
    <div class="user-card">
      <img src="${user.avatar || "https://i.pravatar.cc/150?img=68"}" alt="${
        user.first_name
      }" />
      <div>
        <h3>${user.first_name} ${user.last_name || ""}</h3>
        <p>${user.email || "no-email@fake.com"}</p>
        <button onclick="editUser('${user.id}')">✏️</button>
        <button onclick="deleteUser('${user.id}')">🗑️</button>
      </div>
    </div>
  `
    )
    .join("");
}

// 💾 Add / Update User (Simulate with localStorage)
form.onsubmit = function (e) {
  e.preventDefault();
  const fullName = document.getElementById("name").value;
  const job = document.getElementById("job").value;
  const [first_name, last_name = ""] = fullName.trim().split(" ");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (editingUserId) {
    users = users.map((user) =>
      user.id == editingUserId ? { ...user, first_name, last_name, job } : user
    );
    showToast("✅ User updated successfully!");
  } else {
    const newUser = {
      id: Date.now(),
      first_name,
      last_name,
      email: `${first_name.toLowerCase()}@example.com`,
      avatar: "https://i.pravatar.cc/150?img=67",
      job,
    };
    users.unshift(newUser);
    showToast("✅ User added successfully!");
  }

  localStorage.setItem("users", JSON.stringify(users));
  modal.classList.add("hidden");

  const currentSearch = document.getElementById("searchInput").value.trim();
  loadUsers(currentPage, currentSearch);
};

// ✏️ Edit User
window.editUser = function (id) {
  editingUserId = id;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.id == id);

  document.getElementById("modalTitle").textContent = "Edit User";
  document.getElementById(
    "name"
  ).value = `${user.first_name} ${user.last_name}`;
  document.getElementById("job").value = user.job || "";
  modal.classList.remove("hidden");
};

// 🗑️ Delete User
window.deleteUser = function (id) {
  if (!confirm("Delete user?")) return;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter((u) => u.id != id);
  localStorage.setItem("users", JSON.stringify(users));

  showToast("🗑️ User deleted successfully!");
  renderUsers(users);

  localStorage.setItem("users", JSON.stringify(users));
  showToast("🗑️ User deleted successfully!");

  const currentSearch = document.getElementById("searchInput").value.trim();
  loadUsers(currentPage, currentSearch);
};

// ⏯️ Pagination (static here since we're simulating data)
function updatePageInfo() {
  document.getElementById(
    "currentPageInfo"
  ).textContent = `Page ${currentPage}`;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

document.getElementById("prevPage").onclick = () => {
  if (currentPage > 1) currentPage--;
  loadUsers(currentPage);
};

document.getElementById("nextPage").onclick = () => {
  if (currentPage < totalPages) currentPage++;
  loadUsers(currentPage);
};

// 📅 Calendar
const monthYear = document.getElementById("monthYear");
const calendarGrid = document.getElementById("calendarGrid");
let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
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

  monthYear.textContent = `${monthNames[month]} ${year}`;
  calendarGrid.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    calendarGrid.appendChild(blank);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dayCell = document.createElement("div");
    dayCell.textContent = i;
    dayCell.addEventListener("click", () => {
      showToast(`📅 Selected Date: ${month + 1}/${i}/${year}`);
    });
    calendarGrid.appendChild(dayCell);
  }
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
}

// 🚀 Init
loadUsers();
renderCalendar(currentDate);

document.getElementById("searchInput").addEventListener("input", (e) => {
  const term = e.target.value.trim();
  currentPage = 1;
  loadUsers(currentPage, term);
});
