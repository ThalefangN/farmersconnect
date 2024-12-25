import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Share2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import RequestsDialog from "@/components/resources/RequestsDialog";
import ListSeedsDialog from "@/components/resources/ListSeedsDialog";
import InquiryDialog from "@/components/resources/InquiryDialog";
import { supabase } from "@/integrations/supabase/client";

interface Seed {
  id: string;
  name: string;
  description: string | null;
  location: string;
  image_url: string | null;
  owner: {
    name: string | null;
    phone?: string | null;
  };
  owner_id: string;
}

const Seeds = () => {
  const { toast } = useToast();
  const [showListDialog, setShowListDialog] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState<Seed | null>(null);
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const loadSeeds = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
        
        const { data: seedsData, error } = await supabase
          .from('equipment')
          .select(`
            *,
            owner:profiles!equipment_owner_id_fkey (
              full_name,
              phone_text
            )
          `)
          .eq('type', 'seeds');

        if (error) throw error;

        setSeeds(seedsData);
      }
    } catch (error) {
      console.error('Error loading seeds:', error);
      toast({
        title: "Error",
        description: "Failed to load seeds listings",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadSeeds();
  }, []);

  const handleDelete = async (seedId: string) => {
    try {
      const { error } = await supabase
        .from('equipment')
        .delete()
        .eq('id', seedId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Seed listing deleted successfully",
      });
      loadSeeds();
    } catch (error) {
      console.error('Error deleting seed:', error);
      toast({
        title: "Error",
        description: "Failed to delete seed listing",
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
            <Leaf className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Seeds and Plants</h1>
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
          <h2 className="text-xl font-semibold text-green-800 mb-4">List Your Seeds</h2>
          <p className="text-gray-600 mb-4">
            Help fellow farmers by sharing your seeds. List your seeds for sharing within the community.
          </p>
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => setShowListDialog(true)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            List Your Seeds
          </Button>
        </div>

        <div className="grid gap-4">
          {seeds.map((seed) => (
            <motion.div
              key={seed.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{seed.name}</h3>
                    <p className="text-sm text-gray-600">{seed.description}</p>
                    <p className="text-sm text-gray-600 mt-2">Location: {seed.location}</p>
                    {seed.image_url && (
                      <img
                        src={seed.image_url}
                        alt={seed.name}
                        className="mt-2 rounded-lg w-full h-48 object-cover"
                      />
                    )}
                  </div>
                  {currentUser?.id === seed.owner_id && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(seed.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Button
                  onClick={() => {
                    setSelectedSeed(seed);
                    setShowInquiryDialog(true);
                  }}
                  className="mt-4 w-full"
                >
                  Request Seeds
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <ListSeedsDialog
        isOpen={showListDialog}
        onClose={() => setShowListDialog(false)}
      />

      <RequestsDialog
        isOpen={showRequests}
        onClose={() => setShowRequests(false)}
      />

      {selectedSeed && (
        <InquiryDialog
          isOpen={showInquiryDialog}
          onClose={() => {
            setShowInquiryDialog(false);
            setSelectedSeed(null);
          }}
          itemTitle={selectedSeed.name}
          itemType="seeds"
          equipmentId={selectedSeed.id}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default Seeds;