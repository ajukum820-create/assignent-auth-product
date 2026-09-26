import mongoose from "mongoose";

//-----------------PRODUCT ODEL AND SCHEMA
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [2, "Product title must be at least 2 characters long"],
      maxLength: [100, "Product title cannot exceed 100 characters"],
      trim: true,
    },

    description: {
      type: String,
      required: true,
      minLength: [
        10,
        "Product description must be at least 20 characters long",
      ],
      maxLength: [500, "Product description cannot exceed 500 characters"],
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Product price cannot be less than 0"],
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    size: [
      {
        type: String,
        enum: {
          values: ["X", "XL", "M", "L", "XXL"],
          message: "Invalid product size",
        },
        required: true,
      },
    ],

    stock: {
      type: Number,
      required: true,
      min: [0, "Product stock cannot be less than 0"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
