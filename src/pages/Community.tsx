import { motion } from "framer-motion";
import { Users, Calendar, UserPlus, MessageSquare } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Local Groups",
      description: "Join farming groups in your area",
      icon: Users,
      details: "Connect with farmers in your region, share experiences, and collaborate on projects",
      path: "/community/groups"
    },
    {
      title: "Events",
      description: "Upcoming farming events",
      icon: Calendar,
      details: "Discover and participate in agricultural workshops, seminars, and community gatherings",
      path: "/community/events"
    },
    {
      title: "Mentorship",
      description: "Connect with experienced farmers",
      icon: UserPlus,
      details: "Learn from seasoned farmers through our mentorship program",
      path: "/community/mentorship"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-green-700" />
            <h1 className="text-2xl font-bold text-green-800">Community</h1>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-gray-600 text-lg">
              Join our thriving farming community. Connect with fellow farmers, 
              share knowledge, and grow together through various community initiatives.
            </p>
          </div>

          <div className="grid gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => navigate(feature.path)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <feature.icon className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-green-800">{feature.title}</CardTitle>
                        <CardDescription className="text-green-600">{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.details}</p>
                    <Button 
                      className="mt-4 w-full bg-green-600 hover:bg-green-700"
                      onClick={() => navigate(feature.path)}
                    >
                      Join {feature.title}
                    </Button>
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

export default Community;