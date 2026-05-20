CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS menu (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT        NOT NULL,
  description TEXT,
  price       NUMERIC     NOT NULL CHECK (price > 0),
  category    TEXT,
  image_url   TEXT,
  available   BOOLEAN     DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE menu ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on menu" ON menu;
CREATE POLICY "Allow public read on menu" ON menu FOR SELECT USING (TRUE);

CREATE TABLE IF NOT EXISTS orders (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT        NOT NULL,
  phone         TEXT        NOT NULL,
  location      TEXT        NOT NULL,
  notes         TEXT,
  total_amount  NUMERIC     NOT NULL,
  status        TEXT        NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'preparing', 'delivered', 'cancelled')),
  mpesa_code    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on orders" ON orders;
CREATE POLICY "Allow public insert on orders" ON orders FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Allow customers to view their orders" ON orders;
CREATE POLICY "Allow customers to view their orders" ON orders FOR SELECT USING (TRUE);

CREATE TABLE IF NOT EXISTS order_items (
  id        UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id  UUID    NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_id   UUID    NOT NULL REFERENCES menu(id),
  quantity  INTEGER NOT NULL CHECK (quantity > 0),
  price     NUMERIC NOT NULL
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on order_items" ON order_items;
CREATE POLICY "Allow public insert on order_items" ON order_items FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Allow public read on order_items" ON order_items;
CREATE POLICY "Allow public read on order_items" ON order_items FOR SELECT USING (TRUE);

INSERT INTO menu (name, description, price, category, image_url) VALUES
('Nyama Choma Platter', 'Slow-grilled beef ribs marinated in our secret spice blend, served with kachumbari and ugali.', 850, 'Grills', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80'),
('Pilau Special', 'Aromatic basmati rice cooked with whole spices, tender beef, and caramelised onions.', 550, 'Rice Dishes', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80'),
('Tilapia Fry', 'Crispy whole tilapia, deep-fried golden and paired with coconut rice and lime.', 780, 'Seafood', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80'),
('Githeri Bowl', 'Hearty corn and bean stew slow-cooked with tomatoes, onions, and smoky paprika.', 320, 'Vegetarian', 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80'),
('Maharagwe na Chapati', 'Creamy red kidney bean curry served with four hand-rolled, buttered chapatis.', 380, 'Vegetarian', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80'),
('Mutura & Fries', 'Authentic Kenyan blood sausage grilled over charcoal, served with crispy seasoned fries.', 490, 'Grills', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80'),
('Samaki wa Kupaka', 'Swahili-style fish grilled in coconut and tomato sauce — a coastal classic.', 720, 'Seafood', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80'),
('Mandazi Basket', 'Six golden, lightly sweetened mandazis served warm with dipping honey.', 180, 'Snacks', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80');

CREATE OR REPLACE VIEW order_details AS
SELECT o.id AS order_id, o.customer_name, o.phone, o.location, o.total_amount, o.status, o.created_at, m.name AS item_name, oi.quantity, oi.price AS item_price, (oi.quantity * oi.price) AS item_total
FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN menu m ON m.id = oi.menu_id
ORDER BY o.created_at DESC;