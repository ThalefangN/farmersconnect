import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

interface ContactDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  ownerDetails: {
    name: string;
    phone: string;
    email: string;
    location: string;
  };
}

const ContactDetailsDialog = ({ isOpen, onClose, ownerDetails }: ContactDetailsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Details</DialogTitle>
          <DialogDescription>
            Contact information for {ownerDetails.name}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-green-600" />
            <span>{ownerDetails.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-green-600" />
            <span>{ownerDetails.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-green-600" />
            <span>{ownerDetails.location}</span>
          </div>
        </div>
        <Button onClick={onClose} className="w-full">Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailsDialog;