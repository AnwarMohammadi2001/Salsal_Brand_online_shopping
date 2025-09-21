import React from "react";
import HeroMain from "../components/Hero/HeroMain";
import MenHome from "../components/ManCategory/MenHome";
import ShopNow from "../components/shop/ShopNow";
import WomenHome from "../components/ManCategory/WomenHome";
import CategoryList from "../components/category/CategoryList";

const Home = () => {
  return (
    <div className="">
      <HeroMain />
      <CategoryList />
      <ShopNow />
    </div>
  );
};

export default Home;
