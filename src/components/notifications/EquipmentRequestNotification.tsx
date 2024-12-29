import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface EquipmentRequestNotificationProps {
  request: {
    id: string;
    equipment: {
      name: string;
      type: string;
      price: string;
    };
    location: string;
    message?: string;
    status: string;
    created_at: string;
  };
}

const EquipmentRequestNotification = ({ request }: EquipmentRequestNotificationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Equipment Request: {request.equipment.name}</h3>
              <Badge 
                variant={
                  request.status === 'pending' ? 'default' :
                  request.status === 'approved' ? 'success' : 'destructive'
                }
              >
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Type: {request.equipment.type}</p>
              <p>Price: BWP {request.equipment.price}</p>
              <p>Location: {request.location}</p>
              {request.message && (
                <p className="mt-2 p-2 bg-muted rounded-md">{request.message}</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-4 w-4" />
                <span className="text-xs">
                  {format(new Date(request.created_at), 'PPp')}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EquipmentRequestNotification;