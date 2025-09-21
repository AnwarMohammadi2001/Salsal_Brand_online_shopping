import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import MainLayout from "../layouts/MainLayout";

import SignIn from "../feature/authentication/SignIn";
import SignUp from "../feature/authentication/SignUp";

// Lazy loaded pages
const Home = lazy(() => import("../pages/Home"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
