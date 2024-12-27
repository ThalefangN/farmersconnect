import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload } from "lucide-react";

const ListLandDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [type, setType] = useState<"rent" | "sale">("sale");
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location || !price || !type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Starting land listing submission...");
      setIsSubmitting(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let imageUrl = null;
      if (image) {
        console.log("Uploading image...");
        const fileExt = image.name.split('.').pop();
        const filePath = `${Math.random()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('equipment')
          .upload(filePath, image);

        if (uploadError) {
          console.error("Image upload error:", uploadError);
          throw uploadError;
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('equipment')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
        console.log("Image uploaded successfully:", imageUrl);
      }

      console.log("Inserting land record...");
      const { error } = await supabase
        .from('equipment')
        .insert({
          name,
          description,
          location,
          type: 'Land',
          owner_id: user.id,
          image_url: imageUrl,
          price: price,
          status: 'Available',
          price_numeric: parseFloat(price)
        });

      if (error) {
        console.error("Database insertion error:", error);
        throw error;
      }

      console.log("Land listed successfully");
      toast({
        title: "Success",
        description: "Land listed successfully",
      });
      
      onClose();
    } catch (error) {
      console.error('Error listing land:', error);
      toast({
        title: "Error",
        description: "Failed to list land. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>List Land</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="land-name">Land Title *</Label>
            <Input
              id="land-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter land title"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the land"
            />
          </div>
          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              required
            />
          </div>
          <div>
            <Label>Listing Type *</Label>
            <RadioGroup
              value={type}
              onValueChange={(value: "rent" | "sale") => setType(value)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sale" id="sale" />
                <Label htmlFor="sale">For Sale</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rent" id="rent" />
                <Label htmlFor="rent">For Rent</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="price">
              {type === "rent" ? "Rental Price (per day) *" : "Selling Price *"}
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={`Enter ${type === "rent" ? "rental" : "selling"} price`}
              required
            />
          </div>
          <div>
            <Label htmlFor="image">Land Image</Label>
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
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  List Land
                </>
              )}
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ListLandDialog;