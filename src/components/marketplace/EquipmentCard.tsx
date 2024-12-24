import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Tag } from "lucide-react";
import InquiryDialog from "@/components/resources/InquiryDialog";

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
}

interface EquipmentCardProps {
  equipment: Equipment;
}

const EquipmentCard = ({ equipment }: EquipmentCardProps) => {
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);

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
            
            <div className="pt-4">
              <Button
                onClick={() => setShowInquiryDialog(true)}
                disabled={equipment.status !== "Available"}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {equipment.type === 'rent' ? 'Request to Rent' : 'Request to Buy'}
              </Button>
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