import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          original_price: number | null;
          image: string;
          images: string[];
          category: string;
          description: string;
          sizes: string[];
          colors: string[];
          rating: number;
          review_count: number;
          in_stock: boolean;
          featured: boolean;
          trending: boolean;
          stock_quantity: number;
          sku: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          original_price?: number | null;
          image: string;
          images?: string[];
          category: string;
          description: string;
          sizes?: string[];
          colors?: string[];
          rating?: number;
          review_count?: number;
          in_stock?: boolean;
          featured?: boolean;
          trending?: boolean;
          stock_quantity?: number;
          sku: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          original_price?: number | null;
          image?: string;
          images?: string[];
          category?: string;
          description?: string;
          sizes?: string[];
          colors?: string[];
          rating?: number;
          review_count?: number;
          in_stock?: boolean;
          featured?: boolean;
          trending?: boolean;
          stock_quantity?: number;
          sku?: string;
          updated_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          name: string;
          phone: string | null;
          is_blocked: boolean;
          total_orders: number;
          total_spent: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          phone?: string | null;
          is_blocked?: boolean;
          total_orders?: number;
          total_spent?: number;
        };
        Update: {
          name?: string;
          phone?: string | null;
          is_blocked?: boolean;
          total_orders?: number;
          total_spent?: number;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          total: number;
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
          shipping_address: any;
          payment_method: string;
          tracking_number: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total: number;
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
          shipping_address: any;
          payment_method: string;
          tracking_number?: string | null;
        };
        Update: {
          total?: number;
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
          shipping_address?: any;
          payment_method?: string;
          tracking_number?: string | null;
          updated_at?: string;
        };
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          type: 'percentage' | 'fixed';
          value: number;
          min_order_value: number;
          max_discount: number | null;
          usage_limit: number;
          used_count: number;
          expiry_date: string;
          is_active: boolean;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          type: 'percentage' | 'fixed';
          value: number;
          min_order_value?: number;
          max_discount?: number | null;
          usage_limit: number;
          used_count?: number;
          expiry_date: string;
          is_active?: boolean;
          description: string;
        };
        Update: {
          code?: string;
          type?: 'percentage' | 'fixed';
          value?: number;
          min_order_value?: number;
          max_discount?: number | null;
          usage_limit?: number;
          used_count?: number;
          expiry_date?: string;
          is_active?: boolean;
          description?: string;
        };
      };
      admins: {
        Row: {
          id: string;
          name: string;
          role: 'admin' | 'super_admin';
          permissions: string[];
          created_at: string;
          last_login: string | null;
        };
        Insert: {
          id: string;
          name: string;
          role?: 'admin' | 'super_admin';
          permissions?: string[];
          last_login?: string | null;
        };
        Update: {
          name?: string;
          role?: 'admin' | 'super_admin';
          permissions?: string[];
          last_login?: string | null;
        };
      };
    };
  };
}