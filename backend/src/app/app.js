import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "../routes/auth.routes.js";
import productRoutes from "../routes/product.routes.js";

const app = express();

const allowedOrigins = [
  "https://assignent-auth-product-cz8p-a70lfuc9e-ajukum820-1555.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // (for example, some server-to-server requests)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running successfully!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;