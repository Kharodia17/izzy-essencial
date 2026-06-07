# Izzy Essencial — Claude Code Context

## Project Overview
Izzy Essencial is a convenience/essentials e-commerce platform based in **Mozambique**.
- Bilingual: Portuguese (primary) + English
- Target: multi-generational, multi-lingual audience
- Phase 1: Product catalog + admin dashboard (no checkout yet)
- Phase 2: Add cart, checkout, M-Pesa/Stripe payments

## Stack
| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS (custom config — see below) |
| Routing | React Router v6 |
| State | React Context + useReducer |
| Database | Firebase Firestore |
| Auth | Firebase Auth (email/password) |
| Storage | Firebase Storage (product images) |
| Hosting | Firebase Hosting (Blaze plan) |
| Language | JavaScript (no TypeScript) |

## Firebase Project
- Create a new Firebase project: `izzy-essencial`
- Enable: Firestore, Auth (email/password), Storage, Hosting
- Blaze (pay-as-you-go) plan required for hosting

## Firestore Collections

```
/products
  {productId}
    name: string          // Portuguese name e.g. "Arroz Branco 5kg"
    nameEn: string        // English name e.g. "White Rice 5kg"
    category: string      // category ID e.g. "limpeza"
    price: number         // in Meticais (MT) e.g. 450
    currency: "MT"
    imageUrl: string      // Firebase Storage URL
    inStock: boolean
    featured: boolean
    createdAt: timestamp
    updatedAt: timestamp

/categories
  {categoryId}
    name: string          // Portuguese e.g. "Limpeza"
    nameEn: string        // English e.g. "Cleaning"
    icon: string          // Material Symbol name e.g. "cleaning_services"
    chipColor: string     // Tailwind class e.g. "bg-secondary-container"
    order: number         // display order

/settings
  general
    storeName: "Izzy Essencial"
    whatsappNumber: string  // "+258..."
    languages: ["pt", "en"]
```

## Project Structure

```
/src
  /components
    /catalog
      ProductGrid.jsx       — responsive card grid
      ProductCard.jsx       — single product card
      CategoryFilter.jsx    — horizontal chip filter bar
      SearchBar.jsx         — client-side instant search
      ProductModal.jsx      — detail overlay
    /admin
      ProductForm.jsx       — add/edit form
      ProductTable.jsx      — list view with search
      ImageUploader.jsx     — drag-drop to Firebase Storage
      CategoryManager.jsx   — add/reorder categories
    /shared
      Navbar.jsx            — top app bar with lang switcher
      BottomNav.jsx         — mobile bottom navigation
      LanguageSwitcher.jsx  — EN/PT toggle
      LoadingSpinner.jsx
      ProtectedRoute.jsx    — wraps admin routes

  /context
    CartContext.jsx         — WIRE UP NOW even though cart is empty Phase 1
    LanguageContext.jsx     — PT/EN, persisted in localStorage
    AuthContext.jsx         — Firebase Auth state

  /pages
    Home.jsx               — hero + category bento grid
    Catalog.jsx            — full product grid + filters
    ProductDetail.jsx      — single product page
    Login.jsx              — admin login
    Dashboard.jsx          — admin home (protected)
    AddProduct.jsx         — admin add product (protected)
    EditProduct.jsx        — admin edit product (protected)

  /firebase
    config.js              — Firebase app init
    products.js            — Firestore CRUD for products
    categories.js          — Firestore CRUD for categories
    storage.js             — image upload to Firebase Storage
    auth.js                — sign in / sign out / onAuthStateChanged

  /translations
    pt.js                  — Portuguese strings
    en.js                  — English strings

  /hooks
    useProducts.js         — real-time Firestore products listener
    useCategories.js       — real-time categories listener
    useLanguage.js         — convenience hook for LanguageContext

  App.jsx
  main.jsx
```

## Design System

### Colors (Tailwind custom config)
All colors are already defined in tailwind.config.js — use semantic names:

