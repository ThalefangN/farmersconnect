import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface InquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
}

const InquiryDialog = ({ isOpen, onClose, itemTitle }: InquiryDialogProps) => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter your inquiry message",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Inquiry Sent",
      description: "Your inquiry has been sent successfully. The owner will contact you soon.",
    });
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Make an Inquiry</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Inquiring about: {itemTitle}
          </p>
          <Textarea
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[150px]"
          />
          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="flex-1">
              Send Inquiry
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryDialog;