import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAttribute,
  fetchAttributesByCategory,
  deleteAttribute,
  updateAttribute,
  resetAttributeState,
} from "../../../redux/slices/attributeSlice";
import { fetchCategories } from "../../../redux/slices/categorySlice";

const AddAttribute = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("input");
  const [required, setRequired] = useState(false);
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { attributes, loading, error, success } = useSelector(
    (state) => state.attributes
  );

  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch attributes when category changes
  useEffect(() => {
    if (category) dispatch(fetchAttributesByCategory(category));
  }, [category, dispatch]);

  // Reset form on success
  useEffect(() => {
    if (success) {
      setName("");
      setType("input");
      setRequired(false);
      setEditId(null);
      dispatch(resetAttributeState());
      if (category) dispatch(fetchAttributesByCategory(category));
    }
  }, [success, dispatch, category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) return alert("Please select a category!");
    if (!name.trim()) return alert("Attribute name is required!");

    if (editId) {
      dispatch(
        updateAttribute({
          id: editId,
          data: { category, name, type, required },
        })
      );
    } else {
      dispatch(addAttribute({ category, name, type, required }));
    }
  };

  const handleEdit = (attr) => {
    setName(attr.name);
    setType(attr.type);
    setRequired(attr.required);
    setEditId(attr._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this attribute?")) {
      dispatch(deleteAttribute(id));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {editId ? "Edit Attribute" : "Add New Attribute"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Attribute Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
        >
          <option value="">Select type</option>
          <option value="input">Input</option>
          <option value="dropdown">Dropdown</option>
          <option value="date">Date</option>
          <option value="checkbox">Checkbox</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
            className="h-4 w-4"
          />
          Required
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : editId
            ? "Update Attribute"
            : "Add Attribute"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      {category && attributes.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">
            Attributes in this Category
          </h3>
          <ul className="space-y-2">
            {attributes.map((attr) => (
              <li
                key={attr._id}
                className="border p-2 rounded-lg flex justify-between items-center"
              >
                <span>
                  {attr.name} ({attr.type}) {attr.required && "*required"}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(attr)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(attr._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddAttribute;
