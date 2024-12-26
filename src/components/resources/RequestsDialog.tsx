import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Check, X } from "lucide-react";
import { format } from "date-fns";

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
      try {
        console.log('Fetching requests for equipment:', equipmentId);
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");
        
        const { data, error } = await supabase
          .from('equipment_requests')
          .select(`
            *,
            equipment:equipment(name, type, price, owner_id)
          `)
          .eq('equipment_id', equipmentId);

        if (error) {
          console.error('Error fetching requests:', error);
          throw error;
        }

        console.log('Fetched requests:', data);
        return data || [];
      } catch (error) {
        console.error('Error in queryFn:', error);
        throw error;
      }
    },
    enabled: isOpen && !!equipmentId,
  });

  const handleAction = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      console.log('Handling action:', action, 'for request:', requestId);
      
      const { error: updateError } = await supabase
        .from('equipment_requests')
        .update({ status: action === 'approve' ? 'approved' : 'rejected' })
        .eq('id', requestId);

      if (updateError) throw updateError;

      if (action === 'approve') {
        // Update equipment status to indicate it's being rented/sold
        const request = requests?.find(r => r.id === requestId);
        if (request) {
          const { error: equipmentError } = await supabase
            .from('equipment')
            .update({ status: 'Not Available' })
            .eq('id', request.equipment_id);

          if (equipmentError) throw equipmentError;
        }
      }

      toast({
        title: "Success",
        description: `Request ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
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

  if (!equipmentId) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Equipment Requests</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {!requests ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{request.full_name}</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(request.created_at), 'PPp')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      request.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : request.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>Phone: {request.phone}</p>
                    <p>Location: {request.location}</p>
                    {request.message && (
                      <p className="mt-2">{request.message}</p>
                    )}
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex gap-2 mt-2">
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
              {!requests?.length && (
                <div className="text-center text-gray-500 py-8">
                  No requests found
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestsDialog;