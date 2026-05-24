import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  // 1. Pehle check karein ke token aur email dono mojood hain ya nahi
  if (!token || !email) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check karein ke kya email admin email se match karta hai
  if (email !== adminEmail) {
    return <Navigate to="/login" replace />;
  }

  // Agar dono checks pass ho jayein to children render karein
  return children;
};

export default PrivateRoute;
