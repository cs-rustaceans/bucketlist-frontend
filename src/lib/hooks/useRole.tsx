import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

const useRequireRole = (role: "admin" | "employee") => () => {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoading && user.user?.role !== role) {
      navigate("/page-not-found");
    }
  }, [user]);

  return user;
};

export const useRequireAdmin = useRequireRole("admin");
export const useRequireEmployee = useRequireRole("employee");
