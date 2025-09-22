// MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import TopHeader from "../components/Navbar/TopHeader";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/footer/Footer";

export default function MainLayout() {
  const location = useLocation();

  // Hide footer only on /product page
  const hideFooter = location.pathname === "/product";

  return (
    <div className="min-h-screen flex flex-col">
      <TopHeader />
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Nested route renders here */}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
