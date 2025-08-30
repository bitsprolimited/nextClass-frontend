import { AddLearnerModalProps } from "@/components/modals/AddLearnerModal";
import { EditLearnerModalProps } from "@/components/modals/EditLearnerModal";
import { SetAvailabilityModalProps } from "@/components/modals/SetAvailabilityModal";
import { SuccessDialogProps } from "@/components/modals/SuccessModal";
import { ComponentType } from "react";

export type ModalComponents = {
  success: {
    props: Omit<SuccessDialogProps, "isOpen" | "onClose">;
    component: ComponentType<SuccessDialogProps>;
  };
  addLearner: {
    props: Omit<AddLearnerModalProps, "isOpen" | "onClose">;
    component: ComponentType<AddLearnerModalProps>;
  };
  editLearner: {
    props: Omit<EditLearnerModalProps, "isOpen" | "onClose">;
    component: ComponentType<EditLearnerModalProps>;
  };
  setAvailability: {
    props: Omit<SetAvailabilityModalProps, "isOpen" | "onClose">;
    component: ComponentType<SetAvailabilityModalProps>;
  };
};

export enum Role {
  ADMIN = "admin",
  PARENT = "parent",
  TEACHER = "teacher",
}

export interface AxioErrorResponse {
  message: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface ParentSignupRequest {
  fullName: string;
  email: string;
  address: Address;
  phoneNumber: string;
  password: string;
  role: "parent";
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export interface Child {
  _id: string;
  name: string;
  age: number;
  grade: string;
  email: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  interests: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  status: "active" | "inactive" | "suspended";
  phoneNumber: string;
  profilePicture?: string;
  isProfileComplete: boolean;
  address: Address;
  timezone: string;
  isEmailVerified: boolean;
  qualifications: string[];
  rating: number;
  subjects: string[];
  experience?: number;
  hourlyRate?: number;
  role: Role;
  children: Child[];
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
}

export interface ResendVerificationResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface SessionData {
  user: User;
  accessToken: string;
  refreshToken?: string;
}
export interface LoginResponse extends AuthResponse {
  refreshToken: string;
}
// export interface SignupResponse extends AuthResponse {}

export interface Teacher {
  id: string;
  fullName: string;
  email: string;
  subjects: string[];
  experience: number;
  qualifications: string[];
  bio: string;
  hourlyRate: number;
  rating: number;
  ratingCount: number;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface TeacherResponse {
  teachers: Teacher[];
  pagination: Pagination;
}
