import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import CategoryManager from "../components/admin/CategoryManager.jsx";

export default function CategoryManagerPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-surface-container-lowest border-b border-outline-variant mb-8">
        <div className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop h-16 flex items-center gap-4">
          <Link to="/admin" className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </Link>
          <h1 className="font-display text-headline-md text-on-surface">{t.manageCategories}</h1>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop">
        <CategoryManager />
      </div>
    </div>
  );
}
