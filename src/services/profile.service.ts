import axiosInstance from "@/lib/axios";

export type UpdateParentProfilePayload = {
  email: string;
  fullName: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
};

export const updateParentProfile = async (
  userId: string,
  payload: UpdateParentProfilePayload
) => {
  const response = await axiosInstance.patch(`/user/${userId}`, payload);
  return response.data;
};
