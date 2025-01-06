import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Share2, Loader2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/marketplace/ProductCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

const Products = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);

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
      return data;
    }
  });

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

          <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Sell Your Products</h2>
            <p className="text-gray-600 mb-4">
              List your farm products for sale. Connect directly with buyers
              and get the best prices for your produce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => navigate("/marketplace/products/new")}
              >
                <Share2 className="mr-2 h-4 w-4" />
                List New Product
              </Button>
              <Button
                className="flex-1 bg-amber-600 hover:bg-amber-700"
                onClick={() => setShowPremiumDialog(true)}
              >
                <Crown className="mr-2 h-4 w-4" />
                Premium Listing
              </Button>
            </div>
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
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-amber-700">
              Premium Product Listing
            </DialogTitle>
            <DialogDescription className="text-center space-y-4 pt-4">
              <div className="bg-amber-50 p-6 rounded-lg">
                <Crown className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <h3 className="font-semibold text-amber-800 text-lg mb-2">
                  Boost Your Product Visibility!
                </h3>
                <ul className="text-amber-700 space-y-2">
                  <li>• Featured placement at the top of search results</li>
                  <li>• Professional product photography service</li>
                  <li>• Detailed analytics and buyer insights</li>
                  <li>• Priority customer support</li>
                  <li>• Social media promotion</li>
                </ul>
              </div>
              <p className="text-gray-600 italic">
                Coming soon! Be among the first to know when premium listings launch.
              </p>
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => {
              setShowPremiumDialog(false);
              toast({
                title: "Coming Soon!",
                description: "We'll notify you when premium listings become available.",
              });
            }}
            className="w-full bg-amber-600 hover:bg-amber-700"
          >
            Notify Me When Available
          </Button>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Products;