import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Share2 } from "lucide-react";
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
  type: string;
  status: string;
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
          .select('*')
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

  const handleListSubmit = async (formData: FormData) => {
    try {
      const { error } = await supabase
        .from('equipment')
        .insert({
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          type: 'seeds',
          price: '0',
          status: 'Available',
          owner_id: currentUser.id
        });

      if (error) throw error;

      toast({
        title: "Seed Listed",
        description: "Your seed has been listed successfully.",
      });
      setShowListDialog(false);
      loadSeeds();
    } catch (error) {
      console.error('Error listing seed:', error);
      toast({
        title: "Error",
        description: "Failed to list seed. Please try again.",
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
            Help fellow farmers by sharing your seeds. List your seeds for sale within the community.
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
                <h3 className="font-medium">{seed.name}</h3>
                <p className="text-sm text-gray-600">{seed.description}</p>
                <Button
                  onClick={() => {
                    setSelectedSeed(seed);
                    setShowInquiryDialog(true);
                  }}
                  className="mt-2"
                >
                  Inquire
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <ListSeedsDialog
        isOpen={showListDialog}
        onClose={() => setShowListDialog(false)}
        onSubmit={handleListSubmit}
      />

      <RequestsDialog
        isOpen={showRequests}
        onClose={() => setShowRequests(false)}
        requests={[]}
      />

      {selectedSeed && (
        <InquiryDialog
          isOpen={showInquiryDialog}
          onClose={() => {
            setShowInquiryDialog(false);
            setSelectedSeed(null);
          }}
          itemTitle={selectedSeed.name}
          itemType="sale"
        />
      )}

      <BottomNav />
    </div>
  );
};

export default Seeds;
