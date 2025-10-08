import Dashboard from "../components/dashboard/DashboardPage"; 
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home";
import SignIn from "../feature/authentication/SignIn";
import SignUp from "../feature/authentication/SignUp";
import ProductDetailsPage from "../components/Product/ProductDetailsPage"
import ProductMainPage from "../components/Product/ProductMainPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<ProductMainPage />} />
            <Route
              path="/collections/:category/:productName"
              element={<ProductDetailsPage />}
            />
          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
