import axiosInstance from "@/lib/axios";
import { TeacherResponse } from "@/types";

export const getTutors = async (): Promise<{
  teacherResponse: TeacherResponse;
}> => {
  const response = await axiosInstance.get("/user/teachers");
  return response.data;
};
