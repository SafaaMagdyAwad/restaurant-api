import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import categoryRoutes from './routes/categoryRoutes.mjs'
import menuRoutes from './routes/menueRoutes.mjs';
import reservationRoutes from './routes/reservationRoutes.mjs';
import orderRoutes from './routes/orderRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import messageRoutes from './routes/messageRoutes.mjs';
import adminRoutes from './routes/adminRoutes.mjs'
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";
dotenv.config();

const app = express();

// ================= Middleware =================

app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true); // allow Postman
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://resturant-five-lake.vercel.app",
      "https://restaurant-api-henna.vercel.app/" // Swagger deployed
    ];
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error(`CORS policy: origin ${origin} not allowed`), false);
    }
    return callback(null, true);
  },
  credentials: true,
  allowedHeaders: ["Content-Type","Authorization"],
  methods: ["GET","POST","PATCH","DELETE","OPTIONS","PUT"]
}));

app.use(express.urlencoded({ extended: true })); // optional, parses form data



app.use(express.json());

// ================= Test Route =================
app.get("/", (req, res) => {
  res.json({
    message: "🍽️ Restaurant Backend is running successfully",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/category",categoryRoutes)
app.use("/api/menu", menuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/admin",adminRoutes)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl: CSS_URL,
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
  })
);


// ================= Database Connection =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

// ================= Server =================
// Only listen if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// FIX: Use export default instead of module.exports
export default app;