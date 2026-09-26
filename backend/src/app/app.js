import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "../routes/auth.routes.js";
import productRoutes from "../routes/product.routes.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Backend health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running successfully!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;