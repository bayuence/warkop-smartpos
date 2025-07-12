-- Insert default admin user
INSERT INTO users (name, email, password, role) VALUES 
('Admin Staff', 'admin@warkop.digital', '$2b$10$rQJ8YQQjQjQjQjQjQjQjQu', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert categories
INSERT INTO categories (name, icon, gradient) VALUES 
('Minuman', '☕', 'from-blue-500 to-cyan-500'),
('Makanan', '🍽️', 'from-orange-500 to-red-500'),
('Cemilan', '🥐', 'from-yellow-500 to-orange-500')
ON CONFLICT DO NOTHING;

-- Insert products
INSERT INTO products (name, description, price, category_id, image, popular, rating, discount, stock) VALUES 
('Signature Coffee Blend', 'Racikan kopi premium dengan aroma yang memukau', 35000, 1, '/placeholder.svg?height=300&width=300', true, 4.9, 15, 50),
('Artisan Latte', 'Latte dengan latte art yang Instagram-worthy', 28000, 1, '/placeholder.svg?height=300&width=300', false, 4.8, 0, 45),
('Cold Brew Paradise', 'Cold brew dengan sentuhan tropical yang menyegarkan', 32000, 1, '/placeholder.svg?height=300&width=300', true, 4.7, 0, 40),
('Cappuccino Classic', 'Cappuccino dengan foam yang sempurna', 25000, 1, '/placeholder.svg?height=300&width=300', false, 4.6, 0, 35),
('Espresso Shot', 'Espresso murni untuk pecinta kopi sejati', 18000, 1, '/placeholder.svg?height=300&width=300', false, 4.5, 0, 60),
('Gourmet Sandwich', 'Sandwich premium dengan bahan-bahan pilihan', 45000, 2, '/placeholder.svg?height=300&width=300', false, 4.6, 0, 25),
('Nasi Gudeg Special', 'Gudeg khas Yogya dengan ayam dan telur', 35000, 2, '/placeholder.svg?height=300&width=300', true, 4.8, 10, 20),
('Mie Ayam Deluxe', 'Mie ayam dengan topping lengkap', 28000, 2, '/placeholder.svg?height=300&width=300', false, 4.5, 0, 30),
('Artisan Pastry', 'Pastry buatan tangan dengan resep rahasia', 25000, 3, '/placeholder.svg?height=300&width=300', false, 4.5, 0, 40),
('Premium Croissant', 'Croissant buttery dengan tekstur yang sempurna', 22000, 3, '/placeholder.svg?height=300&width=300', true, 4.8, 0, 35),
('Chocolate Cake', 'Kue coklat premium dengan ganache', 38000, 3, '/placeholder.svg?height=300&width=300', false, 4.7, 0, 15),
('Fruit Tart', 'Tart buah segar dengan custard', 32000, 3, '/placeholder.svg?height=300&width=300', false, 4.6, 0, 20)
ON CONFLICT DO NOTHING;

-- Insert tables
INSERT INTO tables (number, capacity, location, status) VALUES 
('01', 2, 'Dalam', 'available'),
('02', 4, 'Dalam', 'occupied'),
('03', 2, 'Dalam', 'available'),
('04', 6, 'Dalam', 'available'),
('05', 4, 'Dalam', 'occupied'),
('06', 2, 'Dalam', 'available'),
('07', 8, 'Teras', 'reserved'),
('08', 4, 'Teras', 'available'),
('09', 2, 'Teras', 'available'),
('10', 6, 'Teras', 'occupied'),
('11', 4, 'Teras', 'available'),
('12', 2, 'Teras', 'available')
ON CONFLICT (number) DO NOTHING;

-- Insert sample orders for demo
INSERT INTO orders (order_number, user_id, table_id, total_amount, final_amount, payment_method, status) VALUES 
('WK001', 1, 1, 65000, 65000, 'cash', 'completed'),
('WK002', 1, 2, 42000, 42000, 'card', 'preparing'),
('WK003', 1, 3, 38000, 38000, 'digital', 'completed'),
('WK004', 1, 4, 75000, 75000, 'cash', 'preparing'),
('WK005', 1, 5, 28000, 28000, 'card', 'completed')
ON CONFLICT (order_number) DO NOTHING;
