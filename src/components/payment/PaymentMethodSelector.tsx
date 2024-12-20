import { Building2, CreditCard, Smartphone } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentMethodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const PaymentMethodSelector = ({ value, onChange }: PaymentMethodSelectorProps) => {
  return (
    <div className="space-y-4">
      <Label>Payment Method</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid gap-4"
      >
        <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="orange" id="orange" />
          <Label htmlFor="orange" className="flex items-center gap-2 cursor-pointer">
            <Smartphone className="h-4 w-4" />
            Orange Money
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="myzaka" id="myzaka" />
          <Label htmlFor="myzaka" className="flex items-center gap-2 cursor-pointer">
            <Smartphone className="h-4 w-4" />
            MyZaka
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="smega" id="smega" />
          <Label htmlFor="smega" className="flex items-center gap-2 cursor-pointer">
            <Smartphone className="h-4 w-4" />
            Smega
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="bank" id="bank" />
          <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
            <Building2 className="h-4 w-4" />
            Bank Transfer
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;