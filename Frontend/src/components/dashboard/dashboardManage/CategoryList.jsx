import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryList,
  fetchCategoryLists,
  deleteCategoryList,
} from "../../../redux/slices/categoryListSlice";
import { fetchCategories } from "../../../redux/slices/categorySlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { lists, loading } = useSelector((state) => state.categoryList);
  const { categories } = useSelector((state) => state.categories);

  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch category lists
  useEffect(() => {
    dispatch(fetchCategoryLists());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) return alert("Please select a category!");
    if (!image) return alert("Please upload an image!");

    const formData = new FormData();
    formData.append("category", category);
    formData.append("image", image);

    dispatch(createCategoryList(formData));

    // Reset form
    setCategory("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Add Category List Image</h2>

      {/* --- Upload Form --- */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {/* Category Select */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.nameFa}
            </option>
          ))}
        </select>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
        />

        {/* Preview */}
        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-56 object-cover rounded-xl border"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Add Category List"}
        </button>
      </form>

      {/* --- All Category Lists --- */}
      <h3 className="text-lg font-semibold mb-3">All Category Lists</h3>
      {loading ? (
        <p>Loading...</p>
      ) : lists.length === 0 ? (
        <p className="text-gray-500">No category lists found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {lists
            .filter((item) => item && item.image)
            .map((item) => (
              <div
                key={item._id}
                className="relative border rounded-xl overflow-hidden group"
              >
                <img
                  src={`http://localhost:5000/${item.image}`}
                  alt="category"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => dispatch(deleteCategoryList(item._id))}
                    className="bg-red-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-center py-2 text-sm font-medium">
                  {item.category?.name || "No category"}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
