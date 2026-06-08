import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [ready, setReady]       = useState(false);
  const [visible, setVisible]   = useState(false);

  // Animate in
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 10);
    const t2 = setTimeout(() => setReady(true), 0);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Animate out then call onClose
  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 260);
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  if (!product) return null;

  const displayName = lang === "en" && product.nameEn ? product.nameEn : product.name;

  return createPortal(
    /* Backdrop */
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        backdropFilter: "blur(8px)",
        background: `rgba(0,0,0,${visible ? 0.55 : 0})`,
        transition: "background 0.25s ease",
      }}
      onClick={ready ? handleClose : undefined}
    >
      {/* Modal card */}
      <div
        className="relative bg-surface-container-lowest w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        style={{
          maxHeight: "90vh",
          transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.28s cubic-bezier(.22,.68,0,1.2), opacity 0.25s ease",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 bg-black/30 backdrop-blur-sm rounded-full p-1.5 hover:bg-black/50 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px] text-white">close</span>
        </button>

        {/* Image */}
        <div className="relative w-full bg-surface-container" style={{ height: "52vw", maxHeight: "240px", minHeight: "180px" }}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[72px] text-outline-variant">inventory_2</span>
            </div>
          )}
          {/* Category / featured badge */}
          {product.featured && product.inStock && (
            <span className="absolute top-3 left-3 bg-tertiary-container text-on-tertiary-container font-label text-[11px] px-2.5 py-1 rounded-full shadow-sm">
              ★ {t.featured}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 overflow-y-auto">
          {/* Name */}
          <div>
            <h2 className="font-display font-bold text-[22px] leading-tight text-on-surface">{displayName}</h2>
            {lang === "en" && product.nameEn && product.name !== product.nameEn && (
              <p className="text-body-md text-on-surface-variant mt-0.5">{product.name}</p>
            )}
          </div>

          {/* Price + stock */}
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-[30px] text-primary leading-none">
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

          {/* WhatsApp CTA */}
          <a
            href={buildWhatsappUrl(product, t)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-secondary text-on-secondary font-label text-label-md hover:opacity-90 active:scale-[0.98] transition-all shadow-card"
          >
            <span className="material-symbols-outlined text-[22px]">chat</span>
            {t.orderWhatsapp}
          </a>

          {/* Dismiss hint */}
          <p className="text-center font-label text-[11px] text-on-surface-variant/50">
            {lang === "pt" ? "Toque fora para fechar" : "Tap outside to close"}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
