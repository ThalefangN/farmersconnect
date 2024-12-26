import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Check, X } from "lucide-react";

interface RequestsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  equipmentId?: string;
}

const RequestsDialog = ({ isOpen, onClose, equipmentId }: RequestsDialogProps) => {
  const { toast } = useToast();

  const { data: requests, refetch } = useQuery({
    queryKey: ['equipment-requests', equipmentId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('equipment_requests')
        .select(`
          *,
          equipment:equipment(name, type, price, owner_id)
        `)
        .eq('equipment.owner_id', user.id);

      if (error) throw error;
      return data;
    },
    enabled: isOpen,
  });

  const handleAction = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      const { error } = await supabase
        .from('equipment_requests')
        .update({ status: action === 'approve' ? 'approved' : 'rejected' })
        .eq('id', requestId);

      if (error) throw error;

      if (action === 'approve') {
        // Update equipment status to indicate it's being rented/sold
        const request = requests?.find(r => r.id === requestId);
        if (request) {
          await supabase
            .from('equipment')
            .update({ status: 'Not Available' })
            .eq('id', request.equipment_id);
        }
      }

      toast({
        title: "Success",
        description: `Request ${action}ed successfully`,
      });

      refetch();
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
      toast({
        title: "Error",
        description: `Failed to ${action} request. Please try again.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Equipment Requests</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {requests?.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{request.full_name}</h4>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {format(new Date(request.created_at), 'PPP')}
                </p>
                <p className="text-sm text-gray-600">Phone: {request.phone_number || request.phone}</p>
                <p className="text-sm text-gray-600">Location: {request.location}</p>
                {request.rental_days && (
                  <p className="text-sm text-gray-600">Rental Days: {request.rental_days}</p>
                )}
                {request.preferred_delivery_date && (
                  <p className="text-sm text-gray-600">
                    Preferred Delivery: {format(new Date(request.preferred_delivery_date), 'PPP')}
                  </p>
                )}
                {request.payment_method && (
                  <p className="text-sm text-gray-600">Payment Method: {request.payment_method}</p>
                )}
                {request.message && (
                  <p className="text-gray-700">{request.message}</p>
                )}
                {request.status === 'pending' && (
                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => handleAction(request.id, 'approve')}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      onClick={() => handleAction(request.id, 'reject')}
                      variant="destructive"
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {requests?.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No requests found
              </div>
            )}
          </div>
        </ScrollArea>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default RequestsDialog;