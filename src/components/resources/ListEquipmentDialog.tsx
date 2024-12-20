import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ListEquipmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

const ListEquipmentDialog = ({ isOpen, onClose, onSubmit }: ListEquipmentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>List Your Equipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="equipment-name">Equipment Name</Label>
            <Input id="equipment-name" placeholder="Enter equipment name" required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe your equipment" required />
          </div>
          <div>
            <Label htmlFor="price">Price (per day)</Label>
            <Input id="price" type="text" placeholder="Enter rental price" required />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter location" required />
          </div>
          <Button type="submit" className="w-full">Submit Listing</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ListEquipmentDialog;