# 🍽 Savanna Bites — Restaurant Website

A modern, full-featured restaurant ordering website with M-Pesa payments and Supabase backend.

---

## 📁 File Structure

```
savanna-bites/
├── index.html              ← Home page (customer site)
├── admin.html              ← Admin dashboard
├── css/
│   ├── common.css          ← Shared fonts & resets
│   ├── home.css            ← Home page styles
│   └── admin.css           ← Admin page styles
├── js/
│   ├── config.js           ← Supabase & M-Pesa keys (home)
│   ├── home.js             ← Menu, cart, checkout (home)
│   └── admin.js            ← Menu management (admin)
├── pages/
│   └── README.md           ← Notes on page entry points
├── supabase_setup.sql      ← Database schema + seed data
├── .env.example            ← Environment variable template
└── README.md
```

---

## 🚀 Quick Start (No Backend Needed)

You can open `index.html` directly in a browser right now.
It runs on **demo data** until you connect Supabase.

---

## 🗄 Step 1: Connect Supabase

### A. Create a Supabase project
1. Go to [https://supabase.com](https://supabase.com) and sign up (free)
2. Click **New Project**, name it `savanna-bites`
3. Choose a strong database password and a region close to Kenya (e.g. Europe West)

### B. Run the SQL setup
1. In your Supabase dashboard, go to **SQL Editor → New Query**
2. Paste the entire contents of `supabase_setup.sql`
3. Click **Run** — this creates all tables and inserts sample menu items

### C. Get your API keys
1. Go to **Settings → API** in your Supabase dashboard
2. Copy:
   - `Project URL` → your `SUPABASE_URL`
   - `anon / public` key → your `SUPABASE_ANON_KEY`

### D. Update js/config.js
Open `js/config.js` and set your keys (or use `.env` with a build step in production):
```js
const SUPABASE_URL      = 'https://your-project-ref.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

---

## 📱 Step 2: Configure M-Pesa (Daraja API)

### A. Register on Safaricom Developer Portal
1. Go to [https://developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Sign up and create a new **app**
3. Select the **Lipa Na M-Pesa Sandbox** product

### B. Get your credentials
From your app's dashboard, copy:
- `Consumer Key`
- `Consumer Secret`
- `Passkey` (from Lipa Na M-Pesa → Sandbox credentials)

### C. Update js/config.js
```js
const MPESA_CONFIG = {
  consumerKey:    'YOUR_CONSUMER_KEY',
  consumerSecret: 'YOUR_CONSUMER_SECRET',
  shortcode:      '174379',          // Sandbox shortcode (keep as is for testing)
  passkey:        'YOUR_PASSKEY',
  callbackUrl:    'https://your-domain.com/api/mpesa-callback',
  baseUrl:        'https://sandbox.safaricom.co.ke',  // Change for production
};
```

### D. Test with sandbox
Use the test phone number: `254708374149` in sandbox mode.
M-Pesa will simulate the STK Push without real money.

### ⚠️ Production Security Warning
**Never expose `consumerSecret` on the frontend for production.**
Instead, create a backend proxy:
- **Supabase Edge Function** (recommended — stays in your stack)
- **Vercel API Route** (`/api/mpesa.js`)
- **Node.js/Express server**

Your backend should:
1. Receive `{ phone, amount }` from the frontend
2. Generate the OAuth token using your credentials
3. Call the Daraja STK Push endpoint
4. Return `{ CheckoutRequestID }` to the frontend
5. Receive the payment callback from Safaricom at your `callbackUrl`
6. Update the order `status` to `'paid'` and save the `mpesa_code`

---

## 🌐 Step 3: Deploy (Optional)

### Option A: Netlify (Easiest — Free)
1. Go to [https://netlify.com](https://netlify.com)
2. Drag & drop your entire `restaurant/` folder
3. Done! Your site is live in seconds.

### Option B: Vercel
```bash
npm i -g vercel
cd restaurant/
vercel
```

### Option C: GitHub Pages
1. Push your files to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Your site is live at `https://yourusername.github.io/repo-name`

---

## 🛢 Database Schema Reference

### `menu`
| Column      | Type      | Notes                    |
|-------------|-----------|--------------------------|
| id          | uuid      | Primary key, auto-gen    |
| name        | text      | Food item name           |
| description | text      | Short description        |
| price       | numeric   | Price in KES             |
| category    | text      | e.g. Grills, Seafood     |
| image_url   | text      | Unsplash or your CDN URL |
| available   | boolean   | Show/hide on menu        |
| created_at  | timestamp | Auto-set                 |

### `orders`
| Column        | Type      | Notes                             |
|---------------|-----------|-----------------------------------|
| id            | uuid      | Primary key                       |
| customer_name | text      | Customer's full name              |
| phone         | text      | e.g. +254712345678                |
| location      | text      | Delivery address                  |
| notes         | text      | Optional special instructions     |
| total_amount  | numeric   | Including delivery fee            |
| status        | text      | pending / paid / delivered, etc.  |
| mpesa_code    | text      | Transaction ID from Daraja        |
| created_at    | timestamp | Auto-set                          |

### `order_items`
| Column   | Type    | Notes                       |
|----------|---------|-----------------------------|
| id       | uuid    | Primary key                 |
| order_id | uuid    | FK → orders.id              |
| menu_id  | uuid    | FK → menu.id                |
| quantity | integer | Units ordered               |
| price    | numeric | Price at time of order      |

---

## 🎨 Customisation

### Change restaurant name
Search and replace `Savanna Bites` in `index.html` and `js/home.js`.

### Change colours
Edit CSS variables at the top of `css/home.css`:
```css
:root {
  --clr-gold:  #d4963a;  /* Accent colour */
  --clr-bg:    #0d0b08;  /* Background    */
  ...
}
```

### Add menu categories
Just add items with new `category` values in Supabase — filter buttons are generated automatically.

### Add your own images
Replace `image_url` values in the database with your own images.
Recommended: upload to Supabase Storage and use those public URLs.

---

## ❓ Troubleshooting

| Problem | Fix |
|---------|-----|
| Menu doesn't load | Check browser console; verify Supabase URL/key |
| M-Pesa says invalid credentials | Double-check consumerKey/Secret from Daraja portal |
| STK Push not received | Use sandbox test number `254708374149` |
| CORS errors on M-Pesa | Move token generation to a backend proxy |
| Images not showing | Check image URLs are publicly accessible |

---

## 📞 Support

Built with ❤️ for Kenyan restaurants. For help, open an issue or contact your developer.
