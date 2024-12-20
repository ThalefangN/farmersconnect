import { motion } from "framer-motion";
import { Sprout } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Resources = () => {
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
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-gray-600">
              Share and access farming resources and equipment with other farmers in your area.
            </p>
          </div>

          {/* Placeholder for resources */}
          <div className="grid gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Farming Equipment</h3>
              <p className="text-sm text-gray-600">Available tools and machinery</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Seeds and Plants</h3>
              <p className="text-sm text-gray-600">Sharing seeds and seedlings</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Land Resources</h3>
              <p className="text-sm text-gray-600">Available farming land</p>
            </div>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Resources;