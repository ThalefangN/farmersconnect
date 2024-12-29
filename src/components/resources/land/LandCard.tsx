import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Eye, MapPin } from "lucide-react";
import InquiryDialog from "@/components/resources/InquiryDialog";
import RequestsDialog from "@/components/resources/RequestsDialog";
import ContactDetailsDialog from "@/components/resources/ContactDetailsDialog";

interface LandCardProps {
  land: {
    id: string;
    name: string;
    description: string | null;
    location: string;
    price: string;
    type: string;
    image_url?: string | null;
    owner: {
      name: string | null;
      phone?: string | null;
    };
    owner_id: string;
    status?: string;
  };
  currentUserId: string | null;
  onDelete: (id: string) => void;
}

const LandCard = ({ land, currentUserId, onDelete }: LandCardProps) => {
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showRequestsDialog, setShowRequestsDialog] = useState(false);

  const isOwner = currentUserId === land.owner_id;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {land.image_url && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={land.image_url}
            alt={land.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{land.name}</h3>
            <Badge variant={land.status === "Available" ? "success" : "destructive"}>
              {land.status || "Available"}
            </Badge>
          </div>
          <p className="text-gray-600">{land.description}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            {land.location}
          </div>
          <p className="text-green-600 font-medium">
            BWP {land.price}
            {land.type === 'rent' ? ' per day' : ''}
          </p>

          <div className="flex gap-2 pt-2">
            {isOwner ? (
              <Button
                onClick={() => setShowRequestsDialog(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Requests
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => setShowInquiryDialog(true)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  {land.type === 'rent' ? 'Request to Rent' : 'Request to Buy'}
                </Button>
                <Button
                  onClick={() => setShowContactDialog(true)}
                  variant="outline"
                  className="flex-1"
                >
                  Contact Details
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>

      {showInquiryDialog && (
        <InquiryDialog
          isOpen={showInquiryDialog}
          onClose={() => setShowInquiryDialog(false)}
          itemTitle={land.name}
          itemType={land.type === 'rent' ? 'rent' : 'sale'}
          equipmentId={land.id}
        />
      )}

      {showRequestsDialog && (
        <RequestsDialog
          isOpen={showRequestsDialog}
          onClose={() => setShowRequestsDialog(false)}
          equipmentId={land.id}
          type="land"
        />
      )}

      {showContactDialog && (
        <ContactDetailsDialog
          isOpen={showContactDialog}
          onClose={() => setShowContactDialog(false)}
          ownerDetails={{
            name: land.owner.name || '',
            phone: land.owner.phone || '',
            email: '',
            location: land.location
          }}
        />
      )}
    </Card>
  );
};

export default LandCard;