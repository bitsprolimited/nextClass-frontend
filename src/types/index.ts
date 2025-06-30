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

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  isEmailVerified: boolean;
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

export interface TutorUser extends User {
  role: Role.TEACHER;
  subjects?: string[];
  experience?: number;
  hourlyRate?: number;
}

export interface ParentUser extends User {
  role: Role.PARENT;
  children?: string[];
}
