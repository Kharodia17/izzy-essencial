import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useProducts } from "../hooks/useProducts.js";
import { logout } from "../firebase/auth.js";
import ProductTable from "../components/admin/ProductTable.jsx";
import LoadingSpinner from "../components/shared/LoadingSpinner.jsx";

export default function Dashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { products, loading } = useProducts();

  return (
    <div className="min-h-screen bg-background">
      {/* Admin topbar */}
      <header className="bg-surface-container-lowest border-b border-outline-variant">
        <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-headline-md text-primary">Izzy</span>
            <span className="font-label text-label-md text-on-surface-variant">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="font-label text-label-md text-on-surface-variant hover:text-primary transition-colors hidden sm:block">
              {t.backToStore}
            </Link>
            <span className="font-label text-label-md text-on-surface-variant hidden sm:block">{user?.email}</span>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-surface-container text-on-surface-variant font-label text-label-md transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span className="hidden sm:inline">{t.logout}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "inventory_2", label: t.products, value: products.length },
            { icon: "check_circle", label: t.inStock, value: products.filter((p) => p.inStock).length },
            { icon: "star", label: t.featured, value: products.filter((p) => p.featured).length },
            { icon: "block", label: t.outOfStock, value: products.filter((p) => !p.inStock).length },
          ].map((s) => (
            <div key={s.label} className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[20px] text-primary">{s.icon}</span>
                <span className="font-label text-label-md text-on-surface-variant">{s.label}</span>
              </div>
              <p className="font-display text-headline-lg text-on-surface">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-on-primary font-label text-label-md hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            {t.addProduct}
          </Link>
          <Link
            to="/admin/categories"
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-surface-container text-on-surface font-label text-label-md hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">category</span>
            {t.manageCategories}
          </Link>
        </div>

        {/* Products table */}
        <div>
          <h2 className="font-display text-headline-md text-on-surface mb-4">{t.products}</h2>
          {loading ? <LoadingSpinner /> : <ProductTable products={products} />}
        </div>
      </main>
    </div>
  );
}
