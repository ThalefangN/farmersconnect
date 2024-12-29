import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ListLandDialog from "@/components/resources/ListLandDialog";
import BottomNav from "@/components/BottomNav";
import LandHeader from "@/components/resources/land/LandHeader";
import LandGrid from "@/components/resources/land/LandGrid";

const LandPage = () => {
  const { toast } = useToast();
  const [landList, setLandList] = useState([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showListDialog, setShowListDialog] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    checkUser();
    loadLand();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('land_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'equipment_requests' },
        async (payload) => {
          if (payload.new && currentUserId) {
            if (payload.eventType === 'UPDATE' && payload.new.user_id === currentUserId) {
              const status = payload.new.status;
              const equipment = await getEquipmentDetails(payload.new.equipment_id);
              
              toast({
                title: `Land Request ${status.charAt(0).toUpperCase() + status.slice(1)}`,
                description: `Your request for ${equipment?.name || 'land'} has been ${status}`,
                variant: status === 'approved' ? 'default' : 'destructive',
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId]);

  const getEquipmentDetails = async (equipmentId: string) => {
    const { data } = await supabase
      .from('equipment')
      .select('name')
      .eq('id', equipmentId)
      .single();
    return data;
  };

  const loadLand = async () => {
    try {
      const { data, error } = await supabase
        .from('equipment')
        .select(`
          *,
          owner:profiles!equipment_owner_id_fkey (
            full_name,
            phone_text
          )
        `)
        .eq('type', 'Land');

      if (error) throw error;

      setLandList(data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        location: item.location || 'Location not specified',
        price: item.price,
        type: item.type,
        image_url: item.image_url,
        status: item.status,
        owner: {
          name: item.owner.full_name,
          phone: item.owner.phone_text
        },
        owner_id: item.owner_id
      })));
    } catch (error) {
      console.error('Error loading land:', error);
      toast({
        title: "Error",
        description: "Failed to load land listings",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (landId: string) => {
    try {
      const { error } = await supabase
        .from('equipment')
        .delete()
        .eq('id', landId)
        .eq('type', 'Land');

      if (error) throw error;

      setLandList(landList.filter(item => item.id !== landId));
      toast({
        title: "Success",
        description: "Land listing deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting land:', error);
      toast({
        title: "Error",
        description: "Failed to delete land listing",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <LandHeader onListLand={() => setShowListDialog(true)} />
          <LandGrid
            landList={landList}
            currentUserId={currentUserId}
            onDelete={handleDelete}
          />
        </motion.div>
      </div>

      {showListDialog && (
        <ListLandDialog
          isOpen={showListDialog}
          onClose={() => setShowListDialog(false)}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default LandPage;