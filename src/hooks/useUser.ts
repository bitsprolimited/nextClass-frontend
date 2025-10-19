import { getUser } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
