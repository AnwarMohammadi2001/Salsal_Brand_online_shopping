import React from "react";
import HeroMain from "../components/Hero/HeroMain";
import MenHome from "../components/ManCategory/MenHome";
import ShopNow from "../components/shop/ShopNow";
import WomenHome from "../components/ManCategory/WomenHome";
import CategoryList from "../components/category/CategoryList";
import BestSeller from "../components/Product/BestSeller";
import NewestProduct from "../components/Product/NewestProduct";

const Home = () => {
  return (
    <div className="">
      <HeroMain />
      <CategoryList />
      <ShopNow />
      <MenHome />
      <NewestProduct />
      <BestSeller />
    </div>
  );
};

export default Home;
