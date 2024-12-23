import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface InquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  itemType: 'rent' | 'sale';
  equipmentId?: string;
}

const InquiryDialog = ({ isOpen, onClose, itemTitle, itemType, equipmentId }: InquiryDialogProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.location.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('equipment_requests')
        .insert({
          equipment_id: equipmentId,
          user_id: user.id,
          full_name: formData.fullName,
          phone: formData.phone,
          location: formData.location,
          message: formData.message,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Request Sent",
        description: `Your ${itemType} request has been sent successfully. The owner will contact you soon.`,
      });
      setFormData({ fullName: "", phone: "", location: "", message: "" });
      onClose();
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request {itemType === 'rent' ? 'Rental' : 'Purchase'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Requesting: {itemTitle}
          </p>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter your location"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Enter additional details or questions..."
              className="min-h-[100px]"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="flex-1">
              Submit Request
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