import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  subCategory: [{ type: String }],

  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const categoryModel =
  mongoose.models?.Category || mongoose.model("Category", categorySchema);
export default categoryModel;
