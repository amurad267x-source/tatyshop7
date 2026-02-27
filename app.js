const API = "https://backend.tatyshop.workers.dev";

async function loadProducts() {
  try {
    const res = await fetch(API + "/products");
    const products = await res.json();

    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${p.image}" alt="">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="price">${p.price_ton} TON</div>
        <button class="buy-btn">Добавить в корзину</button>
      `;

      card.querySelector(".buy-btn").addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(p);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Добавлено в корзину");
      });

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Ошибка загрузки товаров:", err);
  }
}
async function handleCredentialResponse(response) {
  const res = await fetch("https://backend.tatyshop.workers.dev/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      credential: response.credential
    })
  });

  const data = await res.json();
  console.log("Auth result:", data);

  if (data.success) {
    alert("Вы вошли как " + data.email);
  }
}

loadProducts();

