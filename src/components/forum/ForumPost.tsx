import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import CommentSection from "./CommentSection";

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
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const { toast } = useToast();

  const handleLike = async () => {
    try {
      if (isLiked) {
        const { data } = await supabase
          .from('likes')
          .select('id')
          .eq('post_id', id)
          .eq('user_id', currentUserId)
          .maybeSingle();

        if (data) {
          await supabase
            .from('likes')
            .delete()
            .eq('id', data.id);
        }
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

  const handleAddComment = async (content: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: id,
          user_id: currentUserId,
          content: content.trim()
        });

      if (error) throw error;

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
          <PostHeader
            authorName={authorName}
            createdAt={createdAt}
            authorId={authorId}
            currentUserId={currentUserId}
            onDelete={handleDelete}
          />

          <p className="text-gray-700">{content}</p>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Post attachment"
              className="rounded-lg w-full h-48 object-cover"
            />
          )}

          <PostActions
            likesCount={likesCount}
            commentsCount={commentsCount}
            isLiked={isLiked}
            onLike={handleLike}
            onToggleComments={toggleComments}
          />

          {showComments && (
            <CommentSection
              comments={comments}
              onAddComment={handleAddComment}
            />
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ForumPost;