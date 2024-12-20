import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const Land = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const landList = [
    {
      title: "Arable Land - 5 Hectares",
      description: "Fertile soil with water access",
      location: "Serowe District",
      owner: "John's Estate",
      price: "Contact for pricing",
      type: "Lease",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
    },
    {
      title: "Farmland - 3 Hectares",
      description: "Previously cultivated, ready for farming",
      location: "Maun Region",
      owner: "Agricultural Trust",
      price: "M2500/month",
      type: "Rent",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
    }
  ];

  const handleInquiry = (land: string) => {
    toast({
      title: "Inquiry Sent",
      description: `Your inquiry about ${land} has been sent to the owner.`,
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
              <MapPin className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Land Resources</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">List Your Land</h2>
            <p className="text-gray-600 mb-4">
              Have agricultural land available? List your property for lease or rent
              and connect with farmers looking for cultivation space.
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Share2 className="mr-2 h-4 w-4" />
              List Your Land
            </Button>
          </div>

          <div className="grid gap-6">
            {landList.map((item, index) => (
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
                      <p className="text-gray-600"><strong>Price:</strong> {item.price}</p>
                      <p className="text-gray-600"><strong>Type:</strong> {item.type}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleInquiry(item.title)}
                      >
                        Make Inquiry
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

export default Land;