import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Group } from "@/types/groups";

interface GroupHeaderProps {
  selectedGroup: Group | null;
  onBack: () => void;
}

export const GroupHeader = ({ selectedGroup, onBack }: GroupHeaderProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onBack}
      >
        <ArrowLeft className="h-6 w-6 text-green-700" />
      </Button>
      <div className="flex items-center space-x-2">
        <MessageSquare className="h-6 w-6 text-green-700" />
        <h1 className="text-2xl font-bold text-green-800">
          {selectedGroup ? selectedGroup.name : 'Local Groups'}
        </h1>
      </div>
    </div>
  );
};