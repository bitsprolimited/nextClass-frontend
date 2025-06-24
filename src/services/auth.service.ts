import { LoginFormSchema } from "@/app/(auth)/login/loginForm";
import { ParentSignupFormSchema } from "@/app/(auth)/signup/parentSignup";
import { TutorSignupFormSchema } from "@/app/(auth)/signup/tutor/tutorSignupForm";
import axiosInstance from "@/lib/axios";
import { AuthResponse, LoginResponse, ParentSignupRequest } from "@/types";

export const login = async (data: LoginFormSchema): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const tutorSignup = async (
  data: TutorSignupFormSchema
): Promise<AuthResponse> => {
  const signupData = {
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: data.password,
    role: "teacher" as const,
  };

  const response = await axiosInstance.post("/auth/register", signupData);
  return response.data;
};

export const parentSignup = async (
  data: ParentSignupFormSchema & {
    address: { street: string; city: string; state: string; country: string };
  }
): Promise<AuthResponse> => {
  const signupData: ParentSignupRequest = {
    fullName: data.fullName,
    email: data.email,
    address: data.address,
    phoneNumber: data.phone,
    password: data.password,
    role: "parent" as const,
  };

  const response = await axiosInstance.post("/auth/register", signupData);
  return response.data;
};
