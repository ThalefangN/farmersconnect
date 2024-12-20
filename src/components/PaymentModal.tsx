import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import PaymentMethodSelector from "./payment/PaymentMethodSelector";
import PaymentDetails from "./payment/PaymentDetails";
import PaymentConfirmation from "./payment/PaymentConfirmation";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  price: number;
}

const PaymentModal = ({ isOpen, onClose, courseName, price }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [fullName, setFullName] = useState("");
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod || !fullName || !proofOfPayment) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
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
      title: "Payment Submitted!",
      description: "Your payment will be verified within 24 hours.",
    });

    // Reset form after 5 seconds and close modal
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setPaymentMethod("");
      setFullName("");
      setProofOfPayment(null);
    }, 5000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Enroll in {courseName}</DialogTitle>
          <DialogDescription>
            Complete your payment details to enroll in this course
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] px-1">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="text-lg font-semibold">Course Price: BWP {price.toFixed(2)}</div>
                </div>

                <PaymentMethodSelector
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                />

                <PaymentDetails
                  paymentMethod={paymentMethod}
                  fullName={fullName}
                  onFullNameChange={setFullName}
                  proofOfPayment={proofOfPayment}
                  onProofOfPaymentChange={setProofOfPayment}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center space-x-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Processing...</span>
                    </motion.div>
                  ) : (
                    "Submit Payment"
                  )}
                </Button>
              </motion.form>
            ) : (
              <PaymentConfirmation />
            )}
          </AnimatePresence>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;