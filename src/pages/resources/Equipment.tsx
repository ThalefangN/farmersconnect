import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench, Share2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import RequestsDialog from "@/components/resources/RequestsDialog";
import InquiryDialog from "@/components/resources/InquiryDialog";
import ContactDetailsDialog from "@/components/resources/ContactDetailsDialog";
import ListEquipmentDialog from "@/components/resources/ListEquipmentDialog";
import { supabase } from "@/integrations/supabase/client";

interface Equipment {
  id: string;
  name: string;
  description: string | null;
  price: string;
  type: 'rent' | 'sale';
  status: string;
  location: string;
  image_url: string | null;
  owner: {
    full_name: string | null;
    phone_text: string | null;
  };
  owner_id: string;
}

const Equipment = () => {
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showListDialog, setShowListDialog] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  useEffect(() => {
    fetchEquipment();

    const channel = supabase
      .channel('equipment_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'equipment' },
        () => {
          fetchEquipment();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from("equipment")
        .select(`
          *,
          owner:profiles(full_name, phone_text)
        `)
        .neq('type', 'seeds')
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEquipment(data as Equipment[]);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      toast({
        title: "Error",
        description: "Failed to load equipment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (equipmentId: string) => {
    try {
      const { error } = await supabase
        .from("equipment")
        .delete()
        .eq("id", equipmentId);

      if (error) throw error;

      setEquipment(equipment.filter((item) => item.id !== equipmentId));
      toast({
        title: "Success",
        description: "Equipment listing deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting equipment:", error);
      toast({
        title: "Error",
        description: "Failed to delete equipment listing",
        variant: "destructive",
      });
    }
  };

  const handleInquiry = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setShowInquiryDialog(true);
  };

  const handleViewContact = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setShowContactDialog(true);
  };

  const checkOwnership = async (ownerId: string): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id === ownerId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Farming Equipment</h1>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowRequests(true)}
                variant="outline"
              >
                View Requests
              </Button>
              <Button
                onClick={() => setShowListDialog(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                List Equipment
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {equipment.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-4"
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-green-600 font-semibold mt-2">
                  Price: BWP {item.price} {item.type === 'rent' ? '/ day' : ''}
                </p>
                <p className="text-sm text-gray-500">
                  Location: {item.location}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={() => handleInquiry(item)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Make Inquiry
                  </Button>
                  <Button
                    onClick={() => handleViewContact(item)}
                    variant="outline"
                    className="flex-1"
                  >
                    Contact Details
                  </Button>
                  {checkOwnership(item.owner_id) && (
                    <Button
                      onClick={() => handleDelete(item.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {showListDialog && (
        <ListEquipmentDialog
          isOpen={showListDialog}
          onClose={() => setShowListDialog(false)}
        />
      )}

      <RequestsDialog
        isOpen={showRequests}
        onClose={() => setShowRequests(false)}
      />

      {selectedEquipment && (
        <>
          {showInquiryDialog && (
            <InquiryDialog
              isOpen={showInquiryDialog}
              onClose={() => setShowInquiryDialog(false)}
              itemTitle={selectedEquipment.name}
              itemType={selectedEquipment.type}
              equipmentId={selectedEquipment.id}
              pricePerDay={selectedEquipment.type === 'rent' ? parseFloat(selectedEquipment.price) : undefined}
            />
          )}
          {showContactDialog && (
            <ContactDetailsDialog
              isOpen={showContactDialog}
              onClose={() => setShowContactDialog(false)}
              ownerDetails={{
                name: selectedEquipment.owner.full_name,
                phone: selectedEquipment.owner.phone_text,
                email: "",
                location: selectedEquipment.location
              }}
            />
          )}
        </>
      )}

      <BottomNav />
    </div>
  );
};

export default Equipment;