import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  brand: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  discountPrice: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const productModel =
  mongoose.models.ProductModel || mongoose.model("ProductModel", productSchema);
