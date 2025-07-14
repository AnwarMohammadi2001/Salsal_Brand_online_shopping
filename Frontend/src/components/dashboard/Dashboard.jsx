import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ logoutUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // clear state and localStorage
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your protected dashboard!</p>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
