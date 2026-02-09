import { getUser, getParents } from "@/services/user.service";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import type { User } from "@/types";

export function useUser() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

type ParentsKey = ["parents"];
type ParentsResponse = { users: User[]; pagination?: { page: number; limit: number; total: number; pages: number } };

/** Fetch all parents */
export function useParents<TData = ParentsResponse>(
  options?: Omit<
    UseQueryOptions<ParentsResponse, Error, TData, ParentsKey>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TData, Error> {
  return useQuery<ParentsResponse, Error, TData, ParentsKey>({
    queryKey: ["parents"],
    queryFn: getParents,
    refetchOnWindowFocus: false,
    retry: false,
    ...(options ?? {}),
  });
}
