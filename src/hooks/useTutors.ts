import { getTutors } from "@/services/tutors.service";
import { useQuery } from "@tanstack/react-query";

export function useTutors() {
  return useQuery({
    queryKey: ["teacherResponse"],
    queryFn: getTutors,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
