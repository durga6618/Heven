import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Admin, DashboardStats, Order, User, Coupon } from '../types';
import { products } from '../data/products';

interface AdminContextType {
  admin: Admin | null;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
  isLoading: boolean;
  dashboardStats: DashboardStats;
  orders: Order[];
  users: User[];
  coupons: Coupon[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  toggleUserBlock: (userId: string) => void;
  createCoupon: (coupon: Omit<Coupon, 'id' | 'createdAt' | 'usedCount'>) => void;
  updateCoupon: (couponId: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (couponId: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock data
const mockAdmin: Admin = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@heven.com',
  role: 'admin',
  permissions: ['dashboard', 'products', 'orders', 'users', 'coupons'],
  createdAt: new Date('2024-01-01'),
  lastLogin: new Date(),
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    addresses: [],
    isBlocked: false,
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-12-20'),
    totalOrders: 5,
    totalSpent: 2499,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    addresses: [],
    isBlocked: false,
    createdAt: new Date('2024-02-10'),
    lastLogin: new Date('2024-12-19'),
    totalOrders: 3,
    totalSpent: 1299,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    addresses: [],
    isBlocked: true,
    createdAt: new Date('2024-03-05'),
    lastLogin: new Date('2024-12-15'),
    totalOrders: 1,
    totalSpent: 299,
  },
];

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [
      {
        product: products[0],
        quantity: 2,
        size: 'M',
        color: 'Black',
      },
    ],
    total: 598,
    status: 'pending',
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-20'),
    shippingAddress: {
      id: '1',
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true,
    },
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-002',
    userId: '2',
    items: [
      {
        product: products[1],
        quantity: 1,
        size: 'L',
        color: 'Brown',
      },
    ],
    total: 1299,
    status: 'shipped',
    createdAt: new Date('2024-12-19'),
    updatedAt: new Date('2024-12-20'),
    shippingAddress: {
      id: '2',
      name: 'Jane Smith',
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      isDefault: true,
    },
    paymentMethod: 'UPI',
    trackingNumber: 'TRK123456789',
  },
];

const mockCoupons: Coupon[] = [
  {
    id: 'CPN-001',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrderValue: 500,
    maxDiscount: 200,
    usageLimit: 100,
    usedCount: 25,
    expiryDate: new Date('2025-01-31'),
    isActive: true,
    createdAt: new Date('2024-12-01'),
    description: 'Welcome discount for new users',
  },
  {
    id: 'CPN-002',
    code: 'FLAT50',
    type: 'fixed',
    value: 50,
    minOrderValue: 300,
    usageLimit: 200,
    usedCount: 89,
    expiryDate: new Date('2024-12-31'),
    isActive: true,
    createdAt: new Date('2024-11-15'),
    description: 'Flat ₹50 off on orders above ₹300',
  },
];

const mockDashboardStats: DashboardStats = {
  totalRevenue: 125000,
  totalOrders: 450,
  totalUsers: 1250,
  totalProducts: products.length,
  revenueGrowth: 12.5,
  ordersGrowth: 8.3,
  usersGrowth: 15.2,
  topProducts: [
    { product: products[0], sales: 125, revenue: 37375 },
    { product: products[1], sales: 89, revenue: 115611 },
    { product: products[2], sales: 156, revenue: 140244 },
  ],
  recentOrders: mockOrders.slice(0, 5),
  salesData: [
    { date: '2024-12-14', revenue: 8500, orders: 25 },
    { date: '2024-12-15', revenue: 12300, orders: 35 },
    { date: '2024-12-16', revenue: 9800, orders: 28 },
    { date: '2024-12-17', revenue: 15600, orders: 42 },
    { date: '2024-12-18', revenue: 11200, orders: 31 },
    { date: '2024-12-19', revenue: 13900, orders: 38 },
    { date: '2024-12-20', revenue: 16800, orders: 45 },
  ],
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login validation
    if (email === 'admin@heven.com' && password === 'admin123') {
      setAdmin({ ...mockAdmin, lastLogin: new Date() });
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const adminLogout = () => {
    setAdmin(null);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date() }
        : order
    ));
  };

  const toggleUserBlock = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isBlocked: !user.isBlocked }
        : user
    ));
  };

  const createCoupon = (couponData: Omit<Coupon, 'id' | 'createdAt' | 'usedCount'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `CPN-${Date.now()}`,
      createdAt: new Date(),
      usedCount: 0,
    };
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const updateCoupon = (couponId: string, updates: Partial<Coupon>) => {
    setCoupons(prev => prev.map(coupon => 
      coupon.id === couponId 
        ? { ...coupon, ...updates }
        : coupon
    ));
  };

  const deleteCoupon = (couponId: string) => {
    setCoupons(prev => prev.filter(coupon => coupon.id !== couponId));
  };

  return (
    <AdminContext.Provider value={{
      admin,
      adminLogin,
      adminLogout,
      isLoading,
      dashboardStats: mockDashboardStats,
      orders,
      users,
      coupons,
      updateOrderStatus,
      toggleUserBlock,
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