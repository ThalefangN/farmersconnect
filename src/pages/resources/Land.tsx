import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import InquiryDialog from "@/components/resources/InquiryDialog";
import ContactDetailsDialog from "@/components/resources/ContactDetailsDialog";
import RequestsDialog from "@/components/resources/RequestsDialog";
import ListLandDialog from "@/components/resources/ListLandDialog";
import BottomNav from "@/components/BottomNav";

interface Land {
  id: string;
  name: string;
  description: string | null;
  location: string;
  price: string;
  type: string;
  owner: {
    name: string | null;
    phone?: string | null;
  };
  image_url?: string | null;
}

const LandPage = () => {
  const { toast } = useToast();
  const [showRequests, setShowRequests] = useState(false);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);
  const [landList, setLandList] = useState<Land[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showListDialog, setShowListDialog] = useState(false);

  useEffect(() => {
    const loadLand = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentUser(user);
          
          const { data: landData, error } = await supabase
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

          setLandList(landData.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            location: item.location || 'Location not specified',
            price: item.price,
            type: item.type,
            image_url: item.image_url,
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

    const channel = supabase
      .channel('equipment_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'equipment',
          filter: 'type=eq.Land'
        },
        () => {
          loadLand();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const handleInquiry = (land: Land) => {
    setSelectedLand(land);
    setShowInquiryDialog(true);
  };

  const handleViewContact = (land: Land) => {
    setSelectedLand(land);
    setShowContactDialog(true);
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
              <MapPin className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Available Land</h1>
            </div>
            <Button
              onClick={() => setShowListDialog(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              List Land
            </Button>
          </div>

          <div className="grid gap-4">
            {landList.map((land) => (
              <motion.div
                key={land.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-4"
              >
                {land.image_url && (
                  <img
                    src={land.image_url}
                    alt={land.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold">{land.name}</h3>
                <p className="text-gray-600">{land.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Location: {land.location}
                </p>
                <p className="text-green-600 font-medium mt-2">
                  BWP {land.price}
                  {land.type === 'rent' ? ' per day' : ''}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={() => handleInquiry(land)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    {land.type === 'rent' ? 'Request to Rent' : 'Request to Buy'}
                  </Button>
                  <Button
                    onClick={() => handleViewContact(land)}
                    variant="outline"
                    className="flex-1"
                  >
                    Contact Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {showListDialog && (
        <ListLandDialog
          isOpen={showListDialog}
          onClose={() => setShowListDialog(false)}
        />
      )}

      <RequestsDialog
        isOpen={showRequests}
        onClose={() => setShowRequests(false)}
      />

      {selectedLand && (
        <>
          {showInquiryDialog && (
            <InquiryDialog
              isOpen={showInquiryDialog}
              onClose={() => setShowInquiryDialog(false)}
              itemTitle={selectedLand.name}
              itemType={selectedLand.type === 'rent' ? 'rent' : 'sale'}
              equipmentId={selectedLand.id}
              pricePerDay={selectedLand.type === 'rent' ? parseFloat(selectedLand.price) : undefined}
            />
          )}
          {showContactDialog && (
            <ContactDetailsDialog
              isOpen={showContactDialog}
              onClose={() => setShowContactDialog(false)}
              ownerDetails={{
                name: selectedLand.owner.name || '',
                phone: selectedLand.owner.phone || '',
                email: '',
                location: selectedLand.location
              }}
            />
          )}
        </>
      )}

      <BottomNav />
    </div>
  );
};

export default LandPage;