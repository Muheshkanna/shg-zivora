import React, { createContext, useContext, useState, useCallback } from "react";
import { Language, translations } from "@/data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLang] = useState<Language>(() => {
    return (localStorage.getItem("app_language") as Language) || "en";
  });

  const setLanguage = useCallback((lang: Language) => {
    setLang(lang);
    localStorage.setItem("app_language", lang);
  }, []);

  const t = useCallback(
    (key: string) => translations[language]?.[key] || translations.en[key] || key,
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
