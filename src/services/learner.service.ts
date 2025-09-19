import axiosInstance from "@/lib/axios";
import { Child } from "@/types";

// API DTO type (matches your backend DTO)
export interface AddLearnerDTO {
  name: string;
  age: number;
  gender: string;
  grade?: string;
  email?: string;
  dateOfBirth?: string;
  interests?: string[];
}

export const addLearner = async (data: AddLearnerDTO) => {
  if (data.age < 3 || data.age > 18) {
    throw new Error(
      `Age must be between 3 and 18 years. Calculated age: ${data.age}`
    );
  }
  const response = await axiosInstance.post("/user/learners", data);
  return response.data;
};

export const editLearner = async (
  data: Omit<AddLearnerDTO, "gender"> & { id: string }
) => {
  const { id, ...rest } = data;
  const response = await axiosInstance.patch(`/user/learners/${id}`, rest);
  return response.data;
};

export const getLearners = async (): Promise<Child[]> => {
  const response = await axiosInstance.get("/user/learners");
  return response.data.learners;
};
