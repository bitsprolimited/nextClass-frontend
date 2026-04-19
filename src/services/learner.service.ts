import axiosInstance from "@/lib/axios";
import { Child, GetLearnersParams, GetLearnersResponse } from "@/types";

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
  const response = await axiosInstance.get("/user/learners/me");
  return response.data.learners;
};

export const getAllLearners = async (
  params?: GetLearnersParams
): Promise<GetLearnersResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.search) queryParams.append("search", params.search);
  if (params?.parentId) queryParams.append("parentId", params.parentId);

  const url = `/user/learners${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  const response = await axiosInstance.get<GetLearnersResponse>(url);
  
  
  const data = response.data;
  return {
    items: data.items,
    meta: data.meta,
  };
};

export const getLearnerById = async (id: string): Promise<Child> => {
  const response = await axiosInstance.get<{ learner: Child }>(`/user/learner/${id}`);
  return response.data.learner;
};
