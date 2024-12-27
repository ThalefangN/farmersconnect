export interface Seed {
  id: string;
  name: string;
  description: string;
  price: string;
  type: string;
  status: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  location: string;
  quantity_per_packet: number;
  quantity_available: number;
  owner: {
    full_name: string;
    phone_text: string;
  };
}