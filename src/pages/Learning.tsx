import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Video, Award } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Learning = () => {
  const navigate = useNavigate();

  const resources = [
    {
      title: "Farming Guides",
      description: "Comprehensive step-by-step tutorials",
      icon: BookOpen,
      details: "Access detailed guides on various farming techniques, crop management, and livestock care",
      path: "/learning/guides"
    },
    {
      title: "Video Tutorials",
      description: "Visual learning resources",
      icon: Video,
      details: "Watch expert demonstrations, practical farming tips, and educational content",
      path: "/learning/videos"
    },
    {
      title: "Certification Programs",
      description: "Professional development courses",
      icon: Award,
      details: "Enroll in certified agricultural programs and enhance your farming expertise",
      path: "/learning/certificates"
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
            <GraduationCap className="h-6 w-6 text-green-700" />
            <h1 className="text-2xl font-bold text-green-800">Learning Hub</h1>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-gray-600 text-lg">
              Enhance your farming knowledge through our comprehensive learning resources. 
              Access expert-curated content and practical farming education.
            </p>
          </div>

          <div className="grid gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => navigate(resource.path)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <resource.icon className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-green-800">{resource.title}</CardTitle>
                        <CardDescription className="text-green-600">{resource.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{resource.details}</p>
                    <Button 
                      className="mt-4 w-full bg-green-600 hover:bg-green-700"
                      onClick={() => navigate(resource.path)}
                    >
                      Access {resource.title}
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

export default Learning;