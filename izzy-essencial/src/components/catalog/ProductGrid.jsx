import { useLanguage } from "../../context/LanguageContext.jsx";
import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, onSelect }) {
  const { t } = useLanguage();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-on-surface-variant">
        <span className="material-symbols-outlined text-[56px]">search_off</span>
        <p className="font-body text-body-lg">{t.noProducts}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onClick={onSelect} />
      ))}
    </div>
  );
}
