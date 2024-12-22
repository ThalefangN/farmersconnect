import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Image as ImageIcon } from "lucide-react";
import { uploadImage } from "@/utils/fileUpload";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CreatePostFormProps {
  onPostCreated: () => void;
  currentUser: any;
}

const CreatePostForm = ({ onPostCreated, currentUser }: CreatePostFormProps) => {
  const [newPost, setNewPost] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      setIsLoading(true);
      let imageUrl = null;
      
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile, 'livestock');
      }

      const { error } = await supabase
        .from('posts')
        .insert({
          content: newPost.trim(),
          category: 'livestock',
          user_id: currentUser.id,
          image_url: imageUrl
        });

      if (error) throw error;

      setNewPost("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      onPostCreated();
      
      toast({
        title: "Success",
        description: "Post created successfully",
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitPost} className="space-y-4">
      <Textarea
        placeholder="Share your thoughts, questions, or experiences..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        className="min-h-[100px]"
      />
      <div className="flex justify-between items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleFileSelect}
          className="flex items-center space-x-2"
        >
          <ImageIcon className="h-4 w-4" />
          <span>{selectedFile ? selectedFile.name : 'Add Image'}</span>
        </Button>
        <Button type="submit" disabled={isLoading}>
          <Send className="mr-2 h-4 w-4" />
          Post
        </Button>
      </div>
    </form>
  );
};

export default CreatePostForm;