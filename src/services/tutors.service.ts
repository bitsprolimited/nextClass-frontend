import axiosInstance from "@/lib/axios";
import { Teacher, TeacherResponse } from "@/types";

export const getTutors = async (): Promise<TeacherResponse> => {
  const response = await axiosInstance.get("/teachers");
  return response.data;
};
export const getTutor = async (id: string): Promise<Teacher> => {
  const response = await axiosInstance.get(`/teachers/${id}`);

  return response.data;
};

export const getAvailableSlots = async (
  id: string,
  params: { date: string; duration: number }
): Promise<{ startTime: string; endTime: string }[]> => {
  const response = await axiosInstance.get(`/teachers/${id}/available-slots`, {
    params,
  });
  return response.data;
};
