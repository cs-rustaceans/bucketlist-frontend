import axios from "axios";
import { Config } from "../config";
import { useUser } from "./useUser";

export default function useAxios() {
  const { token } = useUser();

  return axios.create({
    baseURL: Config.apiUrl,
    headers: {
      // add auth header if we have a token
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}