```
primary: #006388          — primary actions, active states, brand
on-primary: #ffffff       — text on primary
primary-container: #187da8
on-primary-container: #fcfcff
secondary: #106d39        — freshness, produce, success
on-secondary: #ffffff
secondary-container: #9df3b1
on-secondary-container: #18713d
tertiary: #745b00         — gold, value callouts, promotions
tertiary-container: #cda72b
background: #f9f9ff       — main background
surface: #f9f9ff
surface-container: #e7eeff
surface-container-low: #f0f3ff
surface-container-high: #dee9ff
on-surface: #001c3b       — primary text
on-surface-variant: #3f484e
outline: #6f787f
outline-variant: #bfc8cf
error: #ba1a1a
```

### Typography
```
font-family: Plus Jakarta Sans (display, body)
font-family: Inter (labels, UI)

headline-xl:  48px/56px, weight 800, tracking -0.02em  (Plus Jakarta Sans)
headline-lg:  32px/40px, weight 700, tracking -0.01em
headline-md:  24px/32px, weight 700
body-lg:      18px/28px, weight 400
body-md:      16px/24px, weight 400
label-md:     14px/20px, weight 600                     (Inter)
headline-lg-mobile: 28px/36px, weight 700
```

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap
```

Material Symbols Outlined (icons):
```
https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap
```

### Spacing (8px base grid)
```
xs: 4px   | base: 8px  | sm: 12px
md: 24px  | lg: 48px   | xl: 80px
gutter: 24px
margin-mobile: 16px
margin-desktop: 64px
```

### Border Radius
```
sm: 4px    | DEFAULT: 8px  | md: 12px
lg: 16px   | xl: 24px      | full: 9999px

Buttons & inputs: 8px (rounded-lg)
Product cards: 16px (rounded-xl)
Icon containers: full (rounded-full)
```

### Elevation / Shadows
```css
/* Level 1 — cards */
box-shadow: 0 4px 12px -2px rgba(30, 58, 95, 0.15);

/* Level 2 — hover state */
box-shadow: 0 8px 20px -2px rgba(30, 58, 95, 0.2);
transform: translateY(-2px);

/* Overlay — modals */
backdrop-filter: blur(12px);
background: rgba(0, 0, 0, 0.4);
```

### Key UI Patterns
```css
/* Hero gradient */
background: radial-gradient(circle at top right, #c5e7ff 0%, #f9f9ff 70%);

/* Glass card */
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.3);

/* Product card shadow */
box-shadow: 0 4px 12px -2px rgba(30, 58, 95, 0.15);
```

## Component Specs

### ProductCard
- Card: white bg, rounded-xl (16px), Level 1 shadow
- Image: top 60% of card, object-cover
- Bottom 40%: name (PT primary, EN secondary), price in MT, "Add" button (outlined green)
- In stock badge: secondary-container pill
- WhatsApp CTA button: opens wa.me link with product name pre-filled
- Hover: Level 2 shadow, translateY(-2px)

### CategoryFilter
- Horizontal scroll, no scrollbar visible
- Active chip: bg-primary text-on-primary
- Inactive chip: bg-surface-container text-on-surface
- "Todos" (All) chip always first
- Cleaning: light green tint (secondary-container)
- Promotions: light gold tint (tertiary-container)

### ProductModal
- Backdrop blur overlay
- White card, rounded-xl, max-w-md
- Image top, details below
- Price in MT (large, primary color)
- "Encomendar via WhatsApp" primary button
- Close on backdrop click or X button

### Admin ProductForm
- Fields: Name PT, Name EN, Category (select), Price (MT), In Stock (toggle), Featured (toggle)
- Image: drag-drop uploader → Firebase Storage → saves URL to Firestore
- Validation: all fields required except nameEn
- Submit: saves to Firestore, redirects to Dashboard

### LanguageSwitcher
- Toggle button in Navbar: shows "PT | EN"
- Clicking switches active language
- Persists in localStorage key: `izzy_lang`
- Default: "pt"

## Bilingual Implementation

All user-facing strings must support PT/EN. Pattern:

```jsx
// translations/pt.js
export const pt = {
  catalog: "Catálogo",
  allCategories: "Todos",
  orderWhatsapp: "Encomendar via WhatsApp",
  inStock: "Em Stock",
  outOfStock: "Esgotado",
  // ...
}

// translations/en.js
export const en = {
  catalog: "Catalog",
  allCategories: "All",
  orderWhatsapp: "Order via WhatsApp",
  inStock: "In Stock",
  outOfStock: "Out of Stock",
  // ...
}

// Usage
const { t } = useLanguage(); // returns correct translation object
<span>{t.catalog}</span>
```

Product names: show `product.name` (PT) by default, `product.nameEn` when language is "en".

## WhatsApp CTA

Format for WhatsApp order link:
```javascript
const whatsappNumber = "+258XXXXXXXXX"; // from Firestore /settings/general
const message = encodeURIComponent(`Olá! Gostaria de encomendar: ${product.name} - MT ${product.price}`);
const url = `https://wa.me/${whatsappNumber}?text=${message}`;
```

## Navigation Structure

### Public (catalog)
```
/              → Home.jsx
/catalog       → Catalog.jsx
/product/:id   → ProductDetail.jsx
```

### Admin (protected — Firebase Auth required)
```
/admin/login       → Login.jsx
/admin             → Dashboard.jsx
/admin/products/new     → AddProduct.jsx
/admin/products/:id/edit → EditProduct.jsx
/admin/categories  → CategoryManager.jsx
```

## Seed Data

### Sample categories to seed Firestore:
```javascript
[
  { id: "limpeza", name: "Limpeza", nameEn: "Cleaning", icon: "cleaning_services", chipColor: "bg-secondary-container text-on-secondary-container", order: 1 },
  { id: "mercearia", name: "Mercearia", nameEn: "Groceries", icon: "grocery", chipColor: "bg-tertiary-container text-on-tertiary-container", order: 2 },
  { id: "gerais", name: "Artigos Gerais", nameEn: "General Items", icon: "inventory_2", chipColor: "bg-surface-container-high text-on-surface", order: 3 },
  { id: "promocoes", name: "Promoções", nameEn: "Promotions", icon: "local_offer", chipColor: "bg-tertiary-container text-on-tertiary-container", order: 4 },
]
```

### Sample products to seed Firestore:
```javascript
[
  { name: "Arroz Branco 5kg", nameEn: "White Rice 5kg", category: "mercearia", price: 450, currency: "MT", inStock: true, featured: true },
  { name: "Detergente Roupa 2L", nameEn: "Laundry Detergent 2L", category: "limpeza", price: 280, currency: "MT", inStock: true, featured: false },
  { name: "Óleo Alimentar 1L", nameEn: "Cooking Oil 1L", category: "mercearia", price: 150, currency: "MT", inStock: true, featured: true },
  { name: "Desinfetante Multiusos", nameEn: "Multi-purpose Disinfectant", category: "limpeza", price: 120, currency: "MT", inStock: false, featured: false },
]
```

## Phase 2 Notes (do not build now, but design for it)

- `CartContext.jsx` must be wired up from Phase 1 even if the cart UI is hidden
- Each ProductCard gets an "Add to Cart" handler that calls `addToCart(product)` — noop in Phase 1
- Firestore products schema already includes `stock: number` field for inventory management
- Payment gateway: M-Pesa (via Paynow MZ or direct API) + Stripe for card payments
- Orders collection: `/orders/{orderId}` with items[], total, status, userId, createdAt
- Cloud Functions needed for: order confirmation email, stock decrement on order

## Build Order

1. Firebase project setup + config.js
2. Tailwind config with full design token set
3. LanguageContext + translations (pt.js, en.js)
4. AuthContext + Firebase Auth
5. Firestore hooks (useProducts, useCategories)
6. Shared components (Navbar, BottomNav, LanguageSwitcher)
7. Public catalog: Home → Catalog → ProductModal
8. Admin: Login → Dashboard → AddProduct/EditProduct
9. Seed Firestore with sample data
10. Firebase Hosting deploy

## Key Rules

- NEVER hardcode Portuguese-only strings — always use translation keys
- NEVER use localStorage for product data — always Firestore
- ALWAYS show price as `MT ${price}` format
- ALWAYS include WhatsApp CTA on every product
- CartContext must exist from day one even if empty
- Admin routes must be protected — redirect to /admin/login if not authenticated
- Images must go to Firebase Storage — never external URLs in production
