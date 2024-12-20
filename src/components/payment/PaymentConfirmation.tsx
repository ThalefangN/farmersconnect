import { Check } from "lucide-react";
import { motion } from "framer-motion";

const PaymentConfirmation = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex flex-col items-center justify-center py-8 space-y-4"
    >
      <div className="rounded-full bg-green-100 p-3">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-center">
        Payment Submitted Successfully!
      </h3>
      <p className="text-center text-muted-foreground max-w-sm">
        Your payment is being processed. We will confirm your enrollment within 24 hours.
        You will receive a notification once your payment is verified.
      </p>
      <div className="bg-muted p-4 rounded-lg mt-4 text-sm">
        <p className="font-semibold">Next Steps:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Check your email for payment receipt</li>
          <li>Allow up to 24 hours for payment verification</li>
          <li>You'll get access to course materials after verification</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default PaymentConfirmation;