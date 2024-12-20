import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import InquiryDialog from "@/components/resources/InquiryDialog";
import ContactDetailsDialog from "@/components/resources/ContactDetailsDialog";

const Land = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showInquiry, setShowInquiry] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLand, setSelectedLand] = useState<any>(null);
  const [showContactDetails, setShowContactDetails] = useState(false);

  const landList = [
    {
      title: "Arable Land - 5 Hectares",
      description: "Fertile soil with water access",
      location: "Serowe District",
      owner: {
        name: "John's Estate",
        phone: "+267 71234569",
        email: "johns@example.com",
        location: "Serowe District"
      },
      price: "Contact for pricing",
      type: "Lease",
      details: {
        soilType: "Loamy",
        waterSource: "Borehole available",
        accessibility: "Good road access",
        facilities: "Basic storage shed",
        previousCrops: "Maize, Sorghum"
      },
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
    },
    {
      title: "Farmland - 3 Hectares",
      description: "Previously cultivated, ready for farming",
      location: "Maun Region",
      owner: {
        name: "Agricultural Trust",
        phone: "+267 71234570",
        email: "agtrust@example.com",
        location: "Maun Region"
      },
      price: "M2500/month",
      type: "Rent",
      details: {
        soilType: "Clay-loam mix",
        waterSource: "River access",
        accessibility: "Seasonal road",
        facilities: "Irrigation system installed",
        previousCrops: "Vegetables"
      },
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
    }
  ];

  const handleInquiry = (land: any) => {
    setSelectedLand(land);
    setShowInquiry(true);
  };

  const handleViewDetails = (land: any) => {
    setSelectedLand(land);
    setShowDetails(true);
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
                      <p className="text-gray-600"><strong>Owner:</strong> {item.owner.name}</p>
                      <p className="text-gray-600"><strong>Price:</strong> {item.price}</p>
                      <p className="text-gray-600"><strong>Type:</strong> {item.type}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleInquiry(item)}
                      >
                        Make Inquiry
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleViewDetails(item)}
                      >
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

      <InquiryDialog
        isOpen={showInquiry}
        onClose={() => setShowInquiry(false)}
        itemTitle={selectedLand?.title || ""}
      />

      <Dialog 
        open={showDetails} 
        onOpenChange={() => setShowDetails(false)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedLand?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedLand && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Soil Type</h4>
                    <p>{selectedLand.details.soilType}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Water Source</h4>
                    <p>{selectedLand.details.waterSource}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Accessibility</h4>
                    <p>{selectedLand.details.accessibility}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Facilities</h4>
                    <p>{selectedLand.details.facilities}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Previous Crops</h4>
                  <p>{selectedLand.details.previousCrops}</p>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedLand(selectedLand);
                    setShowContactDetails(true);
                  }}
                >
                  Contact Owner
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ContactDetailsDialog
        isOpen={showContactDetails}
        onClose={() => setShowContactDetails(false)}
        ownerDetails={selectedLand?.owner || {
          name: "",
          phone: "",
          email: "",
          location: ""
        }}
      />

      <BottomNav />
    </div>
  );
};

export default Land;