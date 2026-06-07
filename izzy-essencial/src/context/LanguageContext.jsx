import React, { createContext, useContext, useState } from "react";
import { pt } from "../translations/pt.js";
import { en } from "../translations/en.js";

const LanguageContext = createContext(null);

const STORAGE_KEY = "izzy_lang";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem(STORAGE_KEY) || "pt");

  function toggleLanguage() {
    const next = lang === "pt" ? "en" : "pt";
    localStorage.setItem(STORAGE_KEY, next);
    setLang(next);
  }

  const t = lang === "pt" ? pt : en;

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
