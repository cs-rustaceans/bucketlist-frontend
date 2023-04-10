import axios from "axios";
import { Config } from "../config";
import Cookies from "js-cookie";

export default function useAxios() {
  const token = Cookies.get("token");
  return axios.create({
    baseURL: Config.apiUrl,
    headers: {
      // add auth header if we have a token
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}
