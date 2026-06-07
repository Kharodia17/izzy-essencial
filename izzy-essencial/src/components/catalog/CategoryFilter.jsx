import { useLanguage } from "../../context/LanguageContext.jsx";

export default function CategoryFilter({ categories, active, onChange }) {
  const { t } = useLanguage();

  // Always show bilingual label in catalog: "Limpeza / Cleaning"
  function chipLabel(cat) {
    if (cat.nameEn && cat.name !== cat.nameEn) {
      return `${cat.name} / ${cat.nameEn}`;
    }
    return cat.name;
  }

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      <button
        onClick={() => onChange("all")}
        className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-label text-label-md transition-colors ${
          active === "all"
            ? "bg-primary text-on-primary"
            : "bg-surface-container text-on-surface hover:bg-surface-container-high"
        }`}
      >
        {t.allCategories}
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-label text-label-md transition-colors ${
            active === cat.id
              ? "bg-primary text-on-primary"
              : `${cat.chipColor || "bg-surface-container text-on-surface"} hover:opacity-80`
          }`}
        >
          {cat.icon && (
            <span className="material-symbols-outlined text-[15px]">{cat.icon}</span>
          )}
          {chipLabel(cat)}
        </button>
      ))}
    </div>
  );
}
