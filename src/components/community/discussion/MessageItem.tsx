import { format } from "date-fns";
import { Trash2, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Message } from "../GroupDiscussion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MessageItemProps {
  message: Message;
  currentUserId?: string;
  onDelete: (messageId: string) => void;
}

export function MessageItem({ message, currentUserId, onDelete }: MessageItemProps) {
  const [showComments, setShowComments] = useState(false);
  const [reactions, setReactions] = useState<any[]>([]);
  const { toast } = useToast();
  const isOwner = currentUserId === message.user_id;
  const formattedDate = format(new Date(message.created_at), 'PPp');

  const handleReaction = async () => {
    try {
      const existingReaction = reactions.find(
        r => r.user_id === currentUserId && r.post_id === message.id
      );

      if (existingReaction) {
        await supabase
          .from('group_post_reactions')
          .delete()
          .eq('id', existingReaction.id);
      } else {
        await supabase
          .from('group_post_reactions')
          .insert({
            post_id: message.id,
            user_id: currentUserId,
            reaction_type: 'like'
          });
      }

      loadReactions();
    } catch (error) {
      console.error('Error toggling reaction:', error);
      toast({
        title: "Error",
        description: "Failed to update reaction",
        variant: "destructive",
      });
    }
  };

  const loadReactions = async () => {
    try {
      const { data } = await supabase
        .from('group_post_reactions')
        .select('*')
        .eq('post_id', message.id);
      
      setReactions(data || []);
    } catch (error) {
      console.error('Error loading reactions:', error);
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-2">
        <div>
          <p className="font-medium text-green-800">
            {message.profiles?.full_name || 'Anonymous'}
          </p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
        {isOwner && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(message.id)}
            className="h-8 w-8 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {message.content && (
        <p className="mt-2 text-gray-700 whitespace-pre-wrap">{message.content}</p>
      )}

      {message.media_url && (
        <div className="mt-2">
          {message.message_type === 'image' && (
            <img
              src={message.media_url}
              alt="Shared media"
              className="max-w-full rounded-lg"
            />
          )}
          {message.message_type === 'video' && (
            <video
              src={message.media_url}
              controls
              className="max-w-full rounded-lg"
            />
          )}
          {message.message_type === 'audio' && (
            <audio
              src={message.media_url}
              controls
              className="w-full"
            />
          )}
        </div>
      )}

      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReaction}
          className={reactions.some(r => r.user_id === currentUserId) ? "text-green-600" : ""}
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          {reactions.length}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Comments
        </Button>
      </div>
    </Card>
  );
}