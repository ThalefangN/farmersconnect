import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { uploadImage } from "@/utils/fileUpload";
import { supabase } from "@/integrations/supabase/client";
import EquipmentForm from "./equipment/EquipmentForm";

interface ListEquipmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListEquipmentDialog = ({ isOpen, onClose }: ListEquipmentDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: {
    name: string;
    description: string;
    price: string;
    type: string;
    location: string;
    image: File | null;
  }) => {
    try {
      setIsLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      let imageUrl = null;
      if (formData.image) {
        imageUrl = await uploadImage(formData.image, 'equipment');
      }

      // Insert equipment data
      const { error: insertError } = await supabase
        .from('equipment')
        .insert({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          type: formData.type,
          location: formData.location,
          status: 'Available',
          owner_id: user.id,
          image_url: imageUrl
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Equipment listed successfully",
      });

      onClose();
    } catch (error) {
      console.error('Error submitting equipment:', error);
      toast({
        title: "Error",
        description: "Failed to list equipment. Please try again.",
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
          <DialogTitle>List Your Equipment</DialogTitle>
        </DialogHeader>
        <EquipmentForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default ListEquipmentDialog;