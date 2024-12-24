import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadImage } from "@/utils/fileUpload";
import { Loader2, Upload } from "lucide-react";

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
  const [type, setType] = useState("rent");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
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

    if (!location.trim()) {
      toast({
        title: "Error",
        description: "Location is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Add image URL to form if image is selected
      if (image) {
        const imageUrl = await uploadImage(image, 'equipment');
        const formElement = e.target as HTMLFormElement;
        const imageInput = document.createElement('input');
        imageInput.type = 'hidden';
        imageInput.name = 'image_url';
        imageInput.value = imageUrl;
        formElement.appendChild(imageInput);
      }

      await onSubmit(e);
      
      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setType("rent");
      setLocation("");
      setImage(null);
    } catch (error) {
      console.error('Error submitting equipment:', error);
      toast({
        title: "Error",
        description: "Failed to list equipment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>List Your Equipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="equipment-name">Equipment Name *</Label>
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
            <Label htmlFor="location">Location *</Label>
            <Input 
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price {type === 'rent' ? '(per day)' : ''}</Label>
            <Input 
              id="price"
              name="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={`Enter ${type === 'rent' ? 'rental price per day' : 'selling price'}`}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Listing Type</Label>
            <Select name="type" value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="image">Equipment Image</Label>
            <div className="mt-1 flex items-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="flex-1"
              />
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="h-10 w-10 object-cover rounded"
                />
              )}
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Uploading...</span>
              </div>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Submit Listing
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ListEquipmentDialog;