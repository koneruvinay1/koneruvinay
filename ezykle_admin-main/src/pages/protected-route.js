import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../network/service/UserService";

const Protected = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  }
  return <Navigate to="/login" replace />;
};
export default Protected;
