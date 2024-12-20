import { HomeIcon, Settings, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const items = [
    { icon: HomeIcon, label: "Sebotsa", path: "/home" },
    { icon: Settings, label: "Services", path: "/services" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-green-50 border-t border-green-200">
      <nav className="flex justify-around">
        {items.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "flex flex-col items-center py-2 px-4 text-sm",
              location.pathname === path
                ? "text-green-700"
                : "text-gray-600 hover:text-green-700"
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