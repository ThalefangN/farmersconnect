import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";

interface EquipmentFormProps {
  onSubmit: (formData: {
    name: string;
    description: string;
    price: string;
    type: string;
    location: string;
    image: File | null;
  }) => Promise<void>;
  isLoading: boolean;
}

const EquipmentForm = ({ onSubmit, isLoading }: EquipmentFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("rent");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ name, description, price, type, location, image });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="equipment-name">Equipment Name *</Label>
        <Input 
          id="equipment-name"
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your equipment"
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
        <Label htmlFor="type">Listing Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rent">For Rent (per day)</SelectItem>
            <SelectItem value="sale">For Sale</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="price">
          {type === 'rent' ? 'Daily Rental Price (BWP)' : 'Selling Price (BWP)'}
        </Label>
        <Input 
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder={type === 'rent' ? 'Enter daily rental price' : 'Enter selling price'}
          required
        />
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
        disabled={isLoading}
      >
        {isLoading ? (
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
  );
};

export default EquipmentForm;