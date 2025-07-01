import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem("isAuthenticated");
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Could not access localStorage", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // done checking localStorage
    }
  }, []);

  const loginUser = () => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      console.error("Could not save to localStorage", error);
    }
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
      console.error("Could not remove from localStorage", error);
    }
  };

  if (loading) {
    // While loading, you can render a spinner or nothing
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <MainLayout>
        <AppRoutes
          isAuthenticated={isAuthenticated}
          loginUser={loginUser}
          logoutUser={logoutUser}
        />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
