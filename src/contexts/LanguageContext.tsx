import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "tn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common translations
    offlineTitle: "You're offline",
    offlineDesc: "Please connect to the internet to proceed.",
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    
    // Navigation
    home: "Home",
    services: "Services",
    notifications: "Notifications",
    profile: "Profile",
    
    // Services
    viewServices: "View Services",
    equipmentRental: "Equipment Rental",
    farmingSupplies: "Farming Supplies",
    
    // Notifications
    newMessage: "New Message",
    marketUpdate: "Market Update",
    
    // Profile
    editProfile: "Edit Profile",
    settings: "Settings",
    logout: "Logout"
  },
  tn: {
    // Common translations
    offlineTitle: "Ga o a golagana",
    offlineDesc: "Tswêê-tswêê golagana le inthanete go tswelela.",
    loading: "E a laiwa...",
    error: "Go nnile le phoso",
    success: "Go dirile",
    
    // Navigation
    home: "Gae",
    services: "Ditirelo",
    notifications: "Dikitsiso",
    profile: "Profaele",
    
    // Services
    viewServices: "Bona Ditirelo",
    equipmentRental: "Go Hirisa Didirisiwa",
    farmingSupplies: "Dithuso tsa Temo",
    
    // Notifications
    newMessage: "Molaetsa o Mošwa",
    marketUpdate: "Dikgang tsa Mmaraka",
    
    // Profile
    editProfile: "Baakanya Profaele",
    settings: "Dipeelo",
    logout: "Tswa"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};