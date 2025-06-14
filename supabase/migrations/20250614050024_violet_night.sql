/*
  # Insert Sample Data for Heven E-Commerce

  1. Sample Products
  2. Sample Admin User
  3. Sample Coupons
*/

-- Insert sample products
INSERT INTO products (name, price, original_price, image, images, category, description, sizes, colors, rating, review_count, in_stock, featured, trending, stock_quantity, sku) VALUES
('Premium Cotton T-Shirt', 299, 399, 'https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg?auto=compress&cs=tinysrgb&w=500', 
 ARRAY['https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'], 
 'Clothing', 'Premium quality cotton t-shirt with modern fit. Perfect for casual wear and everyday comfort. Made from 100% organic cotton with superior breathability.', 
 ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'White', 'Gray'], 4.5, 128, true, true, true, 50, 'HEVEN-TSH-001'),

('Classic Leather Jacket', 1299, 1599, 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=500', 
 ARRAY['https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800'], 
 'Clothing', 'Timeless leather jacket crafted from genuine leather. Features classic design with modern touches. Perfect for any season.', 
 ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'Brown'], 4.8, 89, true, true, false, 25, 'HEVEN-JKT-002'),

('Designer Sneakers', 899, NULL, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500', 
 ARRAY['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800'], 
 'Footwear', 'Contemporary designer sneakers with premium materials and exceptional comfort. Perfect blend of style and functionality.', 
 ARRAY['7', '8', '9', '10', '11'], ARRAY['White', 'Black', 'Gray'], 4.6, 156, true, false, true, 40, 'HEVEN-SNK-003'),

('Minimalist Watch', 599, 799, 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=500', 
 ARRAY['https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?auto=compress&cs=tinysrgb&w=800'], 
 'Accessories', 'Elegant minimalist watch with clean design and premium materials. Features precise movement and water resistance.', 
 ARRAY['One Size'], ARRAY['Silver', 'Gold', 'Black'], 4.7, 203, true, true, false, 30, 'HEVEN-WTC-004'),

('Premium Backpack', 449, NULL, 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500', 
 ARRAY['https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2422278/pexels-photo-2422278.jpeg?auto=compress&cs=tinysrgb&w=800'], 
 'Accessories', 'High-quality backpack with multiple compartments and ergonomic design. Perfect for work, travel, or everyday use.', 
 ARRAY['One Size'], ARRAY['Black', 'Navy', 'Gray'], 4.4, 92, true, false, true, 35, 'HEVEN-BAG-005'),

('Slim Fit Jeans', 799, 999, 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=500', 
 ARRAY['https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800'], 
 'Clothing', 'Modern slim fit jeans with premium denim fabric. Comfortable stretch material with contemporary styling.', 
 ARRAY['28', '30', '32', '34', '36'], ARRAY['Dark Blue', 'Black', 'Light Blue'], 4.3, 167, true, false, true, 60, 'HEVEN-JNS-006');

-- Insert sample coupons
INSERT INTO coupons (code, type, value, min_order_value, max_discount, usage_limit, used_count, expiry_date, is_active, description) VALUES
('WELCOME10', 'percentage', 10, 500, 200, 100, 25, '2025-01-31 23:59:59', true, 'Welcome discount for new users'),
('FLAT50', 'fixed', 50, 300, NULL, 200, 89, '2024-12-31 23:59:59', true, 'Flat ₹50 off on orders above ₹300'),
('SAVE20', 'percentage', 20, 1000, 500, 50, 12, '2025-02-28 23:59:59', true, 'Save 20% on orders above ₹1000');