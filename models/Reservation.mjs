import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    notes:{
      type:String,
    },
    price:{
      type:Number,
      required:true,
      min:80,//على حسب اسعار المكان
    }
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
