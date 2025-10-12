import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  resetAddProduct,
} from "../../../redux/slices/productSlice";
import { LuTrash2 } from "react-icons/lu";
import { LiaEdit } from "react-icons/lia";
import { MdPreview } from "react-icons/md";

const ProductList = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null); // store selected product

  // Redux state
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(resetAddProduct());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleUpdate = (product) => {
    console.log("Update product:", product);
    alert("Update functionality: implement your form/modal here");
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product); // open modal with this product
  };

  if (loading) return <p className="text-center mt-5">Loading products...</p>;
  if (error) return <p className="text-red-500 mt-5 text-center">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Price (AFN)</th>
              <th className="py-2 px-4 border-b">Price (USD)</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No products found
                </td>
              </tr>
            )}
            {products.map((product, index) => {
              const FRONT_IMAGE_URL = `http://localhost:5000/${product.frontImage}`;
              return (
                <tr
                  key={product._id}
                  className={`hover:bg-gray-50 text-center ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <td className="py-2 px-4 flex justify-center">
                    <img
                      src={FRONT_IMAGE_URL}
                      alt={product.name}
                      className="h-10 w-10 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">
                    {product.category?.name || "N/A"}
                  </td>
                  <td className="py-2 px-4">{product.priceAFN}</td>
                  <td className="py-2 px-4">{product.priceUSD}</td>
                  <td className="py-2 px-4">{product.stock}</td>
                  <td className="px-4 flex justify-center items-center gap-x-3">
                    <button
                      onClick={() => handleUpdate(product)}
                      className="text-green-500 rounded"
                    >
                      <LiaEdit size={24} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 rounded"
                    >
                      <LuTrash2 size={22} />
                    </button>
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="text-amber-500 rounded"
                    >
                      <MdPreview size={24} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="relative">
          <div
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 bg-black/50 z-40"
          ></div>

          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto">
            {/* Images */}
            <div className="flex gap-4">
              <img
                src={`http://localhost:5000/${selectedProduct.frontImage}`}
                alt={selectedProduct.name}
                className="w-1/2 object-cover rounded"
              />
              {selectedProduct.backImage && (
                <img
                  src={`http://localhost:5000/${selectedProduct.backImage}`}
                  alt={selectedProduct.name + " back"}
                  className="w-1/2 object-cover rounded"
                />
              )}
            </div>

            {/* Basic info */}
            <div className="mt-4">
              <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
              <p className="text-gray-500">
                Category: {selectedProduct.category?.nameFa || "N/A"}
              </p>
              <p>Price (AFN): {selectedProduct.priceAFN}</p>
              <p>Price (USD): {selectedProduct.priceUSD}</p>
              <p>Stock: {selectedProduct.stock}</p>
              {selectedProduct.weight && (
                <p>Weight: {selectedProduct.weight}</p>
              )}
              {selectedProduct.material && (
                <p>Material: {selectedProduct.material}</p>
              )}
            </div>

            {/* Details */}
            {selectedProduct.details && (
              <div>
                <h3 className="font-semibold mt-3">Details:</h3>
                <p>{selectedProduct.details}</p>
              </div>
            )}

            {selectedProduct.sellerNote && (
              <div>
                <h3 className="font-semibold mt-3">Seller Note:</h3>
                <p>{selectedProduct.sellerNote}</p>
              </div>
            )}

            {/* Attributes */}
            {selectedProduct.attributes &&
              selectedProduct.attributes.length > 0 && (
                <div>
                  <h3 className="font-semibold mt-3">Attributes:</h3>
                  <ul className="list-disc ml-6">
                    {selectedProduct.attributes.map((attr) => (
                      <li key={attr.attributeId}>
                        {attr.attributeId?.name || "Attribute"}: {attr.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            <div className="flex gap-4">
              {selectedProduct.otherImages &&
                selectedProduct.otherImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:5000/${img}`}
                    alt={`${selectedProduct.name} other ${idx + 1}`}
                    className="w-1/3 object-cover rounded"
                  />
                ))}
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
