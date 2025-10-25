import React, { useState } from "react";
import AddCategory from "./AddCategory";
import AddNewProduct from "./AddNewProduct";
import AddAttribute from "./AddAttributes";

const AddProduct = () => {
  const [activeTab, setActiveTab] = useState("category");

  const tabs = [
    {
      id: "category",
      label: "Add Category",
      icon: "📁",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      id: "attribute",
      label: "Add Attributes",
      icon: "🏷️",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      id: "product",
      label: "Add New Product",
      icon: "📦",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
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

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Glass Morphism Header */}
        <div className="mb-12 text-center">
          <div className="inline-block backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-4">
              Product Suite
            </h1>
            <p className="text-blue-100/80 text-lg font-light">
              Craft your perfect product ecosystem
            </p>
          </div>
        </div>

        {/* Glass Morphism Main Container */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Vertical Sidebar Tabs */}
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="md:w-80 bg-black/20 border-r border-white/10">
              <div className="p-8">
                <h2 className="text-white/90 font-semibold text-lg mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Navigation Panel
                </h2>
                <div className="space-y-3">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                        activeTab === tab.id
                          ? "bg-white/20 backdrop-blur-sm shadow-lg"
                          : "hover:bg-white/10"
                      }`}
                    >
                      {/* Animated Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${
                          tab.gradient
                        } opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                          activeTab === tab.id ? "opacity-30" : ""
                        }`}
                      />

                      {/* Icon Container */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 relative z-10 ${
                          activeTab === tab.id
                            ? `bg-gradient-to-r ${tab.gradient} shadow-lg scale-110`
                            : "bg-white/10 group-hover:bg-white/20"
                        }`}
                      >
                        <span className="text-xl">{tab.icon}</span>
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 text-left relative z-10">
                        <span
                          className={`font-semibold block transition-all duration-500 ${
                            activeTab === tab.id
                              ? "text-white text-lg"
                              : "text-white/70 group-hover:text-white"
                          }`}
                        >
                          {tab.label}
                        </span>
                        <div
                          className={`h-0.5 bg-gradient-to-r ${
                            tab.gradient
                          } transition-all duration-500 mt-1 ${
                            activeTab === tab.id
                              ? "w-full"
                              : "w-0 group-hover:w-1/2"
                          }`}
                        />
                      </div>

                      {/* Active Indicator */}
                      {activeTab === tab.id && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                          <div className="w-2 h-2 bg-white rounded-full absolute top-0" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Status Bar */}
                <div className="mt-8 p-4 bg-black/20 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between text-white/60 text-sm">
                    <span>Current Step</span>
                    <span className="font-semibold text-white">
                      {tabs.find((tab) => tab.id === activeTab)?.label}
                    </span>
                  </div>
                  <div className="mt-3 w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${
                        tabs.find((tab) => tab.id === activeTab)?.gradient
                      } transition-all duration-1000`}
                      style={{
                        width: `${
                          ((tabs.findIndex((tab) => tab.id === activeTab) + 1) /
                            tabs.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Content Header */}
              <div
                className={`p-8 bg-gradient-to-r ${activeTabData?.bgGradient} border-b border-white/10`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${activeTabData?.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-2xl">{activeTabData?.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {activeTabData?.label}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {activeTab === "category" &&
                        "Create and manage product categories"}
                      {activeTab === "attribute" &&
                        "Define product attributes and specifications"}
                      {activeTab === "product" &&
                        "Add new products to your catalog"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8 bg-white/5 backdrop-blur-sm min-h-[500px]">
                <div
                  key={activeTab}
                  className="animate-in fade-in-50 slide-in-from-right-5 duration-500"
                >
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Progress Dots */}
        <div className="flex justify-center mt-8">
          <div className="backdrop-blur-xl bg-white/10 rounded-full px-6 py-3 border border-white/20 shadow-lg">
            <div className="flex gap-3">
              {tabs.map((tab, index) => (
                <div key={tab.id} className="flex items-center gap-3">
                  {index > 0 && (
                    <div className="w-6 h-0.5 bg-white/30 rounded-full" />
                  )}
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? "text-white scale-110"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.gradient} shadow-lg`
                          : "bg-white/30"
                      }`}
                    />
                    <span className="text-sm font-medium">{index + 1}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
