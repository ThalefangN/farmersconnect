import { useState } from "react";
import { Button } from "@/components/ui/button";
import PhoneInput from "@/components/PhoneInput";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PhoneUpdates = ({ userId }: { userId: string }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ phone_text: phoneNumber })
        .eq('id', userId);

      if (error) throw error;

      // Send welcome SMS using Edge Function
      const { error: smsError } = await supabase.functions.invoke('send-welcome-sms', {
        body: { phoneNumber }
      });

      if (smsError) throw smsError;

      toast({
        title: "Success",
        description: "You've been subscribed to updates successfully!",
      });
    } catch (error) {
      console.error('Error updating phone number:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe to updates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PhoneInput
        value={phoneNumber}
        onChange={setPhoneNumber}
        placeholder="Enter phone number for updates"
      />
      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        Get Updates
      </Button>
    </form>
  );
};

export default PhoneUpdates;