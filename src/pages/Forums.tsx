import { motion } from "framer-motion";
import { MessageSquare, Cow, Sprout, TrendingUp } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Forums = () => {
  const navigate = useNavigate();

  const forumCategories = [
    {
      title: "Livestock Farming",
      description: "Discuss livestock management and care",
      icon: Cow,
      path: "/forums/livestock"
    },
    {
      title: "Crop Cultivation",
      description: "Share crop farming techniques and tips",
      icon: Sprout,
      path: "/forums/crops"
    },
    {
      title: "Market Trends",
      description: "Discuss agricultural market trends",
      icon: TrendingUp,
      path: "/forums/market"
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
            <MessageSquare className="h-6 w-6 text-green-700" />
            <h1 className="text-2xl font-bold text-green-800">Forums</h1>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-gray-600">
              Join discussions with other farmers about agriculture, share experiences, 
              and learn from the community.
            </p>
          </div>

          <div className="space-y-4">
            {forumCategories.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(category.path)}
              >
                <Card className="cursor-pointer hover:bg-accent transition-colors p-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <category.icon className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
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

export default Forums;