import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  label: { type: String, required: true },
  color: { type: String, default: "bg-gray-200" }, // اللون الافتراضي
});

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // رابط الصورة (Image BB أو أي استضافة)
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    tags: [tagSchema],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false, // لتحديد إذا كان العنصر Featured
    },
    badge: {
      type: String, // مثال: "Best Seller", "New"
    },
  },
  { timestamps: true }
);

// إضافة Virtual لجلب اسم الفئة بدل الـ ObjectId مباشرة
menuItemSchema.virtual("categoryName", {
  ref: "Category",
  localField: "category",
  foreignField: "_id",
  justOne: true,
});

export default mongoose.model("MenuItem", menuItemSchema);
