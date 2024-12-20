import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Forums = () => {
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

          {/* Placeholder for forum categories */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Livestock Farming</h3>
              <p className="text-sm text-gray-600">Discuss livestock management and care</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Crop Cultivation</h3>
              <p className="text-sm text-gray-600">Share crop farming techniques and tips</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Market Trends</h3>
              <p className="text-sm text-gray-600">Discuss agricultural market trends</p>
            </div>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Forums;