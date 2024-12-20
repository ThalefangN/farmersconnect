import { Check } from "lucide-react";
import { motion } from "framer-motion";

const PaymentConfirmation = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="flex flex-col items-center justify-center py-8 space-y-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="rounded-full bg-green-100 p-3"
      >
        <Check className="h-8 w-8 text-green-600" />
      </motion.div>
      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-center"
      >
        Payment Submitted Successfully!
      </motion.h3>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-muted-foreground max-w-sm"
      >
        Your payment is being processed. We will confirm your enrollment within 24 hours.
        You will receive a notification once your payment is verified.
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-muted p-4 rounded-lg mt-4 text-sm"
      >
        <p className="font-semibold">Next Steps:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Check your email for payment receipt</li>
          <li>Allow up to 24 hours for payment verification</li>
          <li>You'll get access to course materials after verification</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default PaymentConfirmation;