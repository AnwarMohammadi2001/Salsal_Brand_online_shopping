// import Customer from "./pages/ServiceManger";
// import CategoryManagement from "./pages/categoryManager.jsx";
// import Product from "../../Pages/dashboard/Product";
// import Profile from "../../Pages/dashboard/Profiles.jsx";
// import Attribute from "./pages/attribute.jsx";
// import ProductManager from "./pages/ProductManager.jsx";
// import ProductList from "./pages/ProductList.jsx";
// import OrderManagement from "./pages/OrderManagement.jsx";
import Dashboard from "./Dashboard";

const MainContent = ({ activeComponent, setActiveComponent }) => {
  const renderContent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "category":
        return <Dashboard />;
      case "attribute":
        return <Dashboard />;
      case "products":
        return <Dashboard />;
      case "porductlist":
        return <Dashboard setActiveComponent={setActiveComponent} />;
      // case "report":
      //   return <Report />;
      case "orders": // --- ADD THIS CASE ---
        return <Dashboard />;
      case "proflie":
        return <Dashboard />;

      default:
        return <Dashboard />;
    }
  };

  return <div className="min-h-[93.5vh] bg-gray-200">{renderContent()}</div>;
};

export default MainContent;
