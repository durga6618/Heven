import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface Order {
  id: string;
  user_id: string;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: any;
  payment_method: string;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
  user_profiles?: {
    name: string;
    email: string;
  };
  order_items?: Array<{
    id: string;
    quantity: number;
    size: string;
    color: string;
    price: number;
    products: {
      id: string;
      name: string;
      image: string;
    };
  }>;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchOrders = async (isAdmin = false) => {
    try {
      setLoading(true);
      let query = supabase
        .from('orders')
        .select(`
          *,
          user_profiles (name, email),
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

      // If not admin, only fetch user's own orders
      if (!isAdmin && user) {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;

      if (error) {
        setError(error.message);
        return;
      }

      setOrders(data || []);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: {
    total: number;
    shipping_address: any;
    payment_method: string;
    items: Array<{
      product_id: string;
      quantity: number;
      size: string;
      color: string;
      price: number;
    }>;
  }) => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: orderData.total,
          shipping_address: orderData.shipping_address,
          payment_method: orderData.payment_method,
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        throw itemsError;
      }

      await fetchOrders(); // Refresh the list
      return { success: true, data: order };
    } catch (err: any) {
      console.error('Error creating order:', err);
      return { success: false, error: err.message };
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) {
        throw error;
      }

      await fetchOrders(true); // Refresh the list (admin view)
      return { success: true };
    } catch (err: any) {
      console.error('Error updating order status:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateOrderStatus,
  };
};