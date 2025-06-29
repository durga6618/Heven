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
      setError(null);
      
      console.log('Fetching products from database...');
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        return;
      }

      console.log('Raw products data:', data);

      if (data && data.length > 0) {
        const formattedProducts: Product[] = data.map(product => ({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          originalPrice: product.original_price ? Number(product.original_price) : undefined,
          image: product.image,
          images: product.images || [product.image],
          category: product.category,
          description: product.description,
          sizes: product.sizes || [],
          colors: product.colors || [],
          rating: Number(product.rating) || 0,
          reviewCount: product.review_count || 0,
          inStock: product.in_stock !== false,
          featured: product.featured || false,
          trending: product.trending || false,
          stock: product.stock_quantity || 0,
          sku: product.sku,
          createdAt: new Date(product.created_at),
          updatedAt: new Date(product.updated_at),
        }));

        console.log('Formatted products:', formattedProducts);
        setProducts(formattedProducts);
      } else {
        console.log('No products found in database');
        setProducts([]);
      }
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('Creating product:', productData);
      
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
          rating: productData.rating || 0,
          review_count: productData.reviewCount || 0,
          in_stock: productData.inStock !== false,
          featured: productData.featured || false,
          trending: productData.trending || false,
          stock_quantity: productData.stock || 0,
          sku: productData.sku,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating product:', error);
        throw error;
      }

      console.log('Product created successfully:', data);
      await fetchProducts(); // Refresh the list
      return { success: true, data };
    } catch (err: any) {
      console.error('Error creating product:', err);
      return { success: false, error: err.message };
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      console.log('Updating product:', id, updates);
      
      const updateData: any = {};
      
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.price !== undefined) updateData.price = updates.price;
      if (updates.originalPrice !== undefined) updateData.original_price = updates.originalPrice;
      if (updates.image !== undefined) updateData.image = updates.image;
      if (updates.images !== undefined) updateData.images = updates.images;
      if (updates.category !== undefined) updateData.category = updates.category;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.sizes !== undefined) updateData.sizes = updates.sizes;
      if (updates.colors !== undefined) updateData.colors = updates.colors;
      if (updates.rating !== undefined) updateData.rating = updates.rating;
      if (updates.reviewCount !== undefined) updateData.review_count = updates.reviewCount;
      if (updates.inStock !== undefined) updateData.in_stock = updates.inStock;
      if (updates.featured !== undefined) updateData.featured = updates.featured;
      if (updates.trending !== undefined) updateData.trending = updates.trending;
      if (updates.stock !== undefined) updateData.stock_quantity = updates.stock;
      if (updates.sku !== undefined) updateData.sku = updates.sku;

      const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Error updating product:', error);
        throw error;
      }

      console.log('Product updated successfully');
      await fetchProducts(); // Refresh the list
      return { success: true };
    } catch (err: any) {
      console.error('Error updating product:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      console.log('Deleting product:', id);
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
        throw error;
      }

      console.log('Product deleted successfully');
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