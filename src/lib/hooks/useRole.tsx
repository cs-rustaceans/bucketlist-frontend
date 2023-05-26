import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

const useRole = (role: "admin" | "employee") => () => {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoading && user.user?.role !== role) {
      navigate("/page-not-found");
    }
  }, [user]);

  return user;
};

export const useAdmin = useRole("admin");
export const useEmployee = useRole("employee");
