import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Check, X, Phone, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RequestsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  equipmentId?: string;
  userId?: string;
  type?: 'equipment' | 'seeds' | 'land';
}

const RequestsDialog = ({ isOpen, onClose, equipmentId, userId, type }: RequestsDialogProps) => {
  const { toast } = useToast();

  const { data: requests, refetch } = useQuery({
    queryKey: ['equipment-requests', equipmentId, userId, type],
    queryFn: async () => {
      try {
        console.log('Fetching requests for:', { equipmentId, userId, type });
        
        let query = supabase
          .from('equipment_requests')
          .select(`
            *,
            equipment:equipment(name, type, price, owner_id)
          `);

        if (equipmentId) {
          query = query.eq('equipment_id', equipmentId);
        } else if (userId && type) {
          query = query.eq('user_id', userId);
        }

        const { data, error } = await query;

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
    enabled: isOpen && (!!equipmentId || !!userId),
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Equipment Requests</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          {!requests ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{request.full_name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="h-4 w-4" />
                            {request.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            {request.location}
                          </div>
                        </div>
                        <Badge 
                          variant={
                            request.status === 'pending' ? 'default' :
                            request.status === 'approved' ? 'success' : 'destructive'
                          }
                        >
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </div>

                      {request.message && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                          {request.message}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(request.created_at), 'PPp')}
                      </div>

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
                  </CardContent>
                </Card>
              ))}
              {!requests?.length && (
                <div className="text-center text-gray-500 py-8">
                  No requests found
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RequestsDialog;