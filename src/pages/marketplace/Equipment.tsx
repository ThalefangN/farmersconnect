import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import EquipmentGrid from "@/components/resources/equipment/EquipmentGrid";
import EquipmentHeader from "@/components/resources/equipment/EquipmentHeader";
import ListEquipmentDialog from "@/components/resources/ListEquipmentDialog";
import RequestsDialog from "@/components/resources/RequestsDialog";
import { Equipment } from "@/types/equipment";

const EquipmentPage = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showListDialog, setShowListDialog] = useState(false);
  const [showRequestsDialog, setShowRequestsDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadEquipment = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching equipment...');

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentUserId(user.id);
        }

        const { data, error } = await supabase
          .from('equipment')
          .select(`
            *,
            owner:profiles!equipment_owner_id_fkey (
              full_name,
              phone_text
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        console.log('Equipment fetched:', data);
        
        // Type check and transform the data
        const typedEquipment: Equipment[] = data?.map(item => ({
          ...item,
          type: item.type === 'rent' || item.type === 'sale' ? item.type : 'sale', // Default to 'sale' if invalid
          owner: {
            full_name: item.owner?.full_name || null,
            phone_text: item.owner?.phone_text || null
          }
        })) || [];

        setEquipment(typedEquipment);
      } catch (error) {
        console.error('Error loading equipment:', error);
        toast({
          title: "Error",
          description: "Failed to load equipment listings",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
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

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('equipment')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEquipment(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Success",
        description: "Equipment deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast({
        title: "Error",
        description: "Failed to delete equipment",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <EquipmentHeader
            onViewRequests={() => setShowRequestsDialog(true)}
            onListEquipment={() => setShowListDialog(true)}
            currentUserId={currentUserId}
          />

          {equipment.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600">No equipment listings available.</p>
            </div>
          ) : (
            <EquipmentGrid
              equipment={equipment}
              currentUserId={currentUserId}
              onDelete={handleDelete}
            />
          )}
        </motion.div>
      </div>

      <ListEquipmentDialog
        isOpen={showListDialog}
        onClose={() => setShowListDialog(false)}
      />

      <RequestsDialog
        isOpen={showRequestsDialog}
        onClose={() => setShowRequestsDialog(false)}
        type="equipment"
      />

      <BottomNav />
    </div>
  );
};

export default EquipmentPage;