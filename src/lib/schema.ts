export const parentSignupFormSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    country: z.string().min(1, "Please select a country"),
    state: z.string().min(1, "Please select a state"),
    city: z.string().min(1, "Please select a city"),
    street: z.string().min(5, "Street address must be at least 5 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val, "You must agree to the terms"),
    confirmAge: z
      .boolean()
      .refine((val) => val, "You must confirm you are 18 or older"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ParentSignupFormSchema = z.infer<typeof parentSignupFormSchema>;

export const tutorSignupFormSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val, "You must agree to the terms"),
    confirmAge: z
      .boolean()
      .refine((val) => val, "You must confirm you are 18 or older"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TutorSignupFormSchema = z.infer<typeof tutorSignupFormSchema>;

export const profileSchema = z.object({
  address: z.object({
    street: z.string().min(5, "Enter a valid address"),
    city: z.string().min(1, "Select a city"),
    state: z.string().min(1, "Select a state"),
    country: z.string().min(1, "Select a country"),
  }),
  fullName: z.string().min(2, "Full name is required").optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional(),
});

export type ProfileFormSchema = z.infer<typeof profileSchema>;
import { z } from "zod";

// Zod schema for form validation
export const learnerFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  birthMonth: z.string().min(1, "Birth month is required"),
  birthYear: z.string().min(1, "Birth year is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  grade: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

export type LearnerFormData = z.infer<typeof learnerFormSchema>;

export const timeSlotSchema = z.object({
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

export const dayAvailabilitySchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  slots: z.array(timeSlotSchema),
  isAvailable: z.boolean(),
});

export const bankDetailsSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  accountName: z.string().min(1, "Account name is required"),
});

export const pricingSchema = z.object({
  ratePerSession: z.number().min(1, "Rate per session must be greater than 0"),
});

// Step 1: Select Days
export const selectDaysSchema = z.object({
  daySelection: z.enum(["everyday", "weekdays", "weekend", "custom"]),
  customDays: z.array(z.number().min(0).max(6)).optional(),
});

// Step 2: Select Times
export const selectTimesSchema = z.object({
  availabilities: z.array(dayAvailabilitySchema),
  timezone: z.string().min(1, "Please select a timezone."),
});

// Step 3: Payment Details
export const paymentDetailsSchema = z.object({
  ratePerSession: z.number().min(1, "Rate per session must be greater than 0"),
  bankDetails: bankDetailsSchema,
});

// Complete form schema
export const completeAvailabilitySchema = z.object({
  availabilities: z.array(dayAvailabilitySchema),
  bankDetails: bankDetailsSchema,
  pricing: pricingSchema,
});

export const bioDataSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  country: z.string().min(1, "Please select a country"),
  state: z.string().min(1, "Please select a state"),
  city: z.string().min(1, "Please select a city"),
  address: z.string().optional(),
  bio: z
    .string()
    .min(10, "Please tell us more about yourself (minimum 10 characters)"),
});

export const qualificationSchema = z.object({
  type: z.string().min(1, "Please select qualification type"),
  courseName: z.string().min(1, "Course name is required"),
  issuingInstitution: z.string().min(1, "Institution name is required"),
  expiryDate: z.string().optional(),
  // certificateFile: z.instanceof(File).optional(),
  certificateUrl: z.string().optional(),
});

export const careerExperienceSchema = z.object({
  subjects: z.array(z.string()).min(1, "Please select at least one subject"),
  grades: z.array(z.string()).min(1, "Please select at least one grade"),
  experience: z.string().min(1, "Please select years of experience"),
  qualifications: z
    .array(qualificationSchema)
    .min(1, "At least one qualification is required"),
});

export const identityDocumentSchema = z.object({
  idType: z.string().min(1, "Please select ID type"),
  issuingAuthority: z.string().min(1, "Please select issuing authority"),
  issueDate: z.union([z.string(), z.date()]).optional(),
  expiryDate: z.union([z.string(), z.date()]).optional(),
  documentUrl: z.string().optional(),
});

export const introductionVideoSchema = z.object({
  videoFile: z.any().refine(
    (file) => {
      // Only check File type in the browser
      if (typeof window === "undefined") return true;
      return file instanceof File;
    },
    { message: "Please upload or record your introduction video" }
  ),
  videoUrl: z.string().optional(),
});

export type BioDataFormData = z.infer<typeof bioDataSchema>;
export type CareerExperienceFormData = z.infer<typeof careerExperienceSchema>;
export type IdentityDocumentFormData = z.infer<typeof identityDocumentSchema>;
export type IntroductionVideoFormData = z.infer<typeof introductionVideoSchema>;

export type SelectDaysFormData = z.infer<typeof selectDaysSchema>;
export type SelectTimesFormData = z.infer<typeof selectTimesSchema>;
export type PaymentDetailsFormData = z.infer<typeof paymentDetailsSchema>;
export type CompleteAvailabilityFormData = z.infer<
  typeof completeAvailabilitySchema
>;
