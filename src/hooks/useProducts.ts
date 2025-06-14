import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
        return;
      }

      const formattedProducts: Product[] = data.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.original_price,
        image: product.image,
        images: product.images,
        category: product.category,
        description: product.description,
        sizes: product.sizes,
        colors: product.colors,
        rating: product.rating,
        reviewCount: product.review_count,
        inStock: product.in_stock,
        featured: product.featured,
        trending: product.trending,
        stock: product.stock_quantity,
        sku: product.sku,
        createdAt: new Date(product.created_at),
        updatedAt: new Date(product.updated_at),
      }));

      setProducts(formattedProducts);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: productData.name,
          price: productData.price,
          original_price: productData.originalPrice,
          image: productData.image,
          images: productData.images,
          category: productData.category,
          description: productData.description,
          sizes: productData.sizes,
          colors: productData.colors,
          rating: productData.rating,
          review_count: productData.reviewCount,
          in_stock: productData.inStock,
          featured: productData.featured,
          trending: productData.trending,
          stock_quantity: productData.stock,
          sku: productData.sku,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      await fetchProducts(); // Refresh the list
      return { success: true, data };
    } catch (err: any) {
      console.error('Error creating product:', err);
      return { success: false, error: err.message };
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: updates.name,
          price: updates.price,
          original_price: updates.originalPrice,
          image: updates.image,
          images: updates.images,
          category: updates.category,
          description: updates.description,
          sizes: updates.sizes,
          colors: updates.colors,
          rating: updates.rating,
          review_count: updates.reviewCount,
          in_stock: updates.inStock,
          featured: updates.featured,
          trending: updates.trending,
          stock_quantity: updates.stock,
          sku: updates.sku,
        })
        .eq('id', id);

      if (error) {
        throw error;
      }

      await fetchProducts(); // Refresh the list
      return { success: true };
    } catch (err: any) {
      console.error('Error updating product:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      await fetchProducts(); // Refresh the list
      return { success: true };
    } catch (err: any) {
      console.error('Error deleting product:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};