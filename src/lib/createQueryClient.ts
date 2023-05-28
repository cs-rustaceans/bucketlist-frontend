import axios from "axios";
import { QueryClient } from "react-query";
import { Config } from "./config";

export default function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
}
