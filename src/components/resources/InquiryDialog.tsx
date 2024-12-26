import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PhoneInput from "@/components/PhoneInput";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";

interface InquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  itemType: 'rent' | 'sale';
  equipmentId?: string;
  pricePerDay?: number;
}

const InquiryDialog = ({ 
  isOpen, 
  onClose, 
  itemTitle, 
  itemType,
  equipmentId,
  pricePerDay = 0
}: InquiryDialogProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsappNumber: "",
    location: "",
    message: "",
    rentalDays: "",
    deliveryDate: null as Date | null,
    paymentMethod: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const totalAmount = itemType === 'rent' && formData.rentalDays 
    ? pricePerDay * parseInt(formData.rentalDays)
    : 0;

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
      setIsSubmitting(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('equipment_requests')
        .insert({
          equipment_id: equipmentId,
          user_id: user.id,
          full_name: formData.fullName,
          phone: formData.phone,
          phone_number: formData.whatsappNumber,
          location: formData.location,
          message: formData.message,
          rental_days: itemType === 'rent' ? parseInt(formData.rentalDays) : null,
          preferred_delivery_date: formData.deliveryDate?.toISOString(),
          payment_method: formData.paymentMethod,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Request Sent",
        description: `Your ${itemType} request has been sent successfully. The owner will contact you soon.`,
      });
      
      setFormData({
        fullName: "",
        phone: "",
        whatsappNumber: "",
        location: "",
        message: "",
        rentalDays: "",
        deliveryDate: null,
        paymentMethod: ""
      });
      onClose();
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            <PhoneInput
              value={formData.phone}
              onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp Number (Optional)</Label>
            <PhoneInput
              value={formData.whatsappNumber}
              onChange={(value) => setFormData(prev => ({ ...prev, whatsappNumber: value }))}
              placeholder="WhatsApp number"
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
          {itemType === 'rent' && (
            <div className="space-y-2">
              <Label htmlFor="rentalDays">Number of Days *</Label>
              <Input
                id="rentalDays"
                type="number"
                value={formData.rentalDays}
                onChange={(e) => setFormData(prev => ({ ...prev, rentalDays: e.target.value }))}
                placeholder="Enter number of days"
              />
              {totalAmount > 0 && (
                <p className="text-sm text-green-600 font-medium mt-1">
                  Total Amount: BWP {totalAmount.toFixed(2)}
                </p>
              )}
            </div>
          )}
          <div className="space-y-2">
            <Label>Preferred Delivery Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.deliveryDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.deliveryDate ? format(formData.deliveryDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.deliveryDate}
                  onSelect={(date) => setFormData(prev => ({ ...prev, deliveryDate: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <PaymentMethodSelector
            value={formData.paymentMethod}
            onChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
          />
          <div className="space-y-2">
            <Label htmlFor="message">Additional Notes</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Enter any additional details or questions..."
              className="min-h-[100px]"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Request"
              )}
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