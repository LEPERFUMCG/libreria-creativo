// ============================================
// BOOKSTORE CORE - Shared across all pages
// ============================================

// Initialize data on load
initializeData();

// ============================================
// CLOUD REAL-TIME - refresh open pages when shared data changes
// (guarda que la propia pestana que edita no se recargue)
// ============================================
window.addEventListener('bookstore-updated', function (e) {
  var key = e.detail;
  var reloadKeys = ['books', 'config', 'promotions', 'pages', 'shippingZones', 'paymentMethods', 'deliveryMethods'];
  if (reloadKeys.indexOf(key) === -1) return;
  if (typeof Cloud !== 'undefined' && Cloud.isDirty && Cloud.isDirty(key)) return;
  if (window.location.pathname.indexOf('/admin/') !== -1) return;
  setTimeout(function () { window.location.reload(); }, 800);
});

// ============================================
// DATA MANAGER
// ============================================
const DB = {
  getConfig() { return getData('config'); },
  setConfig(cfg) { setData('config', cfg); },
  getCategories() { return getData('categories') || []; },
  setCategories(c) { setData('categories', c); },
  getGenres() { return getData('genres') || []; },
  setGenres(g) { setData('genres', g); },
  getAuthors() { return getData('authors') || []; },
  setAuthors(a) { setData('authors', a); },
  getPublishers() { return getData('publishers') || []; },
  setPublishers(p) { setData('publishers', p); },
  getBooks() { return getData('books') || []; },
  setBooks(b) { setData('books', b); },
  getBook(id) { return this.getBooks().find(b => b.id === id); },
  getPages() { return getData('pages') || {}; },
  setPages(p) { setData('pages', p); },
  getShippingZones() { return getData('shippingZones') || []; },
  setShippingZones(z) { setData('shippingZones', z); },
  getPaymentMethods() { return getData('paymentMethods') || []; },
  setPaymentMethods(m) { setData('paymentMethods', m); },
  getDeliveryMethods() { return getData('deliveryMethods') || []; },
  setDeliveryMethods(m) { setData('deliveryMethods', m); },
  getPromotions() { return getData('promotions') || []; },
  setPromotions(p) { setData('promotions', p); },
  getAdminUsers() { return getData('adminUsers') || []; },
  setAdminUsers(u) { setData('adminUsers', u); },
  getCustomers() { return getData('customers') || []; },
  setCustomers(c) { setData('customers', c); },
  getOrders() { return getData('orders') || []; },
  setOrders(o) { setData('orders', o); },
  getContactMessages() { return getData('contactMessages') || []; },
  setContactMessages(m) { setData('contactMessages', m); },
  getInventory() { return getData('inventory') || []; },
  setInventory(i) { setData('inventory', i); },
  getNotifications() { return getData('notifications') || []; },
  setNotifications(n) { setData('notifications', n); },

  getCategory(id) { return this.getCategories().find(c => c.id === id); },
  getGenre(id) { return this.getGenres().find(g => g.id === id); },
  getAuthor(id) { return this.getAuthors().find(a => a.id === id); },
  getPublisher(id) { return this.getPublishers().find(p => p.id === id); },
  getCustomer(id) { return this.getCustomers().find(c => c.id === id); },

  generateId(prefix) {
    return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  }
};

// ============================================
// CART MANAGER
// ============================================
const Cart = {
  getItems() {
    return JSON.parse(localStorage.getItem('bookstore_cart') || '[]');
  },
  saveItems(items) {
    localStorage.setItem('bookstore_cart', JSON.stringify(items));
    this.updateBadge();
    this.updateCartPage();
  },
  addItem(bookId, qty = 1) {
    const items = this.getItems();
    const existing = items.find(i => i.bookId === bookId);
    const book = DB.getBook(bookId);
    if (!book) return;
    if (existing) {
      existing.quantity += qty;
    } else {
      items.push({ bookId, quantity: qty, price: book.promoPrice > 0 ? book.promoPrice : book.price });
    }
    this.saveItems(items);
    Toast.show('Libro agregado al carrito', 'success');
  },
  removeItem(bookId) {
    const items = this.getItems().filter(i => i.bookId !== bookId);
    this.saveItems(items);
  },
  updateQuantity(bookId, qty) {
    const items = this.getItems();
    const item = items.find(i => i.bookId === bookId);
    if (item) {
      if (qty <= 0) {
        this.removeItem(bookId);
        return;
      }
      item.quantity = qty;
      this.saveItems(items);
    }
  },
  getSubtotal() {
    return this.getItems().reduce((sum, i) => sum + (i.price * i.quantity), 0);
  },
  getCount() {
    return this.getItems().reduce((sum, i) => sum + i.quantity, 0);
  },
  clear() {
    localStorage.removeItem('bookstore_cart');
    this.updateBadge();
  },
  updateBadge() {
    const badges = document.querySelectorAll('.cart-count');
    const count = this.getCount();
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  },
  updateCartPage() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    const items = this.getItems();
    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🛒</div>
          <h3 class="empty-state-title">Tu carrito está vacío</h3>
          <p class="empty-state-text">Explora nuestro catálogo y encuentra tu próximo libro favorito.</p>
          <a href="catalog.html" class="btn btn-primary">Ver Catálogo</a>
        </div>`;
      return;
    }
    const config = DB.getConfig();
    container.innerHTML = items.map(item => {
      const book = DB.getBook(item.bookId);
      if (!book) return '';
      const author = DB.getAuthor(book.authorId);
      return `
      <div class="cart-item">
        <a href="book.html?id=${book.id}" class="cart-item-image">
          ${book.cover ? `<img src="${book.cover}" alt="${book.title}">` : `<div class="book-card-placeholder"><span>📖</span></div>`}
        </a>
        <div class="cart-item-info">
          <a href="book.html?id=${book.id}" class="cart-item-title">${book.title}</a>
          <div class="cart-item-author">${author ? author.name : ''}</div>
          <div class="cart-item-price">${config.currency}${item.price.toFixed(2)}</div>
          <div class="cart-item-controls">
            <div class="qty-control">
              <button class="qty-btn" onclick="Cart.updateQuantity('${book.id}', ${item.quantity - 1})">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="Cart.updateQuantity('${book.id}', ${item.quantity + 1})">+</button>
            </div>
            <button class="btn btn-ghost btn-sm" style="color:var(--danger);margin-left:auto;" onclick="Cart.removeItem('${book.id}')">
              <i class="lucide-trash-2"></i> Eliminar
            </button>
          </div>
        </div>
      </div>`;
    }).join('');
    this.updateSummary();
  },
  updateSummary() {
    const summary = document.getElementById('cart-summary');
    if (!summary) return;
    const config = DB.getConfig();
    const items = this.getItems();
    const subtotal = this.getSubtotal();
    const shipping = subtotal >= config.freeShippingMin ? 0 : (config.shippingCost || 50);
    const total = subtotal + shipping;
    summary.innerHTML = `
      <h3 style="margin-bottom:12px;">Resumen del Pedido</h3>
      <div class="cart-summary-row"><span>Subtotal (${this.getCount()} items)</span><span>${config.currency}${subtotal.toFixed(2)}</span></div>
      <div class="cart-summary-row"><span>Envío</span><span>${shipping === 0 ? '<span class="text-success">Gratis</span>' : config.currency + shipping.toFixed(2)}</span></div>
      ${subtotal < config.freeShippingMin ? `<div class="text-xs text-muted mt-2">Envío gratis en compras mayores a ${config.currency}${config.freeShippingMin}</div>` : ''}
      <div class="cart-summary-row total"><span>Total</span><span>${config.currency}${total.toFixed(2)}</span></div>
      <a href="checkout.html" class="btn btn-primary btn-block mt-4">Proceder al Pedido</a>
      <a href="catalog.html" class="btn btn-ghost btn-block mt-2">Continuar Comprando</a>`;
  }
};

// ============================================
// AUTH MANAGER
// ============================================
const Auth = {
  getCustomer() {
    const data = JSON.parse(localStorage.getItem('bookstore_currentCustomer'));
    return data;
  },
  login(email, password) {
    const customers = DB.getCustomers();
    const customer = customers.find(c => c.email === email && c.password === password);
    if (customer && customer.active) {
      localStorage.setItem('bookstore_currentCustomer', JSON.stringify(customer));
      return { success: true, customer };
    }
    return { success: false, message: 'Correo o contraseña incorrectos' };
  },
  register(data) {
    const customers = DB.getCustomers();
    if (customers.find(c => c.email === data.email)) {
      return { success: false, message: 'Este correo ya está registrado' };
    }
    const newCustomer = {
      id: DB.generateId('cust'),
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      whatsapp: data.whatsapp || '',
      password: data.password,
      active: true,
      addresses: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    customers.push(newCustomer);
    DB.setCustomers(customers);
    localStorage.setItem('bookstore_currentCustomer', JSON.stringify(newCustomer));
    return { success: true, customer: newCustomer };
  },
  logout() {
    localStorage.removeItem('bookstore_currentCustomer');
    window.location.href = 'index.html';
  },
  updateProfile(data) {
    const customer = this.getCustomer();
    if (!customer) return false;
    Object.assign(customer, data);
    localStorage.setItem('bookstore_currentCustomer', JSON.stringify(customer));
    const customers = DB.getCustomers();
    const idx = customers.findIndex(c => c.id === customer.id);
    if (idx !== -1) customers[idx] = customer;
    DB.setCustomers(customers);
    return true;
  },
  isLoggedIn() {
    return !!this.getCustomer();
  }
};

// ============================================
// ADMIN AUTH
// ============================================
const AdminAuth = {
  getUser() {
    return JSON.parse(localStorage.getItem('bookstore_currentAdmin'));
  },
  login(email, password) {
    const users = DB.getAdminUsers();
    const user = users.find(u => u.email === email);
    if (!user) return { success: false, message: 'Correo o contraseña incorrectos' };
    if (!user.active) return { success: false, message: 'Tu usuario está desactivado' };
    const expected = user.password || 'pass123';
    if (password !== expected) return { success: false, message: 'Correo o contraseña incorrectos' };
    const safeUser = Object.assign({}, user);
    delete safeUser.password;
    localStorage.setItem('bookstore_currentAdmin', JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  },
  logout() {
    localStorage.removeItem('bookstore_currentAdmin');
    window.location.href = '../index.html';
  },
  isLoggedIn() {
    return !!this.getUser();
  },
  hasPermission(permission) {
    const user = this.getUser();
    if (!user) return false;
    if (user.permissions.includes('all')) return true;
    return user.permissions.includes(permission);
  }
};

// ============================================
// TOAST NOTIFICATIONS
// ============================================
const Toast = {
  container: null,
  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },
  show(message, type = 'info', duration = 3000) {
    this.init();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>`;
    this.container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// ============================================
// MODAL MANAGER
// ============================================
const Modal = {
  show(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },
  hide(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  },
  confirm(message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.innerHTML = `
      <div class="modal" style="max-width:400px;">
        <div class="modal-header">
          <h3 class="modal-title">Confirmar</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove(); document.body.style.overflow='';">✕</button>
        </div>
        <div class="modal-body">
          <p>${message}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" onclick="this.closest('.modal-overlay').remove(); document.body.style.overflow='';">Cancelar</button>
          <button class="btn btn-danger" id="modal-confirm-btn">Confirmar</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    document.getElementById('modal-confirm-btn').onclick = () => {
      overlay.remove();
      document.body.style.overflow = '';
      onConfirm();
    };
  }
};

// ============================================
// URL UTILS
// ============================================
function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// ============================================
// FORMAT UTILS
// ============================================
function formatPrice(price, config) {
  config = config || DB.getConfig();
  return config.currency + parseFloat(price).toFixed(2);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-HN', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getStatusLabel(status) {
  const labels = {
    received: 'Pedido Recibido',
    confirmed: 'Confirmado',
    preparing: 'Preparando',
    ready: 'Listo para Entregar',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado'
  };
  return labels[status] || status;
}

function getStatusBadgeClass(status) {
  const classes = {
    received: 'badge-info',
    confirmed: 'badge-primary',
    preparing: 'badge-warning',
    ready: 'badge-accent',
    shipped: 'badge-info',
    delivered: 'badge-success',
    cancelled: 'badge-danger'
  };
  return classes[status] || 'badge-gray';
}

const ORDER_STATUSES = ['received', 'confirmed', 'preparing', 'ready', 'shipped', 'delivered'];

// ============================================
// SEARCH
// ============================================
function searchBooks(query, books) {
  if (!query) return books;
  const q = query.toLowerCase();
  const authors = DB.getAuthors();
  return books.filter(b => {
    const author = authors.find(a => a.id === b.authorId);
    return b.title.toLowerCase().includes(q) ||
      (author && author.name.toLowerCase().includes(q)) ||
      b.isbn.includes(q) ||
      b.sku.toLowerCase().includes(q);
  });
}

function filterBooks(books, filters) {
  let result = [...books];
  if (filters.category) result = result.filter(b => b.categoryId === filters.category);
  if (filters.genre) result = result.filter(b => b.genreId === filters.genre);
  if (filters.author) result = result.filter(b => b.authorId === filters.author);
  if (filters.minPrice) result = result.filter(b => (b.promoPrice || b.price) >= parseFloat(filters.minPrice));
  if (filters.maxPrice) result = result.filter(b => (b.promoPrice || b.price) <= parseFloat(filters.maxPrice));
  if (filters.available) result = result.filter(b => b.stock > 0);
  if (filters.search) result = searchBooks(filters.search, result);
  return result;
}

function sortBooks(books, sort) {
  const sorted = [...books];
  switch (sort) {
    case 'price-asc': return sorted.sort((a, b) => (a.promoPrice || a.price) - (b.promoPrice || b.price));
    case 'price-desc': return sorted.sort((a, b) => (b.promoPrice || b.price) - (a.promoPrice || a.price));
    case 'newest': return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'name': return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'bestselling': return sorted.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    default: return sorted;
  }
}

// ============================================
// RENDER BOOK CARD
// ============================================
function renderBookCard(book, config) {
  config = config || DB.getConfig();
  const author = DB.getAuthor(book.authorId);
  const category = DB.getCategory(book.categoryId);
  const isFav = isFavorite(book.id);
  const hasDiscount = book.promoPrice > 0 && book.promoPrice < book.price;
  const effectivePrice = hasDiscount ? book.promoPrice : book.price;
  const coverBg = getBookCoverColor(book.id);

  return `
  <div class="book-card fade-in">
    <a href="book.html?id=${book.id}" class="book-card-image">
      ${book.cover ?
        `<img src="${book.cover}" alt="${book.title}" loading="lazy">` :
        `<div class="book-card-placeholder" style="background:linear-gradient(135deg, ${coverBg[0]}, ${coverBg[1]});">
          <span style="font-size:2.5rem;">📖</span>
          <span style="margin-top:8px;font-size:0.75rem;color:${coverBg[2]};max-width:80%;text-align:center;">${book.title}</span>
        </div>`
      }
      <div class="book-card-badge">
        ${book.featured ? '<span class="badge badge-primary" style="font-size:0.65rem;">Destacado</span>' : ''}
        ${hasDiscount ? `<span class="badge badge-danger" style="font-size:0.65rem;">-${book.discount || Math.round((1 - book.promoPrice/book.price) * 100)}%</span>` : ''}
        ${book.stock <= 0 ? '<span class="badge badge-gray" style="font-size:0.65rem;">Agotado</span>' : ''}
      </div>
      <div class="book-card-actions">
        <button class="book-card-action-btn ${isFav ? 'favorited' : ''}" onclick="event.preventDefault();event.stopPropagation();toggleFavorite('${book.id}')" title="Favorito">
          ${isFav ? '❤' : '♡'}
        </button>
      </div>
    </a>
    <div class="book-card-body">
      ${category ? `<div class="book-card-category">${category.name}</div>` : ''}
      <a href="book.html?id=${book.id}" class="book-card-title">${book.title}</a>
      <div class="book-card-author">${author ? author.name : ''}</div>
      <div class="book-card-price">
        <span class="current">${formatPrice(effectivePrice, config)}</span>
        ${hasDiscount ? `<span class="original">${formatPrice(book.price, config)}</span>` : ''}
      </div>
    </div>
    <div class="book-card-footer">
      ${book.stock > 0 ?
        `<button class="book-card-add-btn" onclick="Cart.addItem('${book.id}')">
          🛒 Agregar
        </button>` :
        `<button class="book-card-add-btn" disabled style="background:var(--gray-300);color:var(--gray-500);">
          Agotado
        </button>`
      }
    </div>
  </div>`;
}

function getBookCoverColor(id) {
  const colors = [
    ['#dbeafe', '#bfdbfe', '#1e40af'],
    ['#fef3c7', '#fde68a', '#92400e'],
    ['#d1fae5', '#a7f3d0', '#065f46'],
    ['#ede9fe', '#ddd6fe', '#5b21b6'],
    ['#fce7f3', '#fbcfe8', '#9d174d'],
    ['#ccfbf1', '#99f6e4', '#134e4a'],
    ['#fef9c3', '#fef08a', '#854d0e'],
    ['#e0e7ff', '#c7d2fe', '#3730a3'],
  ];
  const num = parseInt(id.replace(/\D/g, '')) || 0;
  return colors[num % colors.length];
}

// ============================================
// FAVORITES
// ============================================
function getFavorites() {
  return JSON.parse(localStorage.getItem('bookstore_favorites') || '[]');
}

function isFavorite(bookId) {
  return getFavorites().includes(bookId);
}

function toggleFavorite(bookId) {
  const favs = getFavorites();
  if (favs.includes(bookId)) {
    const newFavs = favs.filter(id => id !== bookId);
    localStorage.setItem('bookstore_favorites', JSON.stringify(newFavs));
    Toast.show('Eliminado de favoritos', 'info');
  } else {
    favs.push(bookId);
    localStorage.setItem('bookstore_favorites', JSON.stringify(favs));
    Toast.show('Agregado a favoritos', 'success');
  }
  // Re-render if on favorites page
  if (typeof renderFavorites === 'function') renderFavorites();
  // Update heart icons
  document.querySelectorAll('.book-card-action-btn').forEach(btn => {
    const onclick = btn.getAttribute('onclick');
    if (onclick && onclick.includes(bookId)) {
      const isFav = isFavorite(bookId);
      btn.className = `book-card-action-btn ${isFav ? 'favorited' : ''}`;
      btn.innerHTML = isFav ? '❤' : '♡';
    }
  });
}

// ============================================
// HEADER RENDERER
// ============================================
function renderHeader(config) {
  config = config || DB.getConfig();
  const customer = Auth.getCustomer();
  const cartCount = Cart.getCount();
  const headerTop = document.getElementById('header-top');
  const headerMain = document.getElementById('header-main');

  if (headerTop) {
    headerTop.style.display = 'none';
    headerTop.innerHTML = '';
  }

  if (headerMain) {
    headerMain.innerHTML = `
      <div class="container">
        <button class="mobile-menu-btn" onclick="toggleMobileNav()" aria-label="Menú">
          <i class="lucide-menu"></i>
        </button>
        <a href="index.html" class="header-logo">
          ${config.logo ? `<img src="${config.logo}" alt="${config.storeName}">` : ''}
          <div class="header-logo-text">
            ${config.storeName}
            <span>${config.storeSlogan}</span>
          </div>
        </a>
        <div class="header-search">
          <i class="lucide-search header-search-icon" style="width:16px;height:16px;"></i>
          <input type="text" placeholder="Buscar libros, autores..." id="search-input" onkeyup="handleSearch(this.value)" autocomplete="off">
          <div class="search-dropdown" id="search-dropdown"></div>
        </div>
        <a href="cart.html" class="header-action-btn header-search-cart" title="Carrito" aria-label="Carrito de compra">
          <i class="lucide-shopping-cart"></i>
          <span class="count-badge cart-count" style="display:${cartCount > 0 ? 'flex' : 'none'};">${cartCount}</span>
        </a>
        <nav class="desktop-nav">
          <a href="index.html" class="nav-link ${isCurrentPage('index.html') ? 'active' : ''}">Inicio</a>
          <a href="catalog.html" class="nav-link ${isCurrentPage('catalog.html') ? 'active' : ''}">Catálogo</a>
          <a href="contact.html" class="nav-link ${isCurrentPage('contact.html') ? 'active' : ''}">Contacto</a>
        </nav>
        <div class="header-actions">
          <a href="favorites.html" class="header-action-btn" title="Favoritos"><i class="lucide-heart"></i></a>
          <a href="cart.html" class="header-action-btn header-cart" title="Carrito">
            <i class="lucide-shopping-cart"></i>
            <span class="count-badge cart-count" style="display:${cartCount > 0 ? 'flex' : 'none'};">${cartCount}</span>
          </a>
          ${customer ?
            `<a href="account.html" class="header-action-btn" title="Mi Cuenta"><i class="lucide-user"></i></a>` :
            `<a href="login.html" class="header-action-btn" title="Iniciar Sesión"><i class="lucide-log-in"></i></a>`
          }
        </div>
      </div>`;
  }

  // Render mobile nav
  renderMobileNav(config, customer);
  Cart.updateBadge();
}

function renderMobileNav(config, customer) {
  const nav = document.getElementById('mobile-nav');
  if (!nav) return;
  nav.innerHTML = `
    <div class="mobile-nav-overlay" onclick="toggleMobileNav()"></div>
    <div class="mobile-nav-panel">
      <div class="mobile-nav-header">
        <div class="header-logo-text" style="font-size:1rem;">${config.storeName}</div>
        <button onclick="toggleMobileNav()" style="font-size:1.3rem;color:var(--gray-500);">✕</button>
      </div>
      <div class="mobile-nav-body">
        <a href="index.html" class="mobile-nav-item"><i class="lucide-home"></i> Inicio</a>
        <a href="catalog.html" class="mobile-nav-item"><i class="lucide-book-open"></i> Catálogo</a>
        <a href="favorites.html" class="mobile-nav-item"><i class="lucide-heart"></i> Favoritos</a>
        <a href="cart.html" class="mobile-nav-item"><i class="lucide-shopping-cart"></i> Carrito <span class="badge badge-primary" style="margin-left:auto;">${Cart.getCount()}</span></a>
        <a href="contact.html" class="mobile-nav-item"><i class="lucide-phone"></i> Contacto</a>
        <div style="border-top:1px solid var(--gray-200);margin:8px 0;"></div>
        ${customer ?
          `<a href="account.html" class="mobile-nav-item"><i class="lucide-user"></i> Mi Cuenta</a>
           <a href="orders.html" class="mobile-nav-item"><i class="lucide-package"></i> Mis Pedidos</a>
           <button class="mobile-nav-item w-full text-left" onclick="Auth.logout()" style="color:var(--danger);"><i class="lucide-log-out"></i> Cerrar Sesión</button>` :
          `<a href="login.html" class="mobile-nav-item"><i class="lucide-log-in"></i> Iniciar Sesión</a>
           <a href="register.html" class="mobile-nav-item"><i class="lucide-user-plus"></i> Crear Cuenta</a>`
        }
      </div>
    </div>`;
}

function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (nav) {
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  }
}

function isCurrentPage(page) {
  return window.location.pathname.endsWith(page) || window.location.pathname.endsWith(page + '/');
}

// ============================================
// SEARCH HANDLER
// ============================================
let searchTimeout;
function handleSearch(query) {
  clearTimeout(searchTimeout);
  const dropdown = document.getElementById('search-dropdown');
  if (!dropdown) return;
  if (!query || query.length < 2) {
    dropdown.classList.remove('active');
    return;
  }
  searchTimeout = setTimeout(() => {
    const books = DB.getBooks().filter(b => b.active);
    const results = searchBooks(query, books).slice(0, 6);
    if (results.length === 0) {
      dropdown.innerHTML = '<div class="p-4 text-center text-muted text-sm">No se encontraron resultados</div>';
    } else {
      const config = DB.getConfig();
      dropdown.innerHTML = results.map(b => {
        const author = DB.getAuthor(b.authorId);
        const price = b.promoPrice > 0 ? b.promoPrice : b.price;
        return `
        <a href="book.html?id=${b.id}" class="search-result-item">
          <div class="search-result-image">
            ${b.cover ? `<img src="${b.cover}" alt="">` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--primary-bg);font-size:1.2rem;">📖</div>`}
          </div>
          <div class="search-result-info">
            <div class="search-result-title">${b.title}</div>
            <div class="search-result-author">${author ? author.name : ''}</div>
            <div class="search-result-price">${formatPrice(price, config)}</div>
          </div>
        </a>`;
      }).join('');
    }
    dropdown.classList.add('active');
  }, 200);
}

// Close search dropdown on outside click
document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('search-dropdown');
  const input = document.getElementById('search-input');
  if (dropdown && input && !input.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});

// ============================================
// FOOTER RENDERER
// ============================================
function renderFooter(config) {
  config = config || DB.getConfig();
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            ${config.logo ? `<img src="${config.logo}" alt="" style="height:32px;">` : ''}
            <span class="footer-logo-text">${config.storeName}</span>
          </div>
          <p class="footer-desc">${config.storeSlogan}. Tu próxima aventura comienza aquí.</p>
          <div class="footer-social">
            ${config.facebook ? `<a href="${config.facebook}" target="_blank" aria-label="Facebook"><i class="lucide-facebook"></i></a>` : ''}
            ${config.instagram ? `<a href="${config.instagram}" target="_blank" aria-label="Instagram"><i class="lucide-instagram"></i></a>` : ''}
            ${config.twitter ? `<a href="${config.twitter}" target="_blank" aria-label="Twitter"><i class="lucide-twitter"></i></a>` : ''}
            ${config.whatsapp ? `<a href="https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" aria-label="WhatsApp"><i class="lucide-message-circle"></i></a>` : ''}
          </div>
        </div>
        <div>
          <h4 class="footer-title">Tienda</h4>
          <div class="footer-links">
            <a href="catalog.html">Catálogo</a>
            <a href="catalog.html?featured=1">Destacados</a>
            <a href="catalog.html?bestseller=1">Más Vendidos</a>
            <a href="catalog.html?offers=1">Ofertas</a>
          </div>
        </div>
        <div>
          <h4 class="footer-title">Información</h4>
          <div class="footer-links">
            <a href="page.html?page=about">Sobre Nosotros</a>
            <a href="page.html?page=faq">Preguntas Frecuentes</a>
            <a href="page.html?page=privacy">Política de Privacidad</a>
            <a href="page.html?page=terms">Términos y Condiciones</a>
            <a href="page.html?page=shipping">Envíos</a>
            <a href="page.html?page=returns">Devoluciones</a>
          </div>
        </div>
        <div>
          <h4 class="footer-title">Contacto</h4>
          <div class="footer-contact-item">
            <i class="lucide-map-pin" style="width:14px;height:14px;"></i>
            <span>${config.address}, ${config.city}</span>
          </div>
          <div class="footer-contact-item">
            <i class="lucide-phone" style="width:14px;height:14px;"></i>
            <span>${config.phone}</span>
          </div>
          <div class="footer-contact-item">
            <i class="lucide-mail" style="width:14px;height:14px;"></i>
            <span>${config.email}</span>
          </div>
          <div class="footer-contact-item">
            <i class="lucide-clock" style="width:14px;height:14px;"></i>
            <span>${config.schedule}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>© ${new Date().getFullYear()} ${config.storeName}. Todos los derechos reservados.</p>
      </div>
    </div>`;
}

// ============================================
// CHECKOUT
// ============================================
function processCheckout(formData) {
  const items = Cart.getItems();
  if (items.length === 0) {
    Toast.show('El carrito está vacío', 'error');
    return false;
  }
  const config = DB.getConfig();
  const subtotal = Cart.getSubtotal();
  const shipping = subtotal >= config.freeShippingMin ? 0 : (config.shippingCost || 50);
  const total = subtotal + shipping;

  const order = {
    id: DB.generateId('ord'),
    customerId: Auth.getCustomer()?.id || null,
    items: items.map(i => ({ bookId: i.bookId, quantity: i.quantity, price: i.price })),
    subtotal,
    shipping,
    discount: 0,
    total,
    status: 'received',
    paymentMethod: formData.paymentMethod,
    deliveryMethod: formData.deliveryMethod,
    shippingAddress: {
      name: formData.name,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      address: formData.address,
      city: formData.city,
      department: formData.department,
      reference: formData.reference
    },
    notes: formData.notes || '',
    adminNotes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const orders = DB.getOrders();
  orders.push(order);
  DB.setOrders(orders);

  // Update stock
  const books = DB.getBooks();
  items.forEach(item => {
    const book = books.find(b => b.id === item.bookId);
    if (book) {
      book.stock = Math.max(0, book.stock - item.quantity);
      // Add inventory record
      const inventory = DB.getInventory();
      inventory.push({
        id: DB.generateId('inv'),
        bookId: book.id,
        type: 'sale',
        quantity: -item.quantity,
        previousStock: book.stock + item.quantity,
        newStock: book.stock,
        note: `Venta - Pedido ${order.id}`,
        userId: 'system',
        createdAt: new Date().toISOString().split('T')[0]
      });
      DB.setInventory(inventory);
    }
  });
  DB.setBooks(books);

  // Add notification
  const notifications = DB.getNotifications();
  notifications.unshift({
    id: DB.generateId('notif'),
    type: 'new_order',
    message: `Nuevo pedido ${order.id} recibido`,
    read: false,
    createdAt: new Date().toISOString()
  });
  DB.setNotifications(notifications);

  Cart.clear();
  return order;
}

// ============================================
// ADMIN SIDEBAR RENDERER
// ============================================
function renderAdminSidebar() {
  const user = AdminAuth.getUser();
  if (!user) return;
  const sidebar = document.getElementById('admin-sidebar');
  if (!sidebar) return;
  const unread = DB.getNotifications().filter(n => !n.read).length;
  const currentPath = window.location.pathname.split('/').pop();

  const menuItems = [
    { section: 'Principal', items: [
      { id: 'dashboard', icon: 'layout-dashboard', label: 'Dashboard', href: 'index.html', perm: 'all' }
    ]},
    { section: 'Gestión', items: [
      { id: 'books', icon: 'book-open', label: 'Libros', href: 'books.html', perm: 'books' },
      { id: 'categories', icon: 'tag', label: 'Categorías', href: 'categories.html', perm: 'categories' },
      { id: 'authors', icon: 'users', label: 'Autores', href: 'authors.html', perm: 'authors' },
      { id: 'publishers', icon: 'building', label: 'Editoriales', href: 'publishers.html', perm: 'publishers' },
      { id: 'inventory', icon: 'package', label: 'Inventario', href: 'inventory.html', perm: 'inventory' }
    ]},
    { section: 'Ventas', items: [
      { id: 'orders', icon: 'shopping-bag', label: 'Pedidos', href: 'orders.html', perm: 'orders' },
      { id: 'customers', icon: 'users', label: 'Clientes', href: 'customers.html', perm: 'customers' },
      { id: 'promotions', icon: 'percent', label: 'Promociones', href: 'promotions.html', perm: 'promotions' }
    ]},
    { section: 'Configuración', items: [
      { id: 'homepage', icon: 'home', label: 'Página Inicio', href: 'homepage.html', perm: 'homepage' },
      { id: 'settings', icon: 'settings', label: 'Configuración', href: 'settings.html', perm: 'settings' },
      { id: 'pages', icon: 'file-text', label: 'Páginas', href: 'pages.html', perm: 'pages' },
      { id: 'shipping', icon: 'truck', label: 'Envíos', href: 'shipping.html', perm: 'shipping' },
      { id: 'payments', icon: 'credit-card', label: 'Pagos', href: 'payments.html', perm: 'payments' },
      { id: 'reports', icon: 'bar-chart-2', label: 'Reportes', href: 'reports.html', perm: 'reports' },
      { id: 'admin-users', icon: 'shield', label: 'Usuarios', href: 'users.html', perm: 'users' },
      { id: 'seo', icon: 'search', label: 'SEO', href: 'seo.html', perm: 'seo' }
    ]}
  ];

  sidebar.innerHTML = `
    <div class="admin-sidebar-header">
      <div class="admin-sidebar-logo">L</div>
      <div>
        <div class="admin-sidebar-name">${DB.getConfig().storeName}</div>
        <div class="admin-sidebar-role">${user.role === 'superadmin' ? 'Superadmin' : user.name}</div>
      </div>
    </div>
    <div class="admin-nav">
      ${menuItems.map(section => `
        <div class="admin-nav-section">${section.section}</div>
        ${section.items
          .filter(item => AdminAuth.hasPermission(item.perm))
          .map(item => `
            <a href="${item.href}" class="admin-nav-item ${currentPath === item.href ? 'active' : ''}">
              <i class="lucide-${item.icon}" style="width:18px;height:18px;"></i>
              ${item.label}
              ${item.id === 'orders' && unread > 0 ? `<span class="nav-badge">${unread}</span>` : ''}
            </a>
          `).join('')
        }
      `).join('')}
    </div>
    <div style="padding:12px 20px;border-top:1px solid var(--gray-800);">
      <a href="../index.html" class="admin-nav-item" style="margin:0;padding:8px 0;"><i class="lucide-external-link" style="width:18px;height:18px;"></i> Ver Tienda</a>
      <button class="admin-nav-item w-full" style="margin:0;padding:8px 0;color:var(--danger);" onclick="AdminAuth.logout()"><i class="lucide-log-out" style="width:18px;height:18px;"></i> Cerrar Sesión</button>
    </div>`;
}

function renderAdminTopbar(title) {
  const topbar = document.getElementById('admin-topbar');
  if (!topbar) return;
  const notifications = DB.getNotifications().filter(n => !n.read);
  topbar.innerHTML = `
    <div class="admin-topbar-left">
      <button class="admin-burger" onclick="toggleAdminSidebar()"><i class="lucide-menu"></i></button>
      <h1 class="admin-topbar-title">${title}</h1>
    </div>
    <div class="admin-topbar-right">
      <div class="relative notif-wrap">
        <button class="header-action-btn" onclick="toggleAdminNotifications(event)" title="Notificaciones">
          <i class="lucide-bell"></i>
          <span class="count-badge notif-badge" style="display:${notifications.length > 0 ? 'flex' : 'none'};">${notifications.length}</span>
        </button>
        <div class="notif-dropdown" id="notif-dropdown">
          <div class="notif-dropdown-header">
            <span>Notificaciones</span>
            <button type="button" class="notif-mark-all" onclick="markAllNotificationsRead()">Marcar todas como leídas</button>
          </div>
          <div class="notif-list" id="notif-list">${renderNotificationsList()}</div>
        </div>
      </div>
      <div class="admin-user-info" style="display:flex;align-items:center;gap:8px;">
        <div style="width:32px;height:32px;border-radius:50%;background:var(--primary);color:var(--white);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;">${(AdminAuth.getUser()?.name || 'A')[0]}</div>
        <span class="hide-mobile text-sm font-semibold">${AdminAuth.getUser()?.name || 'Admin'}</span>
      </div>
    </div>`;
}

function toggleAdminSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('admin-sidebar-overlay');
  if (sidebar) sidebar.classList.toggle('active');
  if (overlay) overlay.classList.toggle('active');
}

function renderNotificationsList() {
  const items = DB.getNotifications();
  if (!items || items.length === 0) {
    return '<div class="notif-empty">No tienes notificaciones.</div>';
  }
  const icons = { new_order: 'shopping-cart', low_stock: 'alert-triangle', out_of_stock: 'x-circle', new_customer: 'user-plus', contact: 'mail' };
  return items.map(n => `
    <button type="button" class="notif-item ${n.read ? '' : 'unread'}" onclick="markNotificationRead('${n.id}')">
      <span class="notif-item-icon"><i class="lucide-${icons[n.type] || 'bell'}"></i></span>
      <span class="notif-item-body">
        <span class="notif-item-msg">${n.message}</span>
        <span class="notif-item-date">${n.createdAt ? String(n.createdAt).slice(0, 10) : ''}</span>
      </span>
    </button>`).join('');
}

function toggleAdminNotifications(event) {
  if (event) event.stopPropagation();
  const dd = document.getElementById('notif-dropdown');
  if (!dd) return;
  dd.classList.toggle('open');
}

function refreshNotificationsUI() {
  const unread = DB.getNotifications().filter(n => !n.read).length;
  const badge = document.querySelector('.notif-badge');
  if (badge) {
    badge.textContent = unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';
  }
  const list = document.getElementById('notif-list');
  if (list) list.innerHTML = renderNotificationsList();
  const navBadge = document.querySelector('.admin-nav-item .nav-badge');
  if (navBadge) {
    if (unread > 0) navBadge.textContent = unread;
    else navBadge.remove();
  }
}

function markNotificationRead(id) {
  const items = DB.getNotifications();
  const notification = items.find(n => n.id === id);
  if (!notification || notification.read) return;
  notification.read = true;
  DB.setNotifications(items);
  refreshNotificationsUI();
}

function markAllNotificationsRead() {
  const items = DB.getNotifications();
  if (!items.some(n => !n.read)) return;
  items.forEach(n => { n.read = true; });
  DB.setNotifications(items);
  refreshNotificationsUI();
}

if (typeof window !== 'undefined' && !window.__notifOutsideClickBound) {
  document.addEventListener('click', function(e) {
    const dd = document.getElementById('notif-dropdown');
    if (!dd || !dd.classList.contains('open')) return;
    if (!e.target.closest('.notif-wrap')) dd.classList.remove('open');
  });
  window.__notifOutsideClickBound = true;
}

// ============================================
// INITIALIZE PUBLIC PAGES
// ============================================
function initPublicPage() {
  const config = DB.getConfig();
  // Apply dynamic colors
  document.documentElement.style.setProperty('--primary', config.primaryColor);
  document.documentElement.style.setProperty('--primary-dark', config.secondaryColor);
  document.documentElement.style.setProperty('--accent', config.accentColor);
  document.title = config.metaTitle || config.storeName;
  if (config.favicon) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = config.favicon;
  }
  renderHeader(config);
  renderFooter(config);
}

function initAdminPage(title) {
  if (!AdminAuth.isLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }
  const config = DB.getConfig();
  document.documentElement.style.setProperty('--primary', config.primaryColor);
  document.title = `${title} - ${config.storeName} Admin`;
  renderAdminSidebar();
  renderAdminTopbar(title);
}

// ============================================
// Simple Chart Utils for Dashboard
// ============================================
function renderBarChart(containerId, data, labels) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const max = Math.max(...data, 1);
  container.innerHTML = `
    <div class="chart-bar" style="padding-bottom:30px;">
      ${data.map((val, i) => `
        <div class="chart-bar-item" style="height:${(val / max) * 100}%;" title="${val}">
          <span class="chart-bar-label">${labels[i] || ''}</span>
        </div>
      `).join('')}
    </div>`;
}

// ============================================
// FORMAT CURRENCY WITH CONFIG
// ============================================
function getConfiguredCurrency() {
  return DB.getConfig().currency || 'L.';
}
