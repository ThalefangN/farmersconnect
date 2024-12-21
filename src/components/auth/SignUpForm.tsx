import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FormFields } from "./FormFields";
import { validateSignUpForm } from "@/utils/formValidation";

export const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    location: "",
    farmingType: "",
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreed) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms of service and privacy policy",
        variant: "destructive",
      });
      return;
    }

    const errors = validateSignUpForm(formData);
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(". "),
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      console.log("Starting signup process...");
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            location: formData.location,
            farming_type: formData.farmingType,
          },
        },
      });

      if (error) {
        console.error("Signup error:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      console.log("Signup successful:", data);
      toast({
        title: "Success",
        description: "Account created successfully! Please verify your email before signing in.",
      });
      
      navigate("/signin");
    } catch (error) {
      console.error("Unexpected error during signup:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormFields formData={formData} setFormData={setFormData} />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreed}
          onCheckedChange={(checked) => setAgreed(checked as boolean)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to Sebotsa Farmers Hub's terms of service and privacy policy
        </label>
      </div>

      <Button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
        size="lg"
        disabled={loading || !agreed}
      >
        {loading ? "Creating Account..." : "Create Farmer Account"}
      </Button>
    </form>
  );
};