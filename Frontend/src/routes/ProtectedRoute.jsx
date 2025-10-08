// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // If user is not logged in, redirect to signin
    return <Navigate to="/signin" replace />;
  }

  // If user is logged in, render the children components
  return children;
};

export default ProtectedRoute;
