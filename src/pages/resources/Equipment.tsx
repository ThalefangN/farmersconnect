import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "@/components/BottomNav";
import RequestsDialog from "@/components/resources/RequestsDialog";
import ContactDetailsDialog from "@/components/resources/ContactDetailsDialog";

const Equipment = () => {
  const { toast } = useToast();
  const [showListDialog, setShowListDialog] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<any>(null);

  const [equipment] = useState([
    {
      id: 1,
      name: "Tractor",
      description: "Heavy-duty farming tractor",
      price: "500/day",
      availability: "Available",
      owner: {
        name: "John Farmer",
        phone: "+267 71234567",
        email: "john@example.com",
        location: "Maseru District"
      }
    },
    {
      id: 2,
      name: "Harvester",
      description: "Grain harvesting machine",
      price: "400/day",
      availability: "In Use",
      owner: {
        name: "Sarah's Farm",
        phone: "+267 71234568",
        email: "sarah@example.com",
        location: "Leribe District"
      }
    },
    {
      id: 3,
      name: "Plough",
      description: "3-furrow plough",
      price: "200/day",
      availability: "Available",
      owner: {
        name: "Modern Farms",
        phone: "+267 71234569",
        email: "modern@example.com",
        location: "Gaborone District"
      }
    },
  ]);

  const mockRequests = [
    {
      id: "1",
      requesterName: "James Smith",
      date: "2024-02-20",
      status: "pending",
      message: "I would like to rent the tractor for 3 days starting next week."
    },
    {
      id: "2",
      requesterName: "Mary Johnson",
      date: "2024-02-19",
      status: "approved",
      message: "Requesting the irrigation system for my farm."
    }
  ] as const;

  const handleRent = (equipmentName: string) => {
    toast({
      title: "Request Sent",
      description: `Your request to rent the ${equipmentName} has been sent.`,
    });
  };

  const handleListSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Equipment Listed",
      description: "Your equipment has been listed successfully.",
    });
    setShowListDialog(false);
  };

  const handleContactOwner = (owner: any) => {
    setSelectedOwner(owner);
    setShowContactDetails(true);
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Farming Equipment</h1>
          </div>
          <Button 
            onClick={() => setShowRequests(true)}
            variant="outline"
            className="ml-2"
          >
            View Requests
          </Button>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">List Your Equipment</h2>
          <p className="text-gray-600 mb-4">
            Help fellow farmers by sharing your farming equipment. List your machinery
            and tools for rental or sharing within the community.
          </p>
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => setShowListDialog(true)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            List Your Equipment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">Price: {item.price}</p>
                  <p className={`text-sm ${
                    item.availability === "Available" ? "text-green-600" : "text-red-600"
                  }`}>
                    Status: {item.availability}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleRent(item.name)}
                      disabled={item.availability !== "Available"}
                      className="flex-1"
                    >
                      Rent Equipment
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleContactOwner(item.owner)}
                    >
                      Contact Owner
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <Dialog open={showListDialog} onOpenChange={setShowListDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>List Your Equipment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleListSubmit} className="space-y-4">
            <div>
              <Label htmlFor="equipment-name">Equipment Name</Label>
              <Input id="equipment-name" placeholder="Enter equipment name" required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your equipment" required />
            </div>
            <div>
              <Label htmlFor="price">Price (per day)</Label>
              <Input id="price" type="text" placeholder="Enter rental price" required />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter location" required />
            </div>
            <Button type="submit" className="w-full">Submit Listing</Button>
          </form>
        </DialogContent>
      </Dialog>

      <RequestsDialog
        isOpen={showRequests}
        onClose={() => setShowRequests(false)}
        requests={mockRequests}
      />

      <ContactDetailsDialog
        isOpen={showContactDetails}
        onClose={() => setShowContactDetails(false)}
        ownerDetails={selectedOwner || {
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

export default Equipment;