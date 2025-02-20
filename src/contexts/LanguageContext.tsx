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
    "busy": "Occupé",
    "architect": "Architecte",
    "engineer": "Ingénieur",
    "constructor": "Constructeur",
    "company": "Société",
    "language": "Langue",
    "notifications": "Notifications",
    "appearance": "Apparence",
    "dark.mode": "Mode sombre",
    "email.notifications": "Notifications par email",
    "push.notifications": "Notifications push",
    "message.notifications": "Notifications de messages",
    "calendar.notifications": "Notifications de calendrier",
    "regional.preferences": "Préférences régionales",
    "currency": "Devise",
    "timezone": "Fuseau horaire",
    "select.language": "Sélectionner la langue",
    "select.currency": "Sélectionner la devise",
    "select.timezone": "Sélectionner le fuseau horaire",
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
    "busy": "Busy",
    "architect": "Architect",
    "engineer": "Engineer",
    "constructor": "Constructor",
    "company": "Company",
    "language": "Language",
    "notifications": "Notifications",
    "appearance": "Appearance",
    "dark.mode": "Dark mode",
    "email.notifications": "Email notifications",
    "push.notifications": "Push notifications",
    "message.notifications": "Message notifications",
    "calendar.notifications": "Calendar notifications",
    "regional.preferences": "Regional preferences",
    "currency": "Currency",
    "timezone": "Timezone",
    "select.language": "Select language",
    "select.currency": "Select currency",
    "select.timezone": "Select timezone",
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
