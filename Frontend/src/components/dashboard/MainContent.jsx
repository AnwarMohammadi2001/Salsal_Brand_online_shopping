import Dashboard from "./Dashboard";
import FirstPage1 from "./dashboardPages/FirstPage1";
import FirstPage2 from "./dashboardPages/FirstPage2";
import FirstPage3 from "./dashboardPages/FirstPage3";
import { useSelector } from "react-redux";
import ManageUsers from "./dashboardPages/ManageUsers"; // Admin-only
import AddProduct from "./dashboardPages/AddProduct"; // Admin-only
import ProductList from "./dashboardPages/ProductList"; // Admin-only
import AddCategory from "./dashboardPages/AddCategory"; // Admin-only
import AddAttributes from "./dashboardPages/AddAttributes"; // Admin-only
import WebsiteManagement from "./dashboardPages/WebsiteManagement"; // Admin-only

const MainContent = ({ activeComponent }) => {
  const { user } = useSelector((state) => state.auth); // get logged-in user

  if (!user) return <div>Loading...</div>; // safety check

  // ---------------- Admin content ----------------
  if (user.isAdmin) {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "projects":
        return <FirstPage1 />;
      case "manageUsers":
        return <ManageUsers />;
      case "addProduct":
        return <AddProduct />;
      case "productList":
        return <ProductList />;
      case "addAttributes":
        return <AddAttributes />;
      case "website":
        return <WebsiteManagement />;
      case "logout":
        return <Logout />;
      default:
        return <Dashboard />;
    }
  }

  // ✅ Normal user content
  switch (activeComponent) {
    case "dashboard":
      return <Dashboard />;
    case "projects":
      return <FirstPage1 />;
    case "profile":
      return <FirstPage2 />;
    case "orders":
      return <FirstPage3 />;
    default:
      return <Dashboard />;
  }
};

export default MainContent;
