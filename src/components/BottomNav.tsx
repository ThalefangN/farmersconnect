import { HomeIcon, Settings, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border pb-[env(safe-area-inset-bottom)]">
      <nav className="flex justify-around">
        {items.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "flex flex-col items-center py-2 px-4 text-sm",
              location.pathname === path
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <Icon className="h-6 w-6" />
            <span className="mt-1">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;