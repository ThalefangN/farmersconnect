import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import OTPInput from "@/components/OTPInput";
import PasswordResetDialog from "@/components/profile/PasswordResetDialog";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [showResetDialog, setShowResetDialog] = useState(false);
  const { toast } = useToast();

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const generatedOTP = generateOTP();
      
      const response = await supabase.functions.invoke('send-otp-email', {
        body: {
          to: email,
          otp: generatedOTP,
        },
      });

      if (response.error) throw new Error('Failed to send OTP');

      // Store OTP in localStorage with expiration
      const expirationTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes
      localStorage.setItem('resetOTP', JSON.stringify({
        otp: generatedOTP,
        email,
        expiration: expirationTime,
      }));

      setShowOTP(true);
      toast({
        title: "Success",
        description: "OTP has been sent to your email",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = () => {
    const storedData = localStorage.getItem('resetOTP');
    if (!storedData) {
      toast({
        title: "Error",
        description: "OTP has expired. Please request a new one.",
        variant: "destructive",
      });
      return;
    }

    const { otp: storedOTP, expiration } = JSON.parse(storedData);
    if (new Date().getTime() > expiration) {
      localStorage.removeItem('resetOTP');
      toast({
        title: "Error",
        description: "OTP has expired. Please request a new one.",
        variant: "destructive",
      });
      return;
    }

    if (otp === storedOTP) {
      setShowResetDialog(true);
      localStorage.removeItem('resetOTP');
    } else {
      toast({
        title: "Error",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F2FCE2] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-800">Reset Password</h1>
          {!showOTP ? (
            <p className="text-green-700 mt-2">
              Enter your email address and we'll send you an OTP to reset your password
            </p>
          ) : (
            <p className="text-green-700 mt-2">
              Enter the OTP sent to your email
            </p>
          )}
        </div>

        {!showOTP ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <OTPInput value={otp} onChange={setOTP} />
            <Button
              onClick={verifyOTP}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Verify OTP
            </Button>
          </div>
        )}

        <Link
          to="/signin"
          className="flex items-center justify-center text-sm text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sign In
        </Link>
      </div>

      <PasswordResetDialog
        isOpen={showResetDialog}
        onClose={() => setShowResetDialog(false)}
      />
    </div>
  );
};

export default ForgotPassword;