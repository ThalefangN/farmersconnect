import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface OfflineAlertProps {
  show: boolean;
}

const OfflineAlert = ({ show }: OfflineAlertProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-md pointer-events-none"
        >
          <Alert variant="destructive" className="pointer-events-auto">
            <WifiOff className="h-4 w-4" />
            <AlertTitle>You're Offline</AlertTitle>
            <AlertDescription>
              Please connect to the internet to continue using BotseduLearn.
              Only online courses are available while offline.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineAlert;