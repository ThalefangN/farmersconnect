import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-green-700" />
            <h1 className="text-2xl font-bold text-green-800">Marketplace</h1>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-gray-600">
              Buy and sell agricultural products and equipment in our marketplace.
            </p>
          </div>

          {/* Placeholder for marketplace items */}
          <div className="grid gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Farm Products</h3>
              <p className="text-sm text-gray-600">Fresh produce and livestock</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Equipment</h3>
              <p className="text-sm text-gray-600">Farming tools and machinery</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Supplies</h3>
              <p className="text-sm text-gray-600">Seeds, fertilizers, and more</p>
            </div>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Marketplace;