import { useState } from "react";
import { Heart, ThumbsUp, Laugh, Angry, Meh } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReactionOption {
  type: string;
  icon: React.ComponentType<any>;
  label: string;
}

const reactionOptions: ReactionOption[] = [
  { type: 'like', icon: ThumbsUp, label: 'Like' },
  { type: 'heart', icon: Heart, label: 'Love' },
  { type: 'laugh', icon: Laugh, label: 'Haha' },
  { type: 'angry', icon: Angry, label: 'Angry' },
  { type: 'meh', icon: Meh, label: 'Meh' }
];

interface MessageReactionsProps {
  messageId: string;
  currentUserId?: string;
  onReact: (type: string) => void;
  reactions: any[];
}

export function MessageReactions({ messageId, currentUserId, onReact, reactions }: MessageReactionsProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getReactionCount = (type: string) => {
    return reactions.filter(r => r.reaction_type === type).length;
  };

  const hasUserReacted = (type: string) => {
    return reactions.some(r => r.user_id === currentUserId && r.reaction_type === type);
  };

  return (
    <div 
      className="flex items-center gap-1 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {reactionOptions.map((option) => (
        <Button
          key={option.type}
          variant="ghost"
          size="sm"
          onClick={() => onReact(option.type)}
          className={cn(
            "h-8 px-2 hover:bg-muted",
            hasUserReacted(option.type) && "text-primary",
            !isHovered && getReactionCount(option.type) === 0 && "hidden"
          )}
        >
          <option.icon className="h-4 w-4 mr-1" />
          <span className="text-xs">{getReactionCount(option.type)}</span>
        </Button>
      ))}
    </div>
  );
}