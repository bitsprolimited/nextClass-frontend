import axiosInstance from "@/lib/axios";
import { User } from "@/types";

export const getUser = async (): Promise<{ user: User }> => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};
