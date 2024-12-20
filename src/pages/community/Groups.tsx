import { motion } from "framer-motion";
import { ArrowLeft, Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const Groups = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const groups = [
    {
      title: "Gaborone Farmers Association",
      description: "Local farmers supporting each other",
      members: 156,
      location: "Gaborone",
      meetingDay: "Every Saturday",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7"
    },
    {
      title: "Sustainable Farming Network",
      description: "Focus on eco-friendly farming practices",
      members: 89,
      location: "Francistown",
      meetingDay: "First Sunday of month",
      image: "https://images.unsplash.com/photo-1592991538534-788c605766ce"
    }
  ];

  const handleJoin = (group: string) => {
    toast({
      title: "Request Sent",
      description: `Your request to join ${group} has been sent to the group admin.`,
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
              <Users className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Local Groups</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Join a Farming Group</h2>
            <p className="text-gray-600 mb-4">
              Connect with local farmers in your area. Share experiences,
              knowledge, and support each other in your farming journey.
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Create New Group
            </Button>
          </div>

          <div className="grid gap-6">
            {groups.map((item, index) => (
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
                      <p className="text-gray-600"><strong>Members:</strong> {item.members}</p>
                      <p className="text-gray-600"><strong>Location:</strong> {item.location}</p>
                      <p className="text-gray-600"><strong>Meetings:</strong> {item.meetingDay}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleJoin(item.title)}
                      >
                        Join Group
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Details
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

export default Groups;