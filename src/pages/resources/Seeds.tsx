import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ListSeedsDialog from "@/components/resources/ListSeedsDialog";
import InquiryDialog from "@/components/resources/InquiryDialog";
import ContactDetailsDialog from "@/components/resources/ContactDetailsDialog";
import RequestsDialog from "@/components/resources/RequestsDialog";
import BottomNav from "@/components/BottomNav";
import type { Seed } from "@/types/seeds";

const Seeds = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [selectedSeed, setSelectedSeed] = useState<Seed | null>(null);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showRequestsDialog, setShowRequestsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showListDialog, setShowListDialog] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    checkUser();
    fetchSeeds();
  }, []);

  const fetchSeeds = async () => {
    try {
      const { data, error } = await supabase
        .from("equipment")
        .select(`
          *,
          owner:profiles!equipment_owner_id_fkey(full_name, phone_text)
        `)
        .eq('type', 'Seeds')
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const seedsData = data.map(item => ({
          ...item,
          owner: {
            full_name: item.owner?.full_name || null,
            phone_text: item.owner?.phone_text || null
          }
        })) as Seed[];
        
        setSeeds(seedsData);
      }
    } catch (error) {
      console.error("Error fetching seeds:", error);
      toast({
        title: "Error",
        description: "Failed to load seeds. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (seedId: string) => {
    try {
      const { error } = await supabase
        .from("equipment")
        .delete()
        .eq("id", seedId)
        .eq('type', 'Seeds');

      if (error) throw error;

      setSeeds(seeds.filter((seed) => seed.id !== seedId));
      toast({
        title: "Success",
        description: "Seed listing deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting seed:", error);
      toast({
        title: "Error",
        description: "Failed to delete seed listing",
        variant: "destructive",
      });
    }
  };

  const handleInquiry = (seed: Seed) => {
    setSelectedSeed(seed);
    setShowInquiryDialog(true);
  };

  const handleViewContact = (seed: Seed) => {
    setSelectedSeed(seed);
    setShowContactDialog(true);
  };

  const handleViewRequests = (seed: Seed) => {
    setSelectedSeed(seed);
    setShowRequestsDialog(true);
  };

  const isOwner = (ownerId: string) => currentUserId === ownerId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/resources")}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={() => setShowListDialog(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              List Seeds
            </Button>
          </div>

          <div className="grid gap-4">
            {seeds.map((seed) => (
              <motion.div
                key={seed.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-4"
              >
                {seed.image_url && (
                  <img
                    src={seed.image_url}
                    alt={seed.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold">{seed.name}</h3>
                <p className="text-gray-600">{seed.description}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-green-600 font-semibold">
                    Price: BWP {seed.price} per packet
                  </p>
                  <p className="text-sm text-gray-500">
                    Seeds per packet: {seed.quantity_per_packet}
                  </p>
                  <p className="text-sm text-gray-500">
                    Available packets: {seed.quantity_available}
                  </p>
                  <p className="text-sm text-gray-500">
                    Location: {seed.location}
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  {isOwner(seed.owner_id) ? (
                    <>
                      <Button
                        onClick={() => handleViewRequests(seed)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Requests
                      </Button>
                      <Button
                        onClick={() => handleDelete(seed.id)}
                        variant="destructive"
                        className="flex-1"
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleInquiry(seed)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        disabled={seed.quantity_available === 0}
                      >
                        {seed.quantity_available === 0 ? "Out of Stock" : "Make Inquiry"}
                      </Button>
                      <Button
                        onClick={() => handleViewContact(seed)}
                        variant="outline"
                        className="flex-1"
                      >
                        Contact Details
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {showListDialog && (
        <ListSeedsDialog
          isOpen={showListDialog}
          onClose={() => setShowListDialog(false)}
        />
      )}

      {selectedSeed && (
        <>
          {showRequestsDialog && (
            <RequestsDialog
              isOpen={showRequestsDialog}
              onClose={() => setShowRequestsDialog(false)}
              equipmentId={selectedSeed.id}
              type="seeds"
            />
          )}
          {showInquiryDialog && (
            <InquiryDialog
              isOpen={showInquiryDialog}
              onClose={() => setShowInquiryDialog(false)}
              itemTitle={selectedSeed.name}
              itemType="sale"
              equipmentId={selectedSeed.id}
            />
          )}
          {showContactDialog && (
            <ContactDetailsDialog
              isOpen={showContactDialog}
              onClose={() => setShowContactDialog(false)}
              ownerDetails={{
                name: selectedSeed.owner.full_name || 'N/A',
                phone: selectedSeed.owner.phone_text || 'N/A',
                email: "",
                location: selectedSeed.location
              }}
            />
          )}
        </>
      )}

      <BottomNav />
    </div>
  );
};

export default Seeds;
