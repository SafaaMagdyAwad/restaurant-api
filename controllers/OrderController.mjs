import Order from "../models/Order.mjs";
import MenuItem from "../models/Menu.mjs"; 
// Create a secure order
export const createOrder = async (req, res) => {
  try {
    const { items, orderType, address } = req.body;

    // Validate items array
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order must contain at least one item" });
    }

    // Validate address for delivery
    if (orderType === "delivery" && (!address || address.trim() === "")) {
      return res.status(400).json({ success: false, message: "Delivery address is required" });
    }

    // Fetch menu items from DB
    const menuItems = await MenuItem.find({
      _id: { $in: items.map(i => i.menuItemId) }
    });

    if (menuItems.length !== items.length) {
      return res.status(400).json({ success: false, message: "One or more menu items not found" });
    }

    // Calculate totalPrice and prepare order items
    let totalPrice = 0;
    const orderItems = items.map(i => {
      const menuItem = menuItems.find(m => m._id.toString() === i.menuItemId);
      totalPrice += menuItem.price * i.quantity;
      return {
        menuItemId: i.menuItemId,
        quantity: i.quantity,
        price: menuItem.price
      };
    });

    // Create order
    const order = await Order.create({
      items: orderItems,
      totalPrice,
      orderType,
      address
    });

    res.status(201).json({ success: true, data: order });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders (Admin)
export const getOrders = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    // total orders count
    const total = await Order.countDocuments();

    // paginated orders
    const orders = await Order.find()
      .populate("items.menuItemId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      total,
      count: orders.length,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//getOrderById
export const getOrderById = async (req, res) => {
  try {
    const orderId=req.params.id;
    console.log(orderId ,"orderId");
    const order = await Order.findById(orderId);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Update order status (role-based)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = req.user; // added by authMiddleware

    // Fetch the order
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

      // Admin can set any valid status
      const validStatuses = ["pending", "preparing", "ready", "delivered","cancelled"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status for admin" });
      }
    

    // Update status
    order.status = status;
    await order.save();

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const  status  = "cancelled";

    // Fetch the order
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
      // Cannot cancel if already ready or delivered
      if (["ready", "delivered"].includes(order.status)) {
        return res.status(400).json({ success: false, message: "Cannot cancel an order that is ready or delivered" });
      }

    // Update status
    order.status = status;
    await order.save();

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




