import axiosInstance from "@/lib/axios";
import { TeacherResponse } from "@/types";

export const getTutors = async (): Promise<TeacherResponse> => {
  const response = await axiosInstance.get("/teachers");
  console.log(response.data);

  return response.data;
};
