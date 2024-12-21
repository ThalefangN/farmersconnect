import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { SocialAuth } from "@/components/auth/SocialAuth";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-[#F2FCE2] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-800">Join Sebotsa Farmers Hub</h1>
          <p className="text-green-700 mt-2">Create your farmer account today</p>
        </div>

        <SignUpForm />
        
        <SocialAuth />

        <p className="text-center text-sm text-green-700">
          Already a member?{" "}
          <Link to="/signin" className="font-medium text-yellow-600 hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;