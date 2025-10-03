import { LoginFormSchema } from "@/app/(auth)/login/loginForm";
import axiosInstance from "@/lib/axios";
import { ParentSignupFormSchema, TutorSignupFormSchema } from "@/lib/schema";
import {
  AuthResponse,
  ForgotPasswordResponse,
  LoginResponse,
  ParentSignupRequest,
  ResendVerificationResponse,
  VerificationResponse,
} from "@/types";

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

export const verifyEmail = async (
  token: string
): Promise<VerificationResponse> => {
  const response = await axiosInstance.get(`/auth/verify-email?token=${token}`);

  return response.data;
};

export const resendVerificationEmail = async (
  email: string
): Promise<ResendVerificationResponse> => {
  const response = await axiosInstance.post(`/auth/resend-verification`, {
    email,
  });

  return response.data;
};

export const forgotPassword = async ({
  email,
}: {
  email: string;
}): Promise<ForgotPasswordResponse> => {
  const response = await axiosInstance.post(`/auth/forgot-password`, {
    email,
  });

  return response.data;
};

export const resetPassword = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  const response = await axiosInstance.post(`/auth/reset-password`, {
    newPassword: password,
    token,
  });

  return response.data;
};
