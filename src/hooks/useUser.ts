import { getUser, getParents, getParent } from "@/services/user.service";
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

type ParentKey = ["parent", string];

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

/**
 * Fetch one parent by ID (enabled only when id truthy)
 */
export function useParent<TData = User>(
  id: string,
  options?: Omit<
    UseQueryOptions<User, Error, TData, ParentKey>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TData, Error> {
  return useQuery<User, Error, TData, ParentKey>({
    queryKey: ["parent", id],
    queryFn: () => getParent(id),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
    ...(options ?? {}),
  });
}
