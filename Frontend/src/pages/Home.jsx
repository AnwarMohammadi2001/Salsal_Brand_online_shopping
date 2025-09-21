import React from "react";
import HeroMain from "../components/Hero/HeroMain";
import MenHome from "../components/ManCategory/MenHome";
import ShopNow from "../components/shop/ShopNow";
import WomenHome from "../components/ManCategory/WomenHome";

const Home = () => {
  return (
    <div className="">
      <HeroMain />
      <MenHome />
      <ShopNow />
      <WomenHome />
    </div>
  );
};

export default Home;
