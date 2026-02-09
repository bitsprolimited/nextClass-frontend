import axiosInstance from "@/lib/axios";
import { User } from "@/types";

// Type definitions for handling different response structures
interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

/**
 * Normalizes different API response structures
 * Handles: direct arrays, wrapped objects, single items, and pagination metadata
 */
function normalizeResponse<T>(
  response: unknown,
  extractKey?: string
): { items: T[]; pagination?: PaginationInfo } {
  let items: T[] = [];

  // Try to extract items from various response structures
  if (Array.isArray(response)) {
    items = response;
  } else if (response && typeof response === "object") {
    const typed = response as Record<string, unknown>;

    if (Array.isArray(typed.items)) {
      items = typed.items as T[];
    } else if (Array.isArray(typed.users)) {
      items = typed.users as T[];
    } else if (Array.isArray(typed.data)) {
      items = typed.data as T[];
    } else if (typed.data && typeof typed.data === "object" && !Array.isArray(typed.data)) {
      // Single object wrapped in data
      items = [typed.data as T];
    } else if (extractKey && typed[extractKey]) {
      const extracted = typed[extractKey];
      items = Array.isArray(extracted) ? (extracted as T[]) : ([extracted as T]);
    }
  }

  // Extract pagination info
  if (response && typeof response === "object") {
    const typed = response as Record<string, unknown>;

    let pagination: PaginationInfo | undefined;
    if (typed.pagination && typeof typed.pagination === "object") {
      const paginationObj = typed.pagination as Record<string, unknown>;
      pagination = {
        page: (paginationObj.page as number) || 1,
        limit: (paginationObj.limit as number) || 20,
        total: (paginationObj.total as number) || 0,
        pages: (paginationObj.pages as number) || 1,
      };
    } else if (typed.meta && typeof typed.meta === "object") {
      const metaObj = typed.meta as Record<string, unknown>;
      pagination = {
        page: (metaObj.page as number) || 1,
        limit: (metaObj.limit as number) || 20,
        total: (metaObj.total as number) || 0,
        pages: (metaObj.pages as number) || (metaObj.totalPages as number) || 1,
      };
    }

    return {
      items: Array.isArray(items) ? items : [],
      pagination,
    };
  }

  return {
    items: Array.isArray(items) ? items : [],
    pagination: undefined,
  };
}

export const getUser = async (): Promise<{ user: User }> => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

export const getParents = async (): Promise<{ users: User[]; pagination?: PaginationInfo }> => {
  const response = await axiosInstance.get("/user?role=parent");
  const normalized = normalizeResponse<User>(response.data);
  
  return {
    users: normalized.items,
    pagination: normalized.pagination,
  };
};
