import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useState } from "react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PhoneInput = ({ value, onChange, placeholder = "Phone number" }: PhoneInputProps) => {
  const [countryCode, setCountryCode] = useState("+267"); // Botswana

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Remove any non-numeric characters except +
    const numericValue = inputValue.replace(/[^\d+]/g, '');
    onChange(numericValue);
  };

  return (
    <div className="flex space-x-2">
      <Button
        type="button"
        variant="outline"
        className="w-[4.5rem] px-2"
      >
        {countryCode}
      </Button>
      <div className="relative flex-1">
        <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="tel"
          value={value}
          onChange={handleInputChange}
          className="pl-10"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default PhoneInput;