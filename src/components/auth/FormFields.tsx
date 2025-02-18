import { User, Mail, Lock, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PhoneInput from "@/components/PhoneInput";

interface FormFieldsProps {
  formData: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    location: string;
    farmingType: string;
  };
  setFormData: (data: any) => void;
}

export const FormFields = ({ formData, setFormData }: FormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-green-600" />
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Enter your full name"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-green-600" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-green-600" />
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Create a secure password"
            className="pl-10"
            required
            minLength={6}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <PhoneInput
          value={formData.phone}
          onChange={(value) => setFormData({ ...formData, phone: value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-green-600" />
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Enter your location"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="farmingType">Farming Type</Label>
        <Select
          value={formData.farmingType}
          onValueChange={(value) => setFormData({ ...formData, farmingType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your farming type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="livestock">Livestock Farming</SelectItem>
            <SelectItem value="crops">Crop Farming</SelectItem>
            <SelectItem value="mixed">Mixed Farming</SelectItem>
            <SelectItem value="poultry">Poultry Farming</SelectItem>
            <SelectItem value="horticulture">Horticulture</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};