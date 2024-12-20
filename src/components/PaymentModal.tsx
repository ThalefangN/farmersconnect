import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, Building2, Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  price: number;
}

const PaymentModal = ({ isOpen, onClose, courseName, price }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [accountName, setAccountName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate based on payment method
    if (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv)) {
      toast({
        title: "Error",
        description: "Please fill in all card details",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "bank" && (!accountName || !cardNumber)) {
      toast({
        title: "Error",
        description: "Please fill in all bank details",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "mobile" && !mobileNumber) {
      toast({
        title: "Error",
        description: "Please enter mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);

    toast({
      title: "Success!",
      description: "You have successfully enrolled in the course.",
    });

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setPaymentMethod("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setAccountName("");
      setMobileNumber("");
    }, 2000);
  };

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  maxLength={3}
                  type="password"
                />
              </div>
            </div>
          </div>
        );
      case "bank":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Holder Name</Label>
              <Input
                id="accountName"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter account holder name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter account number"
              />
            </div>
          </div>
        );
      case "mobile":
        return (
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter mobile number"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enroll in {courseName}</DialogTitle>
        </DialogHeader>
        
        <AnimatePresence>
          {!isSuccess ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label>Course Price</Label>
                <div className="text-lg font-semibold">BWP {price.toFixed(2)}</div>
              </div>

              <div className="space-y-4">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid gap-4"
                >
                  <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="h-4 w-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                      <Building2 className="h-4 w-4" />
                      Bank Transfer
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <Label htmlFor="mobile" className="flex items-center gap-2 cursor-pointer">
                      <Smartphone className="h-4 w-4" />
                      Mobile Money
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {renderPaymentFields()}

              <Button
                type="submit"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Complete Payment"}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-center">
                Payment Successful!
              </h3>
              <p className="text-center text-muted-foreground mt-2">
                You are now enrolled in the course.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;