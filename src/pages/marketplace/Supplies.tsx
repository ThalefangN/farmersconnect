import { motion } from "framer-motion";
import { ArrowLeft, Package, Share2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/marketplace/ProductCard";

const Supplies = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: supplies, isLoading, error } = useQuery({
    queryKey: ['supplies'],
    queryFn: async () => {
      console.log('Fetching supplies...');
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          seller:profiles(full_name)
        `)
        .eq('unit_type', 'supply')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching supplies:', error);
        throw error;
      }

      console.log('Supplies fetched:', data);
      return data;
    }
  });

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load supplies. Please try again later.",
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
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => navigate("/marketplace/supplies/new")}
            >
              <Share2 className="mr-2 h-4 w-4" />
              List New Supply
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          ) : (
            <div className="grid gap-6">
              {supplies?.map((supply) => (
                <motion.div
                  key={supply.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <ProductCard product={supply} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Supplies;