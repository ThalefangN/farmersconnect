import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import { format } from "date-fns";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles?: {
    full_name: string | null;
  };
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSubmit}>
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {comments.map((comment) => (
        <Card key={comment.id} className="p-3">
          <div className="space-y-1">
            <div className="flex justify-between">
              <h4 className="font-medium text-sm">
                {comment.profiles?.full_name}
              </h4>
              <span className="text-xs text-gray-500">
                {format(new Date(comment.created_at), 'MMM d, yyyy')}
              </span>
            </div>
            <p className="text-sm text-gray-700">{comment.content}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CommentSection;