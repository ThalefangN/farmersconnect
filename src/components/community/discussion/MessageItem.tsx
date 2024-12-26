import { useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ThumbsUp, Heart, Laugh } from "lucide-react";
import { MessageReactions } from "./MessageReactions";
import { MessageComments } from "./MessageComments";
import type { Message } from "../GroupDiscussion";

interface MessageItemProps {
  message: Message;
  currentUserId?: string;
  onDelete: (messageId: string) => Promise<void>;
}

export function MessageItem({ message, currentUserId, onDelete }: MessageItemProps) {
  const [showComments, setShowComments] = useState(false);

  const renderMedia = () => {
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
          <video controls className="max-w-full rounded-lg">
            <source src={message.media_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case 'audio':
        return (
          <audio controls className="w-full">
            <source src={message.media_url} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
        );
      default:
        return null;
    }
  };

  return (
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
            onClick={() => onDelete(message.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      {message.content && (
        <p className="text-gray-700 mb-2">{message.content}</p>
      )}
      {renderMedia()}
      
      <div className="mt-4 space-y-2">
        <MessageReactions messageId={message.id} currentUserId={currentUserId} />
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </Button>
        {showComments && (
          <MessageComments messageId={message.id} currentUserId={currentUserId} />
        )}
      </div>
    </Card>
  );
}