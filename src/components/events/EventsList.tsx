import { motion } from "framer-motion";
import EventCard from "./EventCard";

interface EventsListProps {
  events: any[];
  currentUserId: string | null;
  onDelete: (eventId: string) => void;
  onRegister: (event: any) => void;
  onViewRegistrations: (event: any) => void;
}

const EventsList = ({
  events,
  currentUserId,
  onDelete,
  onRegister,
  onViewRegistrations
}: EventsListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <EventCard
            event={event}
            currentUserId={currentUserId}
            onDelete={onDelete}
            onRegister={onRegister}
            onViewRegistrations={onViewRegistrations}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default EventsList;