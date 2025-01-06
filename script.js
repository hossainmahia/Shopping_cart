const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const clearCartButton = document.getElementById('clear-cart');
let cart = [];

// Fetch products dynamically
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    displayProducts(products);
  });

// Display products
function displayProducts(products) {
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productList.appendChild(productDiv);
  });
}

// Add to cart
function addToCart(productId) {
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      const cartItem = cart.find(item => item.id === productId);

      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      updateCart();
    });
}

// Update cart
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - $${item.price} x ${item.quantity}
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;

    cartItems.appendChild(li);
  });

  totalPriceElement.textContent = total.toFixed(2);
}
// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Clear cart
clearCartButton.addEventListener('click', () => {
  cart = [];
  updateCart();
});
