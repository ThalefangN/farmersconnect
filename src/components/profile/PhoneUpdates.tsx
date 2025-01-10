import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Phone } from "lucide-react";

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
      <div className="relative">
        <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number for updates"
          className="pl-10"
          required
        />
      </div>
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