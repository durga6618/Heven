import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
  created_at: string;
  last_login?: string;
}

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  revenueGrowth: number;
  ordersGrowth: number;
  usersGrowth: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isBlocked: boolean;
  totalOrders: number;
  totalSpent: number;
  createdAt: Date;
  lastLogin?: Date;
}

interface Order {
  id: string;
  userId: string;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: any;
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  items: Array<{
    id: string;
    quantity: number;
    size: string;
    color: string;
    price: number;
    product: {
      id: string;
      name: string;
      image: string;
    };
  }>;
}

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  expiryDate: Date;
  isActive: boolean;
  description: string;
  createdAt: Date;
}

interface AdminContextType {
  admin: Admin | null;
  adminLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => void;
  isLoading: boolean;
  dashboardStats: DashboardStats | null;
  fetchDashboardStats: () => Promise<void>;
  users: User[];
  orders: Order[];
  coupons: Coupon[];
  toggleUserBlock: (userId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<{ success: boolean; error?: string }>;
  createCoupon: (coupon: Omit<Coupon, 'id' | 'createdAt' | 'usedCount'>) => Promise<void>;
  updateCoupon: (id: string, updates: Partial<Coupon>) => Promise<void>;
  deleteCoupon: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  // Demo admin credentials
  const DEMO_ADMIN = {
    id: 'demo-admin-id',
    name: 'Demo Admin',
    email: 'admin@heven.com',
    role: 'admin' as const,
    permissions: ['all'],
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
  };

  // Check for existing admin session on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem('heven_admin');
    if (savedAdmin) {
      try {
        const adminData = JSON.parse(savedAdmin);
        setAdmin(adminData);
      } catch (error) {
        console.error('Error parsing saved admin data:', error);
        localStorage.removeItem('heven_admin');
      }
    }
  }, []);

  const adminLogin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Demo credentials check
      if (email === 'admin@heven.com' && password === 'admin123') {
        setAdmin(DEMO_ADMIN);
        localStorage.setItem('heven_admin', JSON.stringify(DEMO_ADMIN));
        return { success: true };
      }

      return { success: false, error: 'Invalid credentials. Use admin@heven.com / admin123' };
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogout = () => {
    console.log('Admin logging out...');
    setAdmin(null);
    setDashboardStats(null);
    setUsers([]);
    setOrders([]);
    setCoupons([]);
    localStorage.removeItem('heven_admin');
    console.log('Admin logged out successfully');
  };

  const fetchDashboardStats = async () => {
    try {
      // Fetch total products
      const { count: totalProducts } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Fetch total users
      const { count: totalUsers } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch total orders and revenue
      const { data: orders } = await supabase
        .from('orders')
        .select('total, created_at');

      const totalOrders = orders?.length || 0;
      const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total), 0) || 0;

      // Calculate growth (mock data for now)
      const revenueGrowth = 12.5;
      const ordersGrowth = 8.3;
      const usersGrowth = 15.2;

      setDashboardStats({
        totalRevenue,
        totalOrders,
        totalUsers: totalUsers || 0,
        totalProducts: totalProducts || 0,
        revenueGrowth,
        ordersGrowth,
        usersGrowth,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      const formattedUsers: User[] = (data || []).map(user => ({
        id: user.id,
        name: user.name,
        email: '', // Will be fetched from auth if needed
        phone: user.phone,
        isBlocked: user.is_blocked,
        totalOrders: user.total_orders,
        totalSpent: Number(user.total_spent),
        createdAt: new Date(user.created_at),
        lastLogin: undefined, // Would need to track this separately
      }));

      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          user_profiles (name),
          order_items (
            id,
            quantity,
            size,
            color,
            price,
            products (id, name, image)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      const formattedOrders: Order[] = (data || []).map(order => ({
        id: order.id,
        userId: order.user_id,
        total: Number(order.total),
        status: order.status,
        shippingAddress: order.shipping_address,
        paymentMethod: order.payment_method,
        trackingNumber: order.tracking_number,
        createdAt: new Date(order.created_at),
        updatedAt: new Date(order.updated_at),
        items: (order.order_items || []).map((item: any) => ({
          id: item.id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: Number(item.price),
          product: {
            id: item.products?.id || '',
            name: item.products?.name || '',
            image: item.products?.image || '',
          },
        })),
      }));

      setOrders(formattedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching coupons:', error);
        return;
      }

      const formattedCoupons: Coupon[] = (data || []).map(coupon => ({
        id: coupon.id,
        code: coupon.code,
        type: coupon.type,
        value: Number(coupon.value),
        minOrderValue: Number(coupon.min_order_value),
        maxDiscount: coupon.max_discount ? Number(coupon.max_discount) : undefined,
        usageLimit: coupon.usage_limit,
        usedCount: coupon.used_count,
        expiryDate: new Date(coupon.expiry_date),
        isActive: coupon.is_active,
        description: coupon.description,
        createdAt: new Date(coupon.created_at),
      }));

      setCoupons(formattedCoupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const toggleUserBlock = async (userId: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const { error } = await supabase
        .from('user_profiles')
        .update({ is_blocked: !user.isBlocked })
        .eq('id', userId);

      if (error) {
        console.error('Error toggling user block:', error);
        return;
      }

      await fetchUsers();
    } catch (error) {
      console.error('Error toggling user block:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) {
        return { success: false, error: error.message };
      }

      await fetchOrders();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const createCoupon = async (coupon: Omit<Coupon, 'id' | 'createdAt' | 'usedCount'>) => {
    try {
      const { error } = await supabase
        .from('coupons')
        .insert({
          code: coupon.code,
          type: coupon.type,
          value: coupon.value,
          min_order_value: coupon.minOrderValue,
          max_discount: coupon.maxDiscount,
          usage_limit: coupon.usageLimit,
          expiry_date: coupon.expiryDate.toISOString(),
          is_active: coupon.isActive,
          description: coupon.description,
        });

      if (error) {
        console.error('Error creating coupon:', error);
        return;
      }

      await fetchCoupons();
    } catch (error) {
      console.error('Error creating coupon:', error);
    }
  };

  const updateCoupon = async (id: string, updates: Partial<Coupon>) => {
    try {
      const updateData: any = {};
      
      if (updates.code) updateData.code = updates.code;
      if (updates.type) updateData.type = updates.type;
      if (updates.value !== undefined) updateData.value = updates.value;
      if (updates.minOrderValue !== undefined) updateData.min_order_value = updates.minOrderValue;
      if (updates.maxDiscount !== undefined) updateData.max_discount = updates.maxDiscount;
      if (updates.usageLimit !== undefined) updateData.usage_limit = updates.usageLimit;
      if (updates.expiryDate) updateData.expiry_date = updates.expiryDate.toISOString();
      if (updates.isActive !== undefined) updateData.is_active = updates.isActive;
      if (updates.description) updateData.description = updates.description;

      const { error } = await supabase
        .from('coupons')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Error updating coupon:', error);
        return;
      }

      await fetchCoupons();
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };

  const deleteCoupon = async (id: string) => {
    try {
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting coupon:', error);
        return;
      }

      await fetchCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  useEffect(() => {
    if (admin) {
      fetchDashboardStats();
      fetchUsers();
      fetchOrders();
      fetchCoupons();
    }
  }, [admin]);

  return (
    <AdminContext.Provider value={{
      admin,
      adminLogin,
      adminLogout,
      isLoading,
      dashboardStats,
      fetchDashboardStats,
      users,
      orders,
      coupons,
      toggleUserBlock,
      updateOrderStatus,
      createCoupon,
      updateCoupon,
      deleteCoupon,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};