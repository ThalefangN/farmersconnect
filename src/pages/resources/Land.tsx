import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import RequestsDialog from "@/components/resources/RequestsDialog";
import InquiryDialog from "@/components/resources/InquiryDialog";
import { supabase } from "@/integrations/supabase/client";

interface Land {
  id: string;
  name: string;
  description: string | null;
  location: string;
  owner: {
    name: string | null;
    phone?: string | null;
  };
}

const LandPage = () => {
  const { toast } = useToast();
  const [showRequests, setShowRequests] = useState(false);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);
  const [landList, setLandList] = useState<Land[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const loadLand = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentUser(user);
          
          const { data: landData, error } = await supabase
            .from('land')
            .select(`
              *,
              owner:profiles!land_owner_id_fkey (
                full_name,
                phone_text
              )
            `);

          if (error) throw error;

          setLandList(landData.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            location: item.location,
            owner: {
              name: item.owner.full_name,
              phone: item.owner.phone_text
            }
          })));
        }
      } catch (error) {
        console.error('Error loading land:', error);
        toast({
          title: "Error",
          description: "Failed to load land listings",
          variant: "destructive",
        });
      }
    };

    loadLand();
  }, [toast]);

  const handleInquiry = (land: Land) => {
    setSelectedLand(land);
    setShowInquiryDialog(true);
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
            <MapPin className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Available Land</h1>
          </div>
          <Button 
            onClick={() => setShowRequests(true)}
            variant="outline"
            className="ml-2"
          >
            View Requests
          </Button>
        </div>

        <div className="grid gap-4">
          {landList.map((land) => (
            <motion.div
              key={land.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold text-green-800 mb-2">{land.name}</h2>
                <p className="text-gray-600 mb-4">{land.description}</p>
                <p className="text-gray-600 mb-4">Location: {land.location}</p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleInquiry(land)}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Inquire About This Land
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <RequestsDialog
        isOpen={showRequests}
        onClose={() => setShowRequests(false)}
        requests={[]}
      />

      {selectedLand && (
        <InquiryDialog
          isOpen={showInquiryDialog}
          onClose={() => {
            setShowInquiryDialog(false);
            setSelectedLand(null);
          }}
          itemTitle={selectedLand.name}
          itemType="sale"
        />
      )}

      <BottomNav />
    </div>
  );
};

export default LandPage;
