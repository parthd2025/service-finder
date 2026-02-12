const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  await fetch("https://script.google.com/macros/s/AKfycbwfi5gSEqPWlenmj9Db4L87pw8J_rRv5PwbnRd_SRmEDtkmGgx9uirjoRPNBucmhy_L/execL", {
    method: "POST",
    body: JSON.stringify(data)
  });

  alert("Data submitted!");
});
