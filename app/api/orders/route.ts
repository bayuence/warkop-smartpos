import { type NextRequest, NextResponse } from "next/server"
import { createOrder, createOrderItem, getOrders, updateCustomerLoyalty } from "@/lib/database"

export async function GET() {
  try {
    const orders = await getOrders(20)

    const transformedOrders = orders.map((order) => ({
      id: order.id,
      orderNumber: order.order_number,
      customerName: order.customer_name,
      tableNumber: order.table_number,
      totalAmount: Number(order.total_amount),
      finalAmount: Number(order.final_amount),
      paymentMethod: order.payment_method,
      status: order.status,
      createdAt: order.created_at,
    }))

    return NextResponse.json({ orders: transformedOrders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, tableId, items, paymentMethod, notes } = await request.json()

    if (!userId || !items || items.length === 0) {
      return NextResponse.json({ error: "Data pesanan tidak lengkap" }, { status: 400 })
    }

    // Calculate totals
    let totalAmount = 0
    let discountAmount = 0

    for (const item of items) {
      const itemPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price
      totalAmount += itemPrice * item.quantity

      if (item.discount) {
        discountAmount += ((item.price * item.discount) / 100) * item.quantity
      }
    }

    const finalAmount = totalAmount

    // Generate order number
    const orderNumber = `WK${Date.now().toString().slice(-6)}`

    // Create order
    const order = await createOrder({
      orderNumber,
      userId,
      tableId,
      totalAmount,
      discountAmount,
      finalAmount,
      paymentMethod: paymentMethod || "cash",
      status: "pending",
      notes,
    })

    // Create order items
    for (const item of items) {
      const unitPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price

      await createOrderItem({
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price,
        discountPercent: item.discount || 0,
        totalPrice: unitPrice * item.quantity,
      })
    }

    // Update customer loyalty
    await updateCustomerLoyalty(userId, finalAmount)

    return NextResponse.json({
      order: {
        id: order.id,
        orderNumber: order.order_number,
        totalAmount: Number(order.total_amount),
        finalAmount: Number(order.final_amount),
        status: order.status,
      },
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
