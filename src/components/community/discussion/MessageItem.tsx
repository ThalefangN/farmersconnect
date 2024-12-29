import { useState } from "react";
import { format } from "date-fns";
import { Trash2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Message } from "../GroupDiscussion";
import { MessageReactions } from "./MessageReactions";
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

  const handleReaction = async (type: string) => {
    try {
      const existingReaction = reactions.find(
        r => r.user_id === currentUserId && r.reaction_type === type
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
            reaction_type: type
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

  return (
    <Card className="p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-medium text-sm text-primary">
                {message.profiles?.full_name || 'Anonymous'}
              </p>
              <p className="text-xs text-muted-foreground">{formattedDate}</p>
            </div>
            {isOwner && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(message.id)}
                className="h-8 w-8 text-destructive hover:text-destructive/90"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <p className="text-sm text-foreground mb-3">{message.content}</p>

          {message.media_url && (
            <div className="mb-3">
              {message.message_type === 'image' && (
                <img
                  src={message.media_url}
                  alt="Shared media"
                  className="rounded-lg max-h-96 w-auto"
                />
              )}
              {message.message_type === 'video' && (
                <video
                  src={message.media_url}
                  controls
                  className="rounded-lg max-h-96 w-auto"
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

          <div className="flex items-center justify-between mt-2 pt-2 border-t">
            <MessageReactions
              messageId={message.id}
              currentUserId={currentUserId}
              onReact={handleReaction}
              reactions={reactions}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="text-muted-foreground hover:text-foreground"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Comments
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}