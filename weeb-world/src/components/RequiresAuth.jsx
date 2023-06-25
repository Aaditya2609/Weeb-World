import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function RequiresAuth() {
  const { stateAuth } = useAuth();
  const { isAuth } = stateAuth;

  const location = useLocation();

  return isAuth ? (
    <Navigate to="/Home" state={{ from: location }} replace />
   
  ) : (
    <Outlet />
  );
}

export default RequiresAuth;