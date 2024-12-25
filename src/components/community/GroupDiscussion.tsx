import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { GroupMediaUpload } from "./GroupMediaUpload";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  media_url: string | null;
  message_type: 'text' | 'image' | 'video' | 'audio';
  created_at: string;
  user_id: string;
  profiles?: {
    full_name: string | null;
  };
}

interface GroupDiscussionProps {
  groupId: string;
  currentUserId?: string;
}

export function GroupDiscussion({ groupId, currentUserId }: GroupDiscussionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('group_messages')
        .select(`
          *,
          profiles (
            full_name
          )
        `)
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel('group_messages_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'group_messages',
          filter: `group_id=eq.${groupId}`
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId]);

  const handleDeleteMessage = async (messageId: string, userId: string) => {
    if (userId !== currentUserId) return;

    try {
      const { error } = await supabase
        .from('group_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Message deleted successfully",
      });

      setMessages(messages.filter(m => m.id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const renderMedia = (message: Message) => {
    if (!message.media_url) return null;

    switch (message.message_type) {
      case 'image':
        return (
          <img
            src={message.media_url}
            alt="Shared image"
            className="max-w-full h-auto rounded-lg"
          />
        );
      case 'video':
        return (
          <video
            controls
            className="max-w-full rounded-lg"
          >
            <source src={message.media_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case 'audio':
        return (
          <audio
            controls
            className="w-full"
          >
            <source src={message.media_url} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <GroupMediaUpload groupId={groupId} onSuccess={fetchMessages} />
      
      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{message.profiles?.full_name || 'Unknown User'}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(message.created_at), 'MMM d, yyyy HH:mm')}
                </p>
              </div>
              {message.user_id === currentUserId && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteMessage(message.id, message.user_id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            {message.content && (
              <p className="text-gray-700 mb-2">{message.content}</p>
            )}
            {renderMedia(message)}
          </Card>
        ))}
      </div>
    </div>
  );
}