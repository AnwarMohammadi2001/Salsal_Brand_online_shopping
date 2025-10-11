import React from "react";
import SliderAddForm from "./SliderAddForm";
import NewsletterDashboard from "./NewsletterDashboard";
import CategoryList from "../dashboardManage/CategoryList";


const WebsiteManagement = () => {
  return (
    <div>
      <SliderAddForm />
      <NewsletterDashboard />
      <CategoryList />
    </div>
  );
};

export default WebsiteManagement;
