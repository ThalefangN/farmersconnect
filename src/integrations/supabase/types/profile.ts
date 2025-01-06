import { Json } from './json';

export interface Profile {
  id: string;
  full_name: string | null;
  phone_text: string | null;
  location: string | null;
  farming_type: string | null;
  created_at: string;
  updated_at: string;
  profile_photo_url: string | null;
  notification_preferences: Json | null;
  ai_trial_start: string | null;
  ai_trial_active: boolean | null;
}

export interface ProfileUpdate {
  full_name?: string | null;
  phone_text?: string | null;
  location?: string | null;
  farming_type?: string | null;
  profile_photo_url?: string | null;
  notification_preferences?: Json | null;
  ai_trial_start?: string | null;
  ai_trial_active?: boolean | null;
  updated_at?: string;
}