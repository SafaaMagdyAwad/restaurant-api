import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
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
