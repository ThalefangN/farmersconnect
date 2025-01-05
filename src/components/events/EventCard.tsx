import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Trash2 } from "lucide-react";

interface EventCardProps {
  event: any;
  currentUserId: string | null;
  onDelete: (eventId: string) => void;
  onRegister: (event: any) => void;
  onViewRegistrations: (event: any) => void;
}

const EventCard = ({ 
  event, 
  currentUserId, 
  onDelete, 
  onRegister, 
  onViewRegistrations 
}: EventCardProps) => {
  return (
    <Card className="overflow-hidden">
      {event.image_url && (
        <div className="w-full h-48 md:h-64 overflow-hidden">
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
          {event.contact_phone && currentUserId === event.organizer_id && (
            <p className="text-gray-600">
              <strong>Contact Phone:</strong> {event.contact_phone}
            </p>
          )}
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
        <div className="flex flex-col sm:flex-row gap-2">
          {currentUserId === event.organizer_id ? (
            <>
              <Button 
                variant="outline"
                onClick={() => onViewRegistrations(event)}
                className="flex-1"
              >
                <Users className="mr-2 h-4 w-4" />
                View Registrations
              </Button>
              <Button 
                variant="destructive"
                onClick={() => onDelete(event.id)}
                className="flex-1"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Event
              </Button>
            </>
          ) : (
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => onRegister(event)}
            >
              Register Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;