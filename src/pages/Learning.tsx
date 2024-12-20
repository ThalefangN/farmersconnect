import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Learning = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-green-700" />
            <h1 className="text-2xl font-bold text-green-800">Learning Hub</h1>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-gray-600">
              Access agricultural guides and training materials to improve your farming knowledge.
            </p>
          </div>

          {/* Placeholder for learning resources */}
          <div className="grid gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Farming Guides</h3>
              <p className="text-sm text-gray-600">Step-by-step tutorials</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Best Practices</h3>
              <p className="text-sm text-gray-600">Modern farming techniques</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800">Video Tutorials</h3>
              <p className="text-sm text-gray-600">Visual learning resources</p>
            </div>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Learning;