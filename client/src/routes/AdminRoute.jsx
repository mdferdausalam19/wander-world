import LoadingSpinner from "../components/shared/LoadingSpinner";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function AdminRoute({ children }) {
  const { user, isLoading } = useAuth();

  //   TODO: Check user role
  //   const { role, isLoading } = useRole();

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  //   TODO: Check user role
  //   if (role === "admin") {
  //     return children;
  //   }

  if (user) {
    return children;
  }
  return <Navigate to={"/admin/dashboard"}></Navigate>;
}
