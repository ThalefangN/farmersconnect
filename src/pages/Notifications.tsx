import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import EquipmentRequestNotification from "@/components/notifications/EquipmentRequestNotification";
import OrderNotification from "@/components/notifications/OrderNotification";

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

  const { data: orders, refetch: refetchOrders } = useQuery({
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
      return data;
    },
    enabled: !!userId
  });

  const { data: equipmentRequests } = useQuery({
    queryKey: ['equipment-requests', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('equipment_requests')
        .select(`
          *,
          equipment:equipment(name, type, price, owner_id)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
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
        const { data: productData, error: fetchError } = await supabase
          .from('products')
          .select('quantity')
          .eq('id', order.product_id)
          .single();

        if (fetchError) throw fetchError;

        const newQuantity = productData.quantity - order.quantity;

        const { error: productError } = await supabase
          .from('products')
          .update({ quantity: newQuantity })
          .eq('id', order.product_id);

        if (productError) throw productError;
      }

      toast({
        title: `Order ${action === 'approve' ? 'Approved' : 'Declined'}`,
        description: `You have ${action === 'approve' ? 'approved' : 'declined'} the order.`,
      });

      refetchOrders();
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
            {equipmentRequests?.map((request) => (
              <EquipmentRequestNotification key={request.id} request={request} />
            ))}

            {orders?.map((order) => (
              <OrderNotification 
                key={order.id} 
                order={order}
                currentUserId={userId}
                onOrderAction={handleOrderAction}
              />
            ))}
          </div>
        </ScrollArea>
      </motion.div>
      <BottomNav />
    </div>
  );
};

export default Notifications;