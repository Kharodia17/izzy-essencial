import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useCategories } from "../../hooks/useCategories.js";
import { addProduct, updateProduct } from "../../firebase/products.js";
import ImageUploader from "./ImageUploader.jsx";

const EMPTY = { name: "", nameEn: "", category: "", price: "", inStock: true, featured: false, imageUrl: "" };

export default function ProductForm({ initial }) {
  const { t } = useLanguage();
  const { categories } = useCategories();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial ? { ...EMPTY, ...initial } : EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) {
      setError("Nome, categoria e preço são obrigatórios.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const data = { ...form, price: Number(form.price) };
      if (initial?.id) {
        await updateProduct(initial.id, data);
      } else {
        await addProduct(data);
      }
      navigate("/admin");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-lg bg-surface-container border border-outline-variant text-on-surface font-body text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition";
  const labelClass = "block font-label text-label-md text-on-surface-variant mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="bg-error-container text-on-error-container rounded-lg px-4 py-3 font-label text-label-md">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t.productName} *</label>
          <input className={inputClass} value={form.name} onChange={(e) => set("name", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>{t.productNameEn}</label>
          <input className={inputClass} value={form.nameEn} onChange={(e) => set("nameEn", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t.category} *</label>
          <select
            className={inputClass}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            required
          >
            <option value="">— {t.category} —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t.priceMT} *</label>
          <input
            className={inputClass}
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => set("inStock", !form.inStock)}
            className={`w-12 h-6 rounded-full transition-colors ${form.inStock ? "bg-secondary" : "bg-outline-variant"} relative`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.inStock ? "translate-x-7" : "translate-x-1"}`} />
          </div>
          <span className="font-label text-label-md text-on-surface">{t.inStockToggle}</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => set("featured", !form.featured)}
            className={`w-12 h-6 rounded-full transition-colors ${form.featured ? "bg-tertiary" : "bg-outline-variant"} relative`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.featured ? "translate-x-7" : "translate-x-1"}`} />
          </div>
          <span className="font-label text-label-md text-on-surface">{t.featuredToggle}</span>
        </label>
      </div>

      <div>
        <label className={labelClass}>{t.uploadImage}</label>
        <ImageUploader value={form.imageUrl} onChange={(url) => set("imageUrl", url)} />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="flex-1 py-3 rounded-lg border border-outline-variant text-on-surface font-label text-label-md hover:bg-surface-container transition-colors"
        >
          {t.cancel}
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-3 rounded-lg bg-primary text-on-primary font-label text-label-md hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {saving ? "..." : t.save}
        </button>
      </div>
    </form>
  );
}
