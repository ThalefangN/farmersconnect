import { useState } from "react";
import { Upload, X } from "lucide-react";
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
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

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

      // Create message in database
      const { error: messageError } = await supabase
        .from('group_messages')
        .insert({
          group_id: groupId,
          user_id: user.id,
          content: description,
          media_url: publicUrl,
          message_type: file.type.startsWith('image/') ? 'image' : 'video'
        });

      if (messageError) throw messageError;

      toast({
        title: "Success",
        description: "Media uploaded successfully",
      });

      setFile(null);
      setDescription("");
      onSuccess();
    } catch (error) {
      console.error('Error uploading media:', error);
      toast({
        title: "Error",
        description: "Failed to upload media",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="flex-1"
        />
        {file && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFile(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {file && (
        <>
          <Textarea
            placeholder="Add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            onClick={handleUpload}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </>
      )}
    </div>
  );
}