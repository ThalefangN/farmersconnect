import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { GroupMediaUpload } from "./GroupMediaUpload";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MessageItem } from "./discussion/MessageItem";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Message {
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
      
      const typedMessages = (data || []).map(message => ({
        ...message,
        message_type: validateMessageType(message.message_type)
      }));
      
      setMessages(typedMessages);
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

  const validateMessageType = (type: string): 'text' | 'image' | 'video' | 'audio' => {
    const validTypes = ['text', 'image', 'video', 'audio'];
    return validTypes.includes(type) ? type as 'text' | 'image' | 'video' | 'audio' : 'text';
  };

  const handleDeleteMessage = async (messageId: string) => {
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

  useEffect(() => {
    fetchMessages();

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

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-gradient-to-b from-purple-50 to-white rounded-lg shadow-lg p-6">
      <GroupMediaUpload groupId={groupId} onSuccess={fetchMessages} />
      
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              currentUserId={currentUserId}
              onDelete={handleDeleteMessage}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}