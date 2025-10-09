import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/slices/categorySlice";
import {
  fetchAttributesByCategory,
  resetAttributeState,
} from "../../../redux/slices/attributeSlice";
import {
  addProduct,
  resetAddProduct,
} from "../../../redux/slices/productSlice";

const AddNewProduct = () => {
  const dispatch = useDispatch();

  // Product form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [priceAFN, setPriceAFN] = useState("");
  const [priceUSD, setPriceUSD] = useState("");
  const [stock, setStock] = useState(0);
  const [weight, setWeight] = useState("");
  const [material, setMaterial] = useState("");
  const [details, setDetails] = useState("");
  const [sellerNote, setSellerNote] = useState("");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [otherImages, setOtherImages] = useState([]);
  const [attributeValues, setAttributeValues] = useState({});

  // Redux state
  const { categories } = useSelector((state) => state.categories);
  const { attributes } = useSelector((state) => state.attributes);
  const { loading, error, successAdd } = useSelector((state) => state.products);

  // Load categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Load attributes when category changes
  useEffect(() => {
    if (category) dispatch(fetchAttributesByCategory(category));
  }, [category, dispatch]);

  // Reset form after successful add
  useEffect(() => {
    if (successAdd) {
      setName("");
      setCategory("");
      setPriceAFN("");
      setPriceUSD("");
      setStock(0);
      setWeight("");
      setMaterial("");
      setDetails("");
      setSellerNote("");
      setFrontImage(null);
      setBackImage(null);
      setOtherImages([]);
      setAttributeValues({});
      dispatch(resetAddProduct());
      dispatch(resetAttributeState());
    }
  }, [successAdd, dispatch]);

  // Handle attributes
  const handleAttributeChange = (attrId, value) => {
    setAttributeValues((prev) => ({ ...prev, [attrId]: value }));
  };

  // Handle other images (multiple)
  const handleOtherImages = (e) => {
    const files = Array.from(e.target.files);
    setOtherImages(files);
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !priceAFN || !priceUSD) {
      return alert("Please fill all required fields!");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("priceAFN", priceAFN);
    formData.append("priceUSD", priceUSD);
    formData.append("stock", stock);
    formData.append("weight", weight);
    formData.append("material", material);
    formData.append("details", details);
    formData.append("sellerNote", sellerNote);

    if (frontImage) formData.append("frontImage", frontImage);
    if (backImage) formData.append("backImage", backImage);
    otherImages.forEach((img) => formData.append("otherImages", img));

    const attrsArray = Object.entries(attributeValues).map(([id, value]) => ({
      attributeId: id,
      value,
    }));
    formData.append("attributes", JSON.stringify(attrsArray));

    dispatch(addProduct(formData));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <input
          type="text"
          placeholder="Product Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
        >
          <option value="">Select Category *</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Attributes */}
        {category && attributes.length > 0 && (
          <div className="space-y-2">
            {attributes.map((attr) => (
              <div key={attr._id}>
                <label className="block font-medium mb-1">{attr.name}</label>
                {attr.type === "input" && (
                  <input
                    type="text"
                    value={attributeValues[attr._id] || ""}
                    onChange={(e) =>
                      handleAttributeChange(attr._id, e.target.value)
                    }
                    className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
                  />
                )}
                {attr.type === "dropdown" && (
                  <input
                    type="text"
                    placeholder="Comma separated options"
                    value={attributeValues[attr._id] || ""}
                    onChange={(e) =>
                      handleAttributeChange(attr._id, e.target.value)
                    }
                    className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
                  />
                )}
                {attr.type === "date" && (
                  <input
                    type="date"
                    value={attributeValues[attr._id] || ""}
                    onChange={(e) =>
                      handleAttributeChange(attr._id, e.target.value)
                    }
                    className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
                  />
                )}
                {attr.type === "checkbox" && (
                  <input
                    type="checkbox"
                    checked={attributeValues[attr._id] || false}
                    onChange={(e) =>
                      handleAttributeChange(attr._id, e.target.checked)
                    }
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Price (AFN) *"
            value={priceAFN}
            onChange={(e) => setPriceAFN(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            placeholder="Price (USD) *"
            value={priceUSD}
            onChange={(e) => setPriceUSD(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Details */}
        <textarea
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
        />
        <textarea
          placeholder="Seller Note"
          value={sellerNote}
          onChange={(e) => setSellerNote(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
        />

        {/* Image Uploads */}
        <div>
          <label className="block font-medium">Front Image</label>
          <input
            type="file"
            onChange={(e) => setFrontImage(e.target.files[0])}
            className="w-full"
          />
          {frontImage && (
            <img
              src={URL.createObjectURL(frontImage)}
              alt="front"
              className="w-24 h-24 object-cover mt-2 rounded"
            />
          )}
        </div>

        <div>
          <label className="block font-medium">Back Image</label>
          <input
            type="file"
            onChange={(e) => setBackImage(e.target.files[0])}
            className="w-full"
          />
          {backImage && (
            <img
              src={URL.createObjectURL(backImage)}
              alt="back"
              className="w-24 h-24 object-cover mt-2 rounded"
            />
          )}
        </div>

        <div>
          <label className="block font-medium">Other Images</label>
          <input
            type="file"
            multiple
            onChange={handleOtherImages}
            className="w-full"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {otherImages.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {/* Messages */}
      {error && <p className="text-red-500 mt-3">{error}</p>}
      {successAdd && (
        <p className="text-green-500 mt-3">✅ Product added successfully!</p>
      )}
    </div>
  );
};

export default AddNewProduct;
