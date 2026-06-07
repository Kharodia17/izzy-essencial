import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useCategories } from "../../hooks/useCategories.js";
import { addCategory, deleteCategory } from "../../firebase/categories.js";

const CHIP_COLORS = [
  { label: "Blue (Primary)", value: "bg-primary-fixed text-on-primary-fixed" },
  { label: "Green (Secondary)", value: "bg-secondary-container text-on-secondary-container" },
  { label: "Gold (Tertiary)", value: "bg-tertiary-container text-on-tertiary-container" },
  { label: "Surface", value: "bg-surface-container-high text-on-surface" },
];

export default function CategoryManager() {
  const { t } = useLanguage();
  const { categories } = useCategories();
  const [form, setForm] = useState({ name: "", nameEn: "", icon: "category", chipColor: CHIP_COLORS[3].value });
  const [saving, setSaving] = useState(false);

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.name) return;
    setSaving(true);
    try {
      await addCategory({ ...form, order: categories.length + 1 });
      setForm({ name: "", nameEn: "", icon: "category", chipColor: CHIP_COLORS[3].value });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(cat) {
    if (!window.confirm(t.confirmDelete)) return;
    await deleteCategory(cat.id);
  }

  const inputClass = "w-full px-3 py-2 rounded-lg bg-surface-container border border-outline-variant text-on-surface font-body text-body-md focus:outline-none focus:border-primary transition";

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant space-y-4">
        <h3 className="font-display font-bold text-headline-md text-on-surface">{t.addCategory}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-label text-label-md text-on-surface-variant mb-1">{t.categoryName} *</label>
            <input className={inputClass} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
          </div>
          <div>
            <label className="block font-label text-label-md text-on-surface-variant mb-1">{t.categoryNameEn}</label>
            <input className={inputClass} value={form.nameEn} onChange={(e) => setForm((f) => ({ ...f, nameEn: e.target.value }))} />
          </div>
          <div>
            <label className="block font-label text-label-md text-on-surface-variant mb-1">{t.categoryIcon}</label>
            <input className={inputClass} value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} placeholder="e.g. cleaning_services" />
          </div>
          <div>
            <label className="block font-label text-label-md text-on-surface-variant mb-1">Chip Color</label>
            <select className={inputClass} value={form.chipColor} onChange={(e) => setForm((f) => ({ ...f, chipColor: e.target.value }))}>
              {CHIP_COLORS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-label text-label-md hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {saving ? "..." : t.addCategory}
        </button>
      </form>

      <div className="space-y-2">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between bg-surface-container-lowest rounded-xl px-4 py-3 border border-outline-variant">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-primary">{cat.icon}</span>
              <div>
                <p className="font-label text-label-md text-on-surface">{cat.name}</p>
                {cat.nameEn && <p className="text-[12px] text-on-surface-variant">{cat.nameEn}</p>}
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-label ${cat.chipColor}`}>{cat.name}</span>
            </div>
            <button
              onClick={() => handleDelete(cat)}
              className="p-2 rounded-lg hover:bg-error-container text-on-surface-variant hover:text-error transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
