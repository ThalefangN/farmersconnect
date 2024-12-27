import { useState } from "react";
import { Upload, X, Mic, Square, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface GroupMediaUploadProps {
  groupId: string;
  onSuccess: () => void;
}

export function GroupMediaUpload({ groupId, onSuccess }: GroupMediaUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], 'voice-message.webm', { type: 'audio/webm' });
        setFile(audioFile);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Error",
        description: "Failed to start recording. Please check your microphone permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() && !file) return;

    try {
      setIsLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let mediaUrl = null;
      let messageType = 'text';

      if (file) {
        // Upload file to storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('group_media')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('group_media')
          .getPublicUrl(fileName);

        mediaUrl = publicUrl;
        messageType = file.type.startsWith('audio/') ? 'audio' : 
                     file.type.startsWith('video/') ? 'video' : 'image';
      }

      // Create message in database
      const { error: messageError } = await supabase
        .from('group_messages')
        .insert({
          group_id: groupId,
          user_id: user.id,
          content: message,
          media_url: mediaUrl,
          message_type: messageType
        });

      if (messageError) throw messageError;

      toast({
        title: "Success",
        description: "Message sent successfully",
      });

      setFile(null);
      setMessage("");
      onSuccess();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 bg-white rounded-lg shadow p-4">
      <Textarea
        placeholder="Write a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[100px] resize-none"
      />
      
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={handleFileSelect}
          className="flex-1"
        />
        {!isRecording ? (
          <Button
            variant="outline"
            size="icon"
            onClick={startRecording}
            className="shrink-0"
          >
            <Mic className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="destructive"
            size="icon"
            onClick={stopRecording}
            className="shrink-0"
          >
            <Square className="h-4 w-4" />
          </Button>
        )}
        {file && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFile(null)}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          onClick={handleSendMessage}
          disabled={isLoading || (!message.trim() && !file)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send
            </>
          )}
        </Button>
      </div>
    </div>
  );
}