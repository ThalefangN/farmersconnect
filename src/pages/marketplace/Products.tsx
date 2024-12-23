import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Share2, Plus, Minus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import PaymentModal from "@/components/PaymentModal";
import MarketplacePaymentConfirmation from "@/components/payment/MarketplacePaymentConfirmation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  quantity: number;
  unit_type: string;
  location: string;
  image_url: string | null;
  user_id: string;
  seller?: {
    full_name: string | null;
  };
}

const Products = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      console.log('Fetching products...');
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          seller:profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      console.log('Products fetched:', data);
      return data as Product[];
    }
  });

  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities(prev => {
      const currentQuantity = prev[productId] || 1;
      const newQuantity = Math.max(1, Math.min(
        currentQuantity + change,
        products?.find(p => p.id === productId)?.quantity || 1
      ));
      return { ...prev, [productId]: newQuantity };
    });
  };

  const handlePurchase = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    if (quantity > (product.quantity || 0)) {
      toast({
        title: "Error",
        description: "Selected quantity exceeds available stock",
        variant: "destructive",
      });
      return;
    }
    setSelectedProduct(product);
    setIsPaymentModalOpen(true);
  };

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load products. Please try again later.",
      variant: "destructive",
    });
  }

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
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => navigate("/marketplace/products/new")}
            >
              <Share2 className="mr-2 h-4 w-4" />
              List New Product
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          ) : (
            <div className="grid gap-6">
              {products?.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="overflow-hidden">
                    {product.image_url && (
                      <img 
                        src={product.image_url} 
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl text-green-800">{product.title}</CardTitle>
                      <CardDescription className="text-green-600">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-600">
                          <strong>Price:</strong> BWP {product.price} per {product.unit_type}
                        </p>
                        <p className="text-gray-600">
                          <strong>Available:</strong> {product.quantity} {product.unit_type}
                        </p>
                        <p className="text-gray-600">
                          <strong>Seller:</strong> {product.seller?.full_name || "Anonymous"}
                        </p>
                        <p className="text-gray-600">
                          <strong>Location:</strong> {product.location}
                        </p>
                        
                        <div className="flex items-center space-x-4 mt-4">
                          <span className="text-gray-600"><strong>Quantity:</strong></span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(product.id, -1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {quantities[product.id] || 1}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(product.id, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 font-semibold mt-2">
                          <strong>Total:</strong> BWP {product.price * (quantities[product.id] || 1)}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handlePurchase(product)}
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
          )}
        </motion.div>
      </div>

      {selectedProduct && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedProduct(null);
          }}
          courseName={`${selectedProduct.title} (${quantities[selectedProduct.id] || 1} ${selectedProduct.unit_type})`}
          price={selectedProduct.price * (quantities[selectedProduct.id] || 1)}
          confirmationComponent={MarketplacePaymentConfirmation}
        />
      )}
      
      <BottomNav />
    </div>
  );
};

export default Products;