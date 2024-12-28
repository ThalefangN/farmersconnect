import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import GuideContentDialog from "@/components/learning/GuideContentDialog";
import { useState } from "react";

const Guides = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedGuide, setSelectedGuide] = useState<{ title: string; content?: string } | null>(null);

  const guides = [
    {
      title: "Crop Farming in Botswana",
      description: "Guide to successful crop cultivation in Botswana's climate",
      author: "Dr. Sarah Motswana",
      duration: "2 hours",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      content: `
        # Crop Farming in Botswana

        Botswana's agricultural sector faces unique challenges and opportunities. This guide covers essential practices for successful farming in our climate.

        ## Climate Considerations
        - Understanding Botswana's rainfall patterns
        - Dealing with drought conditions
        - Best planting seasons

        ## Recommended Crops
        - Sorghum
        - Maize
        - Millet
        - Beans
        - Groundnuts

        ## Soil Management
        - Soil types in Botswana
        - Soil preparation techniques
        - Fertilization methods

        ## Water Management
        - Water conservation techniques
        - Irrigation systems
        - Rainwater harvesting

        ## Pest Control
        - Common pests in Botswana
        - Natural pest control methods
        - Integrated pest management
      `
    },
    {
      title: "Livestock Farming in Botswana",
      description: "Essential guide to cattle and small stock farming",
      author: "Prof. Michael Kgosi",
      duration: "1.5 hours",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d",
      content: `
        # Livestock Farming in Botswana

        Livestock farming is a crucial part of Botswana's agricultural sector. This guide provides comprehensive information for successful livestock management.

        ## Cattle Farming
        - Traditional cattle farming methods
        - Modern ranching techniques
        - Breed selection for Botswana's climate
        - Disease prevention and management

        ## Small Stock Farming
        - Goat farming
        - Sheep rearing
        - Poultry management
        - Feed management

        ## Grazing Management
        - Rotational grazing
        - Sustainable pasture management
        - Supplementary feeding during dry seasons

        ## Animal Health
        - Common diseases in Botswana
        - Vaccination schedules
        - Basic veterinary care
      `
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
              Access comprehensive farming guides specifically written for Botswana's agricultural context. 
              Learn modern farming techniques adapted to our local conditions.
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
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setSelectedGuide(item)}
                      >
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
      
      <GuideContentDialog
        isOpen={!!selectedGuide}
        onClose={() => setSelectedGuide(null)}
        guide={selectedGuide || { title: "" }}
      />
      
      <BottomNav />
    </div>
  );
};

export default Guides;