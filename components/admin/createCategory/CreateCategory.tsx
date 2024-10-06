"use client";
import { useCreateCategoryMutation } from "@/redux/rtk/category";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateCategory = () => {
  const [isSubcategory, setIsSubcategory] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = { category, subCategory, description };
    try {
      const { data: res } = await createCategory({ data });
      if (res.status === 201) {
        toast.success(res.message);
        setLoading(false);
        setCategory("");
        setDescription("");
        setSubCategory("");
        setIsSubcategory(false);
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700">
          Create Product Category
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              className="w-full outline-none px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter category name"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              rows={4}
              placeholder="Enter category description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <input
              id="subcategory"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              checked={isSubcategory}
              onChange={() => setIsSubcategory(!isSubcategory)}
            />
            <label
              htmlFor="subcategory"
              className="ml-2 block text-sm text-gray-700 cursor-pointer"
            >
              Is there subcategory for this category?
            </label>
          </div>

          {isSubcategory && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory Name
              </label>
              <input
                type="text"
                className="w-full outline-none px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Enter subcategory name"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <LoaderCircle size={20} className="animate-spin mr-2" />
                  Createing category. Please wait...
                </span>
              ) : (
                "Create Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
