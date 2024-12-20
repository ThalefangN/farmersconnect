import { createContext, useContext, useState, ReactNode } from "react";
import { authTranslations } from "@/translations/auth";
import { navigationTranslations } from "@/translations/navigation";
import { contentTranslations } from "@/translations/content";

type Language = "en" | "tn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    ...authTranslations.en,
    ...navigationTranslations.en,
    ...contentTranslations.en
  },
  tn: {
    ...authTranslations.tn,
    ...navigationTranslations.tn,
    ...contentTranslations.tn
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    console.log(`Translating key: ${key} to ${language}`);
    const translation = translations[language][key as keyof typeof translations.en];
    if (!translation) {
      console.warn(`Missing translation for key: ${key} in language: ${language}`);
      return key;
    }
    return translation;
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