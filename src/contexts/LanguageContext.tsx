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
    
    // Navigation & Common Actions
    home: "Home",
    services: "Services",
    notifications: "Notifications",
    profile: "Profile",
    back: "Back",
    next: "Next",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    search: "Search",
    
    // Authentication
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot Password?",
    createAccount: "Create Account",
    
    // Services
    viewServices: "View Services",
    equipmentRental: "Equipment Rental",
    farmingSupplies: "Farming Supplies",
    resourceSharing: "Resource Sharing",
    
    // Forums
    forums: "Forums",
    createPost: "Create Post",
    reply: "Reply",
    livestock: "Livestock Farming",
    crops: "Crop Cultivation",
    market: "Market Trends",
    
    // Resources
    resources: "Resources",
    equipment: "Equipment",
    seeds: "Seeds",
    land: "Land",
    
    // Marketplace
    marketplace: "Marketplace",
    products: "Products",
    supplies: "Supplies",
    buy: "Buy",
    sell: "Sell",
    price: "Price",
    
    // Learning
    learning: "Learning",
    courses: "Courses",
    guides: "Guides",
    videos: "Videos",
    certificates: "Certificates",
    
    // Community
    community: "Community",
    groups: "Groups",
    events: "Events",
    mentorship: "Mentorship",
    createGroup: "Create Group",
    joinGroup: "Join Group",
    leaveGroup: "Leave Group",
    
    // Profile
    editProfile: "Edit Profile",
    settings: "Settings",
    logout: "Logout",
    location: "Location",
    phoneNumber: "Phone Number",
    
    // Notifications
    newMessage: "New Message",
    marketUpdate: "Market Update",
    eventReminder: "Event Reminder",
    
    // Messages
    messages: "Messages",
    sendMessage: "Send Message",
    typeMessage: "Type a message...",
    
    // Descriptions
    aboutSebotsa: "Sebotsa Farmers Hub is your one-stop platform for agricultural collaboration in Botswana.",
    welcomeMessage: "Welcome to Sebotsa Farmers Hub",
    farmersHub: "Farmers Hub"
  },
  tn: {
    // Common translations
    offlineTitle: "Ga o a golagana",
    offlineDesc: "Tswêê-tswêê golagana le inthanete go tswelela.",
    loading: "E a laiwa...",
    error: "Go nnile le phoso",
    success: "Go dirile",
    
    // Navigation & Common Actions
    home: "Gae",
    services: "Ditirelo",
    notifications: "Dikitsiso",
    profile: "Profaele",
    back: "Boela morago",
    next: "Ya pele",
    submit: "Romela",
    cancel: "Khansela",
    save: "Boloka",
    delete: "Phimola",
    edit: "Baakanya",
    view: "Bona",
    search: "Batla",
    
    // Authentication
    signIn: "Tsena",
    signUp: "Ikwadise",
    signOut: "Tswa",
    email: "Imeile",
    password: "Khunololamoraba",
    forgotPassword: "O lebetse khunololamoraba?",
    createAccount: "Tlhola akhaonto",
    
    // Services
    viewServices: "Bona Ditirelo",
    equipmentRental: "Go Hirisa Didirisiwa",
    farmingSupplies: "Dithuso tsa Temo",
    resourceSharing: "Go Abelana ka Didirisiwa",
    
    // Forums
    forums: "Dipuisano",
    createPost: "Kwala Poso",
    reply: "Araba",
    livestock: "Leruo",
    crops: "Temo ya Dijalo",
    market: "Diphetogo tsa Mmaraka",
    
    // Resources
    resources: "Didirisiwa",
    equipment: "Didiriswa",
    seeds: "Dipeo",
    land: "Lefatshe",
    
    // Marketplace
    marketplace: "Mmaraka",
    products: "Dikumo",
    supplies: "Dithuso",
    buy: "Reka",
    sell: "Rekisa",
    price: "Tlhwatlhwa",
    
    // Learning
    learning: "Thuto",
    courses: "Dithuto",
    guides: "Dikaedi",
    videos: "Dibidio",
    certificates: "Ditshupo",
    
    // Community
    community: "Setšhaba",
    groups: "Ditlhopha",
    events: "Ditiragalo",
    mentorship: "Bokaedi",
    createGroup: "Tlhola Setlhopha",
    joinGroup: "Tsena mo Setlhopheng",
    leaveGroup: "Tswa mo Setlhopheng",
    
    // Profile
    editProfile: "Baakanya Profaele",
    settings: "Dipeelo",
    logout: "Tswa",
    location: "Lefelo",
    phoneNumber: "Nomoro ya mogala",
    
    // Notifications
    newMessage: "Molaetsa o Mošwa",
    marketUpdate: "Dikgang tsa Mmaraka",
    eventReminder: "Kgopotso ya Tiragalo",
    
    // Messages
    messages: "Melaetsa",
    sendMessage: "Romela Molaetsa",
    typeMessage: "Kwala molaetsa...",
    
    // Descriptions
    aboutSebotsa: "Sebotsa ke lefelo le le lengwe la tirisanommogo ya temothuo mo Botswana.",
    welcomeMessage: "O amogelesegile mo Sebotsa",
    farmersHub: "Lefelo la Balemi"
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