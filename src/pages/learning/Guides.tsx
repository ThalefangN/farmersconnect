import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const Guides = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const guides = [
    {
      title: "Sustainable Farming Practices",
      description: "Comprehensive guide to eco-friendly farming",
      author: "Dr. Sarah Johnson",
      duration: "2 hours",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
    },
    {
      title: "Crop Disease Management",
      description: "Identifying and treating common crop diseases",
      author: "Prof. Michael Smith",
      duration: "1.5 hours",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d"
    }
  ];

  const handleDownload = (guide: string) => {
    toast({
      title: "Guide Downloaded",
      description: `${guide} has been downloaded to your device.`,
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
              <BookOpen className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Farming Guides</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Learning Resources</h2>
            <p className="text-gray-600 mb-4">
              Access comprehensive farming guides written by experts. Learn modern
              farming techniques and best practices.
            </p>
          </div>

          <div className="grid gap-6">
            {guides.map((item, index) => (
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
                      <p className="text-gray-600"><strong>Author:</strong> {item.author}</p>
                      <p className="text-gray-600"><strong>Duration:</strong> {item.duration}</p>
                      <p className="text-gray-600"><strong>Level:</strong> {item.level}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleDownload(item.title)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Guide
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Read Online
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

export default Guides;