import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Plus, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BottomNav from "@/components/BottomNav";
import CreateEventDialog from "@/components/events/CreateEventDialog";
import EventRegistrationDialog from "@/components/events/EventRegistrationDialog";
import EventRegistrationsDialog from "@/components/events/EventRegistrationsDialog";
import { format } from "date-fns";

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
      <div className="p-4 space-y-6">
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

          <div className="grid gap-6">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="overflow-hidden">
                  {event.image_url && (
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800">{event.title}</CardTitle>
                    <CardDescription className="text-green-600">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600">
                        <strong>Date:</strong> {format(new Date(event.date), 'PPP')}
                      </p>
                      <p className="text-gray-600">
                        <strong>Time:</strong> {event.time}
                      </p>
                      <p className="text-gray-600">
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p className="text-gray-600">
                        <strong>Organizer:</strong> {event.organizer?.full_name || 'Anonymous'}
                      </p>
                      {event.topic && (
                        <p className="text-gray-600">
                          <strong>Topic:</strong> {event.topic}
                        </p>
                      )}
                      {currentUserId === event.organizer_id && (
                        <p className="text-gray-600">
                          <strong>Registrations:</strong> {event.current_registrations || 0}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {currentUserId === event.organizer_id ? (
                        <>
                          <Button 
                            variant="outline"
                            onClick={() => handleViewRegistrations(event)}
                            className="flex-1"
                          >
                            <Users className="mr-2 h-4 w-4" />
                            View Registrations
                          </Button>
                          <Button 
                            variant="destructive"
                            onClick={() => handleDelete(event.id)}
                            className="flex-1"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Event
                          </Button>
                        </>
                      ) : (
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleRegistrationClick(event)}
                        >
                          Register Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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