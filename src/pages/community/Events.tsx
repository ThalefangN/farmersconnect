import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const Events = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const events = [
    {
      title: "Agricultural Technology Workshop",
      description: "Learn about modern farming technologies",
      date: "March 15, 2024",
      time: "9:00 AM - 2:00 PM",
      location: "Gaborone Agricultural Center",
      organizer: "Botswana Farming Association",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7"
    },
    {
      title: "Sustainable Farming Seminar",
      description: "Expert talks on eco-friendly farming",
      date: "March 20, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Francistown Convention Center",
      organizer: "Green Farming Initiative",
      image: "https://images.unsplash.com/photo-1592991538534-788c605766ce"
    }
  ];

  const handleRegister = (event: string) => {
    toast({
      title: "Registration Successful",
      description: `You have been registered for ${event}. Check your email for details.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
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
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>

          <div className="grid gap-6">
            {events.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800">{item.title}</CardTitle>
                    <CardDescription className="text-green-600">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600"><strong>Date:</strong> {item.date}</p>
                      <p className="text-gray-600"><strong>Time:</strong> {item.time}</p>
                      <p className="text-gray-600"><strong>Location:</strong> {item.location}</p>
                      <p className="text-gray-600"><strong>Organizer:</strong> {item.organizer}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleRegister(item.title)}
                      >
                        Register Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        More Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Events;