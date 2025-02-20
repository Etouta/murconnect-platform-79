
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
    "logout": "Déconnexion",
    "new.project": "Nouveau projet",
    "project.created": "La création d'un nouveau projet a été initiée",
    "search.documents": "Rechercher des documents...",
    "all.projects": "Tous les projets",
    "all.stages": "Toutes les étapes",
    "all.stakeholders": "Tous les intervenants",
    "unread.messages": "messages non lus",
    "search.conversations": "Rechercher des conversations...",
    "select.message": "Sélectionnez un message",
    "from": "De",
    "project": "Projet",
    "due.date": "Date limite",
    "status": "Statut",
    "all": "Tous",
    "unread": "Non lus",
    "read": "Lus",
    "online": "En ligne",
    "busy": "Occupé"
  },
  en: {
    "welcome.back": "Welcome Back",
    "dashboard": "Dashboard",
    "projects": "Projects",
    "messages": "Messages",
    "documents": "Documents",
    "timeline": "Timeline",
    "settings": "Settings",
    "logout": "Logout",
    "new.project": "New Project",
    "project.created": "New project creation has been initiated",
    "search.documents": "Search documents...",
    "all.projects": "All Projects",
    "all.stages": "All Stages",
    "all.stakeholders": "All Stakeholders",
    "unread.messages": "unread messages",
    "search.conversations": "Search conversations...",
    "select.message": "Select a message",
    "from": "From",
    "project": "Project",
    "due.date": "Due Date",
    "status": "Status",
    "all": "All",
    "unread": "Unread",
    "read": "Read",
    "online": "Online",
    "busy": "Busy"
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
