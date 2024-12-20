import { motion } from "framer-motion";
import { ShoppingBag, Leaf, Tool, Package } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Farm Products",
      description: "Fresh produce and livestock",
      icon: Leaf,
      details: "Buy and sell fresh vegetables, fruits, dairy products, and livestock",
      path: "/marketplace/products"
    },
    {
      title: "Equipment",
      description: "Farming tools and machinery",
      icon: Tool,
      details: "Trade new and used farming equipment, spare parts, and tools",
      path: "/marketplace/equipment"
    },
    {
      title: "Supplies",
      description: "Seeds, fertilizers, and more",
      icon: Package,
      details: "Access quality seeds, fertilizers, pesticides, and other farming supplies",
      path: "/marketplace/supplies"
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
            <ShoppingBag className="h-6 w-6 text-green-700" />
            <h1 className="text-2xl font-bold text-green-800">Marketplace</h1>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-gray-600 text-lg">
              Your one-stop marketplace for agricultural products and supplies. 
              Connect directly with buyers and sellers in the farming community.
            </p>
          </div>

          <div className="grid gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => navigate(category.path)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <category.icon className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-green-800">{category.title}</CardTitle>
                        <CardDescription className="text-green-600">{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{category.details}</p>
                    <Button 
                      className="mt-4 w-full bg-green-600 hover:bg-green-700"
                      onClick={() => navigate(category.path)}
                    >
                      Browse {category.title}
                    </Button>
                  </CardContent>
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

export default Marketplace;