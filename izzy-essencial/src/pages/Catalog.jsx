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

      {/* Footer */}
      <footer className="px-4 md:px-margin-desktop py-8 border-t border-outline-variant mt-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Izzy Essencial" className="w-8 h-8 object-contain rounded-full" />
            <span className="font-display font-bold text-[15px] text-on-surface">Izzy Essencial</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 font-label text-label-md text-on-surface-variant">
            <span>{t.contacts}</span>
            <span>{t.hours}</span>
            <a href="/location" className="hover:text-primary">{t.location}</a>
            <a href="#" className="hover:text-primary">{t.terms}</a>
          </div>
          <p className="font-label text-label-md text-on-surface-variant">{t.copyright}</p>
        </div>
      </footer>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
