import Dashboard from "./Dashboard";
import FirstPage1 from "./dashboardPages/FirstPage1";
import FirstPage2 from "./dashboardPages/FirstPage2";
import FirstPage3 from "./dashboardPages/FirstPage3";
import { useSelector } from "react-redux";

const MainContent = ({ activeComponent }) => {
  const { user } = useSelector((state) => state.auth); // get logged-in user

  if (!user) return <div>Loading...</div>; // safety check

  // ✅ Admin content
  if (user.isAdmin) {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "projects":
        return <FirstPage1 />;
      case "manageUsers":
        return <FirstPage2 />; // admin-only page
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
