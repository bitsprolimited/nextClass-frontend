// src/hooks/useTutors.ts
import { getTutor, getTutors, updateTeacherVerification } from "@/services/tutors.service";
import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { Teacher, TeacherResponse } from "@/types";

// Typed query keys
type TutorsKey = ["tutors"];
type TutorKey = ["tutor", string];

/** Fetch all tutors */
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

/** Approve/Decline a teacher (PATCH /teachers/{id}/verification-status) */
export function useUpdateTeacherVerification() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isAdminVerified }: { id: string; isAdminVerified: boolean }) =>
      updateTeacherVerification(id, isAdminVerified),
    onSuccess: (updated) => {
      // Refresh list
      qc.invalidateQueries({ queryKey: ["tutors"] });
      // Refresh detail if we know the id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const id = (updated as any)?._id as string | undefined;
      if (id) qc.invalidateQueries({ queryKey: ["tutor", id] });
    },
  });
}