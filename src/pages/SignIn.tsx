import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SocialAuth } from "@/components/auth/SocialAuth";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Attempting signin...");
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error("Signin error:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (!user?.email_confirmed_at) {
        console.log("Email not verified");
        toast({
          title: "Email Not Verified",
          description: "Please check your email and verify your account before signing in. Need a new verification link? Click 'Resend' below.",
          variant: "destructive",
        });
        return;
      }

      console.log("Signin successful:", user);
      toast({
        title: "Success",
        description: "Successfully signed in!",
      });
      
      navigate("/home");
    } catch (error) {
      console.error("Unexpected error during signin:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!formData.email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: formData.email,
        options: {
          emailRedirectTo: `${window.location.origin}/signin`,
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Verification email has been resent. Please check your inbox.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F2FCE2] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-800">Welcome Back to Sebotsa</h1>
          <p className="text-green-700 mt-2">Sign in to your farmer account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
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
                  placeholder="Enter your password"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
            size="lg"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <button
            type="button"
            onClick={handleResendVerification}
            className="w-full text-sm text-green-700 hover:underline"
          >
            Resend verification email
          </button>
        </form>

        <SocialAuth />

        <p className="text-center text-sm text-green-700">
          New to Sebotsa?{" "}
          <Link to="/signup" className="font-medium text-yellow-600 hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;