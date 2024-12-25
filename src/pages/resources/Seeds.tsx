import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ListSeedsDialog } from "@/components/resources/ListSeedsDialog";
import { InquiryDialog } from "@/components/resources/InquiryDialog";
import { ContactDetailsDialog } from "@/components/resources/ContactDetailsDialog";
import BottomNav from "@/components/BottomNav";
import type { Seed } from "@/types/seeds";

const Seeds = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [selectedSeed, setSelectedSeed] = useState<Seed | null>(null);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showListDialog, setShowListDialog] = useState(false);

  useEffect(() => {
    fetchSeeds();
  }, []);

  const fetchSeeds = async () => {
    try {
      const { data, error } = await supabase
        .from("seeds")
        .select(`
          *,
          owner:profiles(full_name, phone_text)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSeeds(data as Seed[]);
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
        .from("seeds")
        .delete()
        .eq("id", seedId);

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
              >
                <div className="bg-white rounded-lg shadow-md p-4">
                  {seed.image_url && (
                    <img
                      src={seed.image_url}
                      alt={seed.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold">{seed.name}</h3>
                  <p className="text-gray-600">{seed.description}</p>
                  <p className="text-green-600 font-semibold mt-2">
                    Price: BWP {seed.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Location: {seed.location}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={() => handleInquiry(seed)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Make Inquiry
                    </Button>
                    <Button
                      onClick={() => handleViewContact(seed)}
                      variant="outline"
                      className="flex-1"
                    >
                      Contact Details
                    </Button>
                    {seed.owner_id === (supabase.auth.getUser()?.data?.user?.id || null) && (
                      <Button
                        onClick={() => handleDelete(seed.id)}
                        variant="destructive"
                        className="flex-1"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <ListSeedsDialog
        open={showListDialog}
        onOpenChange={setShowListDialog}
        onSuccess={fetchSeeds}
      />

      {selectedSeed && (
        <>
          <InquiryDialog
            open={showInquiryDialog}
            onOpenChange={setShowInquiryDialog}
            type="seeds"
            item={selectedSeed}
          />
          <ContactDetailsDialog
            open={showContactDialog}
            onOpenChange={setShowContactDialog}
            ownerName={selectedSeed.owner.full_name}
            phoneNumber={selectedSeed.owner.phone_text}
          />
        </>
      )}

      <BottomNav />
    </div>
  );
};

export default Seeds;