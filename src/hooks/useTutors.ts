import { getTutors } from "@/services/tutors.service";
import { useQuery } from "@tanstack/react-query";

export function useTutors() {
  return useQuery({
    queryKey: ["tutors"],
    queryFn: getTutors,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
