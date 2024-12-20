import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useToast } from "@/hooks/use-toast";

const GetStarted = () => {
  const isOnline = useOnlineStatus();
  const { toast } = useToast();

  const handleAction = () => {
    if (!isOnline) {
      toast({
        title: "You're offline",
        description: "Please connect to the internet to proceed.",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2FCE2] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 text-center"
      >
        {!isOnline && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">
            <p className="text-sm font-medium">
              You are currently offline. Some features may be limited.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-green-800">Sebotsa Farmers Hub</h1>
          <p className="text-lg text-green-700">
            Empowering Botswana Farmers through Collaboration and Innovation
          </p>
        </div>
        
        <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-xl">
          <img
            src="/lovable-uploads/18a8902a-f4eb-4b86-8c45-c8914ecb854c.png"
            alt="Botswana Farming"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-4">
          <Button 
            asChild 
            className={`w-full bg-yellow-500 hover:bg-yellow-600 text-black ${!isOnline ? "opacity-50 cursor-not-allowed" : ""}`}
            size="lg"
            onClick={handleAction}
          >
            <Link to="/signup">Join Sebotsa</Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            className={`w-full border-green-700 text-green-700 hover:bg-green-50 ${!isOnline ? "opacity-50 cursor-not-allowed" : ""}`}
            size="lg"
            onClick={handleAction}
          >
            <Link to="/signin">Sign In</Link>
          </Button>
        </div>

        <p className="text-sm text-green-700/80">
          Join our community of farmers and agricultural experts
        </p>
      </motion.div>
    </div>
  );
};

export default GetStarted;