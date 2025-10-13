import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSlider,
  fetchSliders,
  deleteSlider,
} from "../../../redux/slices/sliderSlice";
import { fetchCategories } from "../../../redux/slices/categorySlice";

const SliderAddForm = () => {
  const dispatch = useDispatch();
  const { sliders, loading } = useSelector((state) => state.slider);
  const { categories } = useSelector((state) => state.categories);

  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch sliders
  useEffect(() => {
    dispatch(fetchSliders());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) return alert("Please select a category!");
    if (!image) return alert("Please select an image!");

    dispatch(addSlider({ image, category }));

    // Reset form
    setCategory("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Add Slider Image</h2>

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
          {loading ? "Uploading..." : "Add Slider"}
        </button>
      </form>

      {/* --- Category List --- */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-3">Available Categories</h3>
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="border rounded-xl p-3 text-center bg-gray-50 hover:bg-gray-100 transition"
              >
                <p className="font-medium">{cat.nameFa}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Sliders List --- */}
      <h3 className="text-lg font-semibold mb-3">All Sliders</h3>
      {loading ? (
        <p>Loading sliders...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sliders.map((s) => (
            <div
              key={s._id}
              className="relative border rounded-xl overflow-hidden group"
            >
              <img
                src={`http://localhost:5000/${s.image}`}
                alt="slider"
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => dispatch(deleteSlider(s._id))}
                  className="bg-red-600 text-white text-sm px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SliderAddForm;
