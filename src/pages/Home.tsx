import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Sprout, Users, ShoppingBag, BookOpen, MessageSquare } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
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
            <h1 className="text-3xl font-bold text-green-800">Sebotsa Farmers Hub</h1>
            <p className="text-lg text-green-700">
              Empowering Botswana Farmers through Collaboration and Innovation
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg h-48 mb-6">
            <img 
              src="/lovable-uploads/18a8902a-f4eb-4b86-8c45-c8914ecb854c.png"
              alt="Sebotsa Farmers"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-3">About Sebotsa</h2>
            <p className="text-gray-600 mb-4">
              Sebotsa Farmers Hub is your one-stop platform for agricultural collaboration in Botswana. 
              We connect farmers, share resources, and provide essential knowledge to help you succeed 
              in your farming journey.
            </p>
            <div className="flex space-x-4">
              <Button 
                className="bg-green-700 hover:bg-green-800 text-white"
                onClick={() => navigate("/signup")}
              >
                Join Sebotsa
              </Button>
              <Button 
                variant="outline" 
                className="border-green-700 text-green-700 hover:bg-green-50"
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>

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
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;