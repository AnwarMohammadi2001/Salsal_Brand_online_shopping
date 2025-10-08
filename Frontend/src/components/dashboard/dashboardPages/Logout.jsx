import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Logging out...</h1>
    </div>
  );
};

export default Logout;
