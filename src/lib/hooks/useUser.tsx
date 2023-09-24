import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { PropsWithChildren, createContext, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Config } from "../config";
import { parseAuthToken } from "../util";
import { User } from "../../models/User";

export const UserContext = createContext<{
  user?: User;
  isLoading: boolean;
  token?: string;
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
  const { data, isLoading, refetch } = useQuery<
    | {
        user?: User;
        token?: string;
      }
    | undefined
  >(["users", "me"], () => {
    const token = Cookies.get("token");
    const payload = token ? parseAuthToken(token) : undefined;
    const role = payload?.role ?? "employee";
    // do not use axios hook
    return axios
      .get(`${Config.apiUrl}/${role}/users/me`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })
      .then(data => ({
        user: data.data,
        token,
      }))
      .catch(err => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 403) return;
        }
        console.log(err);
        return undefined;
      });
  });

  const ctx = {
    user: data?.user,
    isLoading,
    token: data?.token,
    invalidate: refetch,
    async logout() {
      Cookies.remove("token");
      refetch();
    },
  };
  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}
