import { motion } from "framer-motion";
import { ArrowLeft, Package, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const Supplies = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const supplies = [
    {
      title: "Organic Fertilizer",
      description: "100% natural compost",
      price: "M200/50kg",
      seller: "Green Earth Supplies",
      location: "Palapye",
      image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a4"
    },
    {
      title: "Pesticide Pack",
      description: "Eco-friendly pest control",
      price: "M350/pack",
      seller: "Farm Solutions Ltd",
      location: "Mahalapye",
      image: "https://images.unsplash.com/photo-1517646331032-9e8563c520a1"
    }
  ];

  const handlePurchase = (supply: string) => {
    toast({
      title: "Order Initiated",
      description: `Your order for ${supply} has been initiated. The seller will contact you soon.`,
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
              <Package className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Farming Supplies</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">List Supplies</h2>
            <p className="text-gray-600 mb-4">
              Sell your farming supplies to local farmers. List fertilizers,
              pesticides, and other agricultural supplies.
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Share2 className="mr-2 h-4 w-4" />
              List New Supply
            </Button>
          </div>

          <div className="grid gap-6">
            {supplies.map((item, index) => (
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

export default Supplies;