import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface EventRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
  onRegistrationComplete: () => void;
}

const EventRegistrationDialog = ({ 
  isOpen, 
  onClose, 
  event,
  onRegistrationComplete 
}: EventRegistrationDialogProps) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('event_registrations')
        .insert({
          event_id: event.id,
          user_id: user.id,
        });

      if (error) throw error;

      setShowSuccess(true);
      onRegistrationComplete();
      
      // Show success toast after animation
      setTimeout(() => {
        toast({
          title: "Registration Successful",
          description: "You have been registered for the event.",
        });
        onClose();
        setShowSuccess(false);
      }, 2000);

    } catch (error) {
      console.error('Error registering for event:', error);
      toast({
        title: "Error",
        description: "Failed to register for event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <AnimatePresence>
          {!showSuccess ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Confirm Event Registration
                </DialogTitle>
                <DialogDescription className="pt-4 space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700 text-sm">
                    Please note that event registrations cannot be cancelled once confirmed.
                    The event organizer will be notified of your registration.
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Event Details:</h4>
                    <p>Title: {event.title}</p>
                    <p>Date: {format(new Date(event.date), 'PPP')}</p>
                    <p>Time: {event.time}</p>
                    <p>Location: {event.location}</p>
                    <p>Organizer: {event.organizer?.full_name}</p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleRegister}
                      className="flex-1"
                      disabled={isRegistering}
                    >
                      Confirm Registration
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center justify-center p-8 text-center"
            >
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
              <p className="text-gray-600">
                You have been registered for {event.title}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationDialog;