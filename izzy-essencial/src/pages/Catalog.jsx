import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useProducts } from "../hooks/useProducts.js";
import { useCategories } from "../hooks/useCategories.js";
import SearchBar from "../components/catalog/SearchBar.jsx";
import CategoryFilter from "../components/catalog/CategoryFilter.jsx";
import ProductGrid from "../components/catalog/ProductGrid.jsx";
import ProductModal from "../components/catalog/ProductModal.jsx";
import LoadingSpinner from "../components/shared/LoadingSpinner.jsx";
import Footer from "../components/shared/Footer.jsx";

export default function Catalog() {
  const { t } = useLanguage();
  const { products, loading } = useProducts();
  const { categories } = useCategories();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [selected, setSelected] = useState(null);

  // Sync category from URL param when navigating from home
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) || (p.nameEn && p.nameEn.toLowerCase().includes(q))
      );
    }
    return list;
  }, [products, activeCategory, search]);

  return (
    <div className="pb-24 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 md:px-margin-desktop py-5 md:py-8">
        {/* Sticky filter bar on mobile */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm pb-3 pt-1 -mx-4 px-4 md:static md:bg-transparent md:backdrop-blur-none md:mx-0 md:px-0 md:pb-0">
          <div className="space-y-3">
            <SearchBar value={search} onChange={setSearch} />
            <CategoryFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />
          </div>
        </div>

        {/* Result count */}
        {!loading && (
          <div className="flex items-center justify-between mt-4 mb-3">
            <h1 className="font-display font-bold text-headline-md text-on-surface">{t.catalog}</h1>
            <span className="font-label text-label-md text-on-surface-variant">
              {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
            </span>
          </div>
        )}

        {loading ? <LoadingSpinner /> : <ProductGrid products={filtered} onSelect={setSelected} />}
      </div>

      <Footer />

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
