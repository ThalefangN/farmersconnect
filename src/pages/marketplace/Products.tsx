import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Share2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import PaymentModal from "@/components/PaymentModal";

const Products = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    title: string;
    price: string;
    quantity: number;
  } | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const products = [
    {
      title: "Fresh Vegetables Bundle",
      description: "Assorted organic vegetables",
      price: "150",
      seller: "Green Farm Fresh",
      location: "Gaborone",
      image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c"
    },
    {
      title: "Free-Range Eggs",
      description: "Farm fresh eggs",
      price: "45",
      seller: "Happy Hens Farm",
      location: "Molepolole",
      image: "https://images.unsplash.com/photo-1569288052389-dac9b0ac9eac"
    }
  ];

  const handleQuantityChange = (productTitle: string, change: number) => {
    setQuantities(prev => {
      const currentQuantity = prev[productTitle] || 1;
      const newQuantity = Math.max(1, currentQuantity + change);
      return { ...prev, [productTitle]: newQuantity };
    });
  };

  const handlePurchase = (item: { title: string; price: string }) => {
    setSelectedProduct({
      ...item,
      quantity: quantities[item.title] || 1
    });
    setIsPaymentModalOpen(true);
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
                      <p className="text-gray-600"><strong>Price:</strong> BWP {item.price}</p>
                      <p className="text-gray-600"><strong>Seller:</strong> {item.seller}</p>
                      <p className="text-gray-600"><strong>Location:</strong> {item.location}</p>
                      
                      <div className="flex items-center space-x-4 mt-4">
                        <span className="text-gray-600"><strong>Quantity:</strong></span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.title, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {quantities[item.title] || 1}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.title, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 font-semibold mt-2">
                        <strong>Total:</strong> BWP {Number(item.price) * (quantities[item.title] || 1)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handlePurchase(item)}
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

      {selectedProduct && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedProduct(null);
          }}
          courseName={`${selectedProduct.title} (Quantity: ${selectedProduct.quantity})`}
          price={Number(selectedProduct.price) * selectedProduct.quantity}
        />
      )}
      
      <BottomNav />
    </div>
  );
};

export default Products;