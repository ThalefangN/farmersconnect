import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BottomNav from "@/components/BottomNav";
import CreateEventDialog from "@/components/events/CreateEventDialog";
import EventRegistrationDialog from "@/components/events/EventRegistrationDialog";
import EventRegistrationsDialog from "@/components/events/EventRegistrationsDialog";
import EventsList from "@/components/events/EventsList";

const Events = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState<any[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [showRegistrationsDialog, setShowRegistrationsDialog] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    checkUser();
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          organizer:profiles(full_name)
        `)
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRegistrationClick = (event: any) => {
    setSelectedEvent(event);
    setShowRegistrationDialog(true);
  };

  const handleViewRegistrations = (event: any) => {
    setSelectedEvent(event);
    setShowRegistrationsDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => navigate("/community")}>
              <ArrowLeft className="h-6 w-6 text-green-700" />
            </Button>
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Farming Events</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Upcoming Events</h2>
            <p className="text-gray-600 mb-4">
              Discover and participate in agricultural workshops, seminars,
              and community gatherings in your area.
            </p>
            <Button 
              onClick={() => setShowCreateDialog(true)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>

          <EventsList
            events={events}
            currentUserId={currentUserId}
            onDelete={handleDelete}
            onRegister={handleRegistrationClick}
            onViewRegistrations={handleViewRegistrations}
          />
        </motion.div>
      </div>

      <CreateEventDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onEventCreated={fetchEvents}
      />

      {selectedEvent && (
        <>
          <EventRegistrationDialog
            isOpen={showRegistrationDialog}
            onClose={() => {
              setShowRegistrationDialog(false);
              setSelectedEvent(null);
            }}
            event={selectedEvent}
            onRegistrationComplete={fetchEvents}
          />

          <EventRegistrationsDialog
            isOpen={showRegistrationsDialog}
            onClose={() => {
              setShowRegistrationsDialog(false);
              setSelectedEvent(null);
            }}
            eventId={selectedEvent.id}
          />
        </>
      )}
      
      <BottomNav />
    </div>
  );
};

export default Events;