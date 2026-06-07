import { NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";

const ITEMS = [
  { to: "/",         end: true,  icon: "home",       iconFilled: "home",        label_pt: "Início",     label_en: "Home" },
  { to: "/catalog",  end: false, icon: "grid_view",  iconFilled: "grid_view",   label_pt: "Catálogo",   label_en: "Catalog" },
  { to: "/location", end: false, icon: "location_on",iconFilled: "location_on", label_pt: "Localização",label_en: "Location" },
];

export default function BottomNav() {
  const { lang } = useLanguage();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-surface-container-lowest border-t border-outline-variant"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors no-underline ${
                isActive ? "text-primary" : "text-on-surface-variant"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 400" }}
                >
                  {item.icon}
                </span>
                <span className="text-[11px] font-medium leading-none">
                  {lang === "pt" ? item.label_pt : item.label_en}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
