import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload } from "lucide-react";
import { uploadImage } from "@/utils/fileUpload";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    price: number;
    user_id: string;
    quantity: number;
    unit_type: string;
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
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofOfPayment(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const totalAmount = product.price * selectedQuantity;

      // Upload proof of payment if provided
      let proofOfPaymentUrl = null;
      if (proofOfPayment) {
        proofOfPaymentUrl = await uploadImage(proofOfPayment, 'payment_proofs');
      }

      // Create order
      const { error: orderError, data: orderData } = await supabase
        .from('orders')
        .insert({
          product_id: product.id,
          buyer_id: user.id,
          seller_id: product.user_id,
          quantity: selectedQuantity,
          total_amount: totalAmount,
          delivery_address: formData.location,
          whatsapp_number: formData.whatsappNumber,
          status: 'pending',
          delivery_type: 'standard',
          proof_of_payment_url: proofOfPaymentUrl
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-order-confirmation', {
        body: {
          to: user.email,
          orderDetails: {
            id: orderData.id,
            title: product.title,
            quantity: selectedQuantity,
            unit_type: product.unit_type,
            totalAmount: totalAmount.toFixed(2),
            deliveryType: 'standard',
            deliveryAddress: formData.location
          }
        }
      });

      if (emailError) {
        console.error('Error sending confirmation email:', emailError);
      }

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
          <div className="space-y-2">
            <Label htmlFor="proofOfPayment">Proof of Payment</Label>
            <Input
              id="proofOfPayment"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
              required
            />
            <p className="text-sm text-muted-foreground">
              Please upload a screenshot of your payment confirmation
            </p>
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