function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price_ton;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <div class="price">${item.price_ton} TON</div>
      <button class="buy-btn" onclick="removeItem(${index})">Удалить</button>
    `;

    container.appendChild(card);
  });

  totalEl.innerText = total;
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

renderCart();
