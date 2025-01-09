import { motion } from "framer-motion";
import { ArrowLeft, Tractor, Sprout, ShoppingBag, Users, Info } from "lucide-react";
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
      additionalInfo: "Access tractors, harvesters, and specialized farming tools",
      icon: Tractor,
      path: "/resources/equipment"
    },
    {
      title: "Resource Sharing",
      description: "Share and access farming resources including seeds, land, and tools",
      additionalInfo: "Connect with local farmers to share resources efficiently",
      icon: Sprout,
      path: "/resources"
    },
    {
      title: "Marketplace",
      description: "Buy and sell agricultural products, supplies, and equipment",
      additionalInfo: "Direct access to local markets and buyers",
      icon: ShoppingBag,
      path: "/marketplace"
    },
    {
      title: "Community Support",
      description: "Connect with other farmers, join groups, and access mentorship",
      additionalInfo: "Learn from experienced farmers and share knowledge",
      icon: Users,
      path: "/community"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="p-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Farmers Connect Services</h1>
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
              <Card className="cursor-pointer hover:shadow-lg transition-all border-gray-200">
                <CardHeader className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-gray-100">
                      <service.icon className="h-6 w-6 text-gray-700" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {service.description}
                      </CardDescription>
                      <div className="flex items-start space-x-2 mt-2 text-sm text-gray-500">
                        <Info className="h-4 w-4 mt-0.5" />
                        <p>{service.additionalInfo}</p>
                      </div>
                    </div>
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