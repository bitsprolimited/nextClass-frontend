import { getTutor, getTutors } from "@/services/tutors.service";
import { useQuery } from "@tanstack/react-query";

export function useTutors() {
  return useQuery({
    queryKey: ["tutors"],
    queryFn: getTutors,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function useTutor(id: string) {
  return useQuery({
    queryKey: ["tutor", id],
    queryFn: () => getTutor(id),
    refetchOnWindowFocus: false,
    retry: false,
  });
}
