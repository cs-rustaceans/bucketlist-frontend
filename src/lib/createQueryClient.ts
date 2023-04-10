import axios from "axios";
import { QueryClient } from "react-query";
import { Config } from "./config";

export default function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: async ({ queryKey: [url] }) => {
          if (typeof url !== "string")
            throw new Error(
              "Our implementation of the query client accepts only string (URL) query keys"
            );
          // add our API url
          const { data } = await axios.get(`${Config.apiUrl}${url}`);
          return data;
        },
      },
    },
  });
}
