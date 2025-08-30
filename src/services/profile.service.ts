import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export async function updateParentProfile(
  userId: string,
  payload: UpdateParentProfilePayload
) {
  const { data } = await axios.patch(
    `${BASE_URL}/api/v1/user/${userId}`,
    payload
  );
  return data;
}
