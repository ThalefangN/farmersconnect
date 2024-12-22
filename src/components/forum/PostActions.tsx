import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp } from "lucide-react";

interface PostActionsProps {
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  onLike: () => void;
  onToggleComments: () => void;
}

const PostActions = ({ likesCount, commentsCount, isLiked, onLike, onToggleComments }: PostActionsProps) => {
  return (
    <div className="flex items-center space-x-4 text-sm text-gray-500">
      <Button
        variant="ghost"
        size="sm"
        onClick={onLike}
        className={isLiked ? "text-green-600" : ""}
      >
        <ThumbsUp className="h-4 w-4 mr-1" />
        {likesCount}
      </Button>
      <Button variant="ghost" size="sm" onClick={onToggleComments}>
        <MessageSquare className="h-4 w-4 mr-1" />
        {commentsCount} Comments
      </Button>
    </div>
  );
};

export default PostActions;