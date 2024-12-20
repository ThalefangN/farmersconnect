import { motion } from "framer-motion";
import { ArrowLeft, Leaf, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ContactDetailsDialog from "@/components/resources/ContactDetailsDialog";
import InquiryDialog from "@/components/resources/InquiryDialog";

const Seeds = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState<any>(null);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);

  const seedsList = [
    {
      title: "Maize Seeds - Pioneer Variety",
      description: "High-yield maize seeds",
      location: "Gaborone Region",
      owner: {
        name: "Maria's Farm",
        phone: "+267 71234571",
        email: "maria@example.com",
        location: "Gaborone Region"
      },
      quantity: "50 kg",
      details: {
        variety: "Pioneer P2088",
        yieldPotential: "8-10 tons/ha",
        maturityDays: "120-130 days",
        diseaseResistance: "High",
        certification: "Certified by Agricultural Board",
        plantingInstructions: "Plant 5cm deep, 75cm row spacing"
      },
      image: "https://images.unsplash.com/photo-1576552665866-c388ce8dd01e"
    },
    {
      title: "Sorghum Seeds",
      description: "Drought-resistant variety",
      location: "Francistown Area",
      owner: {
        name: "Modern Seeds Co.",
        phone: "+267 71234572",
        email: "modern@example.com",
        location: "Francistown Area"
      },
      quantity: "30 kg",
      details: {
        variety: "Drought Master",
        yieldPotential: "4-5 tons/ha",
        maturityDays: "90-100 days",
        diseaseResistance: "Medium",
        certification: "Quality tested",
        plantingInstructions: "Plant 3cm deep, 50cm row spacing"
      },
      image: "https://images.unsplash.com/photo-1628016093219-44c2f0936194"
    }
  ];

  const handleShare = (seed: any) => {
    setSelectedSeed(seed);
    setShowInquiry(true);
  };

  const handleViewDetails = (seed: any) => {
    setSelectedSeed(seed);
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
              <Leaf className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Seeds Exchange</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Share Your Seeds</h2>
            <p className="text-gray-600 mb-4">
              Help fellow farmers by sharing quality seeds. List your seeds
              for exchange or sale within the community.
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Share2 className="mr-2 h-4 w-4" />
              List Your Seeds
            </Button>
          </div>

          <div className="grid gap-6">
            {seedsList.map((item, index) => (
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
                      <p className="text-gray-600"><strong>Available Quantity:</strong> {item.quantity}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleShare(item)}
                      >
                        Request Seeds
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

      <Dialog 
        open={showDetails} 
        onOpenChange={() => setShowDetails(false)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedSeed?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedSeed && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Variety</h4>
                    <p>{selectedSeed.details.variety}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Yield Potential</h4>
                    <p>{selectedSeed.details.yieldPotential}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Maturity</h4>
                    <p>{selectedSeed.details.maturityDays}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Disease Resistance</h4>
                    <p>{selectedSeed.details.diseaseResistance}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Certification</h4>
                  <p>{selectedSeed.details.certification}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Planting Instructions</h4>
                  <p>{selectedSeed.details.plantingInstructions}</p>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedSeed(selectedSeed);
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
        ownerDetails={selectedSeed?.owner || {
          name: "",
          phone: "",
          email: "",
          location: ""
        }}
      />

      <InquiryDialog
        isOpen={showInquiry}
        onClose={() => setShowInquiry(false)}
        itemTitle={selectedSeed?.title || ""}
      />

      <BottomNav />
    </div>
  );
};

export default Seeds;