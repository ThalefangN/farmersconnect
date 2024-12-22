import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";

interface PostHeaderProps {
  authorName: string;
  createdAt: string;
  authorId: string;
  currentUserId?: string;
  onDelete?: () => void;
}

const PostHeader = ({ authorName, createdAt, authorId, currentUserId, onDelete }: PostHeaderProps) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-green-800">{authorName}</h3>
        <p className="text-sm text-gray-500">
          {format(new Date(createdAt), 'MMM d, yyyy h:mm a')}
        </p>
      </div>
      {currentUserId === authorId && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default PostHeader;