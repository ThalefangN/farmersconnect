import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LandDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLand: {
    title: string;
    details: {
      soilType: string;
      waterSource: string;
      accessibility: string;
      facilities: string;
      previousCrops: string;
    };
  } | null;
  onContactOwner: () => void;
}

const LandDetails = ({ isOpen, onClose, selectedLand, onContactOwner }: LandDetailsProps) => {
  if (!selectedLand) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{selectedLand.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Soil Type</h4>
              <p>{selectedLand.details.soilType}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Water Source</h4>
              <p>{selectedLand.details.waterSource}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Accessibility</h4>
              <p>{selectedLand.details.accessibility}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Facilities</h4>
              <p>{selectedLand.details.facilities}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Previous Crops</h4>
            <p>{selectedLand.details.previousCrops}</p>
          </div>
          <Button 
            className="w-full"
            onClick={onContactOwner}
          >
            Contact Owner
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LandDetails;