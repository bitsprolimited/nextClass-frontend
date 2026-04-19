import axiosInstance from "@/lib/axios";
import type { Teacher, TeacherResponse } from "@/types";

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

/**
 * Update teacher verification status
 * PATCH /teachers/{id}/verification-status
 * body: { isAdminVerified: boolean }
 */
export async function updateTeacherVerification(
  id: string,
  isAdminVerified: boolean,
  /** optional explanation for a decline; server currently ignores it but we keep for future */
  reason?: string
): Promise<Teacher> {
  const payload: Record<string, unknown> = { isAdminVerified };
  if (reason !== undefined) payload.reason = reason;

  const res = await axiosInstance.patch(
    `/teachers/${encodeURIComponent(id)}/verification-status`,
    payload
  );
  // response may be wrapped or direct; return sensible payload
  const body = res.data;
  if (body && typeof body === "object" && "data" in body) return body.data;
  return body;
}

export const createStripeConnect = async (): Promise<{
  onboardingUrl: string;
}> => {
  const response = await axiosInstance.post("/teachers/create-connect-account");
  return response.data;
};

export const createDashboardLink = async (): Promise<{
  url: string;
}> => {
  const response = await axiosInstance.post("/teachers/stripe/dashboard");
  return response.data;
};
