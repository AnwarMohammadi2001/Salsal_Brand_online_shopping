import React, { useState } from "react";
import AddCategory from "./AddCategory" // ✅ your category component
import AddNewProduct from "./AddNewProduct";
import AddAttribute from "./AddAttributes";


const AddProduct = () => {
  const [activeTab, setActiveTab] = useState("category");

  const tabs = [
    { id: "category", label: "Add Category" },
    { id: "attribute", label: "Add Attributes" },
    { id: "product", label: "Add New Product" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "category":
        return <AddCategory />;
      case "attribute":
        return <AddAttribute />;
      case "product":
        return <AddNewProduct />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className=" bg-white rounded-2xl shadow-lg">
        {/* Tabs Header */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 text-center py-3 font-medium transition-all ${
                activeTab === tab.id
                  ? "border-b-4 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default AddProduct;
