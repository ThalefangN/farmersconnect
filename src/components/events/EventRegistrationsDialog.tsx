import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Phone, Users } from "lucide-react";

interface EventRegistrationsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}

const EventRegistrationsDialog = ({ isOpen, onClose, eventId }: EventRegistrationsDialogProps) => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchRegistrations();
    }
  }, [isOpen, eventId]);

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select(`
          *,
          user:profiles(full_name, location)
        `)
        .eq('event_id', eventId);

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Event Registrations
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {isLoading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : registrations.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Total Registrations: {registrations.length}
              </p>
              <div className="divide-y">
                {registrations.map((registration) => (
                  <div key={registration.id} className="py-3">
                    <p className="font-medium">{registration.user?.full_name}</p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Location: {registration.user?.location || 'Not specified'}</p>
                      {registration.phone_number && (
                        <p className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {registration.phone_number}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              No registrations yet
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationsDialog;