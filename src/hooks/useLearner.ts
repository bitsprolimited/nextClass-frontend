import { getLearnerById } from "@/services/learner.service";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import type { Child } from "@/types";

type LearnerKey = ["learner", string];

/**
 * Fetch a single learner by ID
 * @param id - The learner's ID
 * @param options - Optional React Query options
 */
export function useLearner<TData = Child>(
  id: string,
  options?: Omit<
    UseQueryOptions<Child, Error, TData, LearnerKey>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TData, Error> {
  return useQuery<Child, Error, TData, LearnerKey>({
    queryKey: ["learner", id],
    queryFn: () => getLearnerById(id),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
    ...(options ?? {}),
  });
}
