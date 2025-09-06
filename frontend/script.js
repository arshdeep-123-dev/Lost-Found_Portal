// Dynamic API base URL
const BASE_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://lost-found-portal-1.onrender.com"; // Replace with your Render URL

// Container selectors
const lostContainer = document.getElementById("lost-items-container");
const foundContainer = document.getElementById("found-items-container");
const searchInput = document.getElementById("search-input");

// Generate HTML card for an item
function generateCard(item) {
  return `
    <div class="bg-white rounded-xl p-4 card-shadow mb-4">
      <img src="assets/img/${item.img}" alt="${item.title}" class="item-img mb-4 w-full h-48 object-cover rounded">
      <h2 class="text-xl font-semibold mb-2">${item.title}</h2>
      <p class="text-gray-600 mb-2">${item.desc}</p>
      <span class="text-sm text-gray-500">Location: ${item.location}</span>
      <span class="text-sm text-gray-500 block">Type: ${item.type}</span>
    </div>
  `;
}

// Fetch lost items
async function fetchLostItems() {
  try {
    const res = await fetch(`${BASE_URL}/api/items/lost`);
    const data = await res.json();
    renderItems(lostContainer, data);
  } catch (err) {
    console.error("Error fetching lost items:", err);
  }
}

// Fetch found items
async function fetchFoundItems() {
  try {
    const res = await fetch(`${BASE_URL}/api/items/found`);
    const data = await res.json();
    renderItems(foundContainer, data);
  } catch (err) {
    console.error("Error fetching found items:", err);
  }
}

// Render items in a container
function renderItems(container, items) {
  if (!container) return;
  container.innerHTML = items.map(generateCard).join("");
}

// Search/filter items by title or description
function filterItems() {
  const term = searchInput.value.toLowerCase();
  if (!term) {
    fetchLostItems();
    fetchFoundItems();
    return;
  }

  const filterContainer = (containerId, apiEndpoint) => {
    fetch(`${BASE_URL}${apiEndpoint}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          item =>
            item.title.toLowerCase().includes(term) ||
            item.desc.toLowerCase().includes(term)
        );
        const container = document.getElementById(containerId);
        renderItems(container, filtered);
      });
  };

  filterContainer("lostItemsContainer", "/api/items/lost");
  filterContainer("foundItemsContainer", "/api/items/found");
}

// Event listener for search input
if (searchInput) {
  searchInput.addEventListener("input", filterItems);
}

// Initial fetch
fetchLostItems();
fetchFoundItems();
