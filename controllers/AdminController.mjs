// controllers/admin.controller.mjs
import Message from "../models/Message.mjs";
import Order from "../models/Order.mjs";
import MenuItem from "../models/Menu.mjs";
import Category from "../models/Category.mjs";
import Reservation from "../models/Reservation.mjs";

export async function getStatistics(req, res) {
  try {
    const [
      messagesCount,
      ordersCount,
      menuItemsCount,
      categoriesCount,
      reservationsCount,
    ] = await Promise.all([
      Message.countDocuments(),
      Order.countDocuments(),
      MenuItem.countDocuments(),
      Category.countDocuments(),
      Reservation.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        messages: messagesCount,
        orders: ordersCount,
        menuItems: menuItemsCount,
        categories: categoriesCount,
        reservations: reservationsCount,
      },
    });
  } catch (error) {
    console.error("getStatistics error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching statistics",
    });
  }
}
