import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, RefreshCw, AlertCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

const Products: React.FC = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['Clothing', 'Footwear', 'Accessories'];
  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  const handleRetry = () => {
    console.log('🔄 User requested retry, fetching products...');
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
          <p className="mt-2 text-sm text-gray-500">Connecting to database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-red-500" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Products</h2>
          <p className="text-red-600 mb-4 text-sm">{error}</p>
          <div className="space-y-2 text-xs text-gray-500 mb-6">
            <p>• Check your internet connection</p>
            <p>• Verify Supabase configuration</p>
            <p>• Ensure database is accessible</p>
          </div>
          <button 
            onClick={handleRetry}
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            <RefreshCw className="mr-2" size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop All Products</h1>
            <p className="text-gray-600">
              {products.length > 0 
                ? `Discover our complete collection of ${products.length} premium products`
                : 'Discover our complete collection of premium products'
              }
            </p>
          </div>
          
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden p-2 text-gray-600 hover:text-black"
                >
                  <Filter size={20} />
                </button>
              </div>

              <div className={`space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={selectedCategory === ''}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2"
                      />
                      All Categories
                    </label>
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-2"
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSortBy('');
                    setPriceRange([0, 2000]);
                  }}
                  className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              {products.length === 0 && !loading && (
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                >
                  <RefreshCw className="mr-1" size={14} />
                  Refresh
                </button>
              )}
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Grid className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Available</h3>
                <p className="text-gray-600 mb-4">
                  The product database appears to be empty. This could be due to:
                </p>
                <div className="text-sm text-gray-500 mb-6 space-y-1">
                  <p>• Database migration not completed</p>
                  <p>• Sample data not inserted</p>
                  <p>• Database connection issues</p>
                </div>
                <button
                  onClick={handleRetry}
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  Refresh Products
                </button>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Grid className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSortBy('');
                    setPriceRange([0, 2000]);
                  }}
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;