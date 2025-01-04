import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EquipmentHeaderProps {
  onViewRequests: () => void;
  onListEquipment: () => void;
  currentUserId: string | null;
}

const EquipmentHeader = ({ onListEquipment, currentUserId }: EquipmentHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Wrench className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Farming Equipment</h1>
      </div>
      <div>
        {currentUserId && (
          <Button
            onClick={onListEquipment}
            className="bg-green-600 hover:bg-green-700"
          >
            List Equipment
          </Button>
        )}
      </div>
    </div>
  );
};

export default EquipmentHeader;