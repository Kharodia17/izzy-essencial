import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="px-4 md:px-margin-desktop py-8 border-t border-outline-variant mt-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Izzy Essencial" className="w-9 h-9 object-cover rounded-full" />
          <span className="font-display font-bold text-[16px] text-on-surface">Izzy Essencial</span>
        </div>
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 font-label text-label-md text-on-surface-variant">
          <Link to="/location" className="hover:text-primary transition-colors">{t.contacts}</Link>
          <Link to="/location" className="hover:text-primary transition-colors">{t.location}</Link>
          <a href="#" className="hover:text-primary transition-colors">{t.terms}</a>
        </div>
        <p className="font-label text-label-md text-on-surface-variant">{t.copyright}</p>
        <a
          href="https://smarkit.co.za"
          target="_blank"
          rel="noopener noreferrer"
          className="font-label text-[11px] text-on-surface-variant/60 hover:text-primary transition-colors"
        >
          Powered by SMARKIT
        </a>
      </div>
    </footer>
  );
}
