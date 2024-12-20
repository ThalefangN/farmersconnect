import { motion } from "framer-motion";
import { ArrowLeft, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const Certificates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const courses = [
    {
      title: "Advanced Crop Management",
      description: "Professional certification in crop management",
      duration: "3 months",
      price: "M2500",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1592991538534-788c605766ce"
    },
    {
      title: "Sustainable Farming Practices",
      description: "Learn eco-friendly farming methods",
      duration: "2 months",
      price: "M1800",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1595880500386-4b33823ea530"
    }
  ];

  const handleEnroll = (course: string) => {
    toast({
      title: "Enrollment Initiated",
      description: `Your enrollment request for ${course} has been received.`,
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
            <Button variant="ghost" size="icon" onClick={() => navigate("/learning")}>
              <ArrowLeft className="h-6 w-6 text-green-700" />
            </Button>
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Certification Programs</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Professional Development</h2>
            <p className="text-gray-600 mb-4">
              Enhance your farming expertise with our certified programs.
              Get recognized qualifications in various agricultural domains.
            </p>
          </div>

          <div className="grid gap-6">
            {courses.map((item, index) => (
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
                      <p className="text-gray-600"><strong>Duration:</strong> {item.duration}</p>
                      <p className="text-gray-600"><strong>Price:</strong> {item.price}</p>
                      <p className="text-gray-600"><strong>Level:</strong> {item.level}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleEnroll(item.title)}
                      >
                        Enroll Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Learn More
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

export default Certificates;