// scripts/seed.js
// Run once to populate Firestore with initial categories and sample products
// Usage: node scripts/seed.js
//
// BEFORE RUNNING:
// 1. npm install firebase-admin
// 2. Download service account key from Firebase Console → Project Settings → Service Accounts
// 3. Save as scripts/serviceAccountKey.json
// 4. Update WHATSAPP_NUMBER below

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const WHATSAPP_NUMBER = "+258XXXXXXXXX"; // ← UPDATE THIS

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const categories = [
  { id: "limpeza",   name: "Limpeza",         nameEn: "Cleaning",      icon: "cleaning_services", chipColor: "bg-secondary-container text-on-secondary-container", order: 1 },
  { id: "mercearia", name: "Mercearia",        nameEn: "Groceries",     icon: "grocery",           chipColor: "bg-tertiary-container text-on-tertiary-container",   order: 2 },
  { id: "gerais",    name: "Artigos Gerais",   nameEn: "General Items", icon: "inventory_2",       chipColor: "bg-surface-container-high text-on-surface",          order: 3 },
  { id: "promocoes", name: "Promoções",        nameEn: "Promotions",    icon: "local_offer",       chipColor: "bg-tertiary-container text-on-tertiary-container",   order: 4 },
];

const products = [
  { name: "Arroz Branco 5kg",              nameEn: "White Rice 5kg",                   category: "mercearia", price: 450, currency: "MT", imageUrl: "", inStock: true,  featured: true  },
  { name: "Detergente Roupa 2L",           nameEn: "Laundry Detergent 2L",             category: "limpeza",   price: 280, currency: "MT", imageUrl: "", inStock: true,  featured: false },
  { name: "Óleo Alimentar 1L",             nameEn: "Cooking Oil 1L",                   category: "mercearia", price: 150, currency: "MT", imageUrl: "", inStock: true,  featured: true  },
  { name: "Desinfetante Multiusos 500ml",  nameEn: "Multi-purpose Disinfectant 500ml", category: "limpeza",   price: 120, currency: "MT", imageUrl: "", inStock: false, featured: false },
  { name: "Açúcar Branco 2kg",             nameEn: "White Sugar 2kg",                  category: "mercearia", price: 180, currency: "MT", imageUrl: "", inStock: true,  featured: false },
  { name: "Sabão em Pó 1kg",               nameEn: "Washing Powder 1kg",               category: "limpeza",   price: 95,  currency: "MT", imageUrl: "", inStock: true,  featured: false },
];

const settings = {
  storeName: "Izzy Essencial",
  whatsappNumber: WHATSAPP_NUMBER,
  languages: ["pt", "en"],
  defaultLanguage: "pt",
  hours: "08:00 - 20:00",
};

async function seed() {
  console.log("🌱 Seeding Firestore...");
  await db.collection("settings").doc("general").set(settings);
  console.log("✅ Settings seeded");

  const catBatch = db.batch();
  categories.forEach(({ id, ...data }) => {
    catBatch.set(db.collection("categories").doc(id), { ...data, createdAt: admin.firestore.FieldValue.serverTimestamp() });
  });
  await catBatch.commit();
  console.log(`✅ ${categories.length} categories seeded`);

  const prodBatch = db.batch();
  products.forEach((product) => {
    prodBatch.set(db.collection("products").doc(), { ...product, createdAt: admin.firestore.FieldValue.serverTimestamp(), updatedAt: admin.firestore.FieldValue.serverTimestamp() });
  });
  await prodBatch.commit();
  console.log(`✅ ${products.length} products seeded`);

  console.log("🎉 Seed complete.");
  process.exit(0);
}

seed().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
