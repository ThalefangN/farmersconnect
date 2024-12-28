export interface Equipment {
  id: string;
  name: string;
  description: string | null;
  price: string;
  type: 'rent' | 'sale';
  status: string;
  location: string;
  image_url?: string | null;
  owner: {
    name: string | null;
    phone?: string | null;
  };
  owner_id: string;
}