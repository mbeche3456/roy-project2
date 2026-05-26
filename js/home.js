/**
 * Savanna Bites — Home page (index.html)
 * Requires: config.js, Supabase CDN
 */

let supabaseClient = null;

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  if (!window.supabase?.createClient) {
    console.error('Supabase SDK not loaded');
    return null;
  }
  const { createClient } = window.supabase;
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supabaseClient;
}

/** Fetch menu via REST when the JS client fails (CORS/network edge cases). */
async function fetchMenuViaRest() {
  const url = `${SUPABASE_URL}/rest/v1/menu?select=*&available=eq.true&order=created_at.desc`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Menu fetch failed (${res.status}): ${body}`);
  }
  return res.json();
}

function normalizeMenuItem(item) {
  return {
    ...item,
    price: Number(item.price),
  };
}

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────
let cart     = [];       // Array of { item, quantity }
let menuData = [];       // Full menu fetched from Supabase
let activeCategory = 'all';
let menuSearchQuery = ''; 


// ─────────────────────────────────────────────
// 4. DEMO MENU DATA (Fallback if Supabase not configured)
// ─────────────────────────────────────────────
// This lets you run the site locally before connecting Supabase.
const DEMO_MENU = [
  { id: 'demo-1', name: 'Nyama Choma Platter', description: 'Slow-grilled beef ribs marinated in our secret spice blend, served with kachumbari and ugali.', price: 850, category: 'Grills', image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80' },
  { id: 'demo-2', name: 'Pilau Special', description: 'Aromatic basmati rice cooked with whole spices, tender beef, and caramelised onions.', price: 550, category: 'Rice Dishes', image_url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80' },
  { id: 'demo-3', name: 'Tilapia Fry', description: 'Crispy whole tilapia, deep-fried golden and paired with coconut rice and lime.', price: 780, category: 'Seafood', image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80' },
  { id: 'demo-4', name: 'Githeri Bowl', description: 'Hearty corn and bean stew slow-cooked with tomatoes, onions, and smoky paprika.', price: 320, category: 'Vegetarian', image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80' },
  { id: 'demo-5', name: 'Maharagwe na Chapati', description: 'Creamy red kidney bean curry served with four hand-rolled, buttered chapatis.', price: 380, category: 'Vegetarian', image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80' },
  { id: 'demo-6', name: 'Mutura & Fries', description: 'Authentic Kenyan blood sausage grilled over charcoal, served with crispy seasoned fries.', price: 490, category: 'Grills', image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80' },
  { id: 'demo-7', name: 'Sukuma Wiki Stir-Fry', description: 'Collard greens sautéed with garlic, ginger, and onions — a classic Kenyan favourite.', price: 250, category: 'Vegetarian', image_url: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b1?w=600&q=80' },
  { id: 'demo-8', name: 'Irio (Mashed Potatoes)', description: 'Creamed potatoes and peas mixed with corn and butter, served with avocado.', price: 320, category: 'Sides', image_url: 'https://images.unsplash.com/photo-1599599810694-f3ee39c3a48b?w=600&q=80' },
  { id: 'demo-9', name: 'Beef Stew & Ugali', description: 'Tender beef simmered in aromatic gravy, served with maize meal (ugali).', price: 480, category: 'Stews', image_url: 'https://images.unsplash.com/photo-1603073163245-b0d44dc15e1c?w=600&q=80' },
  { id: 'demo-10', name: 'Chicken Biryani', description: 'Fragrant rice baked with tender chicken, yoghurt, and warm spices.', price: 620, category: 'Rice Dishes', image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80' },
  { id: 'demo-11', name: 'Samosa Platter', description: 'Golden fried pastries filled with spiced meat or vegetables. Served with tamarind sauce.', price: 280, category: 'Appetizers', image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80' },
  { id: 'demo-12', name: 'Mandazi (Fried Dough)', description: 'Fluffy deep-fried dough pockets dusted with sugar. Serve with beans or stew.', price: 150, category: 'Breads', image_url: 'https://images.unsplash.com/photo-1585518419759-67d4ce7aba3b?w=600&q=80' },
  { id: 'demo-13', name: 'Kachumbari Salad', description: 'Fresh tomato and onion salad with coriander and lime dressing.', price: 200, category: 'Salads', image_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80' },
  { id: 'demo-14', name: 'Kienyeji Chicken', description: 'Free-range chicken cooked in a rich tomato and onion sauce with African spices.', price: 720, category: 'Grills', image_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&q=80' },
  { id: 'demo-15', name: 'Matoke Stew', description: 'Green plantains cooked with beef, tomatoes, and a blend of aromatic spices.', price: 450, category: 'Stews', image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80' },
  { id: 'demo-16', name: 'Beans & Maize', description: 'Boiled beans mixed with sweetcorn, served with avocado and fresh tomato.', price: 280, category: 'Sides', image_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80' },
  { id: 'demo-17', name: 'Grilled Fish (Whole)', description: 'Fresh whole fish grilled over charcoal, served with lime and seasoned fries.', price: 950, category: 'Seafood', image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80' },
  { id: 'demo-18', name: 'Chapati Stack', description: 'Six layers of hand-rolled, buttered chapati — perfect for scooping stews.', price: 180, category: 'Breads', image_url: 'https://images.unsplash.com/photo-1585235662519-c21f081dc466?w=600&q=80' },
  { id: 'demo-19', name: 'Lentil Soup', description: 'Creamy red lentil soup with coconut milk, turmeric, and cumin.', price: 220, category: 'Soups', image_url: 'https://images.unsplash.com/photo-1547592166-7aae4d755744?w=600&q=80' },
  { id: 'demo-20', name: 'Grilled Beef Sausages', description: 'Premium beef sausages grilled and served with pap (maize porridge).', price: 380, category: 'Grills', image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561547?w=600&q=80' },
  { id: 'demo-21', name: 'Coconut Rice', description: 'Basmati rice cooked in coconut milk with spices and served with lime.', price: 420, category: 'Rice Dishes', image_url: 'https://images.unsplash.com/photo-1584080876905-38f1144bdc21?w=600&q=80' },
  { id: 'demo-22', name: 'Beef Meatballs', description: 'Tender beef meatballs in a spiced tomato sauce, served with rice.', price: 520, category: 'Main Courses', image_url: 'https://images.unsplash.com/photo-1599599810694-f3ee39c3a48b?w=600&q=80' },
  { id: 'demo-23', name: 'Pumpkin Soup', description: 'Silky pumpkin soup with ginger, garlic, and a hint of cinnamon.', price: 240, category: 'Soups', image_url: 'https://images.unsplash.com/photo-1585521168556-0c94c1a66eae?w=600&q=80' },
  { id: 'demo-24', name: 'Grilled Lamb Ribs', description: 'Succulent lamb ribs marinated and grilled to perfection with African spices.', price: 890, category: 'Grills', image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80' },
  { id: 'demo-25', name: 'Nile Perch Fillet', description: 'Baked Nile perch fillet with lemon butter sauce and seasonal vegetables.', price: 850, category: 'Seafood', image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80' },
  { id: 'demo-26', name: 'Avocado Salad', description: 'Creamy avocado salad with tomatoes, red onions, and lime vinaigrette.', price: 350, category: 'Salads', image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80' },
  { id: 'demo-27', name: 'Pawpaw with Lime', description: 'Fresh ripe pawpaw (papaya) served chilled with fresh lime juice.', price: 180, category: 'Desserts', image_url: 'https://images.unsplash.com/photo-1585736209952-0f5e7f64f881?w=600&q=80' },
  { id: 'demo-28', name: 'Posho & Beans', description: 'Cooked maize meal served with slow-cooked beans in tomato gravy.', price: 240, category: 'Sides', image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80' },
  { id: 'demo-29', name: 'Cucumber Raita', description: 'Refreshing yoghurt and cucumber side dish with mint and cumin.', price: 120, category: 'Sides', image_url: 'https://images.unsplash.com/photo-1585518419759-67d4ce7aba3b?w=600&q=80' },
  { id: 'demo-30', name: 'Beef Kebabs', description: 'Marinated beef chunks grilled on skewers with peppers and onions.', price: 620, category: 'Grills', image_url: 'https://images.unsplash.com/photo-1599599810694-f3ee39c3a48b?w=600&q=80' },
  { id: 'demo-31', name: 'Cassava Chips', description: 'Crispy deep-fried cassava slices served with spiced salt and chilli sauce.', price: 220, category: 'Sides', image_url: 'https://images.unsplash.com/photo-1599599810694-f3ee39c3a48b?w=600&q=80' },
  { id: 'demo-32', name: 'Mango Smoothie', description: 'Blended fresh mango with yoghurt, honey, and a splash of lime juice.', price: 150, category: 'Drinks', image_url: 'https://images.unsplash.com/photo-1590080876905-38f1144bdc21?w=600&q=80' }
];


// ─────────────────────────────────────────────
// 5. FETCH MENU FROM SUPABASE
// ─────────────────────────────────────────────
const ADMIN_MENU_KEY = 'savanna_bites_admin_menu';
const FULL_MENU_COUNT = 32;

function toAdminStorageFormat(item) {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image_url || item.image,
    category: item.category,
  };
}

function getAdminMenuFromStorage() {
  try {
    const stored = localStorage.getItem(ADMIN_MENU_KEY);
    const fullSeed = DEMO_MENU.map(toAdminStorageFormat);

    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length >= FULL_MENU_COUNT) return parsed;

      // Upgrade older saves so the homepage always has 32 items
      const merged = mergeAdminMenuRecords(parsed, fullSeed);
      localStorage.setItem(ADMIN_MENU_KEY, JSON.stringify(merged));
      return merged;
    }

    localStorage.setItem(ADMIN_MENU_KEY, JSON.stringify(fullSeed));
    console.log('Seeded admin menu into localStorage (32 items)');
    return fullSeed;
  } catch (err) {
    console.warn('Failed to load admin menu from storage:', err);
    return null;
  }
}

function mergeAdminMenuRecords(primary, fallback) {
  const merged = [];
  const seen = new Set();

  for (const item of primary) {
    const key = (item.name || '').trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }

  for (const item of fallback) {
    const key = (item.name || '').trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }

  return merged;
}

function menuItemKey(item) {
  return (item.name || '').trim().toLowerCase();
}

/** Merge lists by food name; first list wins for duplicates. Always fills from fallback. */
function mergeMenuByName(primary, fallback) {
  const merged = [];
  const seen = new Set();

  for (const item of primary) {
    const key = menuItemKey(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(normalizeMenuItem(item));
  }

  for (const item of fallback) {
    const key = menuItemKey(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(normalizeMenuItem(item));
  }

  return merged;
}

function formatSupabaseMenuItem(item) {
  return {
    id: String(item.id),
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category,
    image_url: item.image_url,
    available: item.available !== false,
  };
}

function buildHomepageMenu(adminItems, supabaseItems) {
  let menu = DEMO_MENU.map(normalizeMenuItem);

  if (supabaseItems?.length) {
    const fromDb = supabaseItems.map(formatSupabaseMenuItem);
    menu = mergeMenuByName(fromDb, menu);
  }

  if (adminItems?.length) {
    menu = mergeMenuByName(convertAdminMenuToMainFormat(adminItems), menu);
  }

  return menu;
}

function convertAdminMenuToMainFormat(adminItems) {
  return adminItems.map(item => ({
    id: String(item.id),
    name: item.name,
    price: item.price,
    image_url: item.image,
    description: item.description || `Delicious ${item.name}`,
    category: item.category || 'Specials',
    available: true
  }));
}

function applyMenu(items, source) {
  menuData = items.map(normalizeMenuItem);
  buildCategoryFilters(menuData);
  renderMenuWithFilters();
  console.log(`Menu ready: ${menuData.length} items (${source})`);
  if (menuData.length >= FULL_MENU_COUNT) {
    showToast(`Menu loaded — ${menuData.length} dishes available`, 'success');
  }
}

async function fetchSupabaseMenu() {
  const db = getSupabaseClient();
  if (db) {
    try {
      const result = await db
        .from('menu')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (result.error) throw result.error;
      if (result.data?.length) return result.data;
    } catch (err) {
      console.warn('Supabase client fetch failed:', err.message || err);
    }
  }

  try {
    return await fetchMenuViaRest();
  } catch (err) {
    console.warn('REST menu fetch failed:', err.message || err);
    return null;
  }
}

async function fetchMenu() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;

  console.log('Building full menu (32 items)…');

  const adminMenu = getAdminMenuFromStorage();
  const supabaseData = await fetchSupabaseMenu();
  const menu = buildHomepageMenu(adminMenu, supabaseData);

  const source = adminMenu?.length
    ? 'admin + catalog'
    : supabaseData?.length
      ? 'catalog + supabase'
      : 'catalog';

  applyMenu(menu, source);
}

function reloadMenuIfUpdated() {
  try {
    const lastUpdate = localStorage.getItem('savanna_bites_menu_updated');
    const lastPageLoad = sessionStorage.getItem('savanna_bites_last_menu_load');
    
    if (lastUpdate && (!lastPageLoad || parseInt(lastUpdate) > parseInt(lastPageLoad))) {
      console.log('Menu updated in admin, reloading...');
      sessionStorage.setItem('savanna_bites_last_menu_load', Date.now().toString());
      fetchMenu();
    }
  } catch (err) {
    console.warn('Failed to check menu updates:', err);
  }
}

function setupPageVisibilityListener() {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      reloadMenuIfUpdated();
    }
  });
}

function setupStorageSyncListener() {
  window.addEventListener('storage', event => {
    if (event.key === 'savanna_bites_menu_updated' || event.key === 'savanna_bites_admin_menu') {
      console.log('Detected admin menu update via storage event. Reloading homepage menu.');
      sessionStorage.setItem('savanna_bites_last_menu_load', Date.now().toString());
      fetchMenu();
    }
  });
}


// ─────────────────────────────────────────────
// 6. RENDER MENU CARDS
// ─────────────────────────────────────────────
function renderMenu(items) {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = '';

  if (!items.length) {
    const message = menuSearchQuery
      ? 'No menu items match your search. Try another term or clear the filters.'
      : 'No items found in this category.';
    grid.innerHTML = `<p style="color:var(--clr-text-muted); grid-column:1/-1; text-align:center; padding:40px 0">
      ${message}
    </p>`;
    return;
  }

  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.style.animationDelay = `${i * 0.06}s`;

    const imgWrap = document.createElement('div');
    imgWrap.className = 'card-img-wrap';
    const img = document.createElement('img');
    img.src = item.image_url || '';
    img.alt = item.name || 'Menu item';
    img.loading = 'lazy';
    img.onerror = () => {
      img.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=70';
    };
    imgWrap.appendChild(img);
    if (item.category) {
      const tag = document.createElement('span');
      tag.className = 'card-category-tag';
      tag.textContent = item.category;
      imgWrap.appendChild(tag);
    }

    const body = document.createElement('div');
    body.className = 'card-body';
    const nameEl = document.createElement('h3');
    nameEl.className = 'card-name';
    nameEl.textContent = item.name || '';
    const descEl = document.createElement('p');
    descEl.className = 'card-description';
    descEl.textContent = item.description || '';
    const footer = document.createElement('div');
    footer.className = 'card-footer';
    const priceEl = document.createElement('div');
    priceEl.className = 'card-price';
    const price = Number(item.price) || 0;
    priceEl.innerHTML = `KES ${price.toLocaleString()} <span>/serving</span>`;
    const addBtn = document.createElement('button');
    addBtn.className = 'add-to-cart-btn';
    addBtn.setAttribute('aria-label', `Add ${item.name} to cart`);
    addBtn.textContent = '+';
    addBtn.addEventListener('click', () => addToCart(item.id));
    footer.append(priceEl, addBtn);
    body.append(nameEl, descEl, footer);
    card.append(imgWrap, body);
    grid.appendChild(card);
  });
}


// ─────────────────────────────────────────────
// 7. CATEGORY FILTERS
// ─────────────────────────────────────────────
function filterMenuItems() {
  const query = menuSearchQuery.trim().toLowerCase();
  return menuData.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = !query || [item.name, item.description, item.category]
      .some(value => String(value || '').toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });
}

function renderMenuWithFilters() {
  renderMenu(filterMenuItems());
}

function buildCategoryFilters(items) {
  const categories = ['all', ...new Set(items.map(i => i.category).filter(Boolean))];
  const select = document.getElementById('category-select');
  if (!select) return;

  select.innerHTML = categories
    .map(cat => `<option value="${cat}">${cat === 'all' ? 'All' : cat}</option>`)
    .join('');
  select.value = activeCategory;

  select.onchange = () => {
    activeCategory = select.value;
    renderMenuWithFilters();
  };
}


// ─────────────────────────────────────────────
// 8. CART LOGIC
// ─────────────────────────────────────────────
function getItemById(id) {
  return menuData.find(m => m.id === id);
}

function addToCart(itemId) {
  const item = getItemById(itemId);
  if (!item) return;

  const existing = cart.find(c => c.item.id === itemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ item, quantity: 1 });
  }

  updateCartUI();
  showToast(`"${item.name}" added to your order 🛒`, 'success');
}

function removeFromCart(itemId) {
  cart = cart.filter(c => c.item.id !== itemId);
  updateCartUI();
}

function changeQuantity(itemId, delta) {
  const entry = cart.find(c => c.item.id === itemId);
  if (!entry) return;

  entry.quantity += delta;
  if (entry.quantity <= 0) {
    removeFromCart(itemId);
  } else {
    updateCartUI();
  }
}

function getCartTotal() {
  return cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
}

function getCartCount() {
  return cart.reduce((sum, c) => sum + c.quantity, 0);
}

function updateCartUI() {
  const badge    = document.getElementById('cartBadge');
  const itemsEl  = document.getElementById('cartItems');
  const emptyEl  = document.getElementById('cartEmpty');
  const footerEl = document.getElementById('cartFooter');
  const totalEl  = document.getElementById('cartTotal');

  const count = getCartCount();
  const total = getCartTotal();

  // Update badge
  badge.textContent = count;
  badge.style.transform = count > 0 ? 'scale(1)' : 'scale(0)';

  if (cart.length === 0) {
    emptyEl.style.display = 'flex';
    footerEl.style.display = 'none';
    itemsEl.innerHTML = '';
    itemsEl.appendChild(emptyEl);
    return;
  }

  emptyEl.style.display = 'none';
  footerEl.style.display = 'block';
  totalEl.textContent = `KES ${total.toLocaleString()}`;

  // Rebuild cart item list
  itemsEl.innerHTML = '';
  cart.forEach(({ item, quantity }) => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img
        src="${item.image_url}"
        alt="${item.name}"
        class="cart-item-img"
        onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&q=70'"
      />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">KES ${(item.price * quantity).toLocaleString()}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn remove" onclick="changeQuantity('${item.id}', -1)" aria-label="Decrease quantity">−</button>
        <span class="qty-number">${quantity}</span>
        <button class="qty-btn" onclick="changeQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
      </div>
    `;
    itemsEl.appendChild(el);
  });
}


// ─────────────────────────────────────────────
// 9. CART SIDEBAR TOGGLE
// ─────────────────────────────────────────────
function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('cartToggleBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);
document.getElementById('browseMenuBtn').addEventListener('click', () => {
  closeCart();
  window.location.href = 'menu.html';
});


// ─────────────────────────────────────────────
// 10. CHECKOUT FLOW
// ─────────────────────────────────────────────
function showStep(stepId) {
  ['step1', 'step2', 'step3'].forEach(id => {
    document.getElementById(id).classList.toggle('hidden', id !== stepId);
  });
}

// Open checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }
  closeCart();
  openCheckout();
});

function openCheckout() {
  showStep('step1');
  document.getElementById('checkoutOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('checkoutClose').addEventListener('click', closeCheckout);
document.getElementById('checkoutOverlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('checkoutOverlay')) closeCheckout();
});

// Step 1 → Step 2
document.getElementById('toStep2Btn').addEventListener('click', () => {
  const name  = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const loc   = document.getElementById('location').value.trim();

  if (!name || !phone || !loc) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }
  if (!/^\d{9}$/.test(phone)) {
    showToast('Enter a valid 9-digit phone number (without +254).', 'error');
    return;
  }

  // Build order summary
  const summaryEl    = document.getElementById('orderSummary');
  const grandTotalEl = document.getElementById('grandTotal');
  const phoneDisplay = document.getElementById('mpesaPhone');

  summaryEl.innerHTML = cart.map(({ item, quantity }) => `
    <div class="summary-item">
      <span>${item.name} × ${quantity}</span>
      <span>KES ${(item.price * quantity).toLocaleString()}</span>
    </div>
  `).join('');

  const total = getCartTotal() + 100; // + KES 100 delivery fee
  grandTotalEl.textContent  = `KES ${total.toLocaleString()}`;
  phoneDisplay.textContent  = `+254${phone}`;

  showStep('step2');
});

