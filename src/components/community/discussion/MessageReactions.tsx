import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Heart, Laugh } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MessageReactionsProps {
  messageId: string;
  currentUserId?: string;
}

interface Reaction {
  id: string;
  reaction_type: string;
  user_id: string;
}

export function MessageReactions({ messageId, currentUserId }: MessageReactionsProps) {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadReactions();
  }, [messageId]);

  const loadReactions = async () => {
    try {
      const { data, error } = await supabase
        .from('group_post_reactions')
        .select('*')
        .eq('post_id', messageId);

      if (error) throw error;
      setReactions(data || []);
    } catch (error) {
      console.error('Error loading reactions:', error);
    }
  };

  const toggleReaction = async (type: string) => {
    if (!currentUserId) return;

    try {
      const existingReaction = reactions.find(
        r => r.user_id === currentUserId && r.reaction_type === type
      );

      if (existingReaction) {
        const { error } = await supabase
          .from('group_post_reactions')
          .delete()
          .eq('id', existingReaction.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('group_post_reactions')
          .insert({
            post_id: messageId,
            user_id: currentUserId,
            reaction_type: type
          });

        if (error) throw error;
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

  const getReactionCount = (type: string) => {
    return reactions.filter(r => r.reaction_type === type).length;
  };

  const hasUserReacted = (type: string) => {
    return reactions.some(r => r.user_id === currentUserId && r.reaction_type === type);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={hasUserReacted('like') ? "default" : "ghost"}
        size="sm"
        onClick={() => toggleReaction('like')}
      >
        <ThumbsUp className="h-4 w-4 mr-1" />
        {getReactionCount('like')}
      </Button>
      <Button
        variant={hasUserReacted('heart') ? "default" : "ghost"}
        size="sm"
        onClick={() => toggleReaction('heart')}
      >
        <Heart className="h-4 w-4 mr-1" />
        {getReactionCount('heart')}
      </Button>
      <Button
        variant={hasUserReacted('laugh') ? "default" : "ghost"}
        size="sm"
        onClick={() => toggleReaction('laugh')}
      >
        <Laugh className="h-4 w-4 mr-1" />
        {getReactionCount('laugh')}
      </Button>
    </div>
  );
}