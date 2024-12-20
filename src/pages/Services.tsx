import { motion } from "framer-motion";
import { ArrowLeft, Tractor, Sprout, ShoppingBag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Equipment Rental",
      description: "Rent farming equipment from other farmers or list your own equipment for rent",
      icon: Tractor,
      path: "/resources/equipment"
    },
    {
      title: "Resource Sharing",
      description: "Share and access farming resources including seeds, land, and tools",
      icon: Sprout,
      path: "/resources"
    },
    {
      title: "Marketplace",
      description: "Buy and sell agricultural products, supplies, and equipment",
      icon: ShoppingBag,
      path: "/marketplace"
    },
    {
      title: "Community Support",
      description: "Connect with other farmers, join groups, and access mentorship",
      icon: Users,
      path: "/community"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="p-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Sebotsa Services</h1>
        </motion.div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(service.path)}
            >
              <Card className="cursor-pointer hover:bg-accent transition-colors">
                <CardHeader className="flex flex-row items-start space-x-4">
                  <div className="p-2 rounded-full bg-green-100 text-green-700">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Services;