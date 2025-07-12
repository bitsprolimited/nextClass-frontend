import axiosInstance from "@/lib/axios";

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
