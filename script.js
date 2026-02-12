const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    providerName: form.providerName.value,
    category: form.category.value,
    subcategory: form.subcategory.value,
    contact1: form.contact1.value,
    contact2: form.contact2.value,
    serviceArea: form.serviceArea.value
  };

  try {
    await fetch("YOUR_SCRIPT_URL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    alert("Data added successfully!");
    form.reset();

  } catch (err) {
    console.error(err);
    alert("Error submitting data");
  }
});
