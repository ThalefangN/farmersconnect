import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Phone, Shield, LogOut, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Card, CardHeader } from "@/components/ui/card";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Farmer Profile",
      icon: User,
      onClick: () => console.log("Navigate to farmer profile")
    },
    {
      title: "Security Settings",
      icon: Shield,
      onClick: () => console.log("Navigate to security settings")
    },
    {
      title: "Sign Out",
      icon: LogOut,
      onClick: () => navigate("/signin")
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Farmer Profile</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center space-y-4"
        >
          <motion.div 
            className="w-32 h-32 rounded-full overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src="/lovable-uploads/4b3326e6-8879-4b1b-b471-a29f6fc8e97c.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="text-center">
            <h2 className="text-xl font-semibold">Tlhalefang Ntshilane</h2>
            <p className="text-muted-foreground">Livestock Farmer</p>
          </div>
        </motion.div>

        <div className="space-y-4">
          <div className="grid gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">tlhalefang.ntshilane@sebotsa.com</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Gaborone, Botswana</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={item.onClick}
                >
                  <CardHeader className="flex flex-row items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Profile;