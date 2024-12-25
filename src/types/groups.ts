export interface Group {
  id: string;
  name: string;
  description: string | null;
  location: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  meeting_day: string | null;
}