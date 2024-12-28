import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Sprout, Users, ShoppingBag, BookOpen, MessageSquare, Bot } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AIChatDialog } from "@/components/learning/AIChatDialog";

const Home = () => {
  const navigate = useNavigate();
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  
  const services = [
    {
      title: "Forums",
      description: "Join discussions with other farmers about agriculture",
      icon: MessageSquare,
      path: "/forums"
    },
    {
      title: "Resource Sharing",
      description: "Share and access farming resources and equipment",
      icon: Sprout,
      path: "/resources"
    },
    {
      title: "Marketplace",
      description: "Buy and sell agricultural products and equipment",
      icon: ShoppingBag,
      path: "/marketplace"
    },
    {
      title: "Learning Hub",
      description: "Access agricultural guides and training materials",
      icon: BookOpen,
      path: "/learning"
    },
    {
      title: "Community",
      description: "Connect with other farmers in your area",
      icon: Users,
      path: "/community"
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
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-green-800">Farmers Connect BW</h1>
            <p className="text-lg text-green-700">
              Empowering Botswana Farmers through Collaboration and Innovation
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg h-48 mb-6">
            <img 
              src="/lovable-uploads/18a8902a-f4eb-4b86-8c45-c8914ecb854c.png"
              alt="Farmers Connect BW"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-green-800">AI Farming Assistant</h2>
                <p className="text-gray-600">Get instant farming advice and guidance</p>
              </div>
              <Button 
                onClick={() => setIsAIChatOpen(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Bot className="h-5 w-5 mr-2" />
                Chat Now
              </Button>
            </div>
            <p className="text-gray-600">
              Ask questions, share images, and get expert advice on farming practices in Botswana
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-green-600" />
            <input 
              className="w-full pl-10 pr-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Search resources, products, or farmers..."
            />
          </div>

          <div className="grid gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AIChatDialog
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />

      <BottomNav />
    </div>
  );
};

export default Home;