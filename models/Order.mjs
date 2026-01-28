import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: () => {
        // مثال: ORD-20260128-7F3A2B
        const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
        const rand = Math.random().toString(16).slice(2, 8).toUpperCase();
        return `ORD-${date}-${rand}`;
      },
      unique: true,
    },
    items: [
      {
        menuItemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
    orderType: {
      type: String,
      enum: ["delivery", "pickup"],
      required: true,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "delivered","cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
