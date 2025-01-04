import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import RequestsDialog from "@/components/resources/RequestsDialog";
import ListEquipmentDialog from "@/components/resources/ListEquipmentDialog";
import { supabase } from "@/integrations/supabase/client";
import EquipmentHeader from "@/components/resources/equipment/EquipmentHeader";
import EquipmentGrid from "@/components/resources/equipment/EquipmentGrid";

const Equipment = () => {
  const { toast } = useToast();
  const [equipment, setEquipment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showListDialog, setShowListDialog] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    checkUser();
    fetchEquipment();

    // Subscribe to realtime updates for equipment_requests
    const channel = supabase
      .channel('equipment_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'equipment_requests' },
        async (payload) => {
          if (payload.new && currentUserId) {
            if (payload.eventType === 'UPDATE' && payload.new.user_id === currentUserId) {
              const status = payload.new.status;
              const equipment = await getEquipmentDetails(payload.new.equipment_id);
              
              toast({
                title: `Equipment Request ${status.charAt(0).toUpperCase() + status.slice(1)}`,
                description: `Your request for ${equipment?.name || 'equipment'} has been ${status}`,
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

  const fetchEquipment = async () => {
    try {
      console.log('Fetching equipment...');
      const { data, error } = await supabase
        .from("equipment")
        .select(`
          *,
          owner:profiles!equipment_owner_id_fkey(full_name, phone_text)
        `)
        .neq('type', 'Seeds')
        .neq('type', 'Land')
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching equipment:", error);
        throw error;
      }
      console.log('Fetched equipment:', data);
      setEquipment(data);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-20">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <EquipmentHeader
          onViewRequests={() => setShowRequests(true)}
          onListEquipment={() => setShowListDialog(true)}
          currentUserId={currentUserId}
        />

        <div className="mt-6">
          <EquipmentGrid
            equipment={equipment}
            currentUserId={currentUserId}
            onDelete={handleDelete}
          />
        </div>

        {showListDialog && (
          <ListEquipmentDialog
            isOpen={showListDialog}
            onClose={() => setShowListDialog(false)}
          />
        )}

        {currentUserId && (
          <RequestsDialog
            isOpen={showRequests}
            onClose={() => setShowRequests(false)}
            userId={currentUserId}
            type="equipment"
          />
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Equipment;