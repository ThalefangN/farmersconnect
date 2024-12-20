import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Request {
  id: string;
  requesterName: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  message: string;
}

interface RequestsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  requests: readonly Request[];  // Changed to accept readonly array
}

const RequestsDialog = ({ isOpen, onClose, requests }: RequestsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Equipment Requests</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{request.requesterName}</h4>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{request.date}</p>
                <p className="text-gray-700">{request.message}</p>
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    disabled={request.status !== 'pending'}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    disabled={request.status !== 'pending'}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default RequestsDialog;