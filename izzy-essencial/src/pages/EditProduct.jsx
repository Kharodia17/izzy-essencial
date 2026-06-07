import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { getProduct } from "../firebase/products.js";
import ProductForm from "../components/admin/ProductForm.jsx";
import LoadingSpinner from "../components/shared/LoadingSpinner.jsx";

export default function EditProduct() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id).then((p) => { setProduct(p); setLoading(false); });
  }, [id]);

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-surface-container-lowest border-b border-outline-variant mb-8">
        <div className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop h-16 flex items-center gap-4">
          <Link to="/admin" className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </Link>
          <h1 className="font-display text-headline-md text-on-surface">{t.editProduct}</h1>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop">
        {loading ? <LoadingSpinner /> : product ? <ProductForm initial={product} /> : <p>Produto não encontrado.</p>}
      </div>
    </div>
  );
}
