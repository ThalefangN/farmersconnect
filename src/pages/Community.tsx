import { motion } from "framer-motion";
import { Users } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-green-700" />
            <h1 className="text-2xl font-bold text-green-800">Community</h1>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-gray-600">
              Connect with other farmers in your area and build a strong farming community.
            </p>
          </div>

          {/* Placeholder for community features */}
          <div className="grid gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Local Groups</h3>
              <p className="text-sm text-gray-600">Join farming groups in your area</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Events</h3>
              <p className="text-sm text-gray-600">Upcoming farming events</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Mentorship</h3>
              <p className="text-sm text-gray-600">Connect with experienced farmers</p>
            </div>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Community;