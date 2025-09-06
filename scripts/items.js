// scripts/items.js

function generateCard(item) {
  return `
    <div class="bg-white rounded-xl p-4 card-shadow">
      <img src="${item.img || 'assets/img/placeholder.png'}" alt="${item.title}" class="item-img mb-4">
      <h2 class="text-xl font-semibold mb-2">${item.title}</h2>
      <p class="text-gray-600 mb-2">${item.desc}</p>
      <span class="block text-sm text-gray-500">📍 ${item.location}</span>
      <span class="block text-xs text-gray-400 mt-2">Reported on: ${new Date(item.date).toLocaleDateString()}</span>
    </div>
  `;
}

async function fetchItems(type, containerId, searchInputId) {
  try {
    const res = await fetch("https://lost-found-portal-8hrq.onrender.com/api/items/found");
    const items = await res.json();

    const filteredItems = items.filter(item => item.type === type);

    const container = document.getElementById(containerId);
    container.innerHTML = filteredItems.map(generateCard).join("");

    // Search functionality
    const searchInput = document.getElementById(searchInputId);
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = filteredItems.filter(
          item =>
            item.title.toLowerCase().includes(query) ||
            item.desc.toLowerCase().includes(query) ||
            item.location.toLowerCase().includes(query)
        );
        container.innerHTML = filtered.map(generateCard).join("");
      });
    }
  } catch (err) {
    console.error(`Error fetching ${type} items:`, err);
  }
}

// Initialize based on page
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("lostItemsContainer")) {
    fetchItems("lost", "lostItemsContainer", "searchLost");
  }
  if (document.getElementById("foundItemsContainer")) {
    fetchItems("found", "foundItemsContainer", "searchFound");
  }
});


// Handle Add Item form submission
async function handleAddItem(e) {
  e.preventDefault();

  const form = document.getElementById("addItemForm");
  const formData = new FormData(form);

  const itemData = {
    title: formData.get("title"),
    desc: formData.get("desc"),
    location: formData.get("location"),
    img: formData.get("img"),
    type: formData.get("type"),
  };

  try {
    const res = await fetch("https://lost-found-portal-8hrq.onrender.com/api/items/found", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemData),
    });

    if (!res.ok) throw new Error("Failed to add item");

    const newItem = await res.json();

    // Show success message
    const msg = document.getElementById("formMessage");
    msg.textContent = `✅ ${newItem.type.toUpperCase()} item added successfully!`;
    msg.classList.remove("hidden");

    form.reset();
  } catch (err) {
    console.error("Error adding item:", err);
    alert("❌ Could not add item. Please try again.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("addItemForm")) {
    document.getElementById("addItemForm").addEventListener("submit", handleAddItem);
  }
});
