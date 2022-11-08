let btn = document.getElementById("btnClick");
let image = document.getElementById("image");

btn.addEventListener("click", function () {
  fetch(
    `https://api.trace.moe/search?url=${encodeURIComponent(
      "https://images.plurk.com/32B15UXxymfSMwKGTObY5e.jpg"
    )}`
  ).then((e) => e.json());
});
