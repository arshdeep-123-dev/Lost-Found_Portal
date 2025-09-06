const reportForm = document.getElementById("reportForm");
const reportList = document.getElementById("reportList");

// Submit report
reportForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(reportForm);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch("/api/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    reportForm.reset();
    loadReports();
  } else {
    alert("Error submitting report");
  }
});

// Load reports
async function loadReports() {
  const res = await fetch("/api/reports");
  const reports = await res.json();

  reportList.innerHTML = reports.map(r => `
    <div class="bg-white p-4 mb-3 rounded shadow">
      <p><strong>${r.name}</strong> (${r.email})</p>
      <p class="text-gray-700">${r.issue}</p>
      <span class="text-sm text-gray-500">${new Date(r.createdAt).toLocaleString()}</span>
    </div>
  `).join("");
}

// Load on page start
loadReports();
