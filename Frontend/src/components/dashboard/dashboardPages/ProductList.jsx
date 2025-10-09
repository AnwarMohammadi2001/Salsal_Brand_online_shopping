import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  resetAddProduct,
} from "../../../redux/slices/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  // Redux state
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(resetAddProduct()); // reset after add
  }, [dispatch]);

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  // Update handler
  const handleUpdate = (product) => {
    // Here you can navigate to your AddNewProduct form or open a modal
    // and pre-fill with product data for updating
    console.log("Update product:", product);
    alert("Update functionality: implement your form modal or navigation");
  };

  if (loading) return <p className="text-center mt-5">Loading products...</p>;
  if (error) return <p className="text-red-500 mt-5 text-center">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
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
                <td colSpan="6" className="text-center py-4">
                  No products found
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">
                  {product.category?.name || "N/A"}
                </td>
                <td className="py-2 px-4 border-b">{product.priceAFN}</td>
                <td className="py-2 px-4 border-b">{product.priceUSD}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    onClick={() => handleUpdate(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
