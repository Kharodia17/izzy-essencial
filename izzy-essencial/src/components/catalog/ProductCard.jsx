import { useLanguage } from "../../context/LanguageContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

function buildWhatsappUrl(product, t) {
  const number = "+258000000000";
  const msg = t.whatsappMessage
    .replace("{name}", product.name)
    .replace("{price}", product.price);
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

export default function ProductCard({ product, onClick }) {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  return (
    <div
      onClick={() => onClick(product)}
      className="bg-surface-container-lowest rounded-xl shadow-card hover:shadow-card-hover hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-200 cursor-pointer overflow-hidden"
    >
      <div className="relative h-44 bg-surface-container">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[56px] text-outline-variant">inventory_2</span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-error text-on-error font-label text-label-md px-3 py-1 rounded-full">
              {t.outOfStock}
            </span>
          </div>
        )}
        {product.featured && product.inStock && (
          <span className="absolute top-2 left-2 bg-tertiary-container text-on-tertiary-container font-label text-[11px] px-2 py-0.5 rounded-full">
            {t.featured}
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2">
        {/* Bilingual name — always show both like stitch design */}
        <div>
          <p className="font-body font-semibold text-[15px] text-on-surface leading-tight line-clamp-1">
            {product.name}
          </p>
          {product.nameEn && (
            <p className="text-[12px] text-on-surface-variant leading-tight line-clamp-1 mt-0.5">
              {product.nameEn}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-[17px] text-primary">
            {product.price?.toLocaleString()} MT
          </span>
          {product.inStock && (
            <span className="bg-secondary-container text-on-secondary-container font-label text-[11px] px-2 py-0.5 rounded-full">
              {t.inStock}
            </span>
          )}
        </div>

        <a
          href={buildWhatsappUrl(product, t)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg border-2 border-secondary text-secondary font-label text-[13px] hover:bg-secondary hover:text-on-secondary transition-colors"
        >
          <span className="material-symbols-outlined text-[15px]">chat</span>
          {t.orderWhatsapp}
        </a>
      </div>
    </div>
  );
}
