import { HomeIcon, Settings, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const items = [
    { icon: HomeIcon, label: "Sebotsa", path: "/home" },
    { icon: Settings, label: t("services"), path: "/services" },
    { icon: Bell, label: t("notifications"), path: "/notifications" },
    { icon: User, label: t("profile"), path: "/profile" },
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border z-50"
    >
      <nav className="flex justify-around">
        {items.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "flex flex-col items-center py-3 px-4 touch-target hover-lift press-effect",
              location.pathname === path
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </nav>
    </motion.div>
  );
};

export default BottomNav;