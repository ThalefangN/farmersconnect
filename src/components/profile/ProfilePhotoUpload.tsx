import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Camera } from "lucide-react";
import { uploadImage } from "@/utils/fileUpload";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProfilePhotoUploadProps {
  currentPhotoUrl: string | null;
  userId: string;
  onPhotoUpdated: (url: string) => void;
}

const ProfilePhotoUpload = ({ currentPhotoUrl, userId, onPhotoUpdated }: ProfilePhotoUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      console.log('No file selected');
      return;
    }

    const file = event.target.files[0];
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      console.log('Starting profile photo upload for user:', userId);
      const imageUrl = await uploadImage(file, 'profile_photos');
      console.log('Image uploaded successfully:', imageUrl);
      
      const { error } = await supabase
        .from('profiles')
        .update({ profile_photo_url: imageUrl })
        .eq('id', userId);

      if (error) {
        console.error('Error updating profile photo in database:', error);
        throw error;
      }

      console.log('Profile photo updated in database');
      onPhotoUpdated(imageUrl);
      toast({
        title: "Success",
        description: "Profile photo updated successfully",
      });
    } catch (error) {
      console.error('Error in photo upload process:', error);
      toast({
        title: "Error",
        description: "Failed to upload profile photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-32 group cursor-pointer">
        <Avatar className="w-32 h-32 border-2 border-gray-200 transition-all duration-200 hover:border-primary">
          <AvatarImage
            src={currentPhotoUrl || "/placeholder.svg"}
            alt="Profile"
            className="object-cover"
          />
          <AvatarFallback className="bg-primary/10">
            {userId.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-full">
          <Camera className="w-6 h-6 text-white" />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
          id="profile-photo-upload"
          disabled={isUploading}
        />
      </div>
      <label htmlFor="profile-photo-upload">
        <Button 
          variant="outline" 
          disabled={isUploading}
          className="cursor-pointer hover:bg-primary/10 transition-colors"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Change Photo
            </>
          )}
        </Button>
      </label>
    </div>
  );
};

export default ProfilePhotoUpload;