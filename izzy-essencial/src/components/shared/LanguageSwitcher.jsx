import { useLanguage } from "../../context/LanguageContext.jsx";

export default function LanguageSwitcher({ fullWidth }) {
  const { lang, toggleLanguage } = useLanguage();
  const inactive = lang === "pt" ? "EN" : "PT";
  const active = lang.toUpperCase();

  if (fullWidth) {
    return (
      <button
        onClick={toggleLanguage}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-surface-container font-label text-label-md hover:bg-surface-container-high transition-colors"
      >
        <span className="material-symbols-outlined text-[18px] text-primary">translate</span>
        <span className="text-on-surface-variant">{inactive}</span>
        <span className="text-outline-variant">/</span>
        <span className="font-bold text-primary">{active}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container font-label text-label-md hover:bg-surface-container-high transition-colors"
    >
      <span className="text-on-surface-variant text-[13px]">{inactive}</span>
      <span className="text-outline-variant text-[13px]">/</span>
      <span className="font-bold text-primary text-[13px]">{active}</span>
    </button>
  );
}
