const books = [
 {title:'Atomic Habits',author:'James Clear',category:'Self-Help',price:199,icon:'📘'},
 {title:'The Psychology of Money',author:'Morgan Housel',category:'Business',price:249,icon:'💰'},
 {title:'Python Basics',author:'Mark Lutz',category:'Technology',price:299,icon:'💻'},
 {title:'The Alchemist',author:'Paulo Coelho',category:'Fiction',price:149,icon:'📖'},
 {title:'Computer Fundamentals',author:'P.K. Sinha',category:'Education',price:219,icon:'🎓'},
 {title:'Rich Dad Poor Dad',author:'Robert Kiyosaki',category:'Business',price:229,icon:'💼'}
];

function bookCard(b){return `<div class="col"><div class="book-card"><div class="book-cover">${b.icon}</div><span class="badge text-bg-light">${b.category}</span><h5 class="fw-bold mt-2">${b.title}</h5><p class="text-secondary mb-2">by ${b.author}</p><div class="d-flex justify-content-between align-items-center"><strong>₹${b.price}</strong><button class="btn btn-primary btn-sm" onclick="addToCart('${b.title}')">Add</button></div></div></div>`}

function displayBooks(list, id='featuredBooks'){const box=document.getElementById(id);if(box)box.innerHTML=list.map(bookCard).join('');}

document.addEventListener('DOMContentLoaded',()=>{
 displayBooks(books.slice(0,4));
 const list=document.getElementById('bookList');
 if(list){displayBooks(books,'bookList');const search=document.getElementById('searchBook'),filter=document.getElementById('filterCat');function filterBooks(){const q=search.value.toLowerCase();const c=filter.value;displayBooks(books.filter(b=>(b.title.toLowerCase().includes(q)||b.author.toLowerCase().includes(q))&&(c==='all'||b.category===c)),'bookList')}search.addEventListener('input',filterBooks);filter.addEventListener('change',filterBooks)}
});

function addToCart(title){alert(title+' added to cart!');}
function loginDemo(e){e.preventDefault();alert('Login successful!');;location.href="index.html"}

function registerDemo(e){e.preventDefault();alert('Registration successful!');location.href="login.html"}
function submitCheckout(e){e.preventDefault();alert('Order placed successfully!');}

// Contact form validation requested in the practical
function contactDemo(e){
 e.preventDefault();
 const name=document.getElementById('contactName').value.trim();
 const contact=document.getElementById('contactNo').value.trim();
 const nameError=document.getElementById('nameError');
 const contactError=document.getElementById('contactError');
 nameError.textContent='';contactError.textContent='';
 if(name===''){nameError.textContent='Please Enter Name';return;}
 if(contact===''){contactError.textContent='Please Enter Contact No';return;}
 if(!/^\d+$/.test(contact)){contactError.textContent='Please Enter only Digits';return;}
 alert('Feedback submitted successfully!');
 document.getElementById('contactForm').reset();
}
