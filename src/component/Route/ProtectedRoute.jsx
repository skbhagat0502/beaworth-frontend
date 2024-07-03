import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProtectedRoute = (props) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    toast.info("Please login first!");
    return <Navigate replace to="/" />;
  }
  if (props.isAdmin === "true" && user.role !== "admin")
    return loading ? <Loader /> : <Navigate replace to="/" />;
  else return <Outlet />;
};

export default ProtectedRoute;
