import { motion } from "framer-motion";
import { Bell, Tractor, ShoppingBag, Users, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const Notifications = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "New Equipment Available",
      message: "A new tractor is available for rent in your area",
      time: "2 hours ago",
      type: "equipment",
      icon: Tractor,
      action: () => navigate("/resources/equipment")
    },
    {
      id: 2,
      title: "Marketplace Update",
      message: "New farming supplies listed in your area",
      time: "1 day ago",
      type: "marketplace",
      icon: ShoppingBag,
      action: () => navigate("/marketplace")
    },
    {
      id: 3,
      title: "Community Event",
      message: "Upcoming farmer's meetup in your region",
      time: "2 days ago",
      type: "community",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
          </h1>
        </div>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="cursor-pointer"
                onClick={notification.action}
              >
                <Card className="hover:bg-accent transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <notification.icon className="h-5 w-5 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </motion.div>
      <BottomNav />
    </div>
  );
};

export default Notifications;