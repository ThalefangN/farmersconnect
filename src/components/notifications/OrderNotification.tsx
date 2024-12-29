import { format } from "date-fns";
import { Clock, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface OrderNotificationProps {
  order: {
    id: string;
    product: {
      title: string;
      unit_type: string;
    };
    quantity: number;
    total_amount: number;
    buyer: {
      full_name: string;
    };
    whatsapp_number?: string;
    delivery_address?: string;
    status: string;
    created_at: string;
    seller_id: string;
  };
  currentUserId?: string;
  onOrderAction: (orderId: string, action: 'approve' | 'decline') => Promise<void>;
}

const OrderNotification = ({ order, currentUserId, onOrderAction }: OrderNotificationProps) => {
  return (
    <motion.div
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
              {order.whatsapp_number && <p>WhatsApp: {order.whatsapp_number}</p>}
              {order.delivery_address && <p>Delivery Address: {order.delivery_address}</p>}
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-4 w-4" />
                <span className="text-xs">
                  {format(new Date(order.created_at), 'PPp')}
                </span>
              </div>
            </div>
            {order.status === 'pending' && currentUserId === order.seller_id && (
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => onOrderAction(order.id, 'approve')}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => onOrderAction(order.id, 'decline')}
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
  );
};

export default OrderNotification;