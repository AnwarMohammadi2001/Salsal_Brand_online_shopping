import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import { toast } from "react-hot-toast";

// Skeleton loader for clean loading state
const ProductDetailSkeleton = () => (
  <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8">
      <div className="space-y-6">
        <div className="aspect-square w-full bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-md" />
          ))}
        </div>
      </div>
      <div className="mt-10 lg:mt-0 space-y-6">
        <div className="h-8 w-3/4 bg-gray-200 rounded-md" />
        <div className="h-6 w-1/4 bg-gray-200 rounded-md" />
        <div className="h-10 w-1/3 bg-gray-200 rounded-md" />
        <div className="h-24 w-full bg-gray-200 rounded-md" />
        <div className="h-12 w-full bg-gray-200 rounded-md" />
      </div>
    </div>
  </div>
);

const ProductDetailsPage = () => {
  const { category: categorySlug, productName: productSlug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const imageRef = useRef(null);

  const slugify = (text) =>
    text
      ?.toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  // Fetch products if not loaded
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // Find the product by slugs
  useEffect(() => {
    if (products.length > 0) {
      const matched = products.find(
        (p) => p.category?.slug === categorySlug && p._id === productSlug
      );

      if (matched) {
        setProduct(matched);
        setCurrentImage(`http://localhost:5000/${matched.frontImage}`);
      }
    }
  }, [products, categorySlug, productSlug]);

  const handleAddToCart = () => {
    // Implement your add-to-cart logic here
    toast.success("محصول به سبد خرید اضافه شد!");
    console.log(product.attributes);
  };

  if (loading) return <ProductDetailSkeleton />;
  if (error) return <p className="text-center text-red-500 py-6">{error}</p>;
  if (!product) return <p className="text-center py-6">محصول یافت نشد</p>;

  const images = [
    `http://localhost:5000/${product.frontImage}`,
    product.backImage ? `http://localhost:5000/${product.backImage}` : null,
    ...(product.images || []),
  ].filter(Boolean);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image Gallery */}
          <div className="flex flex-col gap-6">
            <div className="aspect-square w-full overflow-hidden rounded-lg">
              <img
                ref={imageRef}
                src={currentImage}
                alt={product.name}
                className="h-full w-full object-cover object-center transition-opacity duration-300"
              />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(img)}
                  className={`aspect-square rounded-md overflow-hidden transition-all duration-200 ${
                    currentImage === img
                      ? "ring-2 ring-blue-500 ring-offset-2"
                      : "hover:ring-2 hover:ring-blue-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.weight}
            </h1>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.material}
            </h1>
            <p className="text-gray-500 mt-1">
              {product.category?.nameFa || product.category?.nameEn}
            </p>
            <p className="text-3xl font-semibold mt-4">
              {product.priceAFN} افغانی
            </p>
            <p className="text-gray-500">/ {product.priceUSD} دالر</p>
            {product.details && (
              <p className="mt-6 text-gray-700">{product.details}</p>
            )}
            {product.sellerNote && (
              <p className="mt-6 text-gray-700">{product.sellerNote}</p>
            )}
            <div>
              {product.attributes && product.attributes.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold">ویژگی‌ها:</h3>
                  <ul>
                    {product.attributes.map((attr) => (
                      <li key={attr._id}>
                        {attr.attributeId?.name || "Attribute"}: {attr.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
