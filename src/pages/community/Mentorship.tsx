import { motion } from "framer-motion";
import { ArrowLeft, UserPlus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const Mentorship = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const mentors = [
    {
      title: "Expert Livestock Farmer",
      name: "John Mokgosi",
      experience: "15 years",
      specialization: "Cattle Farming",
      availability: "Weekends",
      location: "Gaborone",
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf"
    },
    {
      title: "Organic Farming Specialist",
      name: "Sarah Phiri",
      experience: "10 years",
      specialization: "Organic Vegetables",
      availability: "Weekdays",
      location: "Maun",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
    }
  ];

  const handleConnect = (mentor: string) => {
    toast({
      title: "Request Sent",
      description: `Your mentorship request has been sent to ${mentor}.`,
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
              <UserPlus className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Mentorship Program</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Connect with Mentors</h2>
            <p className="text-gray-600 mb-4">
              Learn from experienced farmers through our mentorship program.
              Get guidance and support to improve your farming practices.
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Become a Mentor
            </Button>
          </div>

          <div className="grid gap-6">
            {mentors.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="flex items-center p-4 bg-green-50">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-green-800">{item.title}</h3>
                      <p className="text-green-600">{item.name}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600"><strong>Experience:</strong> {item.experience}</p>
                      <p className="text-gray-600"><strong>Specialization:</strong> {item.specialization}</p>
                      <p className="text-gray-600"><strong>Availability:</strong> {item.availability}</p>
                      <p className="text-gray-600"><strong>Location:</strong> {item.location}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleConnect(item.name)}
                      >
                        Request Mentorship
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
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

export default Mentorship;