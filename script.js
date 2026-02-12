const API_URL = "https://script.google.com/macros/s/AKfycbwVQ2NT2Y_JftqEMEhSXTvRcChyRrIKeiJg6F-eBYLhc9BiaLLqBLW9zJiSlOIwy--5/exec";

let allData = [];

// Load data from Google Sheet
async function loadData() {
  try {
    const res = await fetch(API_URL);
    allData = await res.json();

    console.log("Loaded data:", allData);

    const categories = [...new Set(allData.map(d => d["Category"]))];
    const areas = [...new Set(allData.map(d => d["Service Area"]))];

    const catSelect = document.getElementById("categoryFilter");
    const areaSelect = document.getElementById("areaFilter");

    categories.forEach(c => {
      catSelect.innerHTML += `<option value="${c}">${c}</option>`;
    });

    areas.forEach(a => {
      areaSelect.innerHTML += `<option value="${a}">${a}</option>`;
    });

  } catch (err) {
    console.error("Error loading data:", err);
  }
}

// Search function
function searchServices() {
  const cat = document.getElementById("categoryFilter").value;
  const area = document.getElementById("areaFilter").value;

  const filtered = allData.filter(d =>
    (!cat || d["Category"] === cat) &&
    (!area || d["Service Area"] === area)
  );

  document.getElementById("resultCount").innerText =
    `${filtered.length} services found`;

  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = filtered.map(d => `
    <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
      <h3>${d["Service Provider Name"]}</h3>
      Category: ${d["Category"]}<br>
      Subcategory: ${d["Subcategory"]}<br>
      Area: ${d["Service Area"]}<br>
      Contact 1: ${d["Contact 1"]}<br>
      Contact 2: ${d["Contact 2"]}
    </div>
  `).join("");
}

// Load data when page opens
loadData();
