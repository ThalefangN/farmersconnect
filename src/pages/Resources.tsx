import { motion } from "framer-motion";
import { Sprout, Wrench, Leaf, MapPin } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Resources = () => {
  const navigate = useNavigate();

  const resources = [
    {
      title: "Farming Equipment",
      description: "Access and share agricultural machinery and tools",
      icon: Wrench,
      details: "Browse available tractors, harvesters, irrigation systems, and more. Connect with equipment owners in your area and arrange sharing or rental agreements. Save on costs while accessing modern farming equipment.",
      features: [
        "Equipment sharing network",
        "Machinery rental services",
        "Tool maintenance guides",
        "Equipment training sessions"
      ],
      path: "/resources/equipment"
    },
    {
      title: "Seeds and Plants",
      description: "Exchange quality seeds and seedlings",
      icon: Leaf,
      details: "Find certified seeds, share successful varieties, and connect with seed suppliers. Access a wide variety of crop seeds, seedlings, and planting materials suitable for your region.",
      features: [
        "Certified seed catalog",
        "Seasonal planting guide",
        "Seed exchange program",
        "Expert growing tips"
      ],
      path: "/resources/seeds"
    },
    {
      title: "Land Resources",
      description: "Discover available farming land",
      icon: MapPin,
      details: "Explore arable land for lease or purchase, soil quality information, and water sources. Find detailed information about land characteristics, ownership, and usage rights.",
      features: [
        "Land listings database",
        "Soil analysis reports",
        "Water source mapping",
        "Legal documentation support"
      ],
      path: "/resources/land"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <Sprout className="h-6 w-6 text-green-700" />
            <h1 className="text-2xl font-bold text-green-800">Resource Sharing</h1>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Community Resource Hub</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Connect with other farmers to share and access essential farming resources. 
              Our platform facilitates efficient resource allocation and community collaboration,
              helping you reduce costs and improve productivity through shared resources.
            </p>
          </div>

          <div className="grid gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                  onClick={() => navigate(resource.path)}
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-4 rounded-lg">
                        <resource.icon className="h-8 w-8 text-green-700" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-green-800">{resource.title}</CardTitle>
                        <CardDescription className="text-lg text-green-600">{resource.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-600 text-lg leading-relaxed">{resource.details}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {resource.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full mt-4 bg-green-600 hover:bg-green-700 text-lg py-6"
                      onClick={() => navigate(resource.path)}
                    >
                      Explore {resource.title}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Resources;