import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

const sql = neon(process.env.DATABASE_URL)

export { sql }

// Database helper functions
export async function getUsers() {
  try {
    const users = await sql`SELECT * FROM users ORDER BY created_at DESC`
    return users
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

export async function getUserByEmail(email: string) {
  try {
    const users = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`
    return users[0] || null
  } catch (error) {
    console.error("Error fetching user by email:", error)
    throw error
  }
}

export async function createUser(name: string, email: string, password: string, role = "customer") {
  try {
    const users = await sql`
      INSERT INTO users (name, email, password, role) 
      VALUES (${name}, ${email}, ${password}, ${role}) 
      RETURNING *
    `
    return users[0]
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export async function getProducts() {
  try {
    const products = await sql`
      SELECT p.*, c.name as category_name, c.icon as category_icon, c.gradient as category_gradient
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.active = true
      ORDER BY p.popular DESC, p.created_at DESC
    `
    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export async function getProductById(id: number) {
  try {
    const products = await sql`
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ${id} AND p.active = true
      LIMIT 1
    `
    return products[0] || null
  } catch (error) {
    console.error("Error fetching product by id:", error)
    throw error
  }
}

export async function getCategories() {
  try {
    const categories = await sql`SELECT * FROM categories ORDER BY name`
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

export async function getTables() {
  try {
    const tables = await sql`SELECT * FROM tables ORDER BY number`
    return tables
  } catch (error) {
    console.error("Error fetching tables:", error)
    throw error
  }
}

export async function createOrder(orderData: {
  orderNumber: string
  userId: number
  tableId?: number
  totalAmount: number
  discountAmount?: number
  finalAmount: number
  paymentMethod: string
  status?: string
  notes?: string
}) {
  try {
    const orders = await sql`
      INSERT INTO orders (
        order_number, user_id, table_id, total_amount, 
        discount_amount, final_amount, payment_method, status, notes
      ) VALUES (
        ${orderData.orderNumber}, ${orderData.userId}, ${orderData.tableId || null}, 
        ${orderData.totalAmount}, ${orderData.discountAmount || 0}, ${orderData.finalAmount}, 
        ${orderData.paymentMethod}, ${orderData.status || "pending"}, ${orderData.notes || null}
      ) RETURNING *
    `
    return orders[0]
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export async function createOrderItem(orderItemData: {
  orderId: number
  productId: number
  quantity: number
  unitPrice: number
  discountPercent?: number
  totalPrice: number
}) {
  try {
    const orderItems = await sql`
      INSERT INTO order_items (
        order_id, product_id, quantity, unit_price, discount_percent, total_price
      ) VALUES (
        ${orderItemData.orderId}, ${orderItemData.productId}, ${orderItemData.quantity},
        ${orderItemData.unitPrice}, ${orderItemData.discountPercent || 0}, ${orderItemData.totalPrice}
      ) RETURNING *
    `
    return orderItems[0]
  } catch (error) {
    console.error("Error creating order item:", error)
    throw error
  }
}

export async function getOrders(limit = 50) {
  try {
    const orders = await sql`
      SELECT o.*, u.name as customer_name, t.number as table_number
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN tables t ON o.table_id = t.id
      ORDER BY o.created_at DESC
      LIMIT ${limit}
    `
    return orders
  } catch (error) {
    console.error("Error fetching orders:", error)
    throw error
  }
}

export async function getOrderById(id: number) {
  try {
    const orders = await sql`
      SELECT o.*, u.name as customer_name, t.number as table_number
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN tables t ON o.table_id = t.id
      WHERE o.id = ${id}
      LIMIT 1
    `
    return orders[0] || null
  } catch (error) {
    console.error("Error fetching order by id:", error)
    throw error
  }
}

export async function getOrderItems(orderId: number) {
  try {
    const orderItems = await sql`
      SELECT oi.*, p.name as product_name, p.image as product_image
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ${orderId}
      ORDER BY oi.created_at
    `
    return orderItems
  } catch (error) {
    console.error("Error fetching order items:", error)
    throw error
  }
}

export async function updateOrderStatus(orderId: number, status: string) {
  try {
    const orders = await sql`
      UPDATE orders 
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${orderId}
      RETURNING *
    `
    return orders[0]
  } catch (error) {
    console.error("Error updating order status:", error)
    throw error
  }
}

export async function getCustomerLoyalty(userId: number) {
  try {
    const loyalty = await sql`
      SELECT * FROM customer_loyalty WHERE user_id = ${userId} LIMIT 1
    `
    return loyalty[0] || null
  } catch (error) {
    console.error("Error fetching customer loyalty:", error)
    throw error
  }
}

export async function updateCustomerLoyalty(userId: number, orderAmount: number) {
  try {
    const points = Math.floor(orderAmount / 1000) // 1 point per 1000 IDR

    const loyalty = await sql`
      INSERT INTO customer_loyalty (user_id, points, total_spent, total_orders, last_visit)
      VALUES (${userId}, ${points}, ${orderAmount}, 1, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        points = customer_loyalty.points + ${points},
        total_spent = customer_loyalty.total_spent + ${orderAmount},
        total_orders = customer_loyalty.total_orders + 1,
        last_visit = CURRENT_TIMESTAMP,
        tier = CASE 
          WHEN customer_loyalty.total_spent + ${orderAmount} >= 1000000 THEN 'Gold'
          WHEN customer_loyalty.total_spent + ${orderAmount} >= 500000 THEN 'Silver'
          ELSE 'Bronze'
        END,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `
    return loyalty[0]
  } catch (error) {
    console.error("Error updating customer loyalty:", error)
    throw error
  }
}

export async function getDashboardStats() {
  try {
    const today = new Date().toISOString().split("T")[0]

    const [salesStats, orderStats, productStats, customerStats] = await Promise.all([
      sql`
        SELECT 
          COALESCE(SUM(final_amount), 0) as today_sales,
          COALESCE(AVG(final_amount), 0) as avg_order_value
        FROM orders 
        WHERE DATE(created_at) = ${today}
      `,
      sql`
        SELECT COUNT(*) as today_orders
        FROM orders 
        WHERE DATE(created_at) = ${today}
      `,
      sql`
        SELECT COUNT(*) as total_products
        FROM products 
        WHERE active = true
      `,
      sql`
        SELECT COUNT(*) as total_customers
        FROM users 
        WHERE role = 'customer'
      `,
    ])

    return {
      todaySales: Number(salesStats[0]?.today_sales || 0),
      todayOrders: Number(orderStats[0]?.today_orders || 0),
      totalProducts: Number(productStats[0]?.total_products || 0),
      totalCustomers: Number(customerStats[0]?.total_customers || 0),
      avgOrderValue: Number(salesStats[0]?.avg_order_value || 0),
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw error
  }
}
