import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

const GetStarted = () => {
  const isOnline = useOnlineStatus();
  const { toast } = useToast();
  const { language, setLanguage } = useLanguage();

  const content = {
    en: {
      title: "Farmers Connect",
      description: "Empowering Farmers through Collaboration and Innovation",
      joinButton: "Join Sebotsa",
      signInButton: "Sign In",
      communityText: "Join our community of farmers and agricultural experts",
      offlineMessage: "You are currently offline. Some features may be limited."
    },
    tn: {
      title: "Farmers Connect",
      description: "Re thusa balemi ba Botswana ka tirisano mmogo le ditlhabololo",
      joinButton: "Tsena mo Sebotsa",
      signInButton: "Tsena",
      communityText: "Nna leloko la setshaba sa balemi le baitseanape ba temo",
      offlineMessage: "Ga o a golagana le inthanete. Ditirelo dingwe di ka nna tsa sa bereke."
    }
  };

  const handleAction = () => {
    if (!isOnline) {
      toast({
        title: language === "en" ? "You're offline" : "Ga o a golagana",
        description: language === "en" 
          ? "Please connect to the internet to proceed."
          : "Tswêê-tswêê golagana le inthanete go tswelela.",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2FCE2] flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 w-full max-w-xs mx-auto">
        <RadioGroup
          defaultValue={language}
          onValueChange={(value) => setLanguage(value as "en" | "tn")}
          className="flex justify-center space-x-4 p-2 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="en" id="en" />
            <Label htmlFor="en">English</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tn" id="tn" />
            <Label htmlFor="tn">Setswana</Label>
          </div>
        </RadioGroup>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 text-center"
      >
        {!isOnline && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">
            <p className="text-sm font-medium">
              {content[language as keyof typeof content].offlineMessage}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-green-800">
            {content[language as keyof typeof content].title}
          </h1>
          <p className="text-lg text-green-700">
            {content[language as keyof typeof content].description}
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
            <Link to="/signup">
              {content[language as keyof typeof content].joinButton}
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            className={`w-full border-green-700 text-green-700 hover:bg-green-50 ${!isOnline ? "opacity-50 cursor-not-allowed" : ""}`}
            size="lg"
            onClick={handleAction}
          >
            <Link to="/signin">
              {content[language as keyof typeof content].signInButton}
            </Link>
          </Button>
        </div>

        <p className="text-sm text-green-700/80">
          {content[language as keyof typeof content].communityText}
        </p>
      </motion.div>
    </div>
  );
};

export default GetStarted;