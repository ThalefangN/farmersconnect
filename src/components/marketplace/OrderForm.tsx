import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    price: number;
    user_id: string;
    quantity: number;
  };
  selectedQuantity: number;
}

const OrderForm = ({ isOpen, onClose, product, selectedQuantity }: OrderFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    whatsappNumber: "",
    location: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const totalAmount = product.price * selectedQuantity;

      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          product_id: product.id,
          buyer_id: user.id,
          seller_id: product.user_id,
          quantity: selectedQuantity,
          total_amount: totalAmount,
          delivery_address: formData.location,
          whatsapp_number: formData.whatsappNumber,
          status: 'pending'
        });

      if (orderError) throw orderError;

      toast({
        title: "Order Submitted Successfully!",
        description: "The seller has been notified and will review your order.",
      });

      onClose();
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
            <Input
              id="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Delivery Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              required
            />
          </div>
          <div className="pt-4 space-y-2">
            <div className="font-medium">Order Summary:</div>
            <div className="text-sm text-muted-foreground">
              <div>Product: {product.title}</div>
              <div>Quantity: {selectedQuantity}</div>
              <div>Total Amount: BWP {(product.price * selectedQuantity).toFixed(2)}</div>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              "Confirm Order"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;