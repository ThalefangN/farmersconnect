import { Profile, ProfileUpdate } from './profile';
import { Json } from './json';

export type Tables = {
  comments: {
    Row: {
      content: string;
      created_at: string;
      id: string;
      post_id: string;
      updated_at: string;
      user_id: string;
    };
    Insert: {
      content: string;
      created_at?: string;
      id?: string;
      post_id: string;
      updated_at?: string;
      user_id: string;
    };
    Update: {
      content?: string;
      created_at?: string;
      id?: string;
      post_id?: string;
      updated_at?: string;
      user_id?: string;
    };
  };
  equipment: {
    Row: {
      id: string;
      name: string;
      description: string | null;
      price: string;
      type: string;
      status: string;
      owner_id: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      name: string;
      description?: string | null;
      price: string;
      type: string;
      status?: string;
      owner_id: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      name?: string;
      description?: string | null;
      price?: string;
      type?: string;
      status?: string;
      owner_id?: string;
      created_at?: string;
      updated_at?: string;
    };
  };
  equipment_requests: {
    Row: {
      id: string;
      equipment_id: string | null;
      user_id: string | null;
      full_name: string;
      phone: string;
      location: string;
      message: string | null;
      status: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      equipment_id?: string | null;
      user_id?: string | null;
      full_name: string;
      phone: string;
      location: string;
      message?: string | null;
      status?: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      equipment_id?: string | null;
      user_id?: string | null;
      full_name?: string;
      phone?: string;
      location?: string;
      message?: string | null;
      status?: string;
      created_at?: string;
      updated_at?: string;
    };
  };
  likes: {
    Row: {
      created_at: string;
      id: string;
      post_id: string;
      user_id: string;
    };
    Insert: {
      created_at?: string;
      id?: string;
      post_id: string;
      user_id: string;
    };
    Update: {
      created_at?: string;
      id?: string;
      post_id?: string;
      user_id?: string;
    };
    Relationships: [
      {
        foreignKeyName: "likes_post_id_fkey";
        columns: ["post_id"];
        isOneToOne: false;
        referencedRelation: "posts";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "likes_user_id_fkey";
        columns: ["user_id"];
        isOneToOne: false;
        referencedRelation: "profiles";
        referencedColumns: ["id"];
      },
    ];
  };
  orders: {
    Row: {
      buyer_id: string;
      created_at: string;
      delivery_address: string | null;
      delivery_type: string;
      id: string;
      product_id: string;
      quantity: number;
      seller_id: string;
      status: string;
      total_amount: number;
      updated_at: string;
      whatsapp_number: string | null;
    };
    Insert: {
      buyer_id: string;
      created_at?: string;
      delivery_address?: string | null;
      delivery_type: string;
      id?: string;
      product_id: string;
      quantity: number;
      seller_id: string;
      status?: string;
      total_amount: number;
      updated_at?: string;
      whatsapp_number?: string | null;
    };
    Update: {
      buyer_id?: string;
      created_at?: string;
      delivery_address?: string | null;
      delivery_type?: string;
      id?: string;
      product_id?: string;
      quantity?: number;
      seller_id?: string;
      status?: string;
      total_amount?: number;
      updated_at?: string;
      whatsapp_number?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "orders_buyer_id_fkey";
        columns: ["buyer_id"];
        isOneToOne: false;
        referencedRelation: "profiles";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "orders_product_id_fkey";
        columns: ["product_id"];
        isOneToOne: false;
        referencedRelation: "products";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "orders_seller_id_fkey";
        columns: ["seller_id"];
        isOneToOne: false;
        referencedRelation: "profiles";
        referencedColumns: ["id"];
      },
    ];
  };
  posts: {
    Row: {
      category: string;
      content: string;
      created_at: string;
      id: string;
      image_url: string | null;
      updated_at: string;
      user_id: string;
    };
    Insert: {
      category: string;
      content: string;
      created_at?: string;
      id?: string;
      image_url?: string | null;
      updated_at?: string;
      user_id: string;
    };
    Update: {
      category?: string;
      content?: string;
      created_at?: string;
      id?: string;
      image_url?: string | null;
      updated_at?: string;
      user_id?: string;
    };
    Relationships: [
      {
        foreignKeyName: "posts_user_id_fkey";
        columns: ["user_id"];
        isOneToOne: false;
        referencedRelation: "profiles";
        referencedColumns: ["id"];
      },
    ];
  };
  products: {
    Row: {
      created_at: string;
      description: string | null;
      id: string;
      image_url: string | null;
      location: string;
      price: number;
      quantity: number;
      title: string;
      unit_type: string;
      updated_at: string;
      user_id: string;
    };
    Insert: {
      created_at?: string;
      description?: string | null;
      id?: string;
      image_url?: string | null;
      location: string;
      price: number;
      quantity: number;
      title: string;
      unit_type: string;
      updated_at?: string;
      user_id: string;
    };
    Update: {
      created_at?: string;
      description?: string | null;
      id?: string;
      image_url?: string | null;
      location?: string;
      price?: number;
      quantity?: number;
      title?: string;
      unit_type?: string;
      updated_at?: string;
      user_id?: string;
    };
    Relationships: [
      {
        foreignKeyName: "products_user_id_fkey";
        columns: ["user_id"];
        isOneToOne: false;
        referencedRelation: "profiles";
        referencedColumns: ["id"];
      },
    ];
  };
  
  profiles: {
    Row: Profile;
    Insert: Omit<Profile, 'created_at' | 'updated_at'> & {
      created_at?: string;
      updated_at?: string;
    };
    Update: ProfileUpdate;
  };
};
