let cart = [];

// ضع رقم WhatsApp تبعك هون بدون + أو مسافات
const WHATSAPP_NUMBER = "96181504148";

function addToCart(button) {
  const card = button.closest(".product-card");
  const name = card.querySelector("h3").innerText.trim();
  const price = parseFloat(
    card.querySelector(".price").innerText.replace("$", "")
  );
  const size = card.querySelector("select").value;

  cart.push({ name, price, size });
  displayCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}

function displayCart() {
  const cartSection = document.getElementById("cart");
  const cartCount = document.getElementById("cartCount");

  cartCount.innerText = cart.length;

  if (cart.length === 0) {
    cartSection.innerHTML = `
      <h2>Shopping Cart</h2>
      <p>Your cart is empty.</p>
    `;
    return;
  }

  let html = "<h2>Shopping Cart</h2>";

  cart.forEach((item, index) => {
    html += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <span>$${item.price} · Size: ${item.size}</span>
        </div>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  html += `<div class="total">Total: $${total}</div>`;
  cartSection.innerHTML = html;
}

function buyNow() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hello Brand District! I would like to order:\n\n";

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `Price: $${item.price}\n`;
    message += `Size: ${item.size}\n\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `Total: $${total}`;

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");
}
