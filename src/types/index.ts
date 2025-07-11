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
  gender: string;
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