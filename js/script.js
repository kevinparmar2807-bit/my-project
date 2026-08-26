// Database: List of featured e-books with categories, prices, and image covers
const books = [
  {title:'Atomic Habits',author:'James Clear',category:'Self-Help',price:199,image:'https://m.media-amazon.com/images/I/81wgcld4wxL.jpg'},
  {title:'The Psychology of Money',author:'Morgan Housel',category:'Business',price:249,image:'https://covers.openlibrary.org/b/isbn/9789390166268-L.jpg'},
  {title:'Python Basics',author:'Mark Lutz',category:'Technology',price:299,image:'https://covers.openlibrary.org/b/isbn/9781491912058-L.jpg'},
  {title:'The Alchemist',author:'Paulo Coelho',category:'Fiction',price:149,image:'https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg'},
  {title:'Computer Fundamentals',author:'P.K. Sinha',category:'Education',price:219,image:'https://bpbonline.com/cdn/shop/products/1058_Epub.jpg?v=1755670156'},
  {title:'Rich Dad Poor Dad',author:'Robert Kiyosaki',category:'Business',price:229,image:'https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg'}
];

// Helper: Renders HTML card for a single book item
const bookCard = (b) => `
  <div class="col-md-3 mb-4"><div class="card h-100 border rounded shadow-sm text-center">
    <img src="${b.image}" class="card-img-top p-2" style="height: 180px; object-fit: contain;" alt="${b.title}">
    <div class="card-body p-2 d-flex flex-column justify-content-between">
      <div><h6 class="font-weight-bold text-truncate m-1">${b.title}</h6><small class="text-muted">by ${b.author}</small></div>
      <div class="d-flex justify-content-between align-items-center mt-2">
        <span class="badge badge-light">₹${b.price}</span>
        <button class="btn btn-primary btn-sm px-2" onclick="addToCart('${b.title}')">Add to Cart</button>
      </div>
    </div>
  </div></div>`;

// Helper: Displays a list of books inside the specified element ID
const displayBooks = (list, id = 'featuredBooks') => { const b = document.getElementById(id); if (b) b.innerHTML = list.map(bookCard).join(''); };

// Regular expression rules for text input checks
const valRules = { email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), nameOnly: (v) => /^[A-Za-z]+$/.test(v), nameWithSpaces: (v) => /^[A-Za-z\s]+$/.test(v), mobile: (v) => /^\d{10}$/.test(v) };

// Helper: Sequential form validation runner
const runValidation = (checks) => { for (const c of checks) { if (!c.value) { alert(c.reqMsg); return false; } if (!c.rule(c.value)) { alert(c.errMsg); return false; } } return true; };

// Action: Handle login form submission
function loginDemo(e) {
  e.preventDefault();
  const email = $('#loginEmail').val().trim(), pass = $('#loginPassword').val();
  if (runValidation([
    { value: email, rule: valRules.email, reqMsg: 'Email Address is required.', errMsg: 'Please enter a valid email.' },
    { value: pass, rule: (v) => v.length >= 6, reqMsg: 'Password is required.', errMsg: 'Password must be at least 6 characters.' }
  ])) { alert('Login successful!'); location.href = "index.html"; }
}

// Action: Handle registration form submission
function registerDemo(e) {
  e.preventDefault();
  const fName = $('#regFirstName').val().trim(), lName = $('#regLastName').val().trim(), email = $('#regEmail').val().trim(), mobile = $('#regMobile').val().trim(), pass = $('#regPassword').val(), confPass = $('#regConfirmPassword').val();
  if (runValidation([
    { value: fName, rule: valRules.nameOnly, reqMsg: 'First Name is required.', errMsg: 'First Name must contain letters only.' },
    { value: lName, rule: valRules.nameOnly, reqMsg: 'Last Name is required.', errMsg: 'Last Name must contain letters only.' },
    { value: email, rule: valRules.email, reqMsg: 'Email Address is required.', errMsg: 'Please enter a valid email.' },
    { value: mobile, rule: valRules.mobile, reqMsg: 'Mobile number is required.', errMsg: 'Mobile number must be exactly 10 digits.' },
    { value: pass, rule: (v) => v.length >= 6, reqMsg: 'Password is required.', errMsg: 'Password must be at least 6 characters.' },
    { value: confPass, rule: (v) => v === pass, reqMsg: 'Confirm Password is required.', errMsg: 'Passwords do not match.' }
  ])) {
    if (!$('#termsCheck').is(':checked')) return alert('You must agree to the terms and conditions.');
    alert('Registration successful!'); location.href = "login.html";
  }
}

// Action: Handle checkout form submission
function submitCheckout(e) {
  e.preventDefault();
  const name = $('#checkoutName').val().trim(), email = $('#checkoutEmail').val().trim(), mobile = $('#checkoutMobile').val().trim();
  if (runValidation([
    { value: name, rule: valRules.nameWithSpaces, reqMsg: 'Full Name is required.', errMsg: 'Full name must contain letters and spaces only.' },
    { value: email, rule: valRules.email, reqMsg: 'Email Address is required.', errMsg: 'Please enter a valid email.' },
    { value: mobile, rule: valRules.mobile, reqMsg: 'Mobile number is required.', errMsg: 'Mobile number must be exactly 10 digits.' }
  ])) { alert('Order placed successfully!'); location.href = "index.html"; }
}

// Action: Handle contact form submission
function contactDemo(e) {
  e.preventDefault();
  const name = $('#contactName').val().trim(), mobile = $('#contactNo').val().trim();
  if (runValidation([
    { value: name, rule: valRules.nameWithSpaces, reqMsg: 'Name is required.', errMsg: 'Name must contain letters and spaces only.' },
    { value: mobile, rule: valRules.mobile, reqMsg: 'Contact number is required.', errMsg: 'Contact number must be exactly 10 digits.' }
  ])) { alert('Feedback submitted successfully!'); $('#contactForm')[0].reset(); }
}

// Action: Triggers popup alert when a book is added to the cart
const addToCart = (title) => alert(title + ' successful added to cart');

// Document Ready: Set up page content and search/filter listeners
$(() => {
  displayBooks(books.slice(0, 4), 'featuredBooks'); // Home page top featured books
  if ($('#bookList').length) {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    if (catParam) $('#filterCat').val(catParam); // Apply URL parameter filter

    const filterBooks = () => {
      const q = $('#searchBook').val().toLowerCase(), c = $('#filterCat').val();
      displayBooks(books.filter(b => (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)) && (c === 'all' || b.category === c)), 'bookList');
    };
    filterBooks(); // Initial render
    $('#searchBook').on('input', filterBooks); $('#filterCat').on('change', filterBooks); // Live catalog searching
  }
});
