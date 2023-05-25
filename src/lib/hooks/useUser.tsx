import useAxios from "./useAxios";

import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { PropsWithChildren, createContext, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";

export const UserContext = createContext<{
  user?: User;
  isLoading: boolean;
  invalidate: () => void;
  logout: () => Promise<void>;
}>({
  user: undefined,
  isLoading: true,
  invalidate: () => {},
  logout: () => Promise.resolve(),
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const axios = useAxios();
  const token = Cookies.get("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : undefined;
  const role = payload?.role ?? "employee";
  const { data: user, isLoading } = useQuery<User | undefined>(
    [role, "users", "me"],
    () =>
      axios
        .get(`/${role}/users/me`)
        .then(data => data.data)
        .catch(err => {
          if (err instanceof AxiosError) {
            if (err.response?.status === 403) return;
          }
          console.log(err);
        })
  );

  const invalidate = () => {
    queryClient.invalidateQueries([role, "users", "me"]);
  };

  const ctx = {
    user,
    isLoading,
    invalidate,
    async logout() {
      Cookies.remove("token");
      invalidate();
    },
  };
  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}
