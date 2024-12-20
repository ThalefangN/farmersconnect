import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, MapPin, Facebook } from "lucide-react";
import PhoneInput from "@/components/PhoneInput";
import { useState } from "react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOnline) {
      toast({
        title: "You're offline",
        description: "Please connect to the internet to sign up.",
        variant: "destructive",
      });
      return;
    }

    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#F2FCE2] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        {!isOnline && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">
            <p className="text-sm font-medium">
              You are currently offline. Please connect to the internet to sign up.
            </p>
          </div>
        )}

        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-800">Join Sebotsa Farmers Hub</h1>
          <p className="text-green-700 mt-2">Create your farmer account today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                <Input id="username" placeholder="Enter your full name" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                <Input id="email" type="email" placeholder="Enter your email" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                <Input id="password" type="password" placeholder="Create a secure password" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <PhoneInput value={phone} onChange={setPhone} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                <Input id="location" placeholder="Enter your location" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="farmingType">Farming Type</Label>
              <Select>
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

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to Sebotsa Farmers Hub's terms of service and privacy policy
              </label>
            </div>
          </div>

          <Button 
            type="submit" 
            className={`w-full bg-yellow-500 hover:bg-yellow-600 text-black ${!isOnline ? "opacity-50" : ""}`} 
            size="lg" 
            disabled={!agreed || !isOnline}
          >
            Create Farmer Account
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-green-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#F2FCE2] px-2 text-green-700">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              type="button" 
              className={`w-full border-green-700 text-green-700 hover:bg-green-50 ${!isOnline ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => {
                if (!isOnline) {
                  toast({
                    title: "You're offline",
                    description: "Please connect to the internet to continue with Facebook.",
                    variant: "destructive",
                  });
                }
              }}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button 
              variant="outline" 
              type="button" 
              className={`w-full border-green-700 text-green-700 hover:bg-green-50 ${!isOnline ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => {
                if (!isOnline) {
                  toast({
                    title: "You're offline",
                    description: "Please connect to the internet to continue with Google.",
                    variant: "destructive",
                  });
                }
              }}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Google
            </Button>
          </div>

          <p className="text-center text-sm text-green-700">
            Already a member?{" "}
            <Link to="/signin" className="font-medium text-yellow-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;