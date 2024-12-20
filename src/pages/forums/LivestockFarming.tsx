import { motion } from "framer-motion";
import { ArrowLeft, Cow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const LivestockFarming = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/forums")}>
              <ArrowLeft className="h-6 w-6 text-green-700" />
            </Button>
            <div className="flex items-center space-x-2">
              <Cow className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Livestock Farming</h1>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-gray-600">
              Join discussions about livestock management, animal health, and best practices in farming.
            </p>
          </div>

          {/* Placeholder for forum posts */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Cattle Health Tips</h3>
              <p className="text-sm text-gray-600">Discussion about maintaining cattle health</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Poultry Management</h3>
              <p className="text-sm text-gray-600">Tips for poultry farming</p>
            </div>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default LivestockFarming;