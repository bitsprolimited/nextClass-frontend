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

export interface Qualification {
  _id: string;
  type: string; // e.g. "certificate"
  courseName: string;
  issuingInstitution: string;
  expiryDate: string; // ISO Date string
  certificateUrl: string;
  createdAt: string;
}

export interface Availability {
  _id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  slots: TimeSlot[];
  isAvailable: boolean;
}

export interface TimeSlot {
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
}

export interface BankDetails {
  accountNumber: string;
  accountName: string;
  bankName: string;
}

export interface IdentityDocument {
  _id: string;
  idType: string; // e.g. "passport"
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  documentUrl: string;
  isVerified: boolean;
  uploadedAt: string;
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
  qualifications: Qualification[];
  grades: string[];
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

export interface Teacher extends User {
  role: Role.TEACHER;
  bankDetails?: BankDetails;
  identityDocument?: IdentityDocument;
  introductionVideoUrl?: string;
  availability?: Availability[];
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
