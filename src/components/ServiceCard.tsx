import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path?: string;
}

const ServiceCard = ({ title, description, icon: Icon, path }: ServiceCardProps) => {
  const isOnline = useOnlineStatus();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isOnline) {
      toast({
        title: "You're offline",
        description: "Please connect to the internet to access this service.",
        variant: "destructive",
      });
      return;
    }

    if (path) {
      navigate(path);
    }
  };

  return (
    <Card 
      className={`bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer border-white/20 ${
        !isOnline ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-lg text-white">{title}</CardTitle>
            <CardDescription className="text-white/80">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ServiceCard;