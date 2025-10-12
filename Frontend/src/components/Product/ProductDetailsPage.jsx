import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice"; // adjust path if needed

const ProductDetailsPage = () => {
  const { category, productName } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  // Helper to match slugs
  const slugify = (text) =>
    text
      ?.toLowerCase()
      ?.replace(/\s+/g, "-")
      ?.replace(/[^\w-]+/g, "");

  // Fetch all products if not loaded yet
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // Find product once products are available
  useEffect(() => {
    if (products.length > 0) {
      const matched = products.find(
        (p) =>
          slugify(p.category?.name || p.category) === category &&
          slugify(p.name) === productName
      );

      if (matched) {
        setProduct(matched);
        setCurrentImage(`http://localhost:5000/${matched.frontImage}`);
      }
    }
  }, [products, category, productName]);

  // Handle loading & error states
  if (loading) return <p className="text-center py-6">در حال بارگذاری...</p>;
  if (error) return <p className="text-center text-red-500 py-6">{error}</p>;
  if (!product) return <p className="text-center py-6">محصول یافت نشد</p>;

  const FRONT_IMAGE_URL = `http://localhost:5000/${product.frontImage}`;
  const BACK_IMAGE_URL = product.backImage
    ? `http://localhost:5000/${product.backImage}`
    : FRONT_IMAGE_URL;

  return (
    <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8">
      {/* Images */}
      <div className="flex-1 flex flex-col gap-4">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-lg shadow"
        />
        <div className="flex gap-3">
          {[FRONT_IMAGE_URL, BACK_IMAGE_URL].map((img, idx) => (
            <img
              key={idx}
              src={img}
              onClick={() => setCurrentImage(img)}
              alt={`Preview ${idx}`}
              className={`w-24 h-24 object-cover rounded-lg border cursor-pointer ${
                currentImage === img ? "border-blue-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-gray-600">
          {product.category?.name || product.category}
        </p>
        <div className="flex items-center gap-3 text-lg font-medium">
          <span>{product.priceAFN} افغانی</span>
          <span className="text-gray-500">/ {product.priceUSD} دالر</span>
        </div>
        {product.description && (
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        )}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