// Step 2 → Step 1 (back)
document.getElementById('backToStep1Btn').addEventListener('click', () => showStep('step1'));

// Done button (after confirmation)
document.getElementById('doneBtn').addEventListener('click', () => {
  closeCheckout();
  cart = [];
  updateCartUI();
  showStep('step1');
  // Clear form
  ['fullName', 'phone', 'location', 'notes'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
});


// ─────────────────────────────────────────────
// 11. M-PESA STK PUSH (DARAJA API)
// ─────────────────────────────────────────────
/**
 * ⚠️  SECURITY NOTE FOR PRODUCTION:
 * Never expose your Consumer Secret on the frontend.
 * Instead, create a backend endpoint (e.g. Supabase Edge Function,
 * Node.js server, or Vercel API route) that:
 *  1. Receives { phone, amount }
 *  2. Generates the Daraja access token server-side
 *  3. Initiates the STK Push
 *  4. Returns { CheckoutRequestID }
 *
 * The functions below show the full structure — use them as reference
 * for your backend implementation.
 */

/**
 * Get M-Pesa OAuth access token (should be done server-side in production).
 */
async function getMpesaToken() {
  const credentials = btoa(`${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`);
  const res = await fetch(`${MPESA_CONFIG.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
    method: 'GET',
    headers: { Authorization: `Basic ${credentials}` },
  });
  const data = await res.json();
  return data.access_token;
}

/**
 * Initiate STK Push payment.
 * @param {string} phone - 9-digit number (e.g. "712345678")
 * @param {number} amount - Amount in KES
 * @returns {Promise<{CheckoutRequestID: string}>}
 */
async function initiateStkPush(phone, amount) {
  const token     = await getMpesaToken();
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const password  = btoa(`${MPESA_CONFIG.shortcode}${MPESA_CONFIG.passkey}${timestamp}`);
  const fullPhone = `254${phone}`; // e.g. 254712345678

  const body = {
    BusinessShortCode: MPESA_CONFIG.shortcode,
    Password:          password,
    Timestamp:         timestamp,
    TransactionType:   'CustomerPayBillOnline',
    Amount:            Math.ceil(amount),
    PartyA:            fullPhone,
    PartyB:            MPESA_CONFIG.shortcode,
    PhoneNumber:       fullPhone,
    CallBackURL:       MPESA_CONFIG.callbackUrl,
    AccountReference:  'SavannaBites',
    TransactionDesc:   'Food Order Payment',
  };

  const res = await fetch(`${MPESA_CONFIG.baseUrl}/mpesa/stkpush/v1/processrequest`, {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (data.ResponseCode !== '0') {
    throw new Error(data.errorMessage || 'STK Push failed');
  }
  return data; // Includes CheckoutRequestID
}


// ─────────────────────────────────────────────
// 12. SAVE ORDER TO SUPABASE
// ─────────────────────────────────────────────
async function saveOrderToSupabase({ name, phone, location, notes, total }) {
  const db = getSupabaseClient();
  if (!db) throw new Error('Supabase is not configured');

  // Insert into `orders` table
  const { data: order, error: orderErr } = await db
    .from('orders')
    .insert({
      customer_name: name,
      phone:         `+254${phone}`,
      location:      location,
      notes:         notes || null,
      total_amount:  total,
      status:        'paid',
    })
    .select()
    .single();

  if (orderErr) throw orderErr;

  // Insert into `order_items` table (one row per cart item)
  const orderItems = cart.map(({ item, quantity }) => ({
    order_id: order.id,
    menu_id:  item.id,
    quantity: quantity,
    price:    item.price,
  }));

  const { error: itemsErr } = await db
    .from('order_items')
    .insert(orderItems);

  if (itemsErr) throw itemsErr;

  return order;
}


// ─────────────────────────────────────────────
// 13. PAY BUTTON HANDLER
// ─────────────────────────────────────────────
document.getElementById('payBtn').addEventListener('click', async () => {
  const name  = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const loc   = document.getElementById('location').value.trim();
  const notes = document.getElementById('notes').value.trim();
  const total = getCartTotal() + 100; // including delivery fee

  const payBtn     = document.getElementById('payBtn');
  const payBtnText = document.getElementById('payBtnText');
  const spinner    = document.getElementById('paySpinner');

  // Loading state
  payBtn.disabled    = true;
  payBtnText.textContent = 'Processing…';
  spinner.classList.remove('hidden');

  try {
    // Attempt STK Push (will succeed in sandbox if credentials configured)
    if (MPESA_CONFIG.consumerKey !== 'YOUR_CONSUMER_KEY') {
      await initiateStkPush(phone, total);
      showToast('📲 STK Push sent! Check your phone.', 'success');
      // In production, wait for Daraja callback before confirming.
      // For simplicity here, we confirm immediately after STK Push initiation.
    } else {
      // Simulate payment delay when M-Pesa not configured
      console.warn('⚠️  M-Pesa not configured. Simulating payment...');
      await delay(2500);
      showToast('✅ Payment simulated (configure M-Pesa for live)!', 'success');
    }

    // Save order to Supabase
    let orderId = `ORD-${Date.now()}`;
    if (getSupabaseClient()) {
      const order = await saveOrderToSupabase({ name, phone, location: loc, notes, total });
      orderId = order.id.slice(0, 8).toUpperCase();
    }

    // Show confirmation
    document.getElementById('confirmedOrderId').textContent = orderId;
    showStep('step3');

  } catch (err) {
    console.error('Payment/order error:', err);
    showToast(`Payment failed: ${err.message}`, 'error');
  } finally {
    // Reset button state
    payBtn.disabled     = false;
    payBtnText.textContent = 'Pay with M-Pesa';
    spinner.classList.add('hidden');
  }
});


// ─────────────────────────────────────────────
// 14. NAVBAR — scroll effect & active link
// ─────────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Update active nav link based on scroll position
  const sections = ['home', 'menu', 'contact'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.classList.toggle('active', href === `#${current}`);
    }
  });
});

