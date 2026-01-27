import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // image bb
    },
    category: {
      type: String,
      required: true, // Starters, Main, Drinks
    },
    tags: [
      {
        type: String, // spicy, vegan, gluten-free
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
