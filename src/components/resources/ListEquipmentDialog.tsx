import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ListEquipmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ListEquipmentDialog = ({ isOpen, onClose, onSubmit }: ListEquipmentDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required fields
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Equipment name is required",
        variant: "destructive",
      });
      return;
    }

    if (!price.trim()) {
      toast({
        title: "Error",
        description: "Price is required",
        variant: "destructive",
      });
      return;
    }

    onSubmit(e);
    
    // Reset form
    setName("");
    setDescription("");
    setPrice("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>List Your Equipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="equipment-name">Equipment Name</Label>
            <Input 
              id="equipment-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter equipment name"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your equipment"
            />
          </div>
          <div>
            <Label htmlFor="price">Price (per day)</Label>
            <Input 
              id="price"
              name="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter rental price"
              required
            />
          </div>
          <input type="hidden" name="type" value="equipment" />
          <Button type="submit" className="w-full">Submit Listing</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ListEquipmentDialog;