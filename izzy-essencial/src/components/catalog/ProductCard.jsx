import { useLanguage } from "../../context/LanguageContext.jsx";

function buildWhatsappUrl(product, t) {
  const number = "+258000000000";
  const msg = t.whatsappMessage
    .replace("{name}", product.name)
    .replace("{price}", product.price);
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

export default function ProductCard({ product, onClick }) {
  const { t, lang } = useLanguage();

  const displayName = lang === "en" && product.nameEn ? product.nameEn : product.name;

  return (
    <div
      onClick={() => onClick(product)}
      className="bg-surface-container-lowest rounded-xl shadow-card hover:shadow-card-hover hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-200 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative h-36 md:h-44 bg-surface-container flex-shrink-0">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={displayName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[48px] md:text-[56px] text-outline-variant">inventory_2</span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-error text-on-error font-label text-[11px] md:text-label-md px-2 py-0.5 rounded-full">
              {t.outOfStock}
            </span>
          </div>
        )}
        {product.featured && product.inStock && (
          <span className="absolute top-2 left-2 bg-tertiary-container text-on-tertiary-container font-label text-[10px] md:text-[11px] px-2 py-0.5 rounded-full">
            ★ {t.featured}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5 md:p-3 flex flex-col gap-1.5 flex-1">
        <div>
          <p className="font-body font-semibold text-[13px] md:text-[15px] text-on-surface leading-tight line-clamp-2">
            {displayName}
          </p>
          {lang === "en" && product.nameEn && product.name !== product.nameEn && (
            <p className="text-[11px] text-on-surface-variant leading-tight line-clamp-1 mt-0.5">{product.name}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-display font-bold text-[15px] md:text-[17px] text-primary">
            {product.price?.toLocaleString()} MT
          </span>
          {product.inStock && (
            <span className="bg-secondary-container text-on-secondary-container font-label text-[10px] px-1.5 py-0.5 rounded-full hidden sm:block">
              {t.inStock}
            </span>
          )}
        </div>

        {/* WhatsApp button — icon + short text on mobile, full text on md+ */}
        <a
          href={buildWhatsappUrl(product, t)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-1 w-full py-2 md:py-2 rounded-lg border-2 border-secondary text-secondary font-label text-[11px] md:text-[13px] hover:bg-secondary hover:text-on-secondary active:scale-95 transition-all mt-1"
        >
          <span className="material-symbols-outlined text-[14px] md:text-[15px]">chat</span>
          <span className="hidden md:inline">{t.orderWhatsapp}</span>
          <span className="md:hidden">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
