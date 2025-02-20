
import React, { createContext, useContext, useState } from "react";

type Language = "fr" | "en";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  fr: {
    "welcome.back": "Bienvenue",
    "dashboard": "Tableau de bord",
    "projects": "Projets",
    "messages": "Messages",
    "documents": "Documents",
    "timeline": "Chronologie",
    "settings": "Paramètres",
    "logout": "Déconnexion"
  },
  en: {
    "welcome.back": "Welcome back",
    "dashboard": "Dashboard",
    "projects": "Projects",
    "messages": "Messages",
    "documents": "Documents",
    "timeline": "Timeline",
    "settings": "Settings",
    "logout": "Logout"
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
