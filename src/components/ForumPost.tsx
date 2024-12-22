import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, Trash2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface ForumPostProps {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  imageUrl?: string | null;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  onDelete?: () => void;
  currentUserId?: string;
}

const ForumPost = ({
  id,
  content,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  likesCount,
  commentsCount,
  isLiked,
  onDelete,
  currentUserId
}: ForumPostProps) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [showComments, setShowComments] = useState(false);
  const { toast } = useToast();

  const handleLike = async () => {
    try {
      if (isLiked) {
        await supabase
          .from('likes')
          .delete()
          .match({ post_id: id, user_id: currentUserId });
      } else {
        await supabase
          .from('likes')
          .insert({ post_id: id, user_id: currentUserId });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Failed to like post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await supabase
        .from('posts')
        .delete()
        .match({ id });
      
      onDelete?.();
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles:user_id (
            full_name
          )
        `)
        .eq('post_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error loading comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: id,
          user_id: currentUserId,
          content: newComment.trim()
        });

      if (error) throw error;

      setNewComment("");
      loadComments();
      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleComments = () => {
    if (!showComments) {
      loadComments();
    }
    setShowComments(!showComments);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <Card className="p-4">
        <div className="space-y-4">
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
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <p className="text-gray-700">{content}</p>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Post attachment"
              className="rounded-lg w-full h-48 object-cover"
            />
          )}

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={isLiked ? "text-green-600" : ""}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {likesCount}
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleComments}>
              <MessageSquare className="h-4 w-4 mr-1" />
              {commentsCount} Comments
            </Button>
          </div>

          {showComments && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleComment}>
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
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ForumPost;