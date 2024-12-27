import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Message } from "../GroupDiscussion";

interface MessageItemProps {
  message: Message;
  currentUserId?: string;
  onDelete: (messageId: string) => void;
}

export function MessageItem({ message, currentUserId, onDelete }: MessageItemProps) {
  const isOwner = currentUserId === message.user_id;
  const formattedDate = format(new Date(message.created_at), 'PPp');

  return (
    <div className={`flex ${isOwner ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${isOwner ? 'bg-purple-100' : 'bg-white'} rounded-lg shadow p-4`}>
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="font-medium text-sm text-purple-800">
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
      </div>
    </div>
  );
}