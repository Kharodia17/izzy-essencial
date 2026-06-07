import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

export default function Navbar() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close drawer on navigation
  function handleNavClick() { setMenuOpen(false); }

  const navLinkClass = ({ isActive }) =>
    `font-label text-label-md transition-colors ${isActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface"}`;

  const drawerLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3.5 rounded-xl font-label text-label-md transition-colors ${
      isActive ? "bg-primary-fixed/40 text-primary" : "text-on-surface hover:bg-surface-container"
    }`;

  const navItems = [
    { to: "/",         end: true,  icon: "home",      label: t.home },
    { to: "/catalog",  end: false, icon: "grid_view",  label: t.catalog },
    { to: "/location", end: false, icon: "location_on",label: t.location },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface-container-lowest border-b border-outline-variant shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-margin-desktop h-[68px] flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img src="/logo.png" alt="Izzy Essencial" className="h-12 w-12 object-cover rounded-full animate-logo" />
            <span className="font-display font-bold text-[16px] text-on-surface leading-none hidden sm:block">
              Izzy Essencial
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {/* Mobile hamburger — only shown when no bottom nav (we keep both for tablet) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-over drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-surface-container-lowest shadow-2xl flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Izzy Essencial" className="h-9 w-9 object-contain rounded-full" />
                <span className="font-display font-bold text-[15px] text-on-surface">Izzy Essencial</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Drawer nav */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={drawerLinkClass}
                  onClick={handleNavClick}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Drawer footer */}
            <div className="p-4 border-t border-outline-variant">
              <LanguageSwitcher fullWidth />
            </div>
          </aside>
        </>
      )}
    </>
  );
}
