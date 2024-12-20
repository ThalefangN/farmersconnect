import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import RequestsDialog from "@/components/resources/RequestsDialog";
import EquipmentList from "@/components/resources/EquipmentList";
import ListEquipmentDialog from "@/components/resources/ListEquipmentDialog";

const Equipment = () => {
  const { toast } = useToast();
  const [showListDialog, setShowListDialog] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  const [equipment] = useState([
    {
      id: 1,
      name: "Tractor",
      description: "Heavy-duty farming tractor",
      price: "500/day",
      availability: "Available",
    },
    {
      id: 2,
      name: "Harvester",
      description: "Grain harvesting machine",
      price: "400/day",
      availability: "In Use",
    },
    {
      id: 3,
      name: "Plough",
      description: "3-furrow plough",
      price: "200/day",
      availability: "Available",
    },
  ]);

  const mockRequests = [
    {
      id: "1",
      requesterName: "James Smith",
      date: "2024-02-20",
      status: "pending" as const,
      message: "I would like to rent the tractor for 3 days starting next week."
    },
    {
      id: "2",
      requesterName: "Mary Johnson",
      date: "2024-02-19",
      status: "approved" as const,
      message: "Requesting the irrigation system for my farm."
    }
  ];

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

        <EquipmentList equipment={equipment} onRent={handleRent} />
      </motion.div>

      <ListEquipmentDialog
        isOpen={showListDialog}
        onClose={() => setShowListDialog(false)}
        onSubmit={handleListSubmit}
      />

      <RequestsDialog
        isOpen={showRequests}
        onClose={() => setShowRequests(false)}
        requests={mockRequests}
      />

      <BottomNav />
    </div>
  );
};

export default Equipment;