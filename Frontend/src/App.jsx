import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      // You can optionally verify token format or expiry here
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Could not access localStorage", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginUser = (token) => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Could not save token to localStorage", error);
    }
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Could not remove token from localStorage", error);
    }
  };

  if (loading) {
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
