import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import EquipmentCard from "@/components/marketplace/EquipmentCard";

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
    name: string | null;
    phone?: string | null;
  };
}

const Equipment = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadEquipment = async () => {
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
          .eq('status', 'Available');

        if (error) throw error;

        setEquipment(data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          type: item.type,
          status: item.status,
          location: item.location,
          image_url: item.image_url,
          owner: {
            name: item.owner.full_name,
            phone: item.owner.phone_text
          }
        })));
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

    // Subscribe to realtime changes
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

  return (
    <div className="container mx-auto p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Wrench className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Farming Equipment</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((item) => (
            <EquipmentCard key={item.id} equipment={item} />
          ))}
        </div>
      </motion.div>
      <BottomNav />
    </div>
  );
};

export default Equipment;