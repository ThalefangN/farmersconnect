import { motion } from "framer-motion";
import { Bell, Clock, Check, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface Order {
  id: string;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  quantity: number;
  total_amount: number;
  status: string;
  whatsapp_number: string;
  delivery_address: string;
  created_at: string;
  product: {
    id: string;
    title: string;
    price: number;
    unit_type: string;
  };
  buyer: {
    full_name: string;
  };
}

const Notifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    checkUser();
  }, []);

  const { data: orders, refetch } = useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          product:products(id, title, price, unit_type),
          buyer:profiles!buyer_id(full_name)
        `)
        .or(`seller_id.eq.${userId},buyer_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    enabled: !!userId
  });

  const handleOrderAction = async (orderId: string, action: 'approve' | 'decline') => {
    try {
      const order = orders?.find(o => o.id === orderId);
      if (!order) return;

      const { error: orderError } = await supabase
        .from('orders')
        .update({ status: action === 'approve' ? 'approved' : 'declined' })
        .eq('id', orderId);

      if (orderError) throw orderError;

      if (action === 'approve') {
        // Get current product quantity first
        const { data: productData, error: fetchError } = await supabase
          .from('products')
          .select('quantity')
          .eq('id', order.product_id)
          .single();

        if (fetchError) throw fetchError;

        const newQuantity = productData.quantity - order.quantity;

        const { error: productError } = await supabase
          .from('products')
          .update({ 
            quantity: newQuantity
          })
          .eq('id', order.product_id);

        if (productError) throw productError;
      }

      toast({
        title: `Order ${action === 'approve' ? 'Approved' : 'Declined'}`,
        description: `You have ${action === 'approve' ? 'approved' : 'declined'} the order.`,
      });

      refetch();
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
          </h1>
        </div>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            {orders?.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{order.product.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Quantity: {order.quantity} {order.product.unit_type}</p>
                        <p>Total: BWP {order.total_amount}</p>
                        <p>Buyer: {order.buyer.full_name}</p>
                        <p>WhatsApp: {order.whatsapp_number}</p>
                        <p>Delivery Address: {order.delivery_address}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-xs">
                            {new Date(order.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {order.status === 'pending' && userId === order.seller_id && (
                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={() => handleOrderAction(order.id, 'approve')}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleOrderAction(order.id, 'decline')}
                            variant="destructive"
                            className="flex-1"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </motion.div>
      <BottomNav />
    </div>
  );
};

export default Notifications;