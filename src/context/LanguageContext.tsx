"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { hi, Translations } from "@/messages/hi";
import { en } from "@/messages/en";

type Locale = "hi" | "en";

interface LanguageContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "hi",
  setLocale: () => {},
  toggleLocale: () => {},
  t: hi,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>("hi");

  useEffect(() => {
    const saved = localStorage.getItem("naranga_locale") as Locale | null;
    if (saved === "hi" || saved === "en") {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("naranga_locale", l);
  };

  const toggleLocale = () => {
    const next = locale === "hi" ? "en" : "hi";
    setLocale(next);
  };

  const t = locale === "hi" ? hi : en;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