// Hamburger menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// Close hamburger on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});


// ─────────────────────────────────────────────
// 15. TOAST NOTIFICATION
// ─────────────────────────────────────────────
let toastTimer;
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className   = `toast show ${type}`;
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}
// Expose globally for inline onclick attributes (e.g. contact form button)
window.showToast = showToast;


// ─────────────────────────────────────────────
// 16. UTILITY
// ─────────────────────────────────────────────
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// ─────────────────────────────────────────────
// 17. INIT
// ─────────────────────────────────────────────
const CONTACT_MESSAGE_KEY = 'savanna_bites_messages';

function bindMenuSearch() {
  const searchInput = document.getElementById('menu-search-input');
  if (!searchInput) return;
  searchInput.addEventListener('input', () => {
    menuSearchQuery = searchInput.value;
    renderMenuWithFilters();
  });
}

function saveContactMessage(message) {
  try {
    const stored = localStorage.getItem(CONTACT_MESSAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    parsed.unshift(message);
    localStorage.setItem(CONTACT_MESSAGE_KEY, JSON.stringify(parsed));
  } catch (err) {
    console.warn('Unable to save contact message:', err);
  }
}

function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const message = document.getElementById('contactMsg')?.value.trim();

  if (!name || !email || !message) {
    showToast('Please fill in all fields before sending your message.', 'error');
    return;
  }

  saveContactMessage({
    id: Date.now(),
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  });

  showToast('Message sent. Redirecting to admin page...', 'success');
  setTimeout(() => {
    window.location.href = 'admin.html';
  }, 300);
}

function bindContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', handleContactSubmit);
}

function showDemoMenu() {
  menuData = DEMO_MENU.map(normalizeMenuItem);
  buildCategoryFilters(menuData);
  renderMenuWithFilters();
}

function initApp() {
  bindMenuSearch();
  bindContactForm();
  showDemoMenu();
  updateCartUI();
  setupPageVisibilityListener();
  setupStorageSyncListener();
  sessionStorage.setItem('savanna_bites_last_menu_load', Date.now().toString());
  fetchMenu();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
