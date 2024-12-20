import { motion } from "framer-motion";
import { Bell, Book, Calendar, Clock, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "New Course Available",
      message: "Advanced Mathematics BGCSE course is now available",
      time: "2 hours ago",
      type: "course",
      icon: Book,
      action: () => navigate("/bgcse-courses")
    },
    {
      id: 2,
      title: "Upcoming Exam",
      message: "BGCSE Mock Test scheduled for next week",
      time: "1 day ago",
      type: "exam",
      icon: Calendar,
      action: () => navigate("/current-exams")
    },
    {
      id: 3,
      title: "System Update",
      message: "Platform maintenance scheduled for this weekend",
      time: "2 days ago",
      type: "system",
      icon: Info
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
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <notification.icon className="h-5 w-5 text-primary" />
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
    </div>
  );
};

export default Notifications;