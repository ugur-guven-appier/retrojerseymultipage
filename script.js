const products = [
    { id: 1, name: "Manchester '99", color: "Red", price: 89, img: "man_utd_99.webp" },
    { id: 2, name: "Liverpool '84", color: "Red", price: 79, img: "lfc_84.jpg" },
    { id: 3, name: "Arsenal '04", color: "Red", price: 110, img: "ars_04.webp" },
    { id: 4, name: "Bayern '96", color: "Red", price: 95, img: "fcb_96.jpg" },
    { id: 5, name: "Milan '89", color: "Red", price: 120, img: "milan_89.webp" },
    { id: 6, name: "Chelsea '98", color: "Blue", price: 85, img: "cfc_98.jpg" },
    { id: 7, name: "Italy '06", color: "Blue", price: 130, img: "italy_06.webp" },
    { id: 8, name: "France '98", color: "Blue", price: 140, img: "france_98.webp" },
    { id: 9, name: "Inter '98", color: "Blue", price: 105, img: "inter_98.jpg" },
    { id: 10, name: "Everton '85", color: "Blue", price: 70, img: "efc_85.jpg" },
    { id: 11, name: "Brazil '70", color: "Yellow", price: 150, img: "brazil_70.jpg" },
    { id: 12, name: "Dortmund '97", color: "Yellow", price: 99, img: "bvb_97.webp" },
    { id: 13, name: "Arsenal '89 Away", color: "Yellow", price: 115, img: "afc_89.jpg" },
    { id: 14, name: "Colombia '90", color: "Yellow", price: 85, img: "col_90.webp" },
    { id: 15, name: "Sweden '94", color: "Yellow", price: 75, img: "sweden_94.webp" }
];

// Shared UI Elements
function initCommon() {
    const nav = document.getElementById('main-nav');
    const footer = document.getElementById('main-footer');
    const cart = JSON.parse(localStorage.getItem('eagle_cart')) || [];
    
    if (nav) {
        nav.innerHTML = `
            <nav class="nav-container border-b border-zinc-800 p-6 flex justify-between items-center sticky top-0 bg-black z-50">
                <h1 class="logo text-2xl font-black tracking-tighter cursor-pointer" onclick="window.location.href='index.html'">EAGLE RETRO</h1>
                <div class="nav-links space-x-8">
                    <a href="index.html" class="hover:text-gray-400 uppercase text-sm font-bold">Home</a>
                    <a href="cart.html" class="hover:text-gray-400 uppercase text-sm font-bold">Cart (<span id="cart-count">${cart.length}</span>)</a>
                </div>
            </nav>`;
    }

    if (footer) {
        footer.innerHTML = `
            <footer class="border-t border-zinc-800 bg-black py-10 overflow-hidden mt-auto">
                <div class="mb-6 text-center"><p class="text-zinc-500 text-[10px] uppercase tracking-[0.3em]">Official Vintage Partners</p></div>
                <div class="logos-slide-container relative flex items-center">
                    <div class="logos-track">
                        <img src="https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" alt="Man Utd" class="club-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" alt="Liverpool" class="club-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" alt="Arsenal" class="club-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" alt="Chelsea" class="club-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" alt="Real Madrid" class="club-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" alt="Barca" class="club-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" alt="Man Utd" class="club-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" alt="Liverpool" class="club-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" alt="Arsenal" class="club-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" alt="Chelsea" class="club-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" alt="Real Madrid" class="club-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" alt="Barca" class="club-logo">
                    </div>
                </div>
                <div class="mt-10 text-center"><p class="text-zinc-600 text-[10px]">© 2026 EAGLE RETRO JERSEYS. ALL RIGHTS RESERVED.</p></div>
            </footer>`;
    }
}

function loadCategoryPage(color) {
    const list = document.getElementById('product-list');
    document.getElementById('cat-title').innerText = color + " KITS";
    const filtered = products.filter(p => p.color === color);
    filtered.forEach(p => {
        list.innerHTML += `
            <div class="group cursor-pointer" onclick="window.location.href='product.html?id=${p.id}'">
                <div class="img-wrapper mb-4 border border-zinc-800 group-hover:border-white transition-all">
                    <img src="${p.img}" alt="${p.name}">
                </div>
                <h4 class="font-bold text-xs tracking-widest uppercase mb-1">${p.name}</h4>
                <p class="text-zinc-500 font-mono text-sm">$${p.price}</p>
            </div>`;
    });
}

let selectedSize = null;
let currentProduct = null;

function loadProductPage(id) {
    currentProduct = products.find(p => p.id == id);
    document.getElementById('detail-img').src = currentProduct.img;
    document.getElementById('detail-name').innerText = currentProduct.name;
    document.getElementById('detail-price').innerText = "$" + currentProduct.price;
}

function selectSize(size) {
    selectedSize = size;
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText === size) btn.classList.add('active');
    });
}

function handleAddToCart() {
    if (!selectedSize) return alert("Please select a size first.");
    const qty = parseInt(document.getElementById('item-qty').value);
    let cart = JSON.parse(localStorage.getItem('eagle_cart')) || [];
    cart.push({ ...currentProduct, size: selectedSize, quantity: qty });
    localStorage.setItem('eagle_cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
}

function renderCartPage() {
    const cart = JSON.parse(localStorage.getItem('eagle_cart')) || [];
    const container = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total-amount');
    
    if (cart.length === 0) {
        container.innerHTML = `<p class="text-zinc-600 italic">Bag is empty.</p>`;
        totalDisplay.innerText = "$0";
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalDisplay.innerText = `$${total}`;
    
    // index is used here to identify which item to remove
    container.innerHTML = cart.map((item, index) => `
        <div class="flex justify-between items-center py-4 border-b border-zinc-900">
            <div>
                <span class="font-bold uppercase text-sm">${item.name}</span>
                <p class="text-xs text-zinc-500 uppercase">Size: ${item.size} | Qty: ${item.quantity}</p>
            </div>
            <div class="flex items-center gap-6">
                <span class="font-mono text-sm">$${item.price * item.quantity}</span>
                <button onclick="removeFromCart(${index})" class="text-zinc-500 hover:text-red-500 transition-colors text-xs uppercase font-bold">
                    Remove
                </button>
            </div>
        </div>
    `).join('');
}

function handlePurchase() {
    localStorage.removeItem('eagle_cart');
    window.location.href = 'success.html';
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('eagle_cart')) || [];
    
    // Remove the item at the specific index
    cart.splice(index, 1);
    
    // Save the updated cart back to localStorage
    localStorage.setItem('eagle_cart', JSON.stringify(cart));
    
    // Refresh the UI
    renderCartPage();
    initCommon(); // Updates the nav bar count
}