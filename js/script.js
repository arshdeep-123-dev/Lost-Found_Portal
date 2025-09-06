// Navbar + Footer Injection
function loadNavbar() {
  document.getElementById("navbar").innerHTML = `
    <nav class="bg-indigo-600 text-white p-4">
      <div class="max-w-6xl mx-auto flex justify-between">
        <a href="index.html" class="font-bold">Lost & Found</a>
        <div class="space-x-4">
          <a href="lost.html" class="hover:underline">Lost</a>
          <a href="found.html" class="hover:underline">Found</a>
          <a href="report.html" class="hover:underline">Report</a>
        </div>
      </div>
    </nav>
  `;
}

function loadFooter() {
  document.getElementById("footer").innerHTML = `
    <footer class="bg-gray-100 text-center py-6 mt-10 text-gray-600">
      <p>&copy; 2025 Lost & Found | College Project</p>
    </footer>
  `;
}

// Card Generator
function generateCard(item) {
  return `
    <div class="bg-white rounded-xl p-4 card-shadow">
      <img src="${item.img}" alt="${item.title}" class="item-img mb-4">
      <h2 class="text-xl font-semibold mb-2">${item.title}</h2>
      <p class="text-gray-600 mb-2">${item.desc}</p>
      <span class="text-sm text-gray-500">Location: ${item.location}</span>
    </div>
  `;
}

// Dummy Data
const lostItems = [
  { title: "Black Wallet", desc: "Lost near library", location: "Library", img: "assets/img/wallet.jpg" },
  { title: "Blue Umbrella", desc: "Forgot in classroom", location: "Block A", img: "assets/img/umbrella.jpg" }
];

const foundItems = [
  { title: "Red Water Bottle", desc: "Found near canteen", location: "Canteen", img: "assets/img/bottle.jpg" },
  { title: "Calculator", desc: "Left on desk", location: "Lab 3", img: "assets/img/calculator.jpg" }
];

// Render Functions
function renderLostItems(filter = "") {
  const container = document.getElementById("lost-items");
  if (!container) return;
  container.innerHTML = lostItems
    .filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
    .map(generateCard)
    .join("");
}

function renderFoundItems(filter = "") {
  const container = document.getElementById("found-items");
  if (!container) return;
  container.innerHTML = foundItems
    .filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
    .map(generateCard)
    .join("");
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  loadFooter();

  // Lost Page
  if (document.getElementById("lost-items")) {
    renderLostItems();
    document.getElementById("lost-search").addEventListener("input", (e) => {
      renderLostItems(e.target.value);
    });
  }

  // Found Page
  if (document.getElementById("found-items")) {
    renderFoundItems();
    document.getElementById("found-search").addEventListener("input", (e) => {
      renderFoundItems(e.target.value);
    });
  }
});


// ===== REPORT PAGE FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("report-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const type = document.getElementById("item-type").value;
      const title = document.getElementById("item-title").value;
      const desc = document.getElementById("item-desc").value;
      const location = document.getElementById("item-location").value;
      const imgInput = document.getElementById("item-img");

      // Default or uploaded image
      let img = "assets/img/default.jpg"; 
      if (imgInput.files && imgInput.files[0]) {
        img = URL.createObjectURL(imgInput.files[0]);
      }

      // Create new item object
      const newItem = { title, desc, location, img };

      // Save to localStorage
      const key = type === "lost" ? "lostItems" : "foundItems";
      let items = JSON.parse(localStorage.getItem(key)) || [];
      items.push(newItem);
      localStorage.setItem(key, JSON.stringify(items));

      // Reset form + show success message
      form.reset();
      document.getElementById("report-success").classList.remove("hidden");
    });
  }
});

// ===== LOST / FOUND PAGES LOAD LOCALSTORAGE =====
function renderLostItems(filter = "") {
  const container = document.getElementById("lost-items");
  if (!container) return;

  const items = JSON.parse(localStorage.getItem("lostItems")) || lostItems; // use defaults + saved
  container.innerHTML = items
    .filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
    .map(generateCard)
    .join("");
}

function renderFoundItems(filter = "") {
  const container = document.getElementById("found-items");
  if (!container) return;

  const items = JSON.parse(localStorage.getItem("foundItems")) || foundItems; 
  container.innerHTML = items
    .filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
    .map(generateCard)
    .join("");
}


// ====================== Navbar & Footer Injection ======================
document.addEventListener("DOMContentLoaded", () => {
  // Navbar
  const navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.innerHTML = `
      <nav class="bg-blue-600 text-white p-4 flex justify-between">
        <a href="index.html" class="font-bold">Lost & Found</a>
        <div class="space-x-4">
          <a href="lost.html" class="hover:underline">Lost Items</a>
          <a href="found.html" class="hover:underline">Found Items</a>
          <a href="report.html" class="hover:underline">Report</a>
        </div>
      </nav>
    `;
  }

  // Footer
  const footer = document.getElementById("footer");
  if (footer) {
    footer.innerHTML = `
      <footer class="bg-gray-800 text-white text-center p-4 mt-12">
        <p>© 2025 Lost & Found Portal. All rights reserved.</p>
      </footer>
    `;
  }
});

// ====================== Utility: Card Generator ======================
function generateCard(item) {
  return `
    <div class="bg-white rounded-xl p-4 card-shadow">
      <img src="${item.img || 'assets/img/placeholder.png'}" alt="${item.title}" class="item-img mb-4">
      <h2 class="text-xl font-semibold mb-2">${item.title}</h2>
      <p class="text-gray-600 mb-2">${item.desc}</p>
      <span class="text-sm text-gray-500">Location: ${item.location}</span>
    </div>
  `;
}

// ====================== LocalStorage Helpers ======================
function getItems(type) {
  return JSON.parse(localStorage.getItem(type)) || [];
}

function saveItem(type, item) {
  const items = getItems(type);
  items.push(item);
  localStorage.setItem(type, JSON.stringify(items));
}

// ====================== Render Lost/Found Pages ======================
document.addEventListener("DOMContentLoaded", () => {
  const lostGrid = document.getElementById("lostItemsGrid");
  const foundGrid = document.getElementById("foundItemsGrid");

  if (lostGrid) {
    const lostItems = getItems("lostItems");
    lostGrid.innerHTML = lostItems.map(generateCard).join("");
  }

  if (foundGrid) {
    const foundItems = getItems("foundItems");
    foundGrid.innerHTML = foundItems.map(generateCard).join("");
  }
});

// ====================== Report Form Handling ======================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reportForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("title").value;
      const desc = document.getElementById("desc").value;
      const location = document.getElementById("location").value;
      const type = document.getElementById("type").value;
      const imgInput = document.getElementById("img").files[0];

      let imgURL = "assets/img/placeholder.png"; // default
      if (imgInput) {
        imgURL = URL.createObjectURL(imgInput); // temp preview URL
      }

      const newItem = { title, desc, location, img: imgURL };

      if (type === "lost") {
        saveItem("lostItems", newItem);
        window.location.href = "lost.html";
      } else {
        saveItem("foundItems", newItem);
        window.location.href = "found.html";
      }
    });
  }
});
