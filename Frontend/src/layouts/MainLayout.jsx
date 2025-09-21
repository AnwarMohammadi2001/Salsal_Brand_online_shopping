import { Outlet } from "react-router-dom";
import TopHeader from "../components/Navbar/TopHeader";
import Navbar from "../components/Navbar/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col ">
      <TopHeader />
      <Navbar />
      <main className="flex-grow ">
        <Outlet /> {/* Nested route renders here */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
