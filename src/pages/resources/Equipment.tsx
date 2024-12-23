import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import RequestsDialog from "@/components/resources/RequestsDialog";
import EquipmentList from "@/components/resources/EquipmentList";
import ListEquipmentDialog from "@/components/resources/ListEquipmentDialog";
import InquiryDialog from "@/components/resources/InquiryDialog";
import { supabase } from "@/integrations/supabase/client";

interface Equipment {
  id: string;
  name: string;
  description: string | null;
  price: string;
  type: 'rent' | 'sale';
  status: string;
  owner: {
    name: string | null;
    phone?: string | null;
  };
}

const Equipment = () => {
  const { toast } = useToast();
  const [showListDialog, setShowListDialog] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const loadEquipment = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentUser(user);
          
          const { data: equipmentData, error } = await supabase
            .from('equipment')
            .select(`
              *,
              owner:profiles!equipment_owner_id_fkey (
                full_name,
                phone_text
              )
            `);

          if (error) throw error;

          setEquipment(equipmentData.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            type: item.type as 'rent' | 'sale',
            status: item.status,
            owner: {
              name: item.owner.full_name,
              phone: item.owner.phone_text
            }
          })));
        }
      } catch (error) {
        console.error('Error loading equipment:', error);
        toast({
          title: "Error",
          description: "Failed to load equipment listings",
          variant: "destructive",
        });
      }
    };

    loadEquipment();

    const channel = supabase
      .channel('equipment_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'equipment' },
        () => {
          loadEquipment();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const handleRent = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setShowInquiryDialog(true);
  };

  const handleListSubmit = async (formData: FormData) => {
    try {
      const { error } = await supabase
        .from('equipment')
        .insert({
          name: formData.get('name'),
          description: formData.get('description'),
          price: formData.get('price'),
          type: formData.get('type'),
          status: 'Available',
          owner_id: currentUser.id
        });

      if (error) throw error;

      toast({
        title: "Equipment Listed",
        description: "Your equipment has been listed successfully.",
      });
      setShowListDialog(false);
    } catch (error) {
      console.error('Error listing equipment:', error);
      toast({
        title: "Error",
        description: "Failed to list equipment. Please try again.",
        variant: "destructive",
      });
    }
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
        requests={[]}
      />

      {selectedEquipment && (
        <InquiryDialog
          isOpen={showInquiryDialog}
          onClose={() => {
            setShowInquiryDialog(false);
            setSelectedEquipment(null);
          }}
          itemTitle={selectedEquipment.name}
          itemType={selectedEquipment.type}
          equipmentId={selectedEquipment.id}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default Equipment;