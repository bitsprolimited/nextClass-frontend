import axiosInstance from "@/lib/axios";
import { User } from "@/types";

export const getUser = async (): Promise<{ user: User }> => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

interface GetParentsResponse {
  items?: User[];
  users?: User[];
  data?: User[] | User;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    pages?: number;
    totalPages?: number;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const getParents = async (): Promise<{ users: User[]; pagination?: { page: number; limit: number; total: number; pages: number } }> => {
  const response = await axiosInstance.get("/user?role=parent");
  const data: GetParentsResponse = response.data;
  
  // Handle different response structures
  let users: User[] = [];
  
  if (Array.isArray(data.items)) {
    users = data.items;
  } else if (Array.isArray(data.users)) {
    users = data.users;
  } else if (Array.isArray(data.data)) {
    users = data.data;
  } else if (data.data && typeof data.data === "object" && !Array.isArray(data.data)) {
    // Single user object wrapped in data
    users = [data.data as User];
  } else if (Array.isArray(response.data)) {
    // Response is directly an array
    users = response.data;
  } else if (response.data && typeof response.data === "object" && !Array.isArray(response.data) && (response.data as any).role === "parent") {
    // Response is directly a user object
    users = [response.data as User];
  }
  
  // Map meta to pagination if available
  const pagination = data.pagination || (data.meta ? {
    page: data.meta.page || 1,
    limit: data.meta.limit || 20,
    total: data.meta.total || 0,
    pages: data.meta.pages || data.meta.totalPages || 1,
  } : undefined);
  
  return {
    users: Array.isArray(users) ? users : [],
    pagination,
  };
};
