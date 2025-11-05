// import { getTutor, getTutors } from "@/services/tutors.service";
// import { useQuery } from "@tanstack/react-query";

// export function useTutors() {
//   return useQuery({
//     queryKey: ["tutors"],
//     queryFn: getTutors,
//     refetchOnWindowFocus: false,
//     retry: false,
//   });
// }

// export function useTutor(id: string) {
//   return useQuery({
//     queryKey: ["tutor", id],
//     queryFn: () => getTutor(id),
//     refetchOnWindowFocus: false,
//     retry: false,
//   });
// }

// src/hooks/useTutors.ts
import { getTutor, getTutors } from "@/services/tutors.service";
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { Teacher, TeacherResponse } from "@/types";

// Typed keys
type TutorsKey = ["tutors"];
type TutorKey = ["tutor", string];

/** Fetch all tutors; allows .select() without any */
export function useTutors<TData = TeacherResponse>(
  options?: Omit<
    UseQueryOptions<TeacherResponse, Error, TData, TutorsKey>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TData, Error> {
  return useQuery<TeacherResponse, Error, TData, TutorsKey>({
    queryKey: ["tutors"],
    queryFn: getTutors,
    refetchOnWindowFocus: false,
    retry: false,
    ...(options ?? {}),
  });
}

/** Fetch one tutor by id; guarded by enabled: !!id */
export function useTutor<TData = Teacher>(
  id: string,
  options?: Omit<
    UseQueryOptions<Teacher, Error, TData, TutorKey>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TData, Error> {
  return useQuery<Teacher, Error, TData, TutorKey>({
    queryKey: ["tutor", id],
    queryFn: () => getTutor(id),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
    ...(options ?? {}),
  });
}
