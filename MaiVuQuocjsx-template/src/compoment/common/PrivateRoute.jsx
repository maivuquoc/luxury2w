// src/components/common/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('adminToken');
  console.log("isAuthenticated:", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
