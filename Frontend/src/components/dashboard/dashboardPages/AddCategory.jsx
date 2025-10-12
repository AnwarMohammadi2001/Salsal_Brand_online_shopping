import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  fetchCategories,
  updateCategory,
  deleteCategory,
  resetCategoryState,
} from "../../../redux/slices/categorySlice";

const AddCategory = () => {
  const [nameEn, setNameEn] = useState("");
  const [nameFa, setNameFa] = useState("");
  const [editingId, setEditingId] = useState(null);

  const dispatch = useDispatch();
  const { categories, loading, error, success } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setNameEn("");
      setNameFa("");
      setEditingId(null);
      dispatch(resetCategoryState());
      dispatch(fetchCategories());
    }
  }, [success, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameEn.trim() || !nameFa.trim()) {
      return alert("Both English and Farsi names are required!");
    }

    if (editingId) {
      dispatch(updateCategory({ id: editingId, nameEn, nameFa }));
    } else {
      dispatch(addCategory({ nameEn, nameFa }));
    }
  };

  const handleEdit = (cat) => {
    setNameEn(cat.nameEn);
    setNameFa(cat.nameFa);
    setEditingId(cat._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Edit Category" : "Add New Category"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        {/* English Name */}
        <div>
          <label className="block font-medium">English Name</label>
          <input
            type="text"
            placeholder="Enter English name"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Farsi Name */}
        <div>
          <label className="block font-medium">Farsi Name</label>
          <input
            type="text"
            placeholder="Enter Farsi name"
            value={nameFa}
            onChange={(e) => setNameFa(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : editingId ? "Update" : "Add"}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <h3 className="text-lg font-medium mb-2">All Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="border border-gray-200 p-2 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">🇬🇧 {cat.nameEn}</p>
                <p className="text-gray-500">🇮🇷 {cat.nameFa}</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <button
                  onClick={() => handleEdit(cat)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCategory;
