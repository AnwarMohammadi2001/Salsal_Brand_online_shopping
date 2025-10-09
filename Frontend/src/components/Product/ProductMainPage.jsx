import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainSideBarPage from "./MainSideBarPage";
import Breadcrumb from "../Breadcrumb";
import MainProductCart from "../Card/MainProductCart";
import MainProductCartSkeleton from "../Card/MainProductCartSkeleton";
import { fetchProducts } from "../../redux/slices/productSlice";

const ProductMainPage = () => {
  const dispatch = useDispatch();

  const { products: allProducts, loading } = useSelector(
    (state) => state.products
  );

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const PRODUCTS_PER_PAGE = 8;

  // Load more manually
  const loadMore = () => {
    const nextProducts = allProducts.slice(0, (page + 1) * PRODUCTS_PER_PAGE);
    setProducts(nextProducts);
    setPage((prev) => prev + 1);
  };

  // Load all products
  const loadAll = () => {
    setProducts(allProducts);
  };

  // Load first page on mount or when allProducts changes
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const initialProducts = allProducts.slice(0, PRODUCTS_PER_PAGE);
    setProducts(initialProducts);
    setPage(1);
  }, [allProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb />
      <main className="flex gap-6 px-6 py-6">
        {/* Sidebar */}
        <div className="w-72">
          <div className="sticky top-[90px]">
            <MainSideBarPage />
          </div>
        </div>

        {/* Product list */}
        <section className="flex-1">
          <h2 className="text-xl font-semibold mb-4">لیست محصولات</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {loading
              ? Array(PRODUCTS_PER_PAGE)
                  .fill(0)
                  .map((_, index) => <MainProductCartSkeleton key={index} />)
              : products.map((product) => (
                  <MainProductCart key={product._id} product={product} />
                ))}
          </div>

          {/* Manual load buttons */}
          {products.length < allProducts.length && (
            <div className="flex gap-4 mt-6 justify-center">
              <button
                className="border rounded-full text-black border-black px-4 py-2 cursor-pointer"
                onClick={loadMore}
              >
                بارگذاری بیشتر
              </button>
              <button
                className="border rounded-full text-black border-black px-4 py-2 cursor-pointer"
                onClick={loadAll}
              >
                بارگذاری همه
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductMainPage;
