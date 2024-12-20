import { motion } from "framer-motion";
import { ArrowLeft, Wrench, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const Equipment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const equipmentList = [
    {
      title: "Tractor - John Deere 5E",
      description: "Available for sharing/rental",
      location: "Maseru District",
      owner: "John Farmer",
      rate: "M500/day",
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f"
    },
    {
      title: "Irrigation System",
      description: "Modern drip irrigation setup",
      location: "Leribe District",
      owner: "Sarah's Farm",
      rate: "M300/week",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc"
    }
  ];

  const handleShare = (equipment: string) => {
    toast({
      title: "Request Sent",
      description: `Your request to use ${equipment} has been sent to the owner.`,
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
            <Button variant="ghost" size="icon" onClick={() => navigate("/resources")}>
              <ArrowLeft className="h-6 w-6 text-green-700" />
            </Button>
            <div className="flex items-center space-x-2">
              <Wrench className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Farming Equipment</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Share Your Equipment</h2>
            <p className="text-gray-600 mb-4">
              Help fellow farmers by sharing your farming equipment. List your machinery
              and tools for rental or sharing within the community.
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Share2 className="mr-2 h-4 w-4" />
              List Your Equipment
            </Button>
          </div>

          <div className="grid gap-6">
            {equipmentList.map((item, index) => (
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
                      <p className="text-gray-600"><strong>Location:</strong> {item.location}</p>
                      <p className="text-gray-600"><strong>Owner:</strong> {item.owner}</p>
                      <p className="text-gray-600"><strong>Rate:</strong> {item.rate}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleShare(item.title)}
                      >
                        Request to Use
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Contact Owner
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

export default Equipment;