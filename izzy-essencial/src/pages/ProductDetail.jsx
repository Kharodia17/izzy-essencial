import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { getProduct } from "../firebase/products.js";
import LoadingSpinner from "../components/shared/LoadingSpinner.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id).then((p) => { setProduct(p); setLoading(false); });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <span className="material-symbols-outlined text-[64px] text-outline-variant">sentiment_dissatisfied</span>
      <p className="font-body text-body-lg text-on-surface-variant">Product not found</p>
      <Link to="/catalog" className="text-primary hover:underline font-label text-label-md">{t.catalog}</Link>
    </div>
  );

  const displayName = lang === "en" && product.nameEn ? product.nameEn : product.name;
  const number = "+258000000000";
  const msg = t.whatsappMessage.replace("{name}", product.name).replace("{price}", product.price);
  const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-8 pb-24 md:pb-8">
      <Link to="/catalog" className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary font-label text-label-md mb-6 transition-colors">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        {t.catalog}
      </Link>

      <div className="bg-surface-container-lowest rounded-xl shadow-card overflow-hidden">
        <div className="h-72 md:h-96 bg-surface-container">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[96px] text-outline-variant">inventory_2</span>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 space-y-4">
          <div>
            <h1 className="font-display text-headline-lg text-on-surface">{displayName}</h1>
            {lang === "en" && product.nameEn && (
              <p className="text-body-md text-on-surface-variant mt-1">{product.name}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-display text-headline-xl text-primary">MT {product.price?.toLocaleString()}</span>
            <span className={`font-label text-label-md px-3 py-1 rounded-full ${
              product.inStock ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"
            }`}>
              {product.inStock ? t.inStock : t.outOfStock}
            </span>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-lg bg-secondary text-on-secondary font-label text-label-md text-body-lg hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[22px]">chat</span>
            {t.orderWhatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}
