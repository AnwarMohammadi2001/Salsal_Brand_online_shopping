import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailsPage = ({ wishlist = [], onToggleWishlist = () => {} }) => {
  const { category, productName } = useParams(); // get category and productName from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      try {
        // Replace with your real API
        const allProducts = [
          {
            id: "1",
            name: "لباس افغانی گند افغانی",
            category: "لباس افغانی",
            price: 40,
            images: ["prod/img1.jpeg", "prod/img2.jpeg", "prod/img3.jpeg"],
            description: "توضیحات محصول در اینجا قرار می‌گیرد.",
            details: ["جزئیات 1", "جزئیات 2"],
            condition: "جدید",
            color: "قرمز",
            material: "پنبه",
            size: "L",
            tags: ["سنتی", "زنانه"],
            sellerNotes: "لطفا با دقت استفاده شود",
          },
          // Add more products...
        ];

        // Match by slug
        const slugify = (text) =>
          text
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");

        const prod = allProducts.find(
          (p) =>
            slugify(p.category) === category && slugify(p.name) === productName
        );

        if (prod) {
          setProduct(prod);
          setCurrentImage(prod.images[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [category, productName]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!product) return <p>محصول یافت نشد</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.category}</p>
      <p>{product.price} $</p>
      <img src={currentImage} alt={product.name} />
      {/* More product details like description, details, images, etc. */}
    </div>
  );
};

export default ProductDetailsPage;
