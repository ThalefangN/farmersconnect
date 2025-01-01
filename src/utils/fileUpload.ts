import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (file: File, bucket: string) => {
  try {
    // Get the current user's ID
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${uuidv4()}.${fileExt}`;

    console.log('Uploading file to path:', fileName);
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        upsert: true // Allow overwriting existing files
      });

    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};