import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useCategories } from "../hooks/useCategories.js";
import { useProducts } from "../hooks/useProducts.js";
import ProductCard from "../components/catalog/ProductCard.jsx";
import ProductModal from "../components/catalog/ProductModal.jsx";
import Reveal from "../components/shared/Reveal.jsx";
import Footer from "../components/shared/Footer.jsx";

export default function Home() {
  const { t, lang } = useLanguage();
  const { categories } = useCategories();
  const { products } = useProducts();
  const [selected, setSelected] = useState(null);

  const featured = products.filter((p) => p.featured && p.inStock).slice(0, 4);

  const trustItems = [
    { icon: "chat",        color: "bg-secondary-container text-on-secondary-container",
      title: lang === "pt" ? "Encomenda via WhatsApp" : "Order via WhatsApp",
      desc:  lang === "pt" ? "Simples e rápido — sem apps extra"  : "Simple and fast — no extra apps" },
    { icon: "inventory_2", color: "bg-primary-container text-on-primary-container",
      title: lang === "pt" ? "Grande Variedade"    : "Wide Selection",
      desc:  lang === "pt" ? "Limpeza, mercearia e muito mais"    : "Cleaning, groceries and more" },
    { icon: "schedule",    color: "bg-tertiary-container text-on-tertiary-container",
      title: lang === "pt" ? "Aberto 7 Dias"       : "Open 7 Days",
      desc:  lang === "pt" ? "Segunda a Domingo, todo o dia"      : "Monday to Sunday, every day" },
    { icon: "location_on", color: "bg-surface-container text-on-surface",
      title: lang === "pt" ? "Em Maputo"           : "Based in Maputo",
      desc:  "Av. 24 de Julho, Maputo" },
  ];

  return (
    <div className="pb-24 md:pb-0">

      {/* ── Hero ── */}
      <section
        className="px-4 md:px-margin-desktop py-10 md:py-20 text-center"
        style={{ background: "radial-gradient(circle at top right, #c5e7ff 0%, #f9f9ff 70%)" }}
      >
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4 md:gap-6">
          {/* Hero logo — always in-view immediately */}
          <img
            src="/logo.png"
            alt="Izzy Essencial"
            className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-full drop-shadow-md anim-scale-in in-view animate-logo"
          />
          <Reveal animation="fade-up" delay="120ms" className="space-y-2">
            <h1 className="font-display font-bold text-[26px] leading-tight md:text-headline-xl text-on-surface">
              {t.heroTitle}
            </h1>
            <p className="font-body text-body-md md:text-body-lg text-on-surface-variant">
              {t.heroSubtitle}
            </p>
          </Reveal>
          <Reveal animation="fade-up" delay="260ms">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-on-primary font-label text-label-md hover:opacity-90 hover:scale-105 active:scale-95 transition-all"
            >
              {t.viewCatalog}
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="px-4 md:px-margin-desktop py-8 md:py-12 max-w-6xl mx-auto">
        <Reveal animation="fade-up">
          <h2 className="font-display font-bold text-headline-md text-on-surface mb-4 md:mb-6">
            {t.popularCategories}
          </h2>
        </Reveal>
        {categories.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="h-28 rounded-xl bg-surface-container animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} animation="scale-in" delay={`${i * 75}ms`}>
                <Link
                  to={`/catalog?category=${cat.id}`}
                  className={`flex flex-col items-center gap-2 p-4 md:p-6 rounded-xl ${cat.chipColor || "bg-surface-container"} hover:scale-105 hover:shadow-card-hover active:scale-95 transition-all hover-lift`}
                >
                  <span className="material-symbols-outlined text-[28px] md:text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>{cat.icon}</span>
                  <span className="font-label text-[12px] md:text-label-md text-center leading-tight">
                    {lang === "en" && cat.nameEn ? cat.nameEn : cat.name}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ── Why Izzy Essencial ── */}
      <section className="px-4 md:px-margin-desktop py-8 md:py-12 max-w-6xl mx-auto">
        <Reveal animation="fade-up" className="text-center mb-6">
          <h2 className="font-display font-bold text-headline-md text-on-surface">
            {lang === "pt" ? "Porquê a Izzy Essencial?" : "Why Izzy Essencial?"}
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map((item, i) => (
            <Reveal key={item.icon} animation="fade-up" delay={`${i * 90}ms`}>
              <div className={`${item.color} rounded-2xl p-4 md:p-5 flex flex-col gap-2 h-full hover-lift`}>
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                <p className="font-label font-bold text-label-md leading-tight">{item.title}</p>
                <p className="font-body text-[13px] leading-snug opacity-80">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Featured products ── */}
      {featured.length > 0 && (
        <section className="px-4 md:px-margin-desktop py-6 md:py-12 max-w-6xl mx-auto">
          <Reveal animation="fade-in" className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="font-display font-bold text-headline-md text-on-surface">{t.featured}</h2>
            <Link to="/catalog" className="font-label text-label-md text-primary hover:underline">
              {t.viewCatalog} →
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {featured.map((p, i) => (
              <Reveal key={p.id} animation="fade-up" delay={`${i * 80}ms`}>
                <ProductCard product={p} onClick={setSelected} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Subscribe ── */}
      <section className="px-4 md:px-margin-desktop py-6 md:py-12 max-w-6xl mx-auto">
        <Reveal animation="fade-up">
          <div className="bg-primary-container rounded-2xl p-6 md:p-12 text-center">
            <span className="material-symbols-outlined text-[36px] md:text-[40px] text-primary mb-3 block">notifications</span>
            <h2 className="font-display font-bold text-headline-md text-on-primary-container mb-2 md:mb-3">
              {t.weeklyPromos}
            </h2>
            <p className="font-body text-body-md text-on-primary-container/80 mb-5 md:mb-6 max-w-md mx-auto">
              {t.subscribePromos}
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t.yourEmail}
                className="flex-1 px-4 py-3 rounded-xl bg-white text-on-surface font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-primary text-on-primary font-label text-label-md hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
              >
                {t.subscribeNow}
              </button>
            </form>
          </div>
        </Reveal>
      </section>

      <Footer />

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
