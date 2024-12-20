import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const Products = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const products = [
    {
      title: "Fresh Vegetables Bundle",
      description: "Assorted organic vegetables",
      price: "M150",
      seller: "Green Farm Fresh",
      location: "Gaborone",
      image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c"
    },
    {
      title: "Free-Range Eggs",
      description: "Farm fresh eggs",
      price: "M45/dozen",
      seller: "Happy Hens Farm",
      location: "Molepolole",
      image: "https://images.unsplash.com/photo-1569288052389-dac9b0ac9eac"
    }
  ];

  const handlePurchase = (product: string) => {
    toast({
      title: "Order Initiated",
      description: `Your order for ${product} has been initiated. The seller will contact you soon.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/marketplace")}>
              <ArrowLeft className="h-6 w-6 text-green-700" />
            </Button>
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Farm Products</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Sell Your Products</h2>
            <p className="text-gray-600 mb-4">
              List your farm products for sale. Connect directly with buyers
              and get the best prices for your produce.
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Share2 className="mr-2 h-4 w-4" />
              List New Product
            </Button>
          </div>

          <div className="grid gap-6">
            {products.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800">{item.title}</CardTitle>
                    <CardDescription className="text-green-600">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600"><strong>Price:</strong> {item.price}</p>
                      <p className="text-gray-600"><strong>Seller:</strong> {item.seller}</p>
                      <p className="text-gray-600"><strong>Location:</strong> {item.location}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handlePurchase(item.title)}
                      >
                        Purchase
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Contact Seller
                      </Button>
                    </div>
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

export default Products;