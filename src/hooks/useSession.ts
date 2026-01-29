import { Session } from "@/services/session";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async (): Promise<Session> => {
      const { data } = await axios.get("/api/auth/getSession");
      return data.session;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
