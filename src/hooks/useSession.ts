import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await axios.get("/api/auth/getSession");
      return data.session;
    },
    retry: false,
  });
}
