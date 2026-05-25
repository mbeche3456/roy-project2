/**
 * Savanna Bites — Admin page (admin.html)
 */
const ADMIN_PASSWORD = 'admin123';

const COMPLETE_MENU = [
  { id: 'c-1', name: 'Nyama Choma Platter', price: 850, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500', category: 'Grills' },
  { id: 'c-2', name: 'Pilau Special', price: 550, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500', category: 'Rice Dishes' },
  { id: 'c-3', name: 'Tilapia Fry', price: 780, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500', category: 'Seafood' },
  { id: 'c-4', name: 'Githeri Bowl', price: 320, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500', category: 'Vegetarian' },
  { id: 'c-5', name: 'Maharagwe na Chapati', price: 380, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500', category: 'Vegetarian' },
  { id: 'c-6', name: 'Mutura & Fries', price: 490, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500', category: 'Grills' },
  { id: 'c-7', name: 'Sukuma Wiki Stir-Fry', price: 250, image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b1?w=500', category: 'Vegetarian' },
  { id: 'c-8', name: 'Irio (Mashed Potatoes)', price: 320, image: 'https://images.unsplash.com/photo-1599599810694-f3ee39c3a48b?w=500', category: 'Sides' },
  { id: 'c-9', name: 'Beef Stew & Ugali', price: 480, image: 'https://images.unsplash.com/photo-1603073163245-b0d44dc15e1c?w=500', category: 'Stews' },
  { id: 'c-10', name: 'Chicken Biryani', price: 620, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500', category: 'Rice Dishes' },
  { id: 'c-11', name: 'Samosa Platter', price: 280, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500', category: 'Appetizers' },
  { id: 'c-12', name: 'Mandazi (Fried Dough)', price: 150, image: 'https://images.unsplash.com/photo-1585518419759-67d4ce7aba3b?w=500', category: 'Breads' },
  { id: 'c-13', name: 'Kachumbari Salad', price: 200, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500', category: 'Salads' },
  { id: 'c-14', name: 'Kienyeji Chicken', price: 720, image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500', category: 'Grills' },
  { id: 'c-15', name: 'Matoke Stew', price: 450, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', category: 'Stews' },
  { id: 'c-16', name: 'Beans & Maize', price: 280, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500', category: 'Sides' },
  { id: 'c-17', name: 'Grilled Fish (Whole)', price: 950, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500', category: 'Seafood' },
  { id: 'c-18', name: 'Chapati Stack', price: 180, image: 'https://images.unsplash.com/photo-1585235662519-c21f081dc466?w=500', category: 'Breads' },
  { id: 'c-19', name: 'Lentil Soup', price: 220, image: 'https://images.unsplash.com/photo-1547592166-7aae4d755744?w=500', category: 'Soups' },
  { id: 'c-20', name: 'Grilled Beef Sausages', price: 380, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561547?w=500', category: 'Grills' },
  { id: 'c-21', name: 'Coconut Rice', price: 420, image: 'https://images.unsplash.com/photo-1584080876905-38f1144bdc21?w=500', category: 'Rice Dishes' },
  { id: 'c-22', name: 'Beef Meatballs', price: 520, image: 'https://images.unsplash.com/photo-1599599810694-f3ee39c3a48b?w=500', category: 'Main Courses' },
  { id: 'c-23', name: 'Pumpkin Soup', price: 240, image: 'https://images.unsplash.com/photo-1585521168556-0c94c1a66eae?w=500', category: 'Soups' },
  { id: 'c-24', name: 'Grilled Lamb Ribs', price: 890, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500', category: 'Grills' },
  { id: 'c-25', name: 'Nile Perch Fillet', price: 850, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500', category: 'Seafood' },
  { id: 'c-26', name: 'Avocado Salad', price: 350, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500', category: 'Salads' },
  { id: 'c-27', name: 'Pawpaw with Lime', price: 180, image: 'https://images.unsplash.com/photo-1585736209952-0f5e7f64f881?w=500', category: 'Desserts' },
  { id: 'c-28', name: 'Posho & Beans', price: 240, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', category: 'Sides' },
  { id: 'c-29', name: 'Cucumber Raita', price: 120, image: 'https://images.unsplash.com/photo-1585518419759-67d4ce7aba3b?w=500', category: 'Sides' },
  { id: 'c-30', name: 'Beef Kebabs', price: 620, image: 'https://images.unsplash.com/photo-1599599810694-f3ee39c3a48b?w=500', category: 'Grills' },
  { id: 'c-31', name: 'Cassava Chips', price: 220, image: 'https://images.unsplash.com/photo-1599599810694-f3ee39c3a48b?w=500', category: 'Sides' },
  { id: 'c-32', name: 'Mango Smoothie', price: 150, image: 'https://images.unsplash.com/photo-1590080876905-38f1144bdc21?w=500', category: 'Drinks' }
];

let foodMenu = [
  { id: 1, name: 'Nyama Choma Platter', price: 850, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500' },
  { id: 2, name: 'Pilau Special', price: 550, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500' },
  { id: 3, name: 'Tilapia Fry', price: 780, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500' },
  { id: 4, name: 'Githeri Bowl', price: 320, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500' },
  { id: 5, name: 'Maharagwe na Chapati', price: 380, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500' },
  { id: 6, name: 'Mutura & Fries', price: 490, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500' },
  { id: 7, name: 'Sukuma Wiki Stir-Fry', price: 250, image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b1?w=500' },
  { id: 8, name: 'Irio (Mashed Potatoes)', price: 320, image: 'https://images.unsplash.com/photo-1599599810694-f3ee39c3a48b?w=500' },
  { id: 9, name: 'Beef Stew & Ugali', price: 480, image: 'https://images.unsplash.com/photo-1603073163245-b0d44dc15e1c?w=500' },
  { id: 10, name: 'Chicken Biryani', price: 620, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500' },
  { id: 11, name: 'Samosa Platter', price: 280, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500' },
  { id: 12, name: 'Mandazi (Fried Dough)', price: 150, image: 'https://images.unsplash.com/photo-1585518419759-67d4ce7aba3b?w=500' },
  { id: 13, name: 'Kachumbari Salad', price: 200, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500' },
  { id: 14, name: 'Kienyeji Chicken', price: 720, image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500' },
  { id: 15, name: 'Matoke Stew', price: 450, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500' },
  { id: 16, name: 'Beans & Maize', price: 280, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500' },
  { id: 17, name: 'Grilled Fish (Whole)', price: 950, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500' },
  { id: 18, name: 'Chapati Stack', price: 180, image: 'https://images.unsplash.com/photo-1585235662519-c21f081dc466?w=500' },
  { id: 19, name: 'Lentil Soup', price: 220, image: 'https://images.unsplash.com/photo-1547592166-7aae4d755744?w=500' },
  { id: 20, name: 'Grilled Beef Sausages', price: 380, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561547?w=500' },
  { id: 21, name: 'Coconut Rice', price: 420, image: 'https://images.unsplash.com/photo-1584080876905-38f1144bdc21?w=500' },
  { id: 22, name: 'Beef Meatballs', price: 520, image: 'https://images.unsplash.com/photo-1599599810694-f3ee39c3a48b?w=500' },
  { id: 23, name: 'Pumpkin Soup', price: 240, image: 'https://images.unsplash.com/photo-1585521168556-0c94c1a66eae?w=500' },
  { id: 24, name: 'Grilled Lamb Ribs', price: 890, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500' },
  { id: 25, name: 'Nile Perch Fillet', price: 850, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500' },
  { id: 26, name: 'Avocado Salad', price: 350, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500' },
  { id: 27, name: 'Pawpaw with Lime', price: 180, image: 'https://images.unsplash.com/photo-1585736209952-0f5e7f64f881?w=500' },
  { id: 28, name: 'Posho & Beans', price: 240, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500' },
  { id: 29, name: 'Cucumber Raita', price: 120, image: 'https://images.unsplash.com/photo-1585518419759-67d4ce7aba3b?w=500' },
  { id: 30, name: 'Beef Kebabs', price: 620, image: 'https://images.unsplash.com/photo-1599599810694-f3ee39c3a48b?w=500' },
  { id: 31, name: 'Cassava Chips', price: 220, image: 'https://images.unsplash.com/photo-1599599810694-f3ee39c3a48b?w=500' },
  { id: 32, name: 'Mango Smoothie', price: 150, image: 'https://images.unsplash.com/photo-1590080876905-38f1144bdc21?w=500' }
];

let nextFoodId = 33;
let selectedMenuId = null;
let menuSearchQuery = '';

const ADMIN_MENU_KEY = 'savanna_bites_admin_menu';
const FULL_MENU_COUNT = 32;
const DEFAULT_FOOD_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500';

function findMenuItem(id) {
  const key = String(id);
  return foodMenu.find(m => String(m.id) === key);
}

function getCategoryOptions() {
  const cats = new Set();
  COMPLETE_MENU.forEach(i => i.category && cats.add(i.category));
  foodMenu.forEach(i => i.category && cats.add(i.category));
  return [...cats].sort();
}

function populateCategoryDatalist() {
  const datalist = document.getElementById('food-category-list');
  if (!datalist) return;
  datalist.innerHTML = getCategoryOptions()
.map(c => `<option value="${c}"></option>`)
.join('');
}

function getCatalogImage(name) {
  const found = COMPLETE_MENU.find(i => i.name.toLowerCase() === (name || '').toLowerCase());
  return found?.image || DEFAULT_FOOD_IMAGE;
}

function resolveFoodImage(item) {
  return item.image || item.image_url || getCatalogImage(item.name);
}

function backfillMenuImages(menu) {
  return menu.map(item => {
const catalog = COMPLETE_MENU.find(c => c.name.toLowerCase() === (item.name || '').toLowerCase());
return {
  ...item,
  image: resolveFoodImage(item),
  category: item.category || catalog?.category || 'Specials',
};
  });
}

function loadFoodMenuFromStorage() {
  try {
const stored = localStorage.getItem(ADMIN_MENU_KEY);
if (stored) {
  let parsed = JSON.parse(stored);
  if (parsed.length < FULL_MENU_COUNT) {
    const fullMenu = COMPLETE_MENU.map(i => ({ id: i.id, name: i.name, price: i.price, image: i.image, category: i.category }));
    parsed = mergeAdminRecords(parsed, fullMenu);
  }
  foodMenu = backfillMenuImages(parsed);
} else {
  foodMenu = backfillMenuImages(
    COMPLETE_MENU.map(i => ({ id: i.id, name: i.name, price: i.price, image: i.image, category: i.category }))
  );
}
const numericIds = foodMenu.map(i => Number(i.id)).filter(n => Number.isFinite(n));
if (numericIds.length) {
  nextFoodId = Math.max(...numericIds) + 1;
}
  } catch (err) {
console.warn('Failed to load food menu:', err);
foodMenu = backfillMenuImages(foodMenu);
  }
}

function bindAddFoodImagePreview() {
  const urlInput = document.getElementById('new-food-image-url');
  const fileInput = document.getElementById('new-food-image-file');
  const previewWrap = document.getElementById('new-food-image-preview');
  const previewImg = document.getElementById('new-food-preview-img');

  const showPreview = src => {
if (!src) {
  previewWrap.hidden = true;
  return;
}
previewImg.src = src;
previewImg.onerror = () => { previewImg.src = DEFAULT_FOOD_IMAGE; };
previewWrap.hidden = false;
  };

  urlInput.addEventListener('input', () => showPreview(urlInput.value.trim()));
  fileInput.addEventListener('change', () => {
const file = fileInput.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = e => showPreview(e.target.result);
reader.readAsDataURL(file);
  });
}

function bindMenuSearch() {
  const searchInput = document.getElementById('menu-search-input');
  if (!searchInput) return;
  searchInput.addEventListener('input', () => {
menuSearchQuery = searchInput.value.trim();
renderMenu();
  });
}

bindAddFoodImagePreview();
bindMenuSearch();

function mergeAdminRecords(primary, fallback) {
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

// Seed admin menu to localStorage so the main site loads all 32 items immediately.
(function seedAdminMenu() {
  try {
const fullMenu = COMPLETE_MENU.map(i => ({ id: i.id, name: i.name, price: i.price, image: i.image, category: i.category }));
const stored = localStorage.getItem(ADMIN_MENU_KEY);
if (!stored) {
  localStorage.setItem(ADMIN_MENU_KEY, JSON.stringify(fullMenu));
  console.log('Seeded admin menu into localStorage (32 items)');
  return;
}
const parsed = JSON.parse(stored);
if (parsed.length < FULL_MENU_COUNT) {
  const merged = mergeAdminRecords(parsed, fullMenu);
  localStorage.setItem(ADMIN_MENU_KEY, JSON.stringify(backfillMenuImages(merged)));
  console.log('Upgraded admin menu to', merged.length, 'items');
} else {
  const withImages = backfillMenuImages(parsed);
  localStorage.setItem(ADMIN_MENU_KEY, JSON.stringify(withImages));
}
  } catch (err) {
console.warn('Failed to seed admin menu:', err);
  }
})();

let activeOrders = [];
let sentCarts = [];

const ADMIN_ORDER_FETCH_FALLBACK = [
  { id: '101', tableOrUser: 'Jane Wanjiru', location: 'Westlands, Nairobi', items: '1x Nyama Choma Platter, 1x Pilau Special', total: 1400, status: 'paid', timestamp: '2026-05-25 10:30 AM', phone: '+254 712 345 678' },
  { id: '102', tableOrUser: 'John Kipchoge', location: 'Karen, Nairobi', items: '2x Tilapia Fry', total: 1560, status: 'preparing', timestamp: '2026-05-25 09:15 AM', phone: '+254 723 456 789' }
];

const ADMIN_HISTORY_FALLBACK = [
  { id: '1001', customerName: 'Jane Wanjiru', phone: '+254 712 345 678', location: 'Westlands', items: '2x Nyama Choma, 1x Pilau', total: 2200, timestamp: '2026-05-25 10:30 AM', status: 'delivered' },
  { id: '1002', customerName: 'John Kipchoge', phone: '+254 723 456 789', location: 'Karen', items: '1x Tilapia Fry, 3x Githeri Bowl', total: 1500, timestamp: '2026-05-25 09:15 AM', status: 'delivered' },
  { id: '1003', customerName: 'Mary Omondi', phone: '+254 734 567 890', location: 'Lavington', items: '1x Maharagwe na Chapati, 2x Mutura', total: 1260, timestamp: '2026-05-25 08:00 AM', status: 'pending' }
];

function getSupabaseClient() {
  if (!window.supabase?.createClient) {
    return null;
  }
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function formatOrderStatus(status) {
  if (!status) return 'Unknown';
  return String(status).trim().charAt(0).toUpperCase() + String(status).trim().slice(1);
}

async function fetchAdminOrdersFromSupabase() {
  const db = getSupabaseClient();
  if (!db) return false;

  try {
    const result = await db.from('order_details').select('*').order('created_at', { ascending: false });
    if (result.error) throw result.error;
    if (!result.data || !result.data.length) {
      activeOrders = [];
      sentCarts = [];
      return true;
    }

    const orders = new Map();
    result.data.forEach(row => {
      const id = row.order_id;
      if (!orders.has(id)) {
        orders.set(id, {
          id,
          tableOrUser: row.customer_name,
          customerName: row.customer_name,
          phone: row.phone,
          location: row.location,
          total: Number(row.total_amount),
          status: row.status || 'pending',
          timestamp: new Date(row.created_at).toLocaleString(),
          items: []
        });
      }
      const order = orders.get(id);
      order.items.push(`${row.quantity}x ${row.item_name}`);
    });

    const allOrders = Array.from(orders.values()).map(order => ({
      ...order,
      items: order.items.join(', ')
    }));

    activeOrders = allOrders.filter(order => order.status !== 'delivered');
    sentCarts = allOrders.filter(order => order.status === 'delivered');
    return true;
  } catch (err) {
    console.warn('Unable to load orders from Supabase:', err);
    return false;
  }
}

function populateFallbackOrders() {
  activeOrders = ADMIN_ORDER_FETCH_FALLBACK.slice();
  sentCarts = ADMIN_HISTORY_FALLBACK.slice();
}

async function loadAdminOrders() {
  const loaded = await fetchAdminOrdersFromSupabase();
  if (!loaded) {
    populateFallbackOrders();
  }
}

function saveMenuToLocalStorage() {
  try {
localStorage.setItem(ADMIN_MENU_KEY, JSON.stringify(foodMenu));
console.log('Menu saved to localStorage');
  } catch (err) {
console.error('Failed to save menu to storage:', err);
  }
}

function renderWhereTo() {
  const container = document.getElementById('where-to-container');
  container.innerHTML = '';
  const destinations = new Map();

  activeOrders.forEach(order => {
if (order.location) {
  destinations.set(order.location, (destinations.get(order.location) || 0) + 1);
}
  });
  sentCarts.forEach(cart => {
if (cart.location) {
  destinations.set(cart.location, (destinations.get(cart.location) || 0) + 1);
}
  });

  if (!destinations.size) {
container.innerHTML = '<p class="empty-state">No delivery destinations yet.</p>';
return;
  }

  destinations.forEach((count, location) => {
const row = document.createElement('div');
row.className = 'where-to-item';
row.innerHTML = `
  <strong>ðŸ“ ${location}</strong>
  <span>${count} order${count > 1 ? 's' : ''}</span>
`;
container.appendChild(row);
  });
}

function renderCatalogPick() {
  const container = document.getElementById('catalog-pick-container');
  container.innerHTML = '';
  COMPLETE_MENU.forEach(item => {
const alreadyOnMenu = foodMenu.some(m => m.name === item.name);
const btn = document.createElement('button');
btn.type = 'button';
btn.className = 'catalog-icon-tile';
btn.disabled = alreadyOnMenu;
btn.title = item.name;
btn.onclick = () => addFoodFromCatalog(item);

const img = document.createElement('img');
img.src = item.image;
img.alt = item.name;
img.loading = 'lazy';
img.onerror = () => { img.src = DEFAULT_FOOD_IMAGE; };

const name = document.createElement('span');
name.className = 'catalog-icon-name';
name.textContent = item.name;

const price = document.createElement('span');
price.className = 'menu-icon-price';
price.textContent = `KES ${item.price}`;

btn.append(img, name, price);
if (alreadyOnMenu) {
  const badge = document.createElement('span');
  badge.className = 'catalog-icon-badge';
  badge.textContent = 'âœ“';
  btn.appendChild(badge);
}
container.appendChild(btn);
  });
}

function addFoodFromCatalog(item) {
  if (foodMenu.some(m => m.name === item.name)) return;
  const newId = nextFoodId++;
  foodMenu.unshift({
id: newId,
name: item.name,
price: item.price,
image: item.image,
category: item.category
  });
  selectedMenuId = newId;
  renderMenu();
  renderCatalogPick();
  saveMenuToLocalStorage();
}

function renderCartHistory() {
  const container = document.getElementById('cart-history-container');
  container.innerHTML = '';
  if (!sentCarts.length) return;

  const label = document.createElement('p');
  label.className = 'subsection-label';
  label.textContent = 'Order history';
  container.appendChild(label);

  sentCarts.forEach(cart => {
const statusColor = String(cart.status || '').toLowerCase() === 'delivered' ? '#2ed573' : '#ffa502';
const card = document.createElement('div');
card.className = 'cart-item-card';
card.innerHTML = `
  <div style="margin-bottom: 0.5rem;">
    <div class="cart-item-name">${cart.customerName} <span style="display: inline-block; background: ${statusColor}; color: white; padding: 0.25rem 0.5rem; border-radius: 3px; font-size: 0.75rem; font-weight: 700; margin-left: 0.5rem;">${formatOrderStatus(cart.status)}</span></div>
  </div>
  <div style="font-size: 0.85rem; color: var(--muted); margin-bottom: 0.4rem;">Order #${cart.id} â€¢ ${cart.timestamp}</div>
  <div style="font-size: 0.85rem; color: var(--muted); margin-bottom: 0.6rem;">ðŸ“ ${cart.location} | ðŸ“ž ${cart.phone}</div>
  <div style="font-size: 0.9rem; color: var(--dark); margin-bottom: 0.6rem;">${cart.items}</div>
  <div style="font-weight: 600; color: var(--dark);">Total: KES ${cart.total}</div>
`;
container.appendChild(card);
  });
}

async function handleLogin(event) {
  event.preventDefault();
  const password = document.getElementById('admin-password').value;
  if (password === ADMIN_PASSWORD) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'block';
    loadFoodMenuFromStorage();
    await loadAdminOrders();
    renderMenu();
    renderOrders();
    renderCartHistory();
    populateCategoryDatalist();
  } else {
document.getElementById('error-message').style.display = 'block';
document.getElementById('admin-password').value = '';
  }
}

function handleLogout() {
  document.getElementById('admin-password').value = '';
  document.getElementById('error-message').style.display = 'none';
  document.getElementById('dashboard-container').style.display = 'none';
  document.getElementById('login-container').style.display = 'grid';
}

function selectMenuItem(id) {
  selectedMenuId = id;
  renderMenu();
}

function getFilteredFoodMenu() {
  const query = menuSearchQuery.trim().toLowerCase();
  if (!query) return foodMenu;
  return foodMenu.filter(item => {
const name = (item.name || '').toLowerCase();
const category = (item.category || '').toLowerCase();
return name.includes(query) || category.includes(query);
  });
}

function renderMenu() {
  const container = document.getElementById('menu-container');
  const panel = document.getElementById('menu-edit-panel');
  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) searchInput.value = menuSearchQuery;
  container.innerHTML = '';

  if (!foodMenu.length) {
selectedMenuId = null;
panel.classList.add('hidden');
panel.innerHTML = '';
container.innerHTML = '<p class="empty-state" style="grid-column:1/-1">No menu items yet. Add foods from the catalog above.</p>';
return;
  }

  const filteredMenu = getFilteredFoodMenu();
  if (!filteredMenu.length) {
selectedMenuId = null;
panel.classList.add('hidden');
panel.innerHTML = '';
container.innerHTML = '<p class="empty-state" style="grid-column:1/-1">No menu items match your search. Clear the search to view all items.</p>';
return;
  }

  if (!selectedMenuId || !filteredMenu.some(item => String(item.id) === String(selectedMenuId))) {
selectedMenuId = filteredMenu[0].id;
  }

  filteredMenu.forEach(item => {
const imageSrc = resolveFoodImage(item);
const tile = document.createElement('button');
tile.type = 'button';
tile.className = 'menu-icon-tile' + (String(item.id) === String(selectedMenuId) ? ' active' : '');
tile.title = item.name;
tile.onclick = () => selectMenuItem(item.id);

const img = document.createElement('img');
img.id = `img-preview-${item.id}`;
img.src = imageSrc;
img.alt = item.name;
img.onerror = () => { img.src = DEFAULT_FOOD_IMAGE; };

const name = document.createElement('span');
name.className = 'menu-icon-name';
name.textContent = item.name;

const meta = document.createElement('span');
meta.className = 'menu-icon-meta';
meta.textContent = item.category || 'Specials';

const price = document.createElement('span');
price.className = 'menu-icon-price';
price.textContent = `KES ${item.price}`;

tile.append(img, name, meta, price);
container.appendChild(tile);
  });

  renderMenuEditPanel();
}

function renderMenuEditPanel() {
  const panel = document.getElementById('menu-edit-panel');
  const item = findMenuItem(selectedMenuId);
  if (!item) {
panel.classList.add('hidden');
return;
  }

  const imageSrc = resolveFoodImage(item);
  const categoryValue = item.category || 'Specials';
  panel.classList.remove('hidden');
  panel.innerHTML = `
<div class="menu-edit-header">
  <img id="edit-panel-img" src="${imageSrc}" alt="${item.name}" />
  <div>
    <h4>${item.name}</h4>
    <span class="menu-icon-meta">${categoryValue} Â· KES ${item.price}</span>
  </div>
</div>
<div class="menu-edit-fields">
  <label>Category
    <input type="text" list="food-category-list" value="${categoryValue}" data-category-id="${item.id}" />
  </label>
  <label>Price (KES)
    <input type="number" step="0.01" value="${item.price}" data-price-id="${item.id}" />
  </label>
  <label>Image URL
    <input type="url" value="${imageSrc}" data-url-id="${item.id}" />
  </label>
  <label>Upload photo
    <input type="file" accept="image/*" data-file-id="${item.id}" />
  </label>
</div>
<div class="menu-edit-actions">
  <button class="remove-btn" type="button" data-remove-id="${item.id}">Remove</button>
</div>
  `;

  const editImg = panel.querySelector('#edit-panel-img');
  editImg.onerror = () => { editImg.src = DEFAULT_FOOD_IMAGE; };

  panel.querySelector(`[data-category-id="${item.id}"]`).addEventListener('change', e => updateCategory(item.id, e.target.value));
  panel.querySelector(`[data-price-id="${item.id}"]`).addEventListener('change', e => updatePrice(item.id, e.target.value));
  panel.querySelector(`[data-url-id="${item.id}"]`).addEventListener('change', e => updateImageUrl(item.id, e.target.value));
  panel.querySelector(`[data-file-id="${item.id}"]`).addEventListener('change', e => updateImage(item.id, e));
  panel.querySelector(`[data-remove-id="${item.id}"]`).addEventListener('click', () => removeFood(item.id));
}

function updateImageUrl(id, url) {
  const item = findMenuItem(id);
  if (!item) return;
  item.image = url.trim() || getCatalogImage(item.name);
  renderMenu();
  saveMenuToLocalStorage();
}

function updateCategory(id, value) {
  const item = findMenuItem(id);
  if (!item) return;
  item.category = value.trim() || 'Specials';
  populateCategoryDatalist();
  renderMenu();
  saveMenuToLocalStorage();
}

function handleAddFood(event) {
  event.preventDefault();
  const nameInput = document.getElementById('new-food-name');
  const priceInput = document.getElementById('new-food-price');
  const categoryInput = document.getElementById('new-food-category');
  const imageUrlInput = document.getElementById('new-food-image-url');
  const imageFileInput = document.getElementById('new-food-image-file');

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const category = categoryInput.value.trim() || 'Specials';
  const imageUrl = imageUrlInput.value.trim();
  const file = imageFileInput.files[0];

  if (!name || Number.isNaN(price) || price < 0) {
alert('Please provide a valid food name and price.');
return;
  }

  const createItem = imageSrc => {
const newItem = {
  id: nextFoodId++,
  name,
  price: Math.round(price * 100) / 100,
  image: imageSrc || DEFAULT_FOOD_IMAGE,
  category
};
foodMenu.unshift(newItem);
selectedMenuId = newItem.id;
populateCategoryDatalist();
renderMenu();
 renderCatalogPick();
 renderWhereTo();
saveMenuToLocalStorage();
nameInput.value = '';
priceInput.value = '';
categoryInput.value = '';
imageUrlInput.value = '';
imageFileInput.value = '';
  };

  if (file) {
const reader = new FileReader();
reader.onload = function(evt) {
  createItem(evt.target.result);
};
reader.readAsDataURL(file);
  } else {
createItem(imageUrl || DEFAULT_FOOD_IMAGE);
document.getElementById('new-food-image-preview').hidden = true;
  }
}

function updatePrice(id, value) {
  const item = findMenuItem(id);
  if (!item) return;
  item.price = parseFloat(value) || item.price;
  renderMenu();
  saveMenuToLocalStorage();
}

function updateImage(id, event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
const item = findMenuItem(id);
if (!item) return;
item.image = evt.target.result;
renderMenu();
saveMenuToLocalStorage();
  };
  reader.readAsDataURL(file);
}

function removeFood(id) {
  const item = findMenuItem(id);
  if (!item) return;
  const confirmed = confirm(`Remove ${item.name} from the menu?`);
  if (!confirmed) return;
  foodMenu = foodMenu.filter(menu => String(menu.id) !== String(id));
  if (String(selectedMenuId) === String(id)) {
selectedMenuId = foodMenu[0]?.id ?? null;
  }
  populateCategoryDatalist();
  renderMenu();
  renderCatalogPick();
  renderWhereTo();
  saveMenuToLocalStorage();
}

function renderOrders() {
  const container = document.getElementById('orders-container');
  container.innerHTML = '';
  if (!activeOrders.length) {
container.innerHTML = '<p class="empty-state">No active food orders right now.</p>';
return;
  }
  activeOrders.forEach(order => {
const card = document.createElement('div');
card.className = 'order-card';
const whereTo = order.location ? `<div class="order-items" style="margin-bottom: 0.5rem;">ðŸ“ Deliver to: <strong>${order.location}</strong></div>` : '';
const statusLabel = order.status ? `<div style="font-size:0.85rem; color:var(--muted); margin-bottom:0.4rem;">Status: ${formatOrderStatus(order.status)}</div>` : '';
card.innerHTML = `
  <div class="order-top">
    <div><strong>${order.tableOrUser}</strong>${statusLabel}</div>
    <div><strong>KES ${order.total}</strong></div>
  </div>
  ${whereTo}
  <div class="order-items">${order.items}</div>
  <button class="deliver-btn" onclick="deliverOrder('${order.id}')">Mark as Delivered</button>
`;
container.appendChild(card);
  });
}

async function deliverOrder(orderId) {
  const order = activeOrders.find(o => String(o.id) === String(orderId));
  activeOrders = activeOrders.filter(o => String(o.id) !== String(orderId));
  if (order) {
const db = getSupabaseClient();
if (db) {
  try {
    const { error } = await db.from('orders').update({ status: 'delivered' }).eq('id', order.id);
    if (error) throw error;
  } catch (err) {
    console.warn('Failed to update order status in Supabase:', err);
  }
}
sentCarts.unshift({
  ...order,
  status: 'delivered',
  timestamp: new Date().toLocaleString()
});
  }
  renderOrders();
  renderCartHistory();
  alert(`Order #${orderId} marked as delivered.`);
}


