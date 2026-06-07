import { useLanguage } from "../../context/LanguageContext.jsx";

export default function SearchBar({ value, onChange }) {
  const { t } = useLanguage();

  return (
    <div className="relative">
      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
        search
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.searchPlaceholder}
        className="w-full pl-11 pr-10 py-3 rounded-xl bg-surface-container border border-outline-variant text-on-surface placeholder:text-outline font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-container-high text-outline transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      )}
    </div>
  );
}
