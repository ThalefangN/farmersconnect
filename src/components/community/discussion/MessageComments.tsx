import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface MessageCommentsProps {
  messageId: string;
  currentUserId?: string;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name: string | null;
  };
}

export function MessageComments({ messageId, currentUserId }: MessageCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadComments();
  }, [messageId]);

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from('group_post_comments')
        .select(`
          *,
          profiles (
            full_name
          )
        `)
        .eq('post_id', messageId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error loading comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      });
    }
  };

  const handleAddComment = async () => {
    if (!currentUserId || !newComment.trim()) return;

    try {
      const { error } = await supabase
        .from('group_post_comments')
        .insert({
          post_id: messageId,
          user_id: currentUserId,
          content: newComment.trim()
        });

      if (error) throw error;

      setNewComment("");
      loadComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-sm">
                  {comment.profiles?.full_name || 'Unknown User'}
                </p>
                <p className="text-gray-700 text-sm">{comment.content}</p>
              </div>
              <span className="text-xs text-gray-500">
                {format(new Date(comment.created_at), 'MMM d, HH:mm')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1"
        />
        <Button onClick={handleAddComment}>Post</Button>
      </div>
    </div>
  );
}