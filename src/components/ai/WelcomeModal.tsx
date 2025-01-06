import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartTrial = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to start your trial",
          variant: "destructive",
        });
        navigate("/signin");
        return;
      }

      // Start the trial by setting the trial start date
      const { error } = await supabase
        .from('profiles')
        .update({ 
          ai_trial_start: new Date().toISOString(),
          ai_trial_active: true
        })
        .eq('id', session.user.id);

      if (error) throw error;

      toast({
        title: "Trial started!",
        description: "Enjoy 7 days of premium AI features",
      });
      onClose();
    } catch (error) {
      console.error('Error starting trial:', error);
      toast({
        title: "Error",
        description: "Failed to start trial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoPremium = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to subscribe",
          variant: "destructive",
        });
        navigate("/signin");
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { mode: 'subscription' }
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to start subscription process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome to AI Assistant Premium
          </DialogTitle>
          <DialogDescription className="text-center space-y-2 pt-4">
            <p className="text-lg">
              Get personalized farming advice and insights powered by advanced AI
            </p>
            <div className="bg-green-50 p-4 rounded-lg mt-4">
              <h3 className="font-semibold text-green-800">Premium Features:</h3>
              <ul className="text-green-700 text-sm mt-2 space-y-1">
                <li>• Unlimited AI conversations</li>
                <li>• Advanced farming insights</li>
                <li>• Crop analysis</li>
                <li>• Personalized recommendations</li>
              </ul>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-6">
          <Button
            onClick={handleGoPremium}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            Go Premium - Only P99/month
          </Button>
          <Button
            onClick={handleStartTrial}
            variant="outline"
            className="w-full"
            disabled={isLoading}
          >
            Start 7-Day Free Trial
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;