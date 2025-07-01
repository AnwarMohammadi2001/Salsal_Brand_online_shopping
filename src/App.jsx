import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On mount, safely read from localStorage
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem("isAuthenticated");
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Could not access localStorage", error);
      setIsAuthenticated(false);
    }
  }, []);

  // Login: set state + persist to localStorage
  const loginUser = () => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      console.error("Could not save to localStorage", error);
    }
  };

  // Logout: clear state + localStorage
  const logoutUser = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
      console.error("Could not remove from localStorage", error);
    }
  };

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
