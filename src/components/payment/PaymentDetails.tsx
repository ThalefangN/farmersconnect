import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentDetailsProps {
  paymentMethod: string;
  fullName: string;
  onFullNameChange: (value: string) => void;
  proofOfPayment: File | null;
  onProofOfPaymentChange: (file: File | null) => void;
}

const PaymentDetails = ({
  paymentMethod,
  fullName,
  onFullNameChange,
  proofOfPayment,
  onProofOfPaymentChange,
}: PaymentDetailsProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onProofOfPaymentChange(file);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name / Guardian's Name</Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          placeholder="Enter full name"
        />
      </div>

      {paymentMethod && (
        <div className="space-y-2">
          <Label htmlFor="proofOfPayment">Proof of Payment</Label>
          <Input
            id="proofOfPayment"
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          <p className="text-sm text-muted-foreground">
            Please upload a screenshot or PDF of your payment confirmation
          </p>
        </div>
      )}

      {paymentMethod === 'bank' && (
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <h4 className="font-semibold">Bank Details</h4>
          <div className="text-sm space-y-1">
            <p>Bank: First National Bank</p>
            <p>Account Name: Education Platform Ltd</p>
            <p>Account Number: 12345678901</p>
            <p>Branch Code: 123456</p>
            <p>Reference: Your Full Name</p>
          </div>
        </div>
      )}

      {(paymentMethod === 'orange' || paymentMethod === 'myzaka' || paymentMethod === 'smega') && (
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <h4 className="font-semibold">Mobile Payment Details</h4>
          <div className="text-sm space-y-1">
            <p>Number: +267 71234567</p>
            <p>Name: Education Platform</p>
            <p>Reference: Your Full Name</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;