import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { uploadImage } from "@/utils/fileUpload";
import { supabase } from "@/integrations/supabase/client";
import SeedForm from "./seeds/SeedForm";

interface ListSeedsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListSeedsDialog = ({ isOpen, onClose }: ListSeedsDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: {
    name: string;
    description: string;
    location: string;
    image: File | null;
  }) => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      let imageUrl = null;
      if (formData.image) {
        imageUrl = await uploadImage(formData.image, 'seeds');
      }

      const { error: insertError } = await supabase
        .from('equipment')
        .insert({
          name: formData.name,
          description: formData.description,
          type: 'seeds',
          price: '0',
          location: formData.location,
          status: 'Available',
          owner_id: user.id,
          image_url: imageUrl
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Seeds listed successfully",
      });

      onClose();
    } catch (error) {
      console.error('Error submitting seeds:', error);
      toast({
        title: "Error",
        description: "Failed to list seeds. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>List Your Seeds</DialogTitle>
        </DialogHeader>
        <SeedForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default ListSeedsDialog;