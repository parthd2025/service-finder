const API_URL = "https://script.google.com/macros/s/AKfycbwCt9_qj6xzoUZ7yh-y0NB0cUXlMVVwo2xELcUWfYKk1JJ_yZeIPnkr4r_fF1vq1yK7/exec";

let allData = [];

async function loadData() {
  const res = await fetch(API_URL);
  allData = await res.json();

  const categories = [...new Set(allData.map(d => d["Category"]))];
  const areas = [...new Set(allData.map(d => d["Service Area"]))];

  const catSelect = document.getElementById("categoryFilter");
  const areaSelect = document.getElementById("areaFilter");

  categories.forEach(c =>
    catSelect.innerHTML += `<option value="${c}">${c}</option>`
  );

  areas.forEach(a =>
    areaSelect.innerHTML += `<option value="${a}">${a}</option>`
  );

  // show all services initially
  searchServices();
}

function searchServices() {
  const cat = document.getElementById("categoryFilter").value;
  const area = document.getElementById("areaFilter").value;

  const filtered = allData.filter(d =>
    (!cat || d["Category"] === cat) &&
    (!area || d["Service Area"] === area)
  );

  document.getElementById("resultCount").innerText =
    `${filtered.length} services found`;

  document.getElementById("results").innerHTML = filtered.map(d => `
    <div>
      <b>${d["Service Provider Name"]}</b> —
      ${d["Category"]} —
      ${d["Service Area"]} —
      📞 ${d["Contact 1"]}
    </div>
  `).join("");
}

loadData();
