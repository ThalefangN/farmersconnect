import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Tag, Trash2 } from "lucide-react";
import InquiryDialog from "@/components/resources/InquiryDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Equipment {
  id: string;
  name: string;
  description: string | null;
  price: string;
  type: 'rent' | 'sale';
  status: string;
  location: string;
  image_url?: string | null;
  owner: {
    name: string | null;
    phone?: string | null;
  };
  owner_id: string;
}

interface EquipmentCardProps {
  equipment: Equipment;
  onDelete?: () => void;
  currentUserId?: string;
}

const EquipmentCard = ({ equipment, onDelete, currentUserId }: EquipmentCardProps) => {
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      // Check if equipment has any pending requests
      const { data: requests, error: requestsError } = await supabase
        .from('equipment_requests')
        .select('id, status')
        .eq('equipment_id', equipment.id);

      if (requestsError) throw requestsError;

      if (requests && requests.some(req => req.status === 'pending' || req.status === 'approved')) {
        toast({
          title: "Cannot Delete",
          description: "This equipment has pending or approved requests and cannot be deleted.",
          variant: "destructive",
        });
        return;
      }

      // Delete the equipment
      const { error: deleteError } = await supabase
        .from('equipment')
        .delete()
        .eq('id', equipment.id);

      if (deleteError) throw deleteError;

      toast({
        title: "Success",
        description: "Equipment deleted successfully",
      });

      if (onDelete) onDelete();
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast({
        title: "Error",
        description: "Failed to delete equipment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        {equipment.image_url && (
          <div className="w-full h-48 overflow-hidden">
            <img 
              src={equipment.image_url} 
              alt={equipment.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle>{equipment.name}</CardTitle>
          <CardDescription>{equipment.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Tag className="h-4 w-4" />
              <span>
                {equipment.type === 'rent' 
                  ? `BWP ${equipment.price}/day` 
                  : `BWP ${equipment.price}`
                }
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{equipment.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className={`${
                equipment.status === "Available" ? "text-green-600" : "text-red-600"
              }`}>
                {equipment.status}
              </span>
            </div>
            
            <div className="pt-4 space-y-2">
              <Button
                onClick={() => setShowInquiryDialog(true)}
                disabled={equipment.status !== "Available"}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {equipment.type === 'rent' ? 'Request to Rent' : 'Request to Buy'}
              </Button>

              {currentUserId === equipment.owner_id && (
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  variant="destructive"
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? 'Deleting...' : 'Delete Equipment'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <InquiryDialog
        isOpen={showInquiryDialog}
        onClose={() => setShowInquiryDialog(false)}
        itemTitle={equipment.name}
        itemType={equipment.type}
        equipmentId={equipment.id}
      />
    </>
  );
};

export default EquipmentCard;