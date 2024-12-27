import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";

interface SeedFormProps {
  onSubmit: (formData: {
    name: string;
    description: string;
    location: string;
    image: File | null;
    price: string;
    quantityPerPacket: string;
    quantityAvailable: string;
  }) => Promise<void>;
  isLoading: boolean;
}

const SeedForm = ({ onSubmit, isLoading }: SeedFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [quantityPerPacket, setQuantityPerPacket] = useState("");
  const [quantityAvailable, setQuantityAvailable] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ 
      name, 
      description, 
      location, 
      image,
      price,
      quantityPerPacket,
      quantityAvailable
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="seed-name">Seed Name *</Label>
        <Input 
          id="seed-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter seed name"
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your seeds"
        />
      </div>
      <div>
        <Label htmlFor="price">Price (BWP) *</Label>
        <Input 
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price per packet"
          required
        />
      </div>
      <div>
        <Label htmlFor="quantity-per-packet">Seeds per Packet *</Label>
        <Input 
          id="quantity-per-packet"
          type="number"
          value={quantityPerPacket}
          onChange={(e) => setQuantityPerPacket(e.target.value)}
          placeholder="Enter number of seeds per packet"
          required
        />
      </div>
      <div>
        <Label htmlFor="quantity-available">Number of Packets Available *</Label>
        <Input 
          id="quantity-available"
          type="number"
          value={quantityAvailable}
          onChange={(e) => setQuantityAvailable(e.target.value)}
          placeholder="Enter number of packets available"
          required
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
        <Label htmlFor="image">Seed Image</Label>
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

export default SeedForm;