import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  const location = useLocation();

  // List of paths where you want to hide header/navbar/footer
  const hideLayoutPaths = ["/dashboard"];

  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideLayout && <Header />}
      {!shouldHideLayout && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!shouldHideLayout && <Footer />}
    </div>
  );
}
