import { useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";

function buildWhatsappUrl(product, t) {
  const number = "+258000000000";
  const msg = t.whatsappMessage
    .replace("{name}", product.name)
    .replace("{price}", product.price);
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

export default function ProductModal({ product, onClose }) {
  const { t, lang } = useLanguage();

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!product) return null;

  const displayName = lang === "en" && product.nameEn ? product.nameEn : product.name;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      {/* Sheet slides up from bottom on mobile, centered dialog on sm+ */}
      <div
        className="bg-surface-container-lowest w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-outline-variant" />
        </div>

        {/* Image */}
        <div className="relative h-52 sm:h-60 bg-surface-container flex-shrink-0">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[72px] text-outline-variant">inventory_2</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-surface-container-lowest/80 backdrop-blur-sm rounded-full p-1.5 hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface">close</span>
          </button>
        </div>

        {/* Content — scrollable if tall */}
        <div className="p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto">
          <div>
            <h2 className="font-display font-bold text-[20px] text-on-surface">{displayName}</h2>
            {lang === "en" && product.nameEn && product.name !== product.nameEn && (
              <p className="text-body-md text-on-surface-variant mt-0.5">{product.name}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-[28px] text-primary">
              MT {product.price?.toLocaleString()}
            </span>
            <span className={`font-label text-label-md px-3 py-1 rounded-full ${
              product.inStock
                ? "bg-secondary-container text-on-secondary-container"
                : "bg-error-container text-on-error-container"
            }`}>
              {product.inStock ? t.inStock : t.outOfStock}
            </span>
          </div>

          <a
            href={buildWhatsappUrl(product, t)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-secondary text-on-secondary font-label text-label-md hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">chat</span>
            {t.orderWhatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}
