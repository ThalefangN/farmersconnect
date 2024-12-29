import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandHeaderProps {
  onListLand: () => void;
}

const LandHeader = ({ onListLand }: LandHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Available Land</h1>
      </div>
      <Button
        onClick={onListLand}
        className="bg-green-600 hover:bg-green-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        List Land
      </Button>
    </div>
  );
};

export default LandHeader;