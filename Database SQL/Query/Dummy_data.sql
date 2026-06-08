INSERT INTO users
(username,email,password,roleid,status)
VALUES
(
'admin',
'admin@kharido.com',
'admin123',
1,
'ACTIVE'
);

INSERT INTO users
(username,email,password,roleid,status)
VALUES
(
'seller1',
'seller1@kharido.com',
'seller123',
2,
'ACTIVE'
);

INSERT INTO seller_profiles
(userid,shop_name,gst_number,phone,approval_status)
VALUES
(
2,
'Tech World',
'GST123456',
'9876543210',
'APPROVED'
);

INSERT INTO users
(username,email,password,roleid,status)
VALUES
(
'customer1',
'customer1@gmail.com',
'cust123',
3,
'ACTIVE'
);

INSERT INTO customer_profiles
(userid,firstname,lastname,phone,gender)
VALUES
(
3,
'Harsh',
'Rajput',
'9999999999',
'MALE'
);

INSERT INTO categories(category_name,description)
VALUES
('Electronics','Electronic Items'),
('Fashion','Fashion Products'),
('Books','Books and Study Material'),
('Home Appliances','Home Appliances'),
('Sports','Sports Equipment'),
('Gaming','Gaming Products');

INSERT INTO subcategories(categoryid,subcategory_name)
VALUES
-- Electronics
(1,'Mobiles'),
(1,'Laptops'),
(1,'Headphones'),
(1,'Smart Watches'),

-- Fashion
(2,'Mens Wear'),
(2,'Womens Wear'),
(2,'Footwear'),

-- Books
(3,'Programming Books'),
(3,'Novels'),
(3,'Academic Books'),

-- Home Appliances
(4,'Kitchen Appliances'),
(4,'Refrigerators'),
(4,'Washing Machines'),

-- Sports
(5,'Cricket'),
(5,'Football'),
(5,'Gym Equipment'),

-- Gaming
(6,'Gaming Consoles'),
(6,'Gaming Laptops'),
(6,'Gaming Accessories'),
(6,'Video Games'),
(6,'Gaming Chairs');


INSERT INTO brands(brand_name)
VALUES
-- Electronics
('Apple'),
('Samsung'),
('OnePlus'),
('Dell'),
('HP'),
('Lenovo'),

-- Fashion
('Nike'),
('Puma'),
('Adidas'),

-- Gaming
('Sony'),
('Microsoft'),
('ASUS ROG'),
('MSI'),
('Logitech'),
('Razer'),
('Corsair'),
('SteelSeries');