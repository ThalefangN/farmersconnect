import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold">About Farmers Connect</h2>
      <p className="text-gray-600">
        Your one-stop platform for agricultural collaboration in Botswana. 
        Connect with other farmers, access resources, and grow your farming business.
      </p>
      <Button 
        onClick={() => navigate("/about")}
        variant="outline"
        className="w-full"
      >
        Learn More
      </Button>
    </motion.div>
  );
};

export default AboutSection;