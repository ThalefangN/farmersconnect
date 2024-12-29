export interface Seed {
  id: string;
  name: string;
  description: string | null;
  price: string;
  type: string;
  status: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  location: string;
  quantity_per_packet: number | null;
  quantity_available: number | null;
  price_numeric: number | null;
  rental_months: number | null;
  price_per_month: number | null;
  request_status: string | null;
  requester_id: string | null;
  request_date: string | null;
  owner: {
    full_name: string | null;
    phone_text: string | null;
  };
}