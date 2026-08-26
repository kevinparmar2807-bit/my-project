const books = [
  {title:'Atomic Habits',author:'James Clear',category:'Self-Help',price:199,icon:'📘'},
  {title:'The Psychology of Money',author:'Morgan Housel',category:'Business',price:249,icon:'💰'},
  {title:'Python Basics',author:'Mark Lutz',category:'Technology',price:299,icon:'💻'},
  {title:'The Alchemist',author:'Paulo Coelho',category:'Fiction',price:149,icon:'📖'},
  {title:'Computer Fundamentals',author:'P.K. Sinha',category:'Education',price:219,icon:'🎓'},
  {title:'Rich Dad Poor Dad',author:'Robert Kiyosaki',category:'Business',price:229,icon:'💼'}
];

function bookCard(b) {
  return `
    <div class="col-md-3 mb-4">
      <div class="book-card text-center p-3 border rounded bg-white">
        <div class="book-cover mb-2" style="font-size: 50px;">${b.icon}</div>
        <span class="badge badge-secondary mb-2">${b.category}</span>
        <h5 class="fw-bold text-truncate">${b.title}</h5>
        <p class="text-muted small">by ${b.author}</p>
        <div class="d-flex justify-content-between align-items-center">
          <strong class="text-primary">₹${b.price}</strong>
          <button class="btn btn-primary btn-sm" onclick="addToCart('${b.title}')">Add</button>
        </div>
      </div>
    </div>
  `;
}

function displayBooks(list, id = 'featuredBooks') {
  const box = document.getElementById(id);
  if (box) box.innerHTML = list.map(bookCard).join('');
}

// Cart functions
function getCart() {
  return JSON.parse(localStorage.getItem('booknest_cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('booknest_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-count');
  badges.forEach(b => b.textContent = total);
}

function addToCart(title) {
  const book = books.find(b => b.title === title);
  if (!book) return;
  let cart = getCart();
  const item = cart.find(i => i.title === title);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...book, quantity: 1 });
  }
  saveCart(cart);
  alert(title + ' added to cart!');
}

function removeFromCart(title) {
  let cart = getCart();
  cart = cart.filter(i => i.title !== title);
  saveCart(cart);
  renderCart();
}

function changeQuantity(title, change) {
  let cart = getCart();
  const item = cart.find(i => i.title === title);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.title !== title);
    }
  }
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const itemsDiv = document.getElementById('cartItems');
  const summaryDiv = document.getElementById('cartSummary');
  if (!itemsDiv || !summaryDiv) return;

  const cart = getCart();
  if (cart.length === 0) {
    itemsDiv.innerHTML = `<h3 class="text-center my-5">Your cart is empty</h3>`;
    summaryDiv.innerHTML = '';
    return;
  }

  itemsDiv.innerHTML = cart.map(item => `
    <div class="d-flex justify-content-between align-items-center p-3 border mb-3 bg-white rounded">
      <div>
        <span style="font-size: 24px;">${item.icon}</span>
        <strong class="ml-2">${item.title}</strong>
        <span class="text-muted ml-2">₹${item.price}</span>
      </div>
      <div>
        <button class="btn btn-sm btn-light border" onclick="changeQuantity('${item.title}', -1)">-</button>
        <span class="mx-2">${item.quantity}</span>
        <button class="btn btn-sm btn-light border" onclick="changeQuantity('${item.title}', 1)">+</button>
        <button class="btn btn-sm btn-danger ml-3" onclick="removeFromCart('${item.title}')">Remove</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  summaryDiv.innerHTML = `
    <div class="p-3 border rounded bg-white">
      <h4>Cart Summary</h4>
      <p class="d-flex justify-content-between"><span>Subtotal:</span> <strong>₹${total}</strong></p>
      <p class="d-flex justify-content-between"><span>Tax (18% GST):</span> <strong>₹${Math.round(total * 0.18)}</strong></p>
      <hr>
      <h5 class="d-flex justify-content-between"><span>Total:</span> <strong>₹${Math.round(total * 1.18)}</strong></h5>
      <a href="checkout.html" class="btn btn-primary btn-block mt-3">Proceed to Checkout</a>
    </div>
  `;
}

function renderCheckoutSummary() {
  const summaryDiv = document.getElementById('checkoutSummary');
  if (!summaryDiv) return;
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  summaryDiv.innerHTML = cart.map(item => `
    <p class="d-flex justify-content-between">
      <span>${item.title} (x${item.quantity})</span>
      <span>₹${item.price * item.quantity}</span>
    </p>
  `).join('') + `
    <hr>
    <h5 class="d-flex justify-content-between"><span>Total:</span> <strong>₹${Math.round(total * 1.18)}</strong></h5>
  `;
}

// Form validation
function loginDemo(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  const password = e.target.querySelector('input[type="password"]').value;
  if (!email.includes('@') || !email.includes('.')) {
    alert('Please enter a valid email address.');
    return;
  }
  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return;
  }
  alert('Login successful!');
  location.href = "index.html";
}

function registerDemo(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  const password = e.target.querySelector('input[type="password"]').value;
  if (!email.includes('@') || !email.includes('.')) {
    alert('Please enter a valid email address.');
    return;
  }
  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return;
  }
  alert('Registration successful!');
  location.href = "login.html";
}

function submitCheckout(e) {
  e.preventDefault();
  alert('Order placed successfully!');
  localStorage.removeItem('booknest_cart');
  location.href = "index.html";
}

function contactDemo(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const contact = document.getElementById('contactNo').value.trim();
  const nameError = document.getElementById('nameError');
  const contactError = document.getElementById('contactError');
  nameError.textContent = '';
  contactError.textContent = '';

  if (name === '') {
    nameError.textContent = 'Please Enter Name';
    return;
  }
  if (contact === '') {
    contactError.textContent = 'Please Enter Contact No';
    return;
  }
  if (!/^\d{10}$/.test(contact)) {
    contactError.textContent = 'Please Enter exactly 10 digits';
    return;
  }

  alert('Feedback submitted successfully!');
  document.getElementById('contactForm').reset();
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  displayBooks(books.slice(0, 4), 'featuredBooks');
  
  const list = document.getElementById('bookList');
  if (list) {
    displayBooks(books, 'bookList');
    const search = document.getElementById('searchBook');
    const filter = document.getElementById('filterCat');
    function filterBooks() {
      const q = search.value.toLowerCase();
      const c = filter.value;
      const filtered = books.filter(b => 
        (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)) &&
        (c === 'all' || b.category === c)
      );
      displayBooks(filtered, 'bookList');
    }
    if (search && filter) {
      search.addEventListener('input', filterBooks);
      filter.addEventListener('change', filterBooks);
    }
  }

  renderCart();
  renderCheckoutSummary();
});
