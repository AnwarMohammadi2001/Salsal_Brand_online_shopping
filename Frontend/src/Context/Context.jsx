import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create Context
export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [gallery, setGallary] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Initialize theme based on system preference if not in localStorage
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (!localStorage.getItem("theme")) {
      setTheme(prefersDarkMode ? "dark" : "light");
    }
  }, []);

  // Apply theme and save to localStorage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const result = await res.json();
        setUser(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchGallary = async () => {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/photos?_limit=8"
        );
        const result = await res.json();
        setGallary(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGallary();
  }, []); // ✅ Don't forget dependency array

  const value = {
    theme,
    setTheme,
    data,
    user,
    gallery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
