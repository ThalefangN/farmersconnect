import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface OfflineAlertProps {
  show: boolean;
}

const OfflineAlert = ({ show }: OfflineAlertProps) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md"
          >
            <Alert variant="default" className="border-2 shadow-lg">
              <div className="flex flex-col items-center text-center space-y-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="p-4 bg-secondary rounded-full"
                >
                  <WifiOff className="h-8 w-8 text-primary" />
                </motion.div>
                
                <AlertTitle className="text-xl font-semibold">
                  You're Offline
                </AlertTitle>
                
                <AlertDescription className="text-base">
                  Don't worry! You can still access cached content. 
                  We'll automatically reconnect when you're back online.
                </AlertDescription>

                <Button 
                  onClick={handleRefresh}
                  variant="outline"
                  className="hover-lift press-effect touch-target"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </Alert>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineAlert;